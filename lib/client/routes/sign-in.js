"use strict";

var router = require("express").Router(),
    auth = require("../authentication");

var controller = {
    "get": function (req, res) {
        res.render("partials/sign-in");
    },
    post: auth.passport.authenticate("local", { successRedirect: "/", failureRedirect: "/sign-in" })
};

router.route("*")
    .get(controller.get)
    .post(controller.post);

exports.router = router;