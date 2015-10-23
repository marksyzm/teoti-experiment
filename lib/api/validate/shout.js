"use strict";

var Joi = require("joi");

var config = require("../../shared/config");

var validate = {
    all: {
        query: {
            forum: Joi.integer().min(-1)
        }
    },
    get: {
        params: {
            id: Joi.number().integer().min(1).required()
        }
    },
    del: {
        params: {
            id: Joi.number().integer().min(1).required()
        }
    },
    post: {
        payload: {
            message: Joi.string().max(1024).required()
        }
    },
    put: {
        params: {
            id: Joi.number().integer().min(1).required()
        },
        payload: {
            message: Joi.string().max(1024).required()
        }
    }
};

module.exports = validate;