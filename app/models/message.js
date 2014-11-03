"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    schemaName = "Conversation";

var ConversationSchema = new Schema({
    user:           { type: Number, ref: "User" },
    conversation:   { type: Number, ref: "Conversation" },
    created:        { type: Date, ref: Date.now },
    bbcode:         { type: String, required: true, trim: true },
    html:           { type: String, required: true, trim: true }
});

mongoose.model(schemaName, ConversationSchema);

module.exports = mongoose;