const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();
const chalk = require("chalk")
const CONFIG = require("../../config.json")

const tt = (task) => {
    switch (task) {
        case "CREATE_TABLE_USERS":
            return 'CREATE TABLE IF NOT EXISTS users (idUser INTEGER PRIMARY KEY AUTOINCREMENT, IdConnect TEXT, FirstName TEXT, LastName TEXT, token TEXT, rank TINYINT)'
        case "CREATE_TABLE_EXERCICES":
            return 'CREATE TABLE IF NOT EXISTS exercices (idExercice INTEGER PRIMARY KEY AUTOINCREMENT, accessPermitted BOOLEAN)'
        case "DELETE_TABLE_USERS":
            return "DELETE FROM users"
        case "DELETE_TABLE_EXERCICES":
            return "DELETE FROM exercices"
        case "INSERT_TABLE_USERS":
            return "INSERT INTO users(IdConnect, FirstName, LastName, token, rank) VALUES(?, ?, ?, ?, ?)"
        case "UPDATE_TABLE_USERS_TOKEN_BY_LASTNAME":
            return "UPDATE users WHERE LastName="
        case "SELECT_TABLE_USERS":
            return "SELECT * FROM users"
    }
    return null
}

module.exports = class Database {
    constructor(DatabaseName) {
        this.db = new sqlite3.Database(DatabaseName, (err) => {
            if (err) console.error(err.message);
            console.log(chalk.green(`[+] Connected to the Database: ${CONFIG.DB.NAME}`));
        });
        this.createTables();
        this.resetTables();
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

    generateIdConnect(FirstName) {
        return FirstName.charAt(0).toUpperCase() + FirstName.slice(1).toLowerCase() + Math.floor(Math.random() * 1001)
    }

    insert(FirstName, LastName, Rank) {
        setTimeout(() =>
            this.db.run(tt("INSERT_TABLE_USERS"), [this.generateIdConnect(FirstName), FirstName.charAt(0).toUpperCase() + FirstName.slice(1).toLowerCase(), LastName.charAt(0).toUpperCase() + LastName.slice(1).toLowerCase(), this.generateToken(), Rank]), 500)
    }

    resetTables() {
        setTimeout(() => {
            var Tasks = [
                tt("DELETE_TABLE_USERS")
            ]

            Tasks.forEach(e =>
                this.db.run(e))

            CONFIG.DB.USERS.forEach(user => this.insert(user.firstname, user.lastname, user.rank))
            this.db.all(tt("SELECT_TABLE_USERS"), [], (err, rows) => {
                if (err) throw err;
                rows.foreach(row => console.log(row))
            })
        }, 500)
    }

    createTables() {
        var Tasks = [
            tt("CREATE_TABLE_USERS"),
            tt("CREATE_TABLE_EXERCICES")
        ]
        Tasks.forEach(tableTask => {
            this.db.run(tableTask);
        });
    }

    updateTokens() {

    }

    closeDb() {
        this.db.close((err) => {
            if (err) console.error(err.message);
            console.log('Close the database connection.');
        });
    }
}