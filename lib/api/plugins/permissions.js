"use strict";

var config = require("../config"),
    security = require("../security"),
    Boom = require("boom"),
    _ = require("lodash");

function getCrudTypeFromMethod(crud) {
    switch (crud) {
        case "post": return "create";
        case "get": return "read";
        case "put": return "update";
        case "delete": return "delete";
    }
}

function getRoutePermissionSettings (path, routePermissions) {
    return _.find(routePermissions, function (routePermission) {
        return routePermission.path === path;
    });
}

function canPass(permissionSettings, crudType, user) {
    var permission = permissionSettings.permissions[crudType];
    var authorised = false;
    var accessTypes;

    if (!permission) { return false; }
    if (permission.public) { return true; }
    if (!user) { return false; }
    if (security.isSuperAdmin(user._id)) { return true; }
    if (!user.group) { return false; }
    if (!user.group[crudType]) { return false; }

    ["all", "own"].every(function (accessRange) {
        if (!_.isEmpty(permission[accessRange]) && !_.isEmpty(user.group[crudType][accessRange])) {
            accessTypes = _.intersection(permission[accessRange], user.group[crudType][accessRange]);
            authorised = accessTypes.length === permission[accessRange].length;
            if (authorised) { return false; }
        }
    });

    return authorised;
}

exports.register = function(server, options, next) {

    server.ext("onPostAuth", function(request, reply) {
        var permissionSettings = getRoutePermissionSettings(request.route.path, config.get("routePermissions"));
        if (!permissionSettings) {
            return reply(Boom.notFound("Route not found in permissions"));
        }

        var crudType = getCrudTypeFromMethod(request.route.method);
        if (!crudType) {
            return reply(Boom.notFound("CRUD type doesn't exist in permissions"));
        }

        if (!canPass(permissionSettings, crudType, request.User)) {
            return reply(Boom.forbidden("Forbidden: Wrong permissions"));
        }

        return reply.continue();
    });

    return next();
};

exports.register.attributes = {
    name: "teoti-route-permissions",
    version: "1.0.0-beta"
};