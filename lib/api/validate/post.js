"use strict";

var Joi = require("joi");
var config = require("../../shared/config");

var limits = Object.keys(config.get("limit"));
var sorts = config.get("sort:post");

var validate = {
    all: {
        params: {
            id:             Joi.string().regex(/[^\s]/).required(),
            threadId:       Joi.number().integer().min(0).required()
        },
        query: {
            firstPostId:    Joi.number().integer().min(1).required(),
            page:           Joi.number().integer().min(1),
            sort:           Joi.string().valid(sorts).default(sorts && sorts.length ? sorts[0] : "created"),
            limit:          Joi.string().valid(limits).default("default")
        }
    },
    get: {
        params: {
            id:             Joi.string().regex(/[^\s]/).required(),
            threadId:       Joi.number().integer().min(0).required(),
            postId:         Joi.number().integer().min(0).required()
        }
    },
    del: {
        params: {
            id:             Joi.string().regex(/[^\s]/).required(),
            threadId:       Joi.number().integer().min(0).required(),
            postId:         Joi.number().integer().min(0).required()
        }
    },
    post: {
        params: {
            id:             Joi.string().regex(/[^\s]/).required(),
            threadId:       Joi.number().integer().min(0).required(),
            postId:         Joi.number().integer().min(0).required()
        },
        payload: {

        }
    },
    put: {
        params: {
            id:             Joi.string().regex(/[^\s]/).required(),
            threadId:       Joi.number().integer().min(0).required(),
            postId:         Joi.number().integer().min(0).required()
        },
        payload: {

        }
    }
};

module.exports = validate;