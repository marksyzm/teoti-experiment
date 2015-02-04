"use strict";

var router = require("express").Router();

var controller = {
    "get": function(req, res) {
        req.logout();
        res.redirect("/");
    }
};

router.route("*").get(controller.get);

exports.router = router;