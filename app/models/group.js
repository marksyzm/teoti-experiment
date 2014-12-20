"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Group";

var GroupSchema = new Schema({
    thread: {
        own: { type: Boolean, default: false },
        all: { type: Boolean, default: false }
    },
    post: {
        own: { type: Boolean, default: false },
        all: { type: Boolean, default: false }
    },
    conversation: {
        own: { type: Boolean, default: false },
        all: { type: Boolean, default: false }
    },
    message: {
        own: { type: Boolean, default: false },
        all: { type: Boolean, default: false }
    },
    users: {
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        create: { type: Boolean, default: false }
    }
});

GroupSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, GroupSchema);

module.exports = mongoose.model(schemaName);