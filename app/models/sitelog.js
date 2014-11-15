"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    schemaName = "Sitelog";

var SitelogSchema = new Schema({
    user:       { type: Number, ref: "User", required: true },
    fromUser:   { type: Number, ref: "User", required: true },
    points:     { type: Number, required: true },
    message:    { type: String, required: true },
    created:    { type: Date, default: Date.now }
});

mongoose.model(schemaName, SitelogSchema);

module.exports = mongoose;