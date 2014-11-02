"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    schemaName = "Score";

var ScoreSchema = new Schema({
    user            : { type: Number, ref: "User" },
    post            : { type: Number, ref: "Post" },
    created         : { type: Date, default: Date.now },
    amount          : { type: Number, default: 0 },
    like            : { type: Boolean, default: false }
});

mongoose.model(schemaName, ScoreSchema);

module.exports = mongoose;