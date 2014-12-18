"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Conversation";

var MessageSchema = new Schema({
    user:           { type: Number, ref: "User" },
    conversation:   { type: Number, ref: "Conversation" },
    created:        { type: Date, default: Date.now },
    bbcode:         { type: String, required: true, trim: true },
    html:           { type: String, required: true, trim: true }
});

MessageSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, MessageSchema);

module.exports = mongoose.model(schemaName);