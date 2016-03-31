"use strict";

var Boom = require("boom"),
    _ = require("lodash");

var Forum = require("../services/forum").create();
var config = require("../../shared/config");

function getForumsGroups (forums, forumGroups) {
    forums.forEach(function (forum) {
        if (!forum.groups || !forum.groups.length) { return; }
        forumGroups.concat(forum.groups);
    });

    return _.uniq(forumGroups);
}

exports.register = function(server, options, next) {
    server.ext("onPostAuth", function(request, reply) {
        if (config.get("forumAccessRoutes").indexOf(request.route.path) === -1) { return reply.continue(); }

        var id = request.params.id;
        if (!id) {
            id = request.query.parent;
            if (id === -1) return reply.continue();
        }

        var query = !isNaN(parseFloat(id)) && isFinite(id) ? { _id: id } : { slug: id };

        Forum.findOne(query, "", "parents", function (err, forum) {
            if (err) { return reply(Boom.badImplementation(err)); }

            if (!forum) { return reply(Boom.forbidden("Forum does not exist")); }

            request.Forum = forum;

            if (forum.public) { return reply.continue(); }
            if (!request.User) {
                return reply(Boom.unauthorized("User must be authenticated to access forum"));
            }

            var forumGroups = forum.groups;
            if (!forum.override) {
                forumGroups = getForumsGroups(forum.parents, forumGroups);
            }

            if (!request.User.group || !request.User.group._id || !forumGroups || !forumGroups.length || forumGroups.indexOf(request.User.group._id) === -1) {
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