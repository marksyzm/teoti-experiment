"use strict";
var router = require("express").Router();

var controller = {
    "get": function (req, res) {
        res.render("default");
    }
};

[
    "*",
    "/groups",
    "/group",
    "/group/:id",
    "/forums",
    "/forum",
    "/forum/:id",
    "/user",
    "/user/:id"
].forEach(function (route) {
    router.route(route).get(controller.get);
});

exports.router = router;