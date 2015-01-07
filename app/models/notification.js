"use strict";

var _ = require("lodash"),
    mongoose = require("../data/db").mongoose,
    notificationTypes = require("../data/defaults/notification-types.json"),
    Schema = mongoose.Schema,
    schemaName = "Notification",
    autoIncrement = require("mongoose-auto-increment"),
    notificationTypeNames = _.pluck(notificationTypes, "name");

autoIncrement.initialize(mongoose);

var NotificationSchema = new Schema({
    user:       { type: Number, ref: "User", required: true },
    fromUsers:  [ { type: Number, ref: "User", required: true } ],
    type:       { type: String, enum: notificationTypeNames, required: true },
    itemId:     { type: Number, required: true },
    created:    { type: Date, default: Date.now },
    value:      { type: String },
    read:       { type: Boolean, default: false }
});

NotificationSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, NotificationSchema);

module.exports = mongoose.model(schemaName);