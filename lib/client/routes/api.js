"use strict";

var request = require("request");

var config = require("../../shared/config");

var router = require("express").Router();

var controller = {
    all: function (req, res){
        var url = config.get("api:url") + req._parsedUrl.path.replace(/^\//, "");

        var options = {
            url: url,
            method: req.method,
            json: true
        };

        if (req.user) {
            options.headers = { userid: req.user };
        }

        if (req.method === "POST") {
            options.body = req.body;
        }

        if (req.method === "PUT") {
            options.body = req.body;
        }

        // req.headers.userid = req.session.passport.user.id;
        // req.headers.token = req.session.passport.user.token;
        var call = request(options);

        call.on("response", function () {
            // do socket.io refresh calls here
        });

        call.pipe(res);
    }
};

router.route("*").all(controller.all);

exports.router = router;