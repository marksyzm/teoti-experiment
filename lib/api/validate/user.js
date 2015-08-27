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
            filter: Joi.string(),
            limit: Joi.string().valid([ "main", "navigation" ]).default("main"),
            sort: Joi.string().valid([ "username", "-score", "-totalScore"]).default("username"),
            page: Joi.number().integer().min(1).default(1)
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
            username: Joi.string().max(80).regex(/[^\s]/).required(),
            title: Joi.string().min(0).max(80).allow(""),
            password: Joi.string().min(5).allow(""),
            email: Joi.string().email().required(),
            style: Joi.number().integer().min(0).default(0),
            location: Joi.string().allow(""),
            active: Joi.boolean().default(false)
        }
    },
    put: {
        params: {
            id: Joi.number().integer().min(1).required()
        },
        payload: {
            group: Joi.number().integer().min(0).required(),
            username: Joi.string().max(80).regex(/[^\s]/).required(),
            title: Joi.string().min(0).max(80).allow(""),
            password: Joi.string().min(5).allow(""),
            email: Joi.string().email().required(),
            style: Joi.number().integer().min(0).default(0),
            location: Joi.string().allow(""),
            active: Joi.boolean().default(false)
        }
    },
    accountRead: {
        headers: {
            userid: Joi.number().integer().min(1)
        }
    },
    accountUpdate: {
        headers: {
            userid: Joi.number().integer().min(1).required()
        },
        payload: {
            _id: Joi.number().integer().min(1).required(),
            title: Joi.string().min(0).max(80).allow(""),
            email: Joi.string().email().allow(""),
            style: Joi.number().integer().min(0),
            birthday: Joi.date(),
            timezoneOffset: Joi.number(),
            location: Joi.string().allow(""),
            settings: {
                special: Joi.string().valid([ "hot", "random", "sticky", "scores" ]).default("hot"),
                view: Joi.string().valid([ "simple", "compact", "stream" ]).default("simple"),
                wysiwyg: Joi.boolean()
            }
        }
    },
    accountCreate: {
        payload: {
            username: Joi.string().max(80).required(),
            password: Joi.string().min(5).required(),
            passwordConfirm: Joi.string().min(5).required(),
            email: Joi.string().email().required(),
            emailConfirm: Joi.string().email().required(),
            timezoneOffset: Joi.number().default(0),
            location: Joi.string().allow(""),
            birthday: Joi.date(),
            active: Joi.boolean().default(false)
        }
    },
    changePassword: {
        headers: {
            userid: Joi.number().integer().min(1).required()
        },
        payload: {
            password: Joi.string().min(5).required(),
            passwordConfirm: Joi.string().min(5).required()
        }
    }
};

module.exports = validate;