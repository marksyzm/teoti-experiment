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
        if (!request.params.forumId) { return reply.continue(); }

        var forumId = request.params.forumId;
        if (!forumId) {
            forumId = request.query.parent;
            if (forumId === -1) return reply.continue();
        }

        var query = !isNaN(parseFloat(forumId)) && isFinite(forumId) ? { _id: forumId } : { slug: forumId };

        Forum.findOne(query, "", "parents", function (err, forum) {
            if (err) { return reply(Boom.badImplementation(err)); }

            if (!forum) { return reply(Boom.forbidden("Forum does not exist")); }

            request.documents = request.documents || {};
            request.documents.forum = forum;
            const user = request.documents.user;

            if (forum.public) { return reply.continue(); }
            if (!user) {
                return reply(Boom.unauthorized("User must be authenticated to access forum"));
            }

            var forumGroups = forum.groups;
            if (!forum.override) {
                forumGroups = getForumsGroups(forum.parents, forumGroups);
            }

            if (!user.group || !user.group._id || !forumGroups || !forumGroups.length || forumGroups.indexOf(user.group._id) === -1) {
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
