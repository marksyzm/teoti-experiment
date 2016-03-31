"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    schemaName = "Bbcode";

var BbcodeSchema = new Schema({
    title           : { type: String },
    description     : { type: String },
    code            : { type: String },
    display         : { type: String, enum: [ "inline", "block" ], default: "inline" },
    callback        : { type: String }
});

mongoose.model(schemaName, BbcodeSchema);

module.exports = mongoose.model(schemaName);