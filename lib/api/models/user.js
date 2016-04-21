"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "User";

autoIncrement.initialize(mongoose);

var UserSchema = new Schema({
    group           : { type: Number, ref: "Group" },
    username        : { type: String, trim: true },
    title           : { type: String, trim: true },
    password        : { type: String, select: false },
    passwordDate    : { type: Date, default: Date.now },
    salt            : { type: String },
    algorithm       : { type: String, default: "md5" },
    email           : { type: String, trim: true },
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
    slug            : { type: String },
    limitPoints     : { type: Number, default: 10 },
    active          : { type: Boolean, default: false },
    activationCode  : { type: String },
    resetPassword   : { type: Boolean, default: true },
    special:    { type: String, enum: [ "hot", "random", "sticky", "scores" ], default: "hot" },
    view:       { type: String, enum: [ "simple", "compact", "stream" ], default: "simple" },
    wysiwyg:    { type: Boolean, default: false }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

UserSchema.virtual("url").get(function () {
    return "members/" + this.slug + ".html";
});

UserSchema.virtual("avatarUrl").get(function () {
    return "img/avatar/" + this.avatar;
});

UserSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, UserSchema);
const model = mongoose.model(schemaName);
model.ownerKey = '_id';

module.exports = model;
