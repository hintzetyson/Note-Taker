//Depencies
var express = require("express");

//Settings
var app = express();
var PORT = process.env.PORT || 3000 ;

//Sets up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//