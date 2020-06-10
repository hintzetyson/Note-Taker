//Dependencies
var fs = require("fs");
var util = require("util");
var {v4: uuidv4} = require('uuid');

//Creating ID variable
var id = '';


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
        //Need to make a unique id for the note, check if they don't already have one
        if (req.body.id) {
            id = req.body.id;
        } else {
            //Creates ids for the notes
            id = uuidv4();
        };
        var note = {
            title: req.body.title,
            text: req.body.text,
            id: id
        };

        return asyncReadFile("./db/db.json", "utf8").then(function(result) {
            let jsonFile = JSON.parse(result);

            if (req.body.id) {

                for (let i=0; i > jsonFile.length; i++) {
                    if (json[i].id === note.id) {
                        var noteId = jsonFile.indexOf(jsonFile[i]);
                    }
                }
                jsonFile[noteIndex] = note;
            } else {
                jsonFile.push(note);
            }

            return asyncWriteFile("./db/db.json", JSON.stringify(result)).then(function() {
                return res.jsonFile(jsonFile)
            });
        
    }).catch(function(error) {
        throw error;
    })
    });



}