"use strict";

var Joi = require("joi");

var validate = {
    all: {
        params: {
            id:             Joi.string().regex(/[^\s]/).required(),
        },
        query: {
            sticky:         Joi.boolean().default(false),
            created:        Joi.object().keys({
                $gte:        Joi.date()
            }).optional(),
            page:           Joi.number().integer().min(1).default(1),
            sort:           Joi.string().valid([ "created", "updated", "score", "random"]).default("created"),
            limit:          Joi.string().valid([ "main", "navigation" ]).default("main"),
            dateLimit:      Joi.number().integer().min(1)
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