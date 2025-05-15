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



app.listen(8081, ()=>{
    console.log("Listening...")
})