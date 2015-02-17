"use strict";

var Boom = require("boom"),
    _ = require("lodash");

var Model = require("../services/model"),
    config = require("../config");

var Forum = Model.create("forum");

function getForumChildGroups (parentForums, forumGroups) {
    parentForums.forEach(function (forum) {
        if (!forum.groups || !forum.groups.length) { return; }
        forumGroups.concat(forum.groups);
    });

    return _.uniq(forumGroups);
}

exports.register = function(server, options, next) {
    server.ext("onPreAuth", function(request, reply) {
        if (config.get("forumAccessRoutes").indexOf(request.route.path) === -1) { return reply.continue(); }

        Forum.findOne({ _id: request.params.id }, "", "parentList", function (err, forum) {
            if (err) { return reply(Boom.badImplementation(err)); }

            if (!forum) { return reply(Boom.forbidden("Forum does not exist")); }
            if (forum.public) { reply.continue(); }
            if (!request.User || !request.User.group || !request.User.group._id) {
                return reply(Boom.forbidden("User must be authenticated to access forum"));
            }

            var forumGroups = forum.groups;
            if (!forum.override) {
                forumGroups = getForumChildGroups(forum.parentList, forumGroups);
            }

            if (!forumGroups || forumGroups.length || forumGroups.indexOf(request.User.group._id)) {
                return reply(Boom.forbidden("User group must belong to forum groups list."));
            }

            reply.continue();
        });
    });

    return next();
};

exports.register.attributes = {
    name: "teoti-forum-access",
    version: "1.0.0-beta"
};