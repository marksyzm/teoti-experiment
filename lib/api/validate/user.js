"use strict";

var Joi = require("joi"),
    config = require("");

var validate = {
    authenticate: {
        username: Joi.isString().min(3).max(140),
        password: Joi.isString().min(3).max(255)
    }
};

module.exports = validate;