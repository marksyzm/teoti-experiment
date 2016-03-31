"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Shout";

autoIncrement.initialize(mongoose);

var ShoutSchema = new Schema({
    user:       { type: Number, ref: "User" },
    forum:      { type: Number, ref: "Forum" },
    created:    { type: Date, default: Date.now },
    message:    { type: String, trim: true }
});

ShoutSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, ShoutSchema);

module.exports = mongoose.model(schemaName);