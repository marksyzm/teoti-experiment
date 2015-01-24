"use strict";

module.exports = {
    get: function (script) {
        return require("./"+script);
    }
};