"use strict";

var nconf = require("nconf");

module.exports = (function () {
    var config = {};

    var init = function(){
        nconf.argv().env("_");
        var environment = nconf.get("NODE:ENV") || "development";
        nconf.file("base", "config/config.json");
        nconf.file(environment, "config/" + environment.toLowerCase() + ".json");
        nconf.file("threads", "config/threads.json");
    };

    init();

    config.get = function(key) {
        return nconf.get(key);
    };

    config.set = function(key, value) {
        return nconf.set(key, value);
    };

    return config;
}());