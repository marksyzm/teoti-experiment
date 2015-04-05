"use strict";
var request = require("request"),
    router = require("express").Router();

var config = require("../config");

var controller = {
    "get": function (req, res, next) {
        var forumId = req.forum ?  req.forum._id : config.get("defaultForum");

        request({
            method: "GET",
            uri: config.get("api:url") + "forum/" + forumId + "/thread",
            json: true
        }, function (err, response, data) {
            if (err) { return next(new Error("Could not connect to threads API")); }
            if (response.statusCode !== 200) { return next(new Error("No access to threads")); }
            data.partial = false;
            if (req.query.partial) { data.partial = true; }

            res.render("forum", data);
        });
    },

    "getThread": function (req, res) {
        res.render("forum");
    }
};

//router.route("/:forumSlug/:threadUrl").get(controller.get);
router.route("/:forumSlug/").get(controller.get);

router.route("/").get(controller.get);

exports.router = router;