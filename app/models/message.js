"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    schemaName = "Conversation";

var ConversationSchema = new Schema({
    user:           { type: Number, ref: "User" },
    conversation:   { type: Number, ref: "Conversation" },
    created:        { type: Date, default: Date.now },
    bbcode:         { type: String, required: true, trim: true },
    html:           { type: String, required: true, trim: true }
});

mongoose.model(schemaName, ConversationSchema);

module.exports = mongoose.model(schemaName);