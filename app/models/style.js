"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    schemaName = "Style";

var StyleSchema = new Schema({
    title:          { type: String, required: true, trim: true },
    user:           { type: Number, ref: "User" },
    version:        { type: Number, default: 0 },
    created:        { type: Date, default: Date.now },
    updated:        { type: Date, default: Date.now },
    values: [ { type: Schema.Types.mixed } ]
});

mongoose.model(schemaName, StyleSchema);

module.exports = mongoose;