"use strict";

var Joi = require("joi");
var _ = require("lodash");
var config = require("../../shared/config");
var allowedDateLimits = config.get("dateLimits");

var allowedDateLimitValues = _.pluck(allowedDateLimits, "value");
var limits = Object.keys(config.get("limit"));
var sorts = config.get("sort:thread");

var validate = {
    all: {
        params: {
            id:             Joi.string().regex(/[^\s]/).required(),
        },
        query: {
            sticky:         Joi.boolean().default(false),
            page:           Joi.number().integer().min(1).default(1),
            sort:           Joi.string().valid(sorts).default(sorts && sorts.length ? sorts[0] : "-created"),
            limit:          Joi.string().valid(limits).default("default"),
            dateLimit:      Joi.number().valid(allowedDateLimitValues)
        }
    },
    get: {
        params: {
            id:             Joi.string().regex(/[^\s]/).required(),
            threadId:       Joi.number().integer().min(0).required()
        }
    },
    del: {
        params: {
            id:             Joi.number().integer().min(0).required()
        }
    },
    post: {
        payload: {

        }
    },
    put: {
        params: {
            id:             Joi.number().integer().min(0).required()
        },
        payload: {

        }
    }
};

module.exports = validate;