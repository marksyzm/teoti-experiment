"use strict";

var Model = function(model){
    this.model = model;
};

exports.create = function(modelName) {
    var model = require("../models/"+modelName);
    if (!model) {
        throw new Error("please provide an existing model");
    }
    return new Model(model);
};

Model.prototype.findOne = function(query, populate, cb){
    this.model.findOne(query)
        .populate(populate)
        .exec(function(error, item) {
            if (error) { return cb(error, null); }
            if (!item) { return cb(null, null); }
            return cb(null, item);
        });
};

Model.prototype.update = function(query, update, cb) {
    var self = this;

    this.findOne(query, "", function(err, item) {
        if (err) { return cb(err, null); }
        if (!item) { return cb(null, null); }

        self.model.update(query, update, function(err) {
            return cb(err, item);
        });
    });
};

Model.prototype.del = function(query, cb) {
    this.model.findOne(query, "", function(err, item) {
        if (err) { return cb(err); }
        if (!item) { return cb(null, null); }

        item.remove(function (err) {
            if (err) { return cb(err, null); }
            return cb(null, item);
        });
    });
};

Model.prototype.save = function(data, query, cb){
    var item = new this.model(data);

    this.findOne(query, "", function(err, found) {
        if (err) { return cb(err, null); }
        if (found) { return cb("Duplicate", found); }

        item.save(function (error, newitem) {
            if (error) { return cb(error, null); }
            return cb(null, newitem);
        });
    });
};

Model.prototype.find = function(query, sort, populate, cb){
    this.model.find(query)
        .populate(populate)
        .sort(sort)
        .exec(function(error, results) {
            if (error) { return cb(error, null); }
            return cb(null, results);
        });
};
