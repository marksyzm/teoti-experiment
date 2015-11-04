"use strict";
var router = require("express").Router(),
    Sickle = require("sickle"),
    path = require("path"),
    fs = require("fs");

var config = require("../../shared/config"),
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

function fetchImage ( req, res, format) {
    sickle.get({
        url: req.query.url,
        crop: config.get("image:"+format+":crop"),
        width: config.get("image:"+format+":width"),
        height: config.get("image:"+format+":height")
    }, function (err, image) {
        if (err) {
            if (!errorImg) {
                var errorImgPath = path.join("public",config.get("image:"+format+":error"));
                fs.readFile(errorImgPath, function (err, data) {
                    if (err) { return res.send("No error image provided"); }
                    errorImg = data;
                    var ext = path.extname(errorImgPath).replace(".", "").toUpperCase();
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

function sendImage (res, contentType, data) {
    res.setHeader("content-type", getContentType(contentType));
    res.end(data, "binary");
}

var controller = {
    get: function (key) {
        return function (req, res) {
            fetchImage(req, res, key);
        };
    }
};

Object.keys(config.get("image")).forEach(function (key) {
    router.route("/"+key).get(controller.get(key));
});

exports.router = router;