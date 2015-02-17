"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Forum";

autoIncrement.initialize(mongoose);

var ForumSchema = new Schema({
    parent          : { type: Number, ref: "Forum", required: true },
    parentList      : [ { type: Number, ref: "Forum" } ],
    style           : { type: Number, ref: "Style", default: 0 },
    title           : { type: String, trim: true, required: true },
    slug            : { type: String, trim: true, required: true },
    description     : { type: String, trim: true },
    icon            : { type: String, trim: true },
    hashTags        : { type: String, trim: true },
    groups          : [ { type: Number, ref: "Group" } ],
    public          : { type: Boolean, default: false }
});

ForumSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, ForumSchema);

module.exports = mongoose.model(schemaName);