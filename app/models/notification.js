"use strict";

var _ = require("lodash"),
    mongoose = require("../data/db").mongoose,
    notificationTypes = require("../data/defaults/notification-types.json"),
    Schema = mongoose.Schema,
    schemaName = "Notification",
    notificationTypeIds = _.pluck(notificationTypes, "id");

var NotificationSchema = new Schema({
    user:       { type: Number, ref: "User", required: true },
    fromUser:   { type: Number, ref: "User", required: true },
    type:       { type: Number, enum: notificationTypeIds, required: true },
    itemId:     { type: Number, required: true },
    created:    { type: Date, default: Date.now },
    value:      { type: String },
    groupId:    { type: Number, required: true }
});

mongoose.model(schemaName, NotificationSchema);

module.exports = mongoose.model(schemaName);