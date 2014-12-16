"use strict";

var _ = require("lodash"),
    mongoose = require("../data/db").mongoose,
    notificationTypes = require("../data/defaults/notification-types.json"),
    Schema = mongoose.Schema,
    schemaName = "Activity",
    notificationTypeIds = _.pluck(notificationTypes, "id");

var ActivitySchema = new Schema({
    user:           { type: Number, ref: "User", required: true },
    itemId:         { type: Number, required: true },
    forum:          { type: Number, ref: "Forum", required: true },
    method:         { type: String, enum: [ "create", "update", "delete" ], required: true, default: "create" },
    type:           { type: Number, enum: notificationTypeIds, required: true },
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

mongoose.model(schemaName, ActivitySchema);

module.exports = mongoose.model(schemaName);