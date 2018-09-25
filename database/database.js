const mysql = require('mysql');

// create connection to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

db.connect(err => {
    if (err) throw err;
    console.log('mysql connected');
});

module.exports = db;