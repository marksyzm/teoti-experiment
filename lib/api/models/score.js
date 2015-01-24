"use strict";

var mongoose = require("../data/db").mongoose,
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment"),
    schemaName = "Score";

autoIncrement.initialize(mongoose);

var ScoreSchema = new Schema({
    user            : { type: Number, ref: "User" },
    post            : { type: Number, ref: "Post" },
    created         : { type: Date, default: Date.now },
    amount          : { type: Number, default: 0 }
});

ScoreSchema.plugin(autoIncrement.plugin, { model: schemaName, startAt: 1 });
mongoose.model(schemaName, ScoreSchema);

module.exports = mongoose.model(schemaName);