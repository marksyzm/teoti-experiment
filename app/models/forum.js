"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Forum";

autoIncrement.initialize(mongoose);

var ForumSchema = new Schema({
    parent          : { type: Number, ref: "Forum" },
    style           : { type: Number, ref: "Style" },
    title           : { type: String, trim: true, required: true },
    description     : { type: String, trim: true },
    icon            : { type: String, trim: true },
    hashTags        : { type: String, trim: true },
    groups          : [ { type: Number, ref: "Group" } ]
});

ForumSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, ForumSchema);

module.exports = mongoose.model(schemaName);