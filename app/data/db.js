"use strict";

var mongoose = require("mongoose"),
    config = require("../config");

var db = mongoose.connection.open(config.get("mongo:url"));

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.mongoose = mongoose;
exports.db = db;