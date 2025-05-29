const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

const db = new sqlite3.Database('./data.sqlite', (err) => {
    if (err) console.error("Błąd połączenia z SQLite:", err.message);
    else console.log("Połączono z lokalną bazą SQLite.");
});

const userLogMap = {}; 

function logAction(username, action) {
    const file = userLogMap[username];
    if (!file) return;
    const timestamp = new Date().toLocaleString();
    fs.appendFileSync(file, `[${timestamp}] ${action}\n`, 'utf8');
}

app.post('/', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
    db.all(sql, [username, password], (err, results) => {
        if (err) return res.status(500).json({ message: "Błąd serwera" });
        if (results.length > 0) {
            const user = results[0];
            const rola = user.rola || 'warehouseman';
            const filename = path.join(__dirname, 'logs', `${username}_${Date.now()}.txt`);
            fs.mkdirSync(path.join(__dirname, 'logs'), { recursive: true });
            fs.writeFileSync(filename, `Zalogowano: ${username} o ${new Date().toLocaleString()}\n`, 'utf8');
            userLogMap[username] = filename;
            res.json({ status: "Success", rola });
        } else {
            res.status(401).json({ message: "Niepoprawne dane logowania" });
        }
    });
});

app.get('/tables', (req, res) => {
    res.json([
        'zasysanie_oddymianie',
        'ssp',
        'niedrzewne_hydrauliczne',
        'hilti',
        'tryskaczowka_czerwone',
        'akumulatory_zasilacze_puszki'
    ]);
});

app.get('/columns/:table', (req, res) => {
    const table = req.params.table;
    db.all(`PRAGMA table_info(${table})`, [], (err, result) => {
        if (err) return res.status(500).json({ error: "Błąd pobierania kolumn" });
        res.json(result.map(col => col.name).filter(name => name !== 'id'));
    });
});

app.post('/product', (req, res) => {
    const { table, filters } = req.body;
    const keys = Object.keys(filters);
    const values = Object.values(filters);
    const whereClause = keys.map(k => `${k} = ?`).join(" AND ");
    const sql = `SELECT * FROM ${table} WHERE ${whereClause} LIMIT 1`;
    db.all(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: "Błąd pobierania produktu" });
        res.json(result[0]);
    });
});

app.post('/update-quantity', (req, res) => {
    const { table, id, quantityChange } = req.body;
    const sql = `UPDATE ${table} SET stan_magazynowy = stan_magazynowy + ? WHERE id = ?`;
    db.run(sql, [quantityChange, id], (err) => {
        if (err) return res.status(500).json({ error: "Błąd aktualizacji ilości" });
        res.json({ success: true });
    });
});

app.post('/values', (req, res) => {
    const { table, column, filters } = req.body;

    let sql = `SELECT DISTINCT ${column} FROM ${table}`;
    const filterKeys = Object.keys(filters).filter(key => filters[key]);
    const values = filterKeys.map(key => filters[key]);

    if (filterKeys.length > 0) {
        const whereClause = filterKeys.map(key => `${key} = ?`).join(' AND ');
        sql += ` WHERE ${whereClause}`;
    }

    sql += ` ORDER BY ${column}`;

    db.all(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: "Błąd pobierania wartości kolumny z filtrami" });
        res.json(result.map(row => row[column]));
    });
});

app.get('/low-stock', (req, res) => {
    const sql = `
        SELECT producent || ' ' || moc_volt_ah || ' ' || rodzaj || ' ' || typ_model AS opis, stan_magazynowy, stan_minimalny FROM akumulatory_zasilacze_puszki WHERE stan_magazynowy <= stan_minimalny
        UNION ALL
        SELECT model_rodzaj || ' ' || dlugosc AS opis, stan_magazynowy, stan_minimalny FROM hilti WHERE stan_magazynowy <= stan_minimalny
        UNION ALL
        SELECT rodzaj || ' ' || rozmiar_dn_cal || ' ' || rodzaj_stali AS opis, stan_magazynowy, stan_minimalny FROM niedrzewne_hydrauliczne WHERE stan_magazynowy <= stan_minimalny
        UNION ALL
        SELECT rodzaj || ' ' || typ_model || ' ' || nr_katalogowy AS opis, stan_magazynowy, stan_minimalny FROM ssp WHERE stan_magazynowy <= stan_minimalny
        UNION ALL
        SELECT producent || ' ' || rodzaj_typ || ' ' || wyjscie_cal || ' ' || rozmiar_dn_cal_mm AS opis, stan_magazynowy, stan_minimalny FROM tryskaczowka_czerwone WHERE stan_magazynowy <= stan_minimalny
        UNION ALL
        SELECT producent || ' ' || rodzaj || ' ' || typ_model AS opis, stan_magazynowy, stan_minimalny FROM zasysanie_oddymianie WHERE stan_magazynowy <= stan_minimalny;
    `;

    db.all(sql, (err, rows) => {
        if (err) return res.status(500).json({ error: "Błąd pobierania produktów" });
        res.json(rows);
    });
});

app.post('/all-products', (req, res) => {
    const { table } = req.body;
    if (!table) return res.status(400).json({ error: 'Brak tabeli' });
    db.all(`SELECT * FROM ${table}`, (err, result) => {
        if (err) return res.status(500).json({ error: "Błąd pobierania produktów" });
        res.json(result);
    });
});

app.post('/add-product', (req, res) => {
    const { table, data, username } = req.body;
    const keys = Object.keys(data);
    const values = Object.values(data);

    const sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})`;
    db.run(sql, values, function (err) {
        if (err) return res.status(500).json({ error: 'Błąd dodawania produktu' });

        const insertedRowId = this.lastID;

        const checkIdSql = `SELECT id FROM ${table} WHERE rowid = ?`;
        db.get(checkIdSql, [insertedRowId], (err2, row) => {
            if (err2) return res.status(500).json({ error: 'Błąd sprawdzania id' });

            if (!row || row.id == null) {
                // Pobierz największe istniejące ID
                db.get(`SELECT MAX(id) as maxId FROM ${table}`, [], (err3, maxResult) => {
                    if (err3) return res.status(500).json({ error: 'Błąd pobierania max id' });

                    const newId = (maxResult?.maxId || 0) + 1;
                    db.run(`UPDATE ${table} SET id = ? WHERE rowid = ?`, [newId, insertedRowId], (err4) => {
                        if (err4) return res.status(500).json({ error: 'Błąd przypisywania id' });

                        logAction(username, `Dodał produkt (id: ${newId}) do tabeli ${table}: ${JSON.stringify(data)}`);
                        res.json({ success: true, assignedId: newId });
                    });
                });
            } else {
                logAction(username, `Dodał produkt (id: ${row.id}) do tabeli ${table}: ${JSON.stringify(data)}`);
                res.json({ success: true, assignedId: row.id });
            }
        });
    });
});

app.post('/edit-product', (req, res) => {
    const { table, id, updates, username } = req.body;
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const sql = `UPDATE ${table} SET ${keys.map(k => `${k} = ?`).join(', ')} WHERE id = ?`;
    db.run(sql, [...values, id], function (err) {
        if (err) return res.status(500).json({ error: 'Błąd aktualizacji produktu' });
        logAction(username, `Edytował produkt ${id} w tabeli ${table}: ${JSON.stringify(updates)}`);
        res.json({ success: true });
    });
});

app.post('/delete-product', (req, res) => {
    const { table, id, username } = req.body;
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    db.run(sql, [id], function (err) {
        if (err) return res.status(500).json({ error: 'Błąd usuwania produktu' });
        logAction(username, `Usunął produkt ${id} z tabeli ${table}`);
        res.json({ success: true });
    });
});

app.post('/search-products', async (req, res) => {
    const { query } = req.body;
    const tables = ['zasysanie_oddymianie', 'ssp', 'niedrzewne_hydrauliczne', 'hilti', 'tryskaczowka_czerwone', 'akumulatory_zasilacze_puszki'];
    let results = [];

    for (const table of tables) {
        try {
            const columns = await new Promise((resolve, reject) => {
                db.all(`PRAGMA table_info(${table})`, [], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            const conditions = columns.map(col => `${col.name} LIKE ?`).join(' OR ');
            const values = Array(columns.length).fill(`%${query}%`);

            const rows = await new Promise((resolve, reject) => {
                db.all(`SELECT *, '${table}' AS table_name FROM ${table} WHERE ${conditions}`, values, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            results = results.concat(rows);
        } catch (err) {
            console.error(`Błąd w tabeli ${table}:`, err);
        }
    }

    res.json(results);
});

app.get('/distinct-values/:table/:column', (req, res) => {
    const { table, column } = req.params;
    const sql = `SELECT DISTINCT ${column} FROM ${table} WHERE ${column} IS NOT NULL ORDER BY ${column}`;
    db.all(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Błąd pobierania wartości kolumny" });
        res.json(result.map(row => row[column]));
    });
});

app.post('/filter-products', (req, res) => {
    const { table, filters } = req.body;

    const excluded = ['cena', 'stan_magazynowy', 'stan_minimalny'];
    const keys = Object.keys(filters).filter(key => filters[key] && !excluded.includes(key));
    const values = keys.map(key => `%${filters[key]}%`);

    let whereClause = '';
    if (keys.length > 0) {
        whereClause = 'WHERE ' + keys.map(key => `${key} LIKE ?`).join(' AND ');
    }

    const sql = `SELECT * FROM ${table} ${whereClause}`;
    db.all(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Błąd filtrowania produktów' });
        res.json(result);
    });
});

app.listen(8081, () => {
    console.log("Listening...");
});
