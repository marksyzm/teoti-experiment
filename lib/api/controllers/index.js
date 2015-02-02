"use strict";
var path = require("path"),
    fs = require("fs");

fs.readdirSync(__dirname).forEach(function (file) {
    if (file === "index.js") { return; }
    module.exports[path.basename(file, ".js")] = require(path.join(__dirname, file));
});