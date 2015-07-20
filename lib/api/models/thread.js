"use strict";

var mongoose = require("../data/db").mongoose;
var Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");
var random = require("mongoose-random");
var schemaName = "Thread";

autoIncrement.initialize(mongoose);

var ThreadSchema = new Schema({
    title           : { type: String, required: true, trim: true },
    type            : { type: String, enum: [ "blog" ] },
    firstPost       : { type: Number, ref: "Post" },
    firstPostUser   : { type: Number, ref: "User" },
    lastPost        : { type: Number, ref: "Post" },
    lastPostUser    : { type: Number, ref: "User" },
    forum           : { type: Number, ref: "Forum" },
    updated         : { type: Date, default: Date.now },
    created         : { type: Date, default: Date.now },
    replyCount      : { type: Number, default: 0 },
    viewCount       : { type: Number, default: 0 },
    open            : { type: Boolean, default: true },
    deleted         : { type: Boolean, default: false },
    sticky          : { type: Boolean, default: false },
    description     : { type: String, trim: true },
    related         : { type: String },
    media           : { type: String },
    thumbnail       : { type: String },
    score           : { type: Number, default: 0 },
    style           : { type: Number, ref: "Style" },
    subscribers     : [ { type: Number, ref: "User" } ]
});

ThreadSchema.set("autoIndex", true);
ThreadSchema.index({ created: -1 });

ThreadSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
ThreadSchema.plugin(random);
mongoose.model(schemaName, ThreadSchema);

module.exports = mongoose.model(schemaName);