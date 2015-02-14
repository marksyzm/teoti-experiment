"use strict";

var controller = require("../controllers").group,
    validate = require("../validate").group;

module.exports = [
    {
        method: "GET",
        path: "/group",
        config: {
            handler: controller.all,
            validate: validate.all
        }
    },
    {
        method: "GET",
        path: "/group/{id}",
        config: {
            handler: controller.get,
            validate: validate.get
        }
    },
    {
        method: "POST",
        path: "/group",
        config: {
            handler: controller.post,
            validate: validate.post
        }
    },
    {
        method: "PUT",
        path: "/group/{id}",
        config: {
            handler: controller.put,
            validate: validate.put
        }
    },
    {
        method: "DELETE",
        path: "/group/{id}",
        config: {
            handler: controller.del,
            validate: validate.del
        }
    }
];