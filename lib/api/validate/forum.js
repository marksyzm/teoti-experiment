"use strict";

var Joi = require("joi");

var validate = {
    all: {
        query: {
            parent:         Joi.number().integer().min(-1).default(-1)
        }
    },
    get: {
        params: {
            id:             Joi.number().integer().min(0).required()
        }
    },
    del: {
        params: {
            id:             Joi.number().integer().min(0).required()
        }
    },
    post: {
        payload: {
            parent:         Joi.number().integer().min(-1).required(),
            style:          Joi.number().integer().min(0),
            order:          Joi.number().integer().default(0),
            title:          Joi.string().min(3).max(80).required(),
            description:    Joi.string().min(3).max(255).allow(""),
            icon:           Joi.string().allow(""),
            hashTags:       Joi.string().allow(""),
            groups:         Joi.array().includes(Joi.number().integer().min(1)),
            autoSubscribe:  Joi.array().includes(Joi.number().integer().min(1)),
            public:         Joi.boolean().default(false),
            override:       Joi.boolean().default(false),
            createThread:   Joi.boolean().default(true),
            nsfw:           Joi.boolean().default(true)
        }
    },
    put: {
        params: {
            id:             Joi.number().integer().min(0).required()
        },
        payload: {
            parent:         Joi.number().integer().min(-1).required(),
            style:          Joi.number().integer().min(0),
            order:          Joi.number().integer().default(0),
            title:          Joi.string().min(3).max(80).required(),
            description:    Joi.string().min(3).max(255).allow(""),
            icon:           Joi.string().allow(""),
            hashTags:       Joi.string().allow(""),
            groups:         Joi.array().includes(Joi.number().integer().min(1)),
            autoSubscribe:  Joi.array().includes(Joi.number().integer().min(1)),
            public:         Joi.boolean().default(false),
            override:       Joi.boolean().default(false),
            createThread:   Joi.boolean().default(true),
            nsfw:           Joi.boolean().default(false)
        }
    }
};

module.exports = validate;