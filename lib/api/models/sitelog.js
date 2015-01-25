"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Sitelog";

autoIncrement.initialize(mongoose);

var SitelogSchema = new Schema({
    user:       { type: Number, ref: "User", required: true },
    fromUser:   { type: Number, ref: "User", required: true },
    points:     { type: Number, required: true },
    message:    { type: String, required: true },
    created:    { type: Date, default: Date.now }
});

SitelogSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, SitelogSchema);

module.exports = mongoose.model(schemaName);