const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mazon"
})

app.post('/', (req, res) => {
    const { username, password } = req.body;
    console.log("Logowanie: ", username, password)
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Błąd SQL:", err);
            return res.status(500).json({ message: "Błąd serwera" });
        }

        if (results.length > 0) {
            const user = results[0];
            const rola = user.rola || 'warehouseman';
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
    db.query(`SHOW COLUMNS FROM \`${table}\``, (err, result) => {
        if (err) return res.status(500).json({ error: "Błąd pobierania kolumn" });
        res.json(result.map(col => col.Field).filter(col => col !== 'id'));

    });
});

app.post('/product', (req, res) => {
    const { table, filters } = req.body;
    const keys = Object.keys(filters);
    const values = Object.values(filters);
    const whereClause = keys.map(k => `\`${k}\` = ?`).join(" AND ");
    const sql = `SELECT * FROM \`${table}\` WHERE ${whereClause} LIMIT 1`;
    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: "Błąd pobierania produktu" });
        res.json(result[0]);
    });
});

app.post('/update-quantity', (req, res) => {
    const { table, id, quantityChange } = req.body;
    const sql = `UPDATE \`${table}\` SET stan_magazynowy = stan_magazynowy + ? WHERE id = ?`;
    db.query(sql, [quantityChange, id], (err, result) => {
        if (err) return res.status(500).json({ error: "Błąd aktualizacji ilości" });
        res.json({ success: true });
    });
});

app.post('/values', (req, res) => {
    const { table, column, filters } = req.body;

    let sql = `SELECT DISTINCT \`${column}\` FROM \`${table}\``;
    const filterKeys = Object.keys(filters).filter(key => filters[key]); // tylko uzupełnione
    const values = filterKeys.map(key => filters[key]);

    if (filterKeys.length > 0) {
        const whereClause = filterKeys.map(key => `\`${key}\` = ?`).join(' AND ');
        sql += ` WHERE ${whereClause}`;
    }

    sql += ` ORDER BY \`${column}\``;

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: "Błąd pobierania wartości kolumny z filtrami" });
        res.json(result.map(row => row[column]));
    });
});


app.get('/low-stock', (req, res) => {
    const sql = `
        SELECT  
               CONCAT_WS(' ', producent, moc_volt_ah, rodzaj, typ_model) AS opis, 
               stan_magazynowy, stan_minimalny
        FROM akumulatory_zasilacze_puszki 
        WHERE stan_magazynowy <= stan_minimalny

        UNION ALL

        SELECT  
               CONCAT_WS(' ', model_rodzaj, dlugosc) AS opis, 
               stan_magazynowy, stan_minimalny
        FROM hilti 
        WHERE stan_magazynowy <= stan_minimalny

        UNION ALL

        SELECT  
               CONCAT_WS(' ', rodzaj, rozmiar_dn_cal, rodzaj_stali) AS opis, 
               stan_magazynowy, stan_minimalny
        FROM niedrzewne_hydrauliczne 
        WHERE stan_magazynowy <= stan_minimalny

        UNION ALL

        SELECT 
               CONCAT_WS(' ', rodzaj, typ_model, nr_katalogowy) AS opis, 
               stan_magazynowy, stan_minimalny
        FROM ssp 
        WHERE stan_magazynowy <= stan_minimalny

        UNION ALL

        SELECT 
               CONCAT_WS(' ', producent, rodzaj_typ, wyjscie_cal, rozmiar_dn_cal_mm) AS opis, 
               stan_magazynowy, stan_minimalny
        FROM tryskaczowka_czerwone 
        WHERE stan_magazynowy <= stan_minimalny

        UNION ALL

        SELECT 
               CONCAT_WS(' ', producent, rodzaj, typ_model) AS opis, 
               stan_magazynowy, stan_minimalny
        FROM zasysanie_oddymianie 
        WHERE stan_magazynowy <= stan_minimalny;
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            console.error("Błąd zapytania:", err);
            return res.status(500).json({ error: "Błąd pobierania produktów" });
        }
        res.json(rows);
    });
});

app.post('/all-products', (req, res) => {
    const { table } = req.body;
    if (!table) return res.status(400).json({ error: 'Brak tabeli' });
    db.query(`SELECT * FROM \`${table}\``, (err, result) => {
        if (err) return res.status(500).json({ error: "Błąd pobierania produktów" });
        res.json(result);
    });
});

app.post('/add-product', (req, res) => {
    const { table, data } = req.body;
    if (!table || !data || typeof data !== 'object') {
        return res.status(400).json({ error: 'Brak danych lub tabela nieprawidłowa' });
    }

    const keys = Object.keys(data);
    const values = Object.values(data);

    const sql = `INSERT INTO \`${table}\` (${keys.map(k => `\`${k}\``).join(',')}) VALUES (${keys.map(() => '?').join(',')})`;
    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Błąd dodawania produktu' });
        res.json({ success: true });
    });
});

app.post('/edit-product', (req, res) => {
    const { table, id, updates } = req.body;
    if (!table || !id || !updates || typeof updates !== 'object') {
        return res.status(400).json({ error: 'Brak danych do aktualizacji' });
    }

    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const sql = `UPDATE \`${table}\` SET ${keys.map(key => `\`${key}\` = ?`).join(', ')} WHERE id = ?`;

    db.query(sql, [...values, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Błąd aktualizacji produktu' });
        res.json({ success: true });
    });
});

app.post('/delete-product', (req, res) => {
    const { table, id } = req.body;
    if (!table || !id) return res.status(400).json({ error: 'Brak danych do usunięcia' });

    db.query(`DELETE FROM \`${table}\` WHERE id = ?`, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Błąd usuwania produktu' });
        res.json({ success: true });
    });
});


app.listen(8081, ()=>{
    console.log("Listening...")
})