"use strict";

var Joi = require("joi");

var validate = {
    authenticate: {
        payload: {
            username: Joi.string().min(3).max(80).regex(/[^\s]/),
            password: Joi.string().min(3).max(255)
        }
    }
};

module.exports = validate;