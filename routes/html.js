//Dependencies
var path = require("path");

//Function for HTML route
function app() {
    app.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    });
}

module.exports = app()