"use strict";

var request = require("request");

var config = require("../config");

var router = require("express").Router();

var controller = {
    all: function (req, res){
        var url = config.get("api:url") + req._parsedUrl.path.replace(/^\//, "");
        console.log(url);

        var options = {
            url: url,
            method: req.method,
            headers : req.headers,
            json: true
        };

        if (req.method === "POST") {
            options.form = req.body;
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