"use strict";

var Joi = require("joi");

var validate = {
    authenticate: {
        payload: {
            username: Joi.string().min(3).max(80).regex(/[^\s]/),
            password: Joi.string().min(3).max(255)
        }
    },
    all: {
        query: {
            filter: Joi.string()
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
            group: Joi.number().integer().min(0).required(),
            username: Joi.string().max(80).required(),
            title: Joi.string().min(0).max(80),
            password: Joi.string().min(5),
            email: Joi.string().email().required(),
            style: Joi.number().integer().min(0).default(0),
            timezoneOffset: Joi.number().default(0),
            avatar: Joi.string(),
            location: Joi.string(),
            active: Joi.boolean().default(false)
        }
    },
    put: {
        params: {
            id: Joi.number().integer().min(1).required()
        },
        payload: {
            _id: Joi.number(),
            __v: Joi.number(),
            group: Joi.number().integer().min(0).required(),
            username: Joi.string().max(80).required(),
            title: Joi.string().min(0).max(80),
            password: Joi.string().min(5),
            email: Joi.string().email().required(),
            style: Joi.number().integer().min(0).default(0),
            timezoneOffset: Joi.number().default(0),
            avatar: Joi.string(),
            location: Joi.string(),
            active: Joi.boolean().default(false)
        }
    },
    account: {
        headers: {
            userId: Joi.number().integer().min(1).required()
        },
        payload: {
            _id: Joi.number(),
            __v: Joi.number(),
            title: Joi.string().min(0).max(80),
            email: Joi.string().email(),
            style: Joi.number().integer().min(0),
            birthday: Joi.date(),
            timezoneOffset: Joi.number(),
            avatar: Joi.string(),
            location: Joi.string(),
            settings: {
                view: Joi.string().valid([ "simple", "compact", "stream" ]).default("simple"),
                wysiwyg: Joi.boolean()
            }
        }
    },
    changePassword: {
        headers: {
            userId: Joi.number().integer().min(1).required()
        },
        payload: {
            password: Joi.string().min(5),
            passwordConfirm: Joi.string().min(5)
        }
    }
};

module.exports = validate;