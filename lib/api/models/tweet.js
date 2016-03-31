"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    schemaName = "Tweet";

var TweetSchema = new Schema({
    status:     { type: String, trim: true },
    forum:      { type: Number, ref: "Forum" },
    url:        { type: String }
});

mongoose.model(schemaName, TweetSchema);

module.exports = mongoose.model(schemaName);