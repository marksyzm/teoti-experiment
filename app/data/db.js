"use strict";

var mongoose = require("mongoose"),
    config = require("../config");

mongoose.connection.open(config.get("mongo:url"));