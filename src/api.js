const Database = require("./database/bdd.js");
const Routers = require("./routers/routers.js"); // ICI ON FAIT LES IP ROUTES
const express = require('express');
const CONFIG = require("./../config.json");
const chalk = require("chalk")

class API {
    constructor() {
        // Initialisation 
        this.app = express();
        this.port = 8080;
        this.Routers = new Routers(this.app);
        this.db = new Database(CONFIG.DB.NAME);

        // Ouverture du port
        this.app.listen(this.port, () => {
            console.log(chalk.green('[+] Executed on port : ' + this.port))
        })
    }
}

Execute = () => {
    console.log(chalk.green(
        `   
        *********************************************************************************
        *               ` + chalk.red(`${CONFIG.APP.NAME} v${CONFIG.APP.VERSION} - Created by ${CONFIG.APP.AUTHORS.NAME}`) + `                 *
        *               ` + chalk.red(`        ${CONFIG.APP.AUTHORS.STATUS}`) + `                       *
        *********************************************************************************
        `
    ))
    return new API();
}

module.exports = API = Execute()