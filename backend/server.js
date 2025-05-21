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
        res.json(result.map(col => col.Field).filter(col => col !== 'id' && col !== 'stan_magazynowy' && col !== 'stan_minimalny' && col !== 'cena'));
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




app.listen(8081, ()=>{
    console.log("Listening...")
})