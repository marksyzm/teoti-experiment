"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    schemaName = "Tweet";

var TweetSchema = new Schema({
    status:     { type: String, required: true, trim: true },
    forum:      { type: Number, ref: "Forum", required: true },
    url:        { type: String, required: true }
});

mongoose.model(schemaName, TweetSchema);

module.exports = mongoose.model(schemaName);