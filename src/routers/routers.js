module.exports = class Routers {
    constructor(app) {
        app.get('/', function(req, res) { // création de la route sous le verbe get
            res.send('Hello Nigger  ! ') // envoi de hello world a l'utilisateur
        })
    }
}