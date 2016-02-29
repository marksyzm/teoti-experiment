"use strict";

var router = require("express").Router(),
    auth = require("../authentication");

var controller = {
    "get": function (req, res) {
        var errors = req.flash("error"),
            message = errors ? errors[0] : "";

        if (message) {
            res.set("error-message", message);
        }
        res.render("default", { message: message });
    },
    post: auth.passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/sign-in",
        failureFlash: true
    })
};

router.route("*")
    .get(controller.get)
    .post(controller.post);

exports.router = router;