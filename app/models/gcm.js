"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    schemaName = "Gcm";

var GcmSchema = new Schema({
    gcmId:      { type: String },
    user:       { type: Number, ref: "User" },
    created:    { type: Date, ref: Date.now },
    updated:    { type: Date, ref: Date.now }
});

mongoose.model(schemaName, GcmSchema);

module.exports = mongoose.model(schemaName);