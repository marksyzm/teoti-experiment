"use strict";

var Joi = require("joi");
var config = require("../../shared/config");
var limits = Object.keys(config.get("limit"));

var validate = {
    all: {
        query: {
            forum: Joi.number().integer().min(-1),
            limit: Joi.string().valid(limits).default("default")
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