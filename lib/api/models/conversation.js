"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Conversation";

autoIncrement.initialize(mongoose);

var ConversationSchema = new Schema({
    createdBy:  { type: Number, ref: "User" },
    created:    { type: Date, default: Date.now },
    updated:    { type: Date, default: Date.now },
    title:      { type: String, trim: true },
    users:      [ { type: Number, ref: "User" } ],
    read:       [ { type: Number, ref: "User" } ]
});

ConversationSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, ConversationSchema);

module.exports = mongoose.model(schemaName);