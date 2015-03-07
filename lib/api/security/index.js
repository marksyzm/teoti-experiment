"use strict";
var _ = require("lodash");

var config = require("../config");

module.exports = {
    isSuperAdmin: function (userId) {
        return config.get("superAdmin").indexOf(userId) !== -1;
    },

    isBanned: function (userId) {
        return config.get("banned").indexOf(userId) !== -1;
    },

    hasPermission: function (user, method, accessLevel, types) {
        types = _.isArray(types) ? types : [ types ];
        if (!user || !user.group || !user.group[method] || !user.group[method][accessLevel]) { return false; }
        var allFound = true;
        types.forEach(function () {
            if (user.group[method][accessLevel].indexOf(types) === -1) {
                allFound = false;
            }
        });
        return allFound;
    }
};