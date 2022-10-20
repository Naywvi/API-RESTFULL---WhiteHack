const { Redirect404 } = require("./../request/request.js");

module.exports = class Routers {
    constructor(app) {

        app.get('/api', function(req, res) {
            res.json('Hello Nigger  ! ')
        })

        app.get('/api/exercices/:Token/:idExercice', function(req, res) {
            res.send('Hello Nigger  ! ')
            console.log(req.params.idExercice + " " + req.params.Token)
            if (typeof req.params.idExercice === 'number') console.log(req.params.idExercice)
        })

        app.get('/api/auth', function(req, res) {
            res.json('Hello Nigger  ! ')
        })

        app.get('*', function(req, res) {
            Redirect404(req, res)
        });
    }
}