"use strict";

const config = require("../../shared/config");
const security = require("../security");
const Boom = require("boom");
const _ = require("lodash");
const async = require("async");
const Model = require("../services/model");

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
    if (!user || !user._id) { return false; }
    //if (security.isSuperAdmin(user._id)) { return true; }
    if (!user.group) { return false; }
    if (!user.group[crudType]) { return false; }

    ["all", "own"].every(function (accessRange) {
        if (!_.isEmpty(permission[accessRange]) && !_.isEmpty(user.group[crudType][accessRange])) {
            accessTypes = _.intersection(permission[accessRange], user.group[crudType][accessRange]);
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
        if (!/^\d+$/.test(val)) {
            return false;
        }
        val = parseInt(val, 10);
        return Number.isInteger(val) && key.match(idRegEx);
    }).map((key) => key.replace(idRegEx, ''));

    const models = [];
    modelNames.forEach((modelName) => {
        const model = require("../models/" + modelName);
        //TODO: find out why this requires the extra prop one day
        models.push(new Model(model));
    });
    return models;
}

const getDocuments = (models, request, callback) => {
    const modelFunctions = [];
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

const checkOwnership = (models, documents, permission, user) => {
    //if (security.isSuperAdmin(user._id)) { return true; }
    if (!_.isArray(permission.ownership) || !permission.ownership.length) { return true; }
    return !models.some((model) => {
        const modelName = model.modelName;
        if (!modelName || permission.ownership.indexOf(modelName) === -1) { return false; }
        const document = documents[modelName];
        const ownerKey = model.getOwnerKey();
        // if there is an owner permission but no document for it or the document isn't capable of having a user key, return error
        if (!document || !document.hasOwnProperty(ownerKey) || !_.isFinite(document[ownerKey])) { return true; }
        // make sure the right "own" permission is present and the document belongs to the user
        if (_.isArray(permission.own) && permission.own.indexOf(modelName) !== -1
            && document[ownerKey] && document[ownerKey] === user._id) { return false; }
        // else make sure the user has an "all" permission that matches up
        if (_.isArray(permission.all) && permission.all.indexOf(modelName) !== -1) { return false; }
        // else fail
        return true;
    });
};

exports.register = function(server, options, next) {

    server.ext("onPostAuth", function(request, reply) {
        var permissionSettings = getRoutePermissionSettings(request.route.path, config.get("routePermissions"));
        if (!permissionSettings) {
            return reply(Boom.forbidden("Route not found in permissions"));
        }

        var crudType = getCrudTypeFromMethod(request.route.method);
        if (!crudType) {
            return reply(Boom.forbidden("CRUD type doesn't exist in permissions"));
        }

        request.documents = request.documents || {};
        if (!canPass(permissionSettings, crudType, request.documents.user)) {
            return reply(Boom.forbidden("Wrong permissions"));
        }

        const models = getModels(request.params);
        getDocuments(models, request, (err) => {
            if (err) { return reply(Boom.wrap(err, 500)); }
            const permission = permissionSettings.permissions[crudType];
            if (!checkOwnership(models, request.documents, permission, request.documents.user)) {
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
