"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "User";

autoIncrement.initialize(mongoose);

var UserSchema = new Schema({
    group           : { type: Number, ref: "Group" },
    username        : { type: String, trim: true, required: true },
    title           : { type: String, trim: true },
    password        : { type: String, required: true },
    passwordDate    : { type: Date, default: Date.now },
    salt            : { type: String },
    email           : { type: String, trim: true, required: true },
    style           : { type: Number, ref: "Style" },
    joined          : { type: Date, default: Date.now },
    lastVisited     : { type: Date, default: Date.now },
    lastActivity    : { type: Date, default: Date.now },
    lastPost        : { type: Date, default: Date.now },
    birthday        : { type: Date },
    posts           : { type: Number, default: 0 },
    threads         : { type: Number, default: 0 },
    notifications   : { type: Number, default: 0 },
    messages        : { type: Number, default: 0 },
    messagesUnread  : { type: Number, default: 0 },
    timezoneOffset  : { type: Number, default: 0 },
    avatar          : { type: String },
    location        : { type: String, trim: true },
    score           : { type: Number, default: 0 },
    totalScore      : { type: Number, default: 0 },
    usernameUrl     : { type: String },
    active          : { type: Boolean },
    activationCode  : { type: String },
    settings: {
        view:       { type: String, enum: [ "simple", "compact", "stream" ], default: "simple" },
        wysiwyg:    { type: Boolean, default: false }
    }
});

UserSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, UserSchema);

module.exports = mongoose.model(schemaName);