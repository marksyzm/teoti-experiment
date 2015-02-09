"use strict";
var router = require("express").Router();

var controller = {
    "get": function (req, res) {
        res.render("blank");
    }
};

[
    "*",
    "/groups",
    "/group",
    "/group/:id",
    "/user",
    "/user/:id"
].forEach(function (route) {
    router.route(route).get(controller.get);
});

exports.router = router;