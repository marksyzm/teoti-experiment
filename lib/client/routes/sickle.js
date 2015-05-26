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
                fs.readFile(config.get("image:"+format+":error"), function (err, data) {
                    if (err) { return res.send("No error image provided"); }
                    errorImg = data;
                    var ext = path.extname(config.get("image:"+format+":error")).replace(".", "").toUpperCase();
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
    thumbnail: function (req, res) {
        fetchImage(req, res, "thumbnail");
    },
    thread: function (req, res) {
        fetchImage(req, res, "thread");
    }
};

router.route("/thumbnail").get(controller.thumbnail);
router.route("/thread").get(controller.thread);

exports.router = router;