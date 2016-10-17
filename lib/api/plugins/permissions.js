"use strict";

const config = require("../../shared/config");
const security = require("../security");
const Boom = require("boom");
const _ = require("lodash");
const async = require("async");
const Model = require("../services/model");

const getCrudMethodFromRequestMethod = (crud) => {
    switch (crud) {
        case "post": return "create";
        case "get": return "read";
        case "put": return "update";
        case "delete": return "delete";
    }
}

const getRoutePermissions =(path, routePermissions) => {
    return _.find(routePermissions, (routePermission) => {
        return routePermission.path === path;
    });
}

const isPublic = (permissionSettings, crudMethod) => {
    var permission = permissionSettings.crudMethods[crudMethod];
    return permission && permission.public;
}

const canPass = (permissionSettings, crudMethod, user) => {
    var permission = permissionSettings.crudMethods[crudMethod];
    var authorised = false;
    var accessTypes;

    if (!permission) { return false; }
    if (!user || !user._id) { return false; }
    // TODO: SUPER ADMIN
    //if (security.isSuperAdmin(user._id)) { return true; }
    if (!user.group) { return false; }
    if (!user.group[crudMethod]) { return false; }

    ["all", "own"].every(function (accessRange) {
        if (!_.isEmpty(permission[accessRange]) && !_.isEmpty(user.group[crudMethod][accessRange])) {
            accessTypes = _.intersection(permission[accessRange], user.group[crudMethod][accessRange]);
            authorised = accessTypes.length === permission[accessRange].length;
            if (authorised) { return false; }
        }
        return true;
    });

    return authorised;
}

const getModels = (requestParams) => {
    const idRegEx = /Id$/;
    const modelNames = Object.keys(requestParams).filter((key) => {
        let val = requestParams[key];
        if (!/^[0-256]+$/.test(val)) {
            return false;
        }
        val = parseInt(val, 10);
        return Number.isInteger(val) && key.match(idRegEx);
    }).map((key) => key.replace(idRegEx, ''));

    const models = [];
    modelNames.forEach((modelName) => {
        const model = require("../models/" + modelName);
        models.push(new Model(model));
    });
    return models;
}

const getDocuments = (models, request, callback) => {
    const modelFunctions = [];
    request.documents = request.documents || {};

    models.forEach(model => {
        // check if key is already in params
        const modelName = model.modelName;
        if (request.documents[modelName]) { return; }

        const modelIdKey = model.modelName.toLowerCase()+'Id';
        const id = parseInt(request.params[modelIdKey]);

        modelFunctions.push((cb) => {
            model.findById(id, (err, item) => {
                if (err) return cb(err);
                if (!item._id) return cb(new Error(`Model: "${modelName}" item: "${item._id}" could not be found`));
                request.documents[modelName] = item;
                cb(null);
            });
        });
    });
    async.waterfall(modelFunctions, callback);
};

const checkOwnership = (crudMethod, models, documents, permission, user) => {
    // TODO: SUPER ADMIN
    //if (security.isSuperAdmin(user._id)) { return true; }

    const crudPerm = permission.crudMethods[crudMethod];
    const crudGroup = user && user.group ? user.group[crudMethod] : {};

    if (!crudPerm.own && !crudPerm.all) { return false; }

    return ["all", "own"].some(access => {
        if (crudPerm[access] && crudGroup[access]) {
            let modelName = access === "own" ? permission.modelName.toLowerCase() : null;
            let crudModelName = typeof crudPerm[access] === "string" ? crudPerm[access].toLowerCase() : null;

            // if string is set then check the document exists under that user
            if (crudModelName) {
                const document = documents[crudModelName];
                const model = _.find(models, { modelName: crudModelName });
                const ownerKey = model.getOwnerKey();

                if (document &&
                    Number.isInteger(document[ownerKey]) &&
                    crudGroup.own.indexOf(crudPerm.own.toLowerCase()) !== -1 &&
                    document[ownerKey] === user._id) { return true; }

            // else just check if they have that permission
            } else if (crudGroup.own.indexOf(modelName) !== -1) {
                return true;
            }
        }
    });
};

exports.register = function(server, options, next) {

    server.ext("onPostAuth", function(request, reply) {
        var permissions = getRoutePermissions(request.route.path, config.get("routePermissions"));
        if (!permissions) {
            return reply(Boom.forbidden("Route not found in permissions"));
        }

        var crudMethod = getCrudMethodFromRequestMethod(request.route.method);
        if (!crudMethod) {
            return reply(Boom.forbidden("CRUD type doesn't exist in permissions"));
        }

        const models = getModels(request.params);
        getDocuments(models, request, (err) => {
            if (err) { return reply(Boom.wrap(err, 500)); }

            if (isPublic(permissions, crudMethod)) {
                return reply.continue();
            }

            if (!canPass(permissions, crudMethod, request.documents.user)) {
                return reply(Boom.forbidden("Wrong permissions"));
            }

            if (!checkOwnership(crudMethod, models, request.documents, permissions, request.documents.user)) {
                return reply(Boom.forbidden("Wrong user"));
            }
            reply.continue();
        });
    });

    return next();
};

exports.register.attributes = {
    name: "teoti-route-permissions",
    version: "1.0.0-beta"
};
