"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    config = require("../../shared/config"),
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Group";

autoIncrement.initialize(mongoose);

var GroupSchema = new Schema({
    name        : { type: String, trim: true, required: true },
    hierarchy   : { type: Number },
    pointLimit  : { type: Number, default: 10 },
    create      : {
        own     : [ { type: String, enum: config.get("permissions:types") } ],
        all     : [ { type: String, enum: config.get("permissions:types") } ]
    },
    read        : {
        own     : [ { type: String, enum: config.get("permissions:types") } ],
        all     : [ { type: String, enum: config.get("permissions:types") } ]
    },
    update      : {
        own     : [ { type: String, enum: config.get("permissions:types") } ],
        all     : [ { type: String, enum: config.get("permissions:types") } ]
    },
    "delete"    : {
        own     : [ { type: String, enum: config.get("permissions:types") } ],
        all     : [ { type: String, enum: config.get("permissions:types") } ]
    }
});

GroupSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, GroupSchema);

module.exports = mongoose.model(schemaName);