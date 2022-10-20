const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();

module.exports = class Database {
    tableTasks = [
        'CREATE TABLE IF NOT EXISTS users (idUser INTEGER PRIMARY KEY AUTOINCREMENT, FirstName TEXT, LastName TEXT, token TEXT)',
        'CREATE TABLE IF NOT EXISTS exercices (idExercice INTEGER PRIMARY KEY AUTOINCREMENT, accessPermitted BOOLEAN)'
    ]

    constructor(DatabaseName) {
        this.db = new sqlite3.Database(DatabaseName, (err) => {
            if (err) console.error(err.message);
            console.log('Connected to the database.');
        });
        this.createTables();
    }
    selectToken(token) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM users WHERE token = ?', [token], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }
    generateToken() {
        return crypto.randomBytes(64).toString('hex');
    }

    insert(FirstName, LastName) {
        setTimeout(() =>
            this.db.run('INSERT INTO users(FirstName,LastName, token) VALUES(?, ?, ?)', [FirstName.charAt(0).toUpperCase() + FirstName.slice(1).toLowerCase(), LastName.charAt(0).toUpperCase() + LastName.slice(1).toLowerCase(), this.generateToken()]), 500)
    }
    createTables() {
        this.tableTasks.forEach(tableTask => {
            this.db.run(tableTask);
        });
    }

    closeDb() {
        this.db.close((err) => {
            if (err) console.error(err.message);
            console.log('Close the database connection.');
        });
    }
}