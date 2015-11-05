"use strict";
var router = require("express").Router();
var Sickle = require("sickle");
var path = require("path");
var fs = require("fs");
var url = require("url");

var config = require("../../shared/config");
var sickle = new Sickle();
var errorImg;
var errorImgType;

function getContentType (format) {
    switch (format) {
        case "PNG": return "image/png";
        case "GIF": return "image/gif";
        case "JPG": return "image/jpeg";
        case "JPEG": return "image/jpeg";
        default: return "image/jpeg";
    }
}

function cleanseUrl (req, urlStr) {
    if (urlStr.match(/^http/)) return urlStr;
    return url.format({ host: req.get('host'), protocol: req.protocol }) + "/"+ urlStr;
}

function fetchImage ( req, res, format) {
    sickle.get({
        url: cleanseUrl(req, req.query.url),
        crop: config.get("image:"+format+":crop"),
        width: config.get("image:"+format+":width"),
        height: config.get("image:"+format+":height")
    }, function (err, image) {
        if (!err) {
            var contentType = getContentType(image.format);
            return sendImage(res, contentType, image.data);
        }

        if (errorImg) {
            return sendImage(res, errorImgType, errorImg);
        }

        var errorImgPath = path.join("public",config.get("image:"+format+":error"));
        fs.readFile(errorImgPath, function (err, data) {
            if (err) { return res.send("No error image provided"); }
            errorImg = data;
            var ext = path.extname(errorImgPath).replace(".", "").toUpperCase();
            errorImgType = getContentType(ext);
            sendImage(res, errorImgType, data);
        });
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