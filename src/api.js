const Database = require("./database/bdd.js");
const Routers = require("./routers/routers.js"); // ICI ON FAIT LES IP ROUTES
const express = require('express');

module.exports = class API {
    constructor() {
        // Initialisation 
        this.app = express();
        this.port = 8080;
        this.Routers = new Routers(this.app);
        this.db = new Database("WhiteHack.db");

        // Ouverture du port
        this.app.listen(this.port, () => {
            console.log('The api is perfectly executed on the port : ' + this.port)
        })
    }
}