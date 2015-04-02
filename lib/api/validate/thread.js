"use strict";

var Joi = require("joi");

var validate = {
    all: {
        params: {
            id:             Joi.string().regex(/[^\s]/).required()
        },
        query: {
            page:           Joi.number().integer().min(1).default(1),
            sort:           Joi.string().valid([ "created", "updated" ]).default("created")
        }
    },
    get: {
        params: {
            id:             Joi.alternatives().try(
                                Joi.number().integer().min(0),
                                Joi.string().regex(/[^\s]/)
                            ).required()
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