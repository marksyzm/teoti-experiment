"use strict";

var Joi = require("joi");

var validate = {
    authenticate: {
        username: Joi.isString().min(3).max(140),
        password: Joi.isString().min(3).max(255)
    }
};

module.exports = validate;