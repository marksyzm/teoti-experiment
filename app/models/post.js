"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Post";

autoIncrement.initialize(mongoose);

var PostSchema = new Schema({
    title           : { type: String, required: true, trim: true },
    html            : { type: String, trim: true, required: true },
    bbcode          : { type: String, trim: true, required: true },
    thread          : { type: Number, ref: "Thread" },
    user            : { type: Number, ref: "User" },
    replyTo         : { type: Number, ref: "Post" },
    deleted         : { type: Boolean, default: false },
    pointLock       : { type: Boolean, default: false },
    score           : { type: Number, default: false },
    created         : { type: Date, default: Date.now },
    updated         : { type: Date, default: Date.now }
});

PostSchema.plugin(autoIncrement.plugin, schemaName);
mongoose.model(schemaName, PostSchema);

module.exports = mongoose;