"use strict";
var router = require("express").Router(),
    allowedViews = [ "forum", "error" ];

var controller = {
    "get": function (req, res, next) {
        if (allowedViews.indexOf(req.params.viewName) === -1) {
            return next(new Error("Partial view doesn't exist"));
        }
        res.render(req.params.viewName, { partial: true });
    }
};

router.route("/:viewName").get(controller.get);

exports.router = router;