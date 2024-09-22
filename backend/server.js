const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'signup_v2'
});

app.post('/register', (req, res) => {
    const sql = 'INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)';

    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        console.log(data);
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ? AND password = ?';

    const values = [
        req.body.email,
        req.body.password
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Invalid credentials");
        }
    });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});