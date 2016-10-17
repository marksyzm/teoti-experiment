"use strict";

const _ = require("lodash");
const config = require("../../shared/config");

class Model {
    constructor(model) {
        this.model = model;
        this.modelName = model.modelName.toLowerCase();
    }

    static create(modelName) {
        var model = require("../models/" + modelName);
        if (!model) {
            throw new Error("please provide an existing model");
        }
        return new Model(model);
    }

    static getPagination(count, skip, limit) {
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

    find(options, cb) {
        const query = options.query;
        const sort = options ? options.sort : null;
        const populate = options.populate || "";
        const limit = config.get("limit:" + query.limit);
        if (query) {
            delete query.sort;
            delete query.limit;
        }

        this.model.find(query).populate(populate).sort(sort)
            .limit(limit || config.get("limit:max") || 999)
            .exec(cb);
    }
    
    findOne(options, cb) {
        const query = options.query;
        const fields = options.fields;
        const populate = options.populate || "";

        this.model.findOne(query, fields)
            .populate(populate)
            .exec((error, item) => {
                if (error) return cb(error, null);
                if (!item) return cb(null, null);
                return cb(null, item);
            });
    }

    update(options, cb) {
        const query = options.query;
        const data = options.data;

        this.findOne(query, "", "", (err, item) => {
            if (err) return cb(err, null);
            if (!item) return cb(null, null);
            _.extend(item, data);
            item.save(cb);
        });
    }

    del(options, cb) {
        const query = options.query;
        this.model.findOne(query, "", function (err, item) {
            if (err) {
                return cb(err);
            }
            if (!item) {
                return cb(null, null);
            }

            item.remove(function (err) {
                return cb(err, item);
            });
        });
    }

    save(options, cb) {
        const data = options.data;
        const query = options.query;
        const item = new this.model(data);

        if (query) {
            return this.findOne({ query }, (err, found) => {
                if (err) return cb(err, found);
                if (found) return cb(new Error("Duplicate"), found)
                item.save(cb);
            });
        }

        item.save(cb);
    }

    findById(id, cb) {
        this.model.findById(id, cb);
    }

    getOwnerKey() {
        return this.model ? this.model.ownerKey : null;
    }

    count(query, cb) {
        this.model.count(query, cb);
    }
}

module.exports = Model;
