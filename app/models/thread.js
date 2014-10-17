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
    forum           : { type: Number, ref: "Forum" },
    open            : { type: Boolean, required: true, default: true },
    replyCount      : { type: Number, default: 0 }
});

ThreadSchema.plugin(autoIncrement.plugin, schemaName);
mongoose.model(schemaName, ThreadSchema);

module.exports = mongoose;
