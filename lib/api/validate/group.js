"use strict";

var Joi = require("joi");

var config = require("../../shared/config");
var stringValidator = Joi.string().valid(config.get("permissions:types"));
var arrayStringValidator = Joi.array().includes(stringValidator);

var validate = {
    all: {
        /*query: {
            username: Joi.string().min(3).max(80).regex(/[^\s]/),
            password: Joi.string().min(3).max(255)
        }*/
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
            name: Joi.string().max(80).required(),
            hierarchy: Joi.number().integer().min(0),
            pointLimit: Joi.number().integer().min(0),
            create: {
                own: arrayStringValidator,
                all: arrayStringValidator
            },
            read: {
                own: arrayStringValidator,
                all: arrayStringValidator
            },
            update: {
                own: arrayStringValidator,
                all: arrayStringValidator
            },
            delete: {
                own: arrayStringValidator,
                all: arrayStringValidator
            }
        }
    },
    put: {
        params: {
            id: Joi.number().integer().min(1).required()
        },
        payload: {
            name: Joi.string().max(80).required(),
            hierarchy: Joi.number().integer().min(0),
            pointLimit: Joi.number().integer().min(0),
            create: {
                own: arrayStringValidator,
                all: arrayStringValidator
            },
            read: {
                own: arrayStringValidator,
                all: arrayStringValidator
            },
            update: {
                own: arrayStringValidator,
                all: arrayStringValidator
            },
            delete: {
                own: arrayStringValidator,
                all: arrayStringValidator
            }
        }
    }
};

module.exports = validate;