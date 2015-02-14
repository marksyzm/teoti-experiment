"use strict";
var router = require("express").Router();

var controller = {
    "get": function (req, res) {
        res.render("home");
    }
};

router.route("/").get(controller.get);

exports.router = router;