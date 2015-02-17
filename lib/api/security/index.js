"use strict";
var config = require("../config");

module.exports = {
    isSuperAdmin: function (userId) {
        return config.get("superAdmin").indexOf(userId) !== -1;
    },
    isBanned: function (userId) {
        return config.get("banned").indexOf(userId) !== -1;
    }
};