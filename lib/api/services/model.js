"use strict";

const _ = require("lodash");
const config = require("../../shared/config");

class Model {
  constructor (model) {
    this.model = model;
  }
  
  static create (modelName) {
    var model = require("../models/"+modelName);
    if (!model) {
      throw new Error("please provide an existing model");
    }
    return new Model(model);
  }
  
  static getPagination (count, skip, limit) {
    var currentPage = Math.floor(skip / limit) + 1;
    return {
      page: currentPage,
      previous: currentPage - 1,
      next: currentPage + 1,
      count: Math.floor(count / limit) + 1,
      hasNextPage: (count - skip) > limit,
      hasPrevPage: skip > 0
    };
  }

  findOne (query, fields, populate, cb) {
    this.model.findOne(query, fields ? fields : null)
      .populate(populate)
      .exec(function(error, item) {
        if (error) { return cb(error, null); }
        if (!item) { return cb(null, null); }
        return cb(null, item);
      });
  }

  update (query, data, cb) {
    this.findOne(query, "", "", function(err, item) {
      if (err) { return cb(err, null); }
      if (!item) { return cb(null, null); }

      _.extend(item, data);
      item.save(function (err, newItem) {
        return cb(err, newItem);
      });
    });
  }

  del (query, cb) {
    this.model.findOne(query, "", function(err, item) {
      if (err) { return cb(err); }
      if (!item) { return cb(null, null); }

      item.remove(function (err) {
        return cb(err, item);
      });
    });
  }

  save (data, query, cb){
    var item = new this.model(data);

    if (query) {
      this.findOne(query, "", "", function(err, found) {
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
  }

  find (query, sort, populate, cb){
    if (query.limit) {
      var limit = config.get("limit:"+query.limit);
      delete query.limit;
    }

    this.model.find(query).populate(populate).sort(sort)
      .limit(limit || config.get("limit:max") || 999)
      .exec(function(error, results) {
        return cb(error, results);
      });
  }

  count (query, cb) {
    this.model.count(query, cb);
  }
}

module.exports = Model;