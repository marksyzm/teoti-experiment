"use strict";

var controller = require("../controllers").shout,
    validate = require("../validate").shout;

module.exports = [
    {
        method: "GET",
        path: "/shout",
        config: {
            handler: controller.all,
            validate: validate.all
        }
    },
    {
        method: "GET",
        path: "/shout/{id}",
        config: {
            handler: controller.get,
            validate: validate.get
        }
    },
    {
        method: "POST",
        path: "/shout",
        config: {
            handler: controller.post,
            validate: validate.post
        }
    },
    {
        method: "PUT",
        path: "/shout/{id}",
        config: {
            handler: controller.put,
            validate: validate.put
        }
    },
    {
        method: "DELETE",
        path: "/shout/{id}",
        config: {
            handler: controller.del,
            validate: validate.del
        }
    }
];