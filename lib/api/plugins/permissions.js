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
    var types;

    console.log(1, permission, crudType);
    if (!permission) { return false; }
    console.log(2);
    if (permission.public) { return true; }
    console.log(3);
    if (!user) { return false; }
    console.log(4);
    if (security.isSuperAdmin(user._id)) { return true; }
    console.log(5);
    if (!user.group) { return false; }
    console.log(6);
    if (!user.group[crudType]) { return false; }
    console.log(7,permission, user.group);
    if (!_.isEmpty(permission.all) && _.isEmpty(user.group[crudType].all)) {
        types = _.intersection(permission.all, user.group[crudType].all);
        authorised = types.length === user.group[crudType].all.length;
    }

    if (!authorised && !_.isEmpty(permission.own) && _.isEmpty(user.group[crudType].own)) {
        types = _.intersection(permission.own, user.group[crudType].own);
        authorised = !!types.length;
    }
    console.log(8);
    return authorised;
}

exports.register = function(server, options, next) {

    server.ext("onPostAuth", function(request, reply) {
        var permissionSettings = getRoutePermissionSettings(request.route.path, config.get("route-permissions"));
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
        /*var authorized = false;

        // get route specific permission
        var routeAuth = request.route.plugins['route-access'] || null;

        // no permissions set on this route
        if (!routeAuth) return next();

        // get user credentials or 401 if not logged in
        if (request.auth.isAuthenticated) var user = request.auth.credentials;
        else return next(Boom.unauthorized());

        // check if user has permitted role
        if (!!routeAuth.role) {
            routeAuth.role = (Array.isArray(routeAuth.role) ? routeAuth.role : [routeAuth.role]);

            routeAuth.role.forEach(function(role) {
                if (user.role === role) authorized = true;
            });
        }

        // does user have high enough permission level
        if (!!routeAuth.permission && user.permission < routeAuth.permission) authorized = false;

        if (authorized) return next()
        else return next(Boom.unauthorized());*/

        return reply.continue();
    });

    return next();
};

exports.register.attributes = {
    name: "teoti-route-permissions",
    version: "1.0.0-beta"
};