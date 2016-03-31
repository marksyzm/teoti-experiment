"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    schemaName = "Star";

var StarSchema = new Schema({
    user:       { type: Number, ref: "User" },
    created:    { type: Date, default: Date.now },
    type:       { type: String, enum: [ "post", "thread" ] },
    itemId:     { type: Number },
});

mongoose.model(schemaName, StarSchema);

module.exports = mongoose.model(schemaName);