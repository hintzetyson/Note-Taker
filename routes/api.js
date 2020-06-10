// Dependencies
var fs = require('fs');
var {v4: uuidv4} = require('uuid');
const util = require("util");

// Reading and writing variables
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// ID
var id = '';

// app function
module.exports = function(app) {
    // Get the json
    app.get('/api/notes', function(req, res) {
        readFileAsync('./db/db.json', 'utf8').then(i => {
            let item = JSON.parse(i);

            return res.json(item)
        })
    });

    // Post to the JSON api
    app.post('/api/notes', function(req, res) {

        // If the req comes back with an id then id will be set to that id
        if (req.body.id) {
            id = req.body.id;
        } else {

            // Create a new ID
            id = uuidv4();
        }

        // Save the note
        var note = {
            title: req.body.title,
            text: req.body.text,
            id: id
        };

        // Write the new note to the JSON
        return readFileAsync('./db/db.json', 'utf8').then(jsonRes => {
            let json = JSON.parse(jsonRes);
            
                json.push(note);
           

            return writeFileAsync('./db/db.json', JSON.stringify(json)).then(function () {
                return res.json(json);
            });
        }).catch(error => {
            throw error;
        });
    });

    // Delete a note
    app.delete('/api/notes/:id', function(req, res) {
        // Grab that note
        let idToDelete = req.params.id;

        // Read the database file
        readFileAsync('./db/db.json', 'utf8').then(file => {
            // Parse the file into JSON
            let returnedJson = JSON.parse(file);

            // Find the one with the matching ID
            for (let i = 0; i < returnedJson.length; i++) {
                if (returnedJson[i].id === idToDelete) {
                    var deleteNote = returnedJson[i].id;
                }
            }

            // Filter out the note with the matching id
            let newJson = returnedJson.filter(function(item) {
                return item.id !== deleteNote;
            });

            // Overwrite the saved JSON
            fs.writeFileSync('./db/db.json', JSON.stringify(newJson));

            // Send back status 200
            res.json({ok: true});
        })
    })
}