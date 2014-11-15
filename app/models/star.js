"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    schemaName = "Star";

var StarSchema = new Schema({
    user:       { type: Number, ref: "User", required: true },
    created:    { type: Date, default: Date.now },
    type:       { type: String, required: true, enum: [ "post", "thread" ] },
    itemId:     { type: Number, required: true },
});

mongoose.model(schemaName, StarSchema);

module.exports = mongoose;