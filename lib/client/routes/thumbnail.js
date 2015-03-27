"use strict";
var router = require("express").Router(),
    Sickle = require("sickle"),
    path = require("path"),
    fs = require("fs");

var config = require("../config"),
    sickle = new Sickle(),
    errorImg,
    errorImgType;

function getContentType (format) {
    switch (format) {
        case "PNG": return "image/png";
        case "GIF": return "image/gif";
        case "JPG": return "image/jpeg";
        default: return "image/jpeg";
    }
}

function sendImage (res, contentType, data) {
    res.setHeader("content-type", getContentType(contentType));
    res.end(data, "binary");
}

var controller = {
    "get": function (req, res) {
        sickle.get({
            url: req.query.url,
            crop: true,
            width: config.get("image:thumbnail:width"),
            height: config.get("image:thumbnail:height")
        }, function (err, image) {
            if (err) {
                if (!errorImg) {
                    fs.readFile(config.get("image:thumbnail:error"), function (err, data) {
                        if (err) { return res.send("No error image provided"); }
                        errorImg = data;
                        var ext = path.extname(config.get("image:thumbnail:error")).replace(".", "").toUpperCase();
                        errorImgType = getContentType(ext);
                        sendImage(res, errorImgType, data);
                    });
                    return;
                }

                sendImage(res, errorImgType, errorImg);
                return;
            }

            var contentType = getContentType(image.format);
            sendImage(res, contentType, image.data);
        });
    }
};

router.route("/").get(controller.get);

exports.router = router;