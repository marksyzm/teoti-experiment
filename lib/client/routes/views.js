"use strict";

var router = require("express").Router();

var controller = {
    "get": function (req, res) {
        res.status(404).send('Not found');
    }
};

router.route("*").get(controller.get);

exports.router = router;