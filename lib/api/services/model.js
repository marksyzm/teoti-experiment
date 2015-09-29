"use strict";

var _ = require("lodash");

var Model = function(model){
    this.model = model;
};

module.exports = Model;

Model.create = function(modelName) {
    var model = require("../models/"+modelName);
    if (!model) {
        throw new Error("please provide an existing model");
    }
    return new Model(model);
};

Model.getPagination = function (count, skip, limit) {
    var currentPage = Math.floor(skip / limit) + 1;
    return {
        page: currentPage,
        previous: currentPage - 1,
        next: currentPage + 1,
        count: Math.floor(count / limit) + 1,
        hasNextPage: (count - skip) > limit,
        hasPrevPage: skip > 0
    };
};

Model.prototype.findOne = function(query, fields, populate, cb) {
    this.model.findOne(query, fields ? fields : null)
        .populate(populate)
        .exec(function(error, item) {
            if (error) { return cb(error, null); }
            if (!item) { return cb(null, null); }
            return cb(null, item);
        });
};

Model.prototype.update = function(query, data, cb) {
    Model.prototype.findOne.call(this, query, "", "", function(err, item) {
        if (err) { return cb(err, null); }
        if (!item) { return cb(null, null); }

        _.extend(item, data);
        item.save(function (err, newItem) {
            return cb(err, newItem);
        });
    });
};

Model.prototype.del = function(query, cb) {
    this.model.findOne(query, "", function(err, item) {
        if (err) { return cb(err); }
        if (!item) { return cb(null, null); }

        item.remove(function (err) {
            return cb(err, item);
        });
    });
};

Model.prototype.save = function(data, query, cb){
    var item = new this.model(data);

    if (query) {
        Model.prototype.findOne.call(this, query, "", "", function(err, found) {
            if (err) { return cb(err, found); }
            if (found) { return cb(new Error("Duplicate"), found); }

            item.save(function (error, newitem) {
                return cb(error, newitem);
            });
        });
    } else {
        item.save(function (error, newitem) {
            return cb(error, newitem);
        });
    }
};

Model.prototype.find = function(query, sort, populate, cb){
    this.model.find(query)
        .populate(populate)
        .sort(sort)
        .exec(function(error, results) {
            return cb(error, results);
        });
};
