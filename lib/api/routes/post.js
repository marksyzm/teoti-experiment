"use strict";

var controller = require("../controllers").post;
var validate = require("../validate").post;
var pathGroup = "/forum/{forumId}/thread/{threadId}/post";
var pathSingle = "/forum/{forumId}/thread/{threadId}/post/{postId}";

module.exports = [
    {
        method: "GET",
        path: pathGroup,
        config: {
            handler: controller.all,
            validate: validate.all
        }
    },
    {
        method: "GET",
        path: pathSingle,
        config: {
            handler: controller.get,
            validate: validate.get
        }
    },
    {
        method: "POST",
        path: pathGroup,
        config: {
            handler: controller.post,
            validate: validate.post
        }
    },
    {
        method: "PUT",
        path: pathSingle,
        config: {
            handler: controller.put,
            validate: validate.put
        }
    },
    {
        method: "DELETE",
        path: pathSingle,
        config: {
            handler: controller.del,
            validate: validate.del
        }
    }
];
