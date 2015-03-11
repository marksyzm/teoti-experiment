"use strict";

var mongoose = require("mongoose"),
    config = require("../config/index");

var db = mongoose.connection.open(config.get("mongo:url"));

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function callback() {
    console.log("Connection with database successful.");
});

exports.mongoose = mongoose;
exports.db = db;

//initialise all models
require("../models");