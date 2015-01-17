"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Post";

autoIncrement.initialize(mongoose);

var PostSchema = new Schema({
    title           : { type: String, trim: true },
    html            : { type: String, trim: true },
    bbcode          : { type: String, trim: true, required: true },
    thread          : { type: Number, ref: "Thread" },
    user            : { type: Number, ref: "User" },
    parent          : { type: Number, ref: "Post" },
    deleted         : { type: Boolean, default: false },
    pointLock       : { type: Boolean, default: false },
    score           : { type: Number, default: 0 },
    created         : { type: Date, default: Date.now },
    updated         : { type: Date, default: Date.now }
});

PostSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, PostSchema);

module.exports = mongoose.model(schemaName);