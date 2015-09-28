"use strict";

var mongoose = require("../data/db").mongoose;
var Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");
var schemaName = "Forum";

autoIncrement.initialize(mongoose);

var ForumSchema = new Schema({
    parent          : { type: Number, ref: "Forum", required: true },
    parents         : [ { type: Number, ref: "Forum" } ],
    children        : [ { type: Number, ref: "Forum" } ],
    style           : { type: Number, ref: "Style", default: 0 },
    order           : { type: Number, default: 0 },
    title           : { type: String, trim: true, required: true },
    slug            : { type: String, trim: true, required: true },
    description     : { type: String, trim: true },
    icon            : { type: String, trim: true },
    hashTags        : { type: String, trim: true },
    groups          : [ { type: Number, ref: "Group" } ],
    autoSubscribe   : [ { type: Number, ref: "Group" } ],
    public          : { type: Boolean, default: false },
    override        : { type: Boolean, default: false },
    createThread    : { type: Boolean, default: true },
    nsfw            : { type: Boolean, default: false }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

ForumSchema.virtual("url").get(function () {
    return this.slug + "/";
});

ForumSchema.virtual("iconUrl").get(function () {
    return "img/icons/forum/"+ this._id + ".png";
});

ForumSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, ForumSchema);

module.exports = mongoose.model(schemaName);