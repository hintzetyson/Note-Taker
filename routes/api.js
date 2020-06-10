//Dependencies
var fs = require("fs");
var util = require("util");


//Reading and writing files
const asyncReadFile = util.promisify(fs.readFile);
const asyncWriteFile = util.promisify(fs.writeFile);

//App function
function program() {

    //Get the notes
    app.get("api/notes", function(req, res ) {
        asyncReadFile("./db/db.json", "utf8").then(function(result) {
            let item = JSON.parse(result);

            return res.json(item)
        })
        });

    //Post the notes
    app.post("/api/notes", function (req, res) {
        var note = {
            title: req.body.title,
            text: req.body.text,
            id: id;
        }
    })
}