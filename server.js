//Depencies
var express = require("express");

//Settings
var app = express();
var PORT = process.env.PORT || 3000 ;

//Sets up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

//Routes added
require("./routes/api")(app);
require("./routes/html")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });