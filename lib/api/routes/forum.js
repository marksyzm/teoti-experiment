"use strict";

var controller = require("../controllers").forum,
    validate = require("../validate").forum;

module.exports = [
    {
        method: "GET",
        path: "/forum",
        config: {
            handler: controller.all,
            validate: validate.all
        }
    },
    {
        method: "GET",
        path: "/forum/{id}",
        config: {
            handler: controller.get,
            validate: validate.get
        }
    },
    {
        method: "POST",
        path: "/forum",
        config: {
            handler: controller.post,
            validate: validate.post
        }
    },
    {
        method: "PUT",
        path: "/forum/{id}",
        config: {
            handler: controller.put,
            validate: validate.put
        }
    },
    {
        method: "DELETE",
        path: "/forum/{id}",
        config: {
            handler: controller.del,
            validate: validate.del
        }
    }
];