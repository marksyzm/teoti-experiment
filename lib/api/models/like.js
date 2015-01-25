"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Like";

autoIncrement.initialize(mongoose);

var LikeSchema = new Schema({
    user            : { type: Number, ref: "User" },
    post            : { type: Number, ref: "Post" },
    created         : { type: Date, default: Date.now },
    amount          : { type: Number, default: 1 }
});

LikeSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, LikeSchema);

module.exports = mongoose.model(schemaName);