"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Thread";

autoIncrement.initialize(mongoose);

var ThreadSchema = new Schema({
    title           : { type: String, required: true, trim: true },
    type            : { type: Number, default: 0 },
    firstPost       : { type: Number, ref: "Post" },
    firstPostUser   : { type: Number, ref: "User" },
    lastPost        : { type: Number, ref: "Post" },
    lastPostUser    : { type: Number, ref: "User" },
    forum           : { type: Number, ref: "Forum" },
    created         : { type: Date, default: Date.now },
    replyCount      : { type: Number, default: 0 },
    viewCount       : { type: Number, default: 0 },
    open            : { type: Boolean, default: true },
    deleted         : { type: Boolean, default: false },
    sticky          : { type: Boolean, default: false },
    description     : { type: String, trim: true },
    related         : { type: String },
    thumbnail       : { type: String },
    score           : { type: Number, default: 0 },
    style           : { type: Number, ref: "Style" }
});

ThreadSchema.plugin(autoIncrement.plugin, schemaName);
mongoose.model(schemaName, ThreadSchema);

module.exports = mongoose;