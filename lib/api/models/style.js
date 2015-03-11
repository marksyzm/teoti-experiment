"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Style";

autoIncrement.initialize(mongoose);

var StyleSchema = new Schema({
    title:          { type: String, required: true, trim: true },
    user:           { type: Number, ref: "User" },
    version:        { type: Number, default: 0 },
    created:        { type: Date, default: Date.now },
    updated:        { type: Date, default: Date.now },
    values:         [ { type: Schema.Types.Mixed } ]
});

StyleSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, StyleSchema);

module.exports = mongoose.model(schemaName);