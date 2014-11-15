"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    schemaName = "Shout";

var ShoutSchema = new Schema({
    user:       { type: Number, ref: "User" },
    forum:      { type: Number, ref: "Forum" },
    created:    { type: Date, default: Date.now },
    message:    { type: String, required: true, trim: true }
});

mongoose.model(schemaName, ShoutSchema);

module.exports = mongoose;