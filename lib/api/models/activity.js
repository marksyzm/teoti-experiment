"use strict";

var _ = require("lodash"),
    mongoose = require("../data/db").mongoose,
    autoIncrement = require("mongoose-auto-increment"),
    notificationTypes = require("../data/defaults/notification-types.json"),
    Schema = mongoose.Schema,
    schemaName = "Activity",
    notificationTypeNames = _.pluck(notificationTypes, "name");

autoIncrement.initialize(mongoose);

var ActivitySchema = new Schema({
    user:           { type: Number, ref: "User" },
    itemId:         { type: Number },
    forum:          { type: Number, ref: "Forum" },
    method:         { type: String, enum: [ "create", "update", "delete" ], default: "create" },
    type:           { type: String, enum: notificationTypeNames },
    created:        { type: Date, default: Date.now },
    value:          { type: String },
    ip:             { type: String },
    browser:        { type: String },
    browserVersion: { type: String },
    os:             { type: String },
    osVersion:      { type: String },
    sessionId:      { type: String },
    script:         { type: String },
    line:           { type: Number }
});

ActivitySchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, ActivitySchema);

module.exports = mongoose.model(schemaName);