"use strict";

var controller = require("../controllers").thread,
    validate = require("../validate").thread;

module.exports = [
    {
        method: "GET",
        path: "/forum/{forumId}/thread",
        config: {
            handler: controller.all,
            validate: validate.all
        }
    },
    {
        method: "GET",
        path: "/forum/{forumId}/thread/{threadId}",
        config: {
            handler: controller.get,
            validate: validate.get
        }
    },
    {
        method: "POST",
        path: "/forum/{forumId}/thread",
        config: {
            handler: controller.post,
            validate: validate.post
        }
    },
    {
        method: "PUT",
        path: "/forum/{forumId}/thread/{threadId}",
        config: {
            handler: controller.put,
            validate: validate.put
        }
    },
    {
        method: "DELETE",
        path: "/forum/{forumId}/thread/{threadId}",
        config: {
            handler: controller.del,
            validate: validate.del
        }
    }
];
