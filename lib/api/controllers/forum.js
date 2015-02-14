"use strict";

var Boom = require("boom"),
    getSlug = require("speakingurl");

var Model = require("../services/model"),
    Forum = Model.create("forum");

function getForumParents (forum, parentList, cb) {
    //second statement, because people are stupid
    parentList.push(forum.parent);
    if (forum.parent > 0 && forum.parent !== forum._id) {
        Forum.findOne({ _id: forum.parent }, "", "", function (err, forum) {
            if (err) { cb(err, parentList); }
            getForumParents(forum, parentList, cb);
        });
    } else {
        cb(null, parentList);
    }
}

var controller = {
    all: function (req, reply) {
        Forum.find(req.query, {}, "", function (err, forums) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forums);
        });
    },
    get: function (req, reply) {
        Forum.findOne({ _id: req.params.id }, "", "", function (err, forum) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            if (!forum) { return reply(Boom.notFound("Forum not found")); }
            reply(forum);
        });
    },
    post: function (req, reply) {
        var forum = req.payload,
            parentList = [];

        getForumParents(forum, parentList, function (err) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            forum.parentList = parentList;
            forum.slug = getSlug(forum.title);
            Forum.save(req.payload, null, function (err, forum) {
                if (err) { return reply(Boom.wrap(err, 400)); }
                reply(forum);
            });
        });
    },
    put: function (req, reply) {
        var forum = req.payload,
            parentList = [];

        getForumParents(forum, parentList, function (err) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            forum.parentList = parentList;
            forum.slug = getSlug(forum.title);
            Forum.update({ _id: req.params.id }, forum, function (err, forum) {
                if (err) { return reply(Boom.wrap(err, 400)); }
                reply(forum);
            });
        });
    },
    del: function (req, reply) {
        Forum.del({ _id: req.params.id }, function (err, forum) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forum);
        });
    }
};

module.exports = controller;