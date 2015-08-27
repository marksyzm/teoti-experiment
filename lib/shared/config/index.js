"use strict";

var nconf = require("nconf");
var path = require("path")

module.exports = (function () {
    var config = {};

    config.get = function(key) {
        return nconf.get(key);
    };

    config.set = function(key, value) {
        return nconf.set(key, value);
    };

    var init = function(){
        nconf.argv().env("_");
        var environment = nconf.get("NODE:ENV") || "development";
        nconf.file("base", "config/base.json");
        nconf.file(environment, path.join("config", environment.toLowerCase() + ".json"));
        nconf.file("template", path.join(config.get("html:templates"), config.get("template"), "config.json"));
        nconf.file("route-permissions", "config/route-permissions.json");
    };

    init();

    return config;
}());