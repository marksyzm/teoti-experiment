"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    schemaName = "Conversation";

var ConversationSchema = new Schema({
    createdBy:  { type: Number, ref: "User" },
    created:    { type: Date, default: Date.now },
    updated:    { type: Date, default: Date.now },
    title:      { type: String, required: true, trim: true },
    users:      [ { type: Number, ref: "User" } ],
    read:       [ { type: Number, ref: "User" } ]
});

mongoose.model(schemaName, ConversationSchema);

module.exports = mongoose;