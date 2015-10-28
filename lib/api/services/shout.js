"use strict";
var _ = require("lodash");

var ShoutModel = require("../models/shout");
var Model = require("./model");

var Shout = function () {
    Model.call(this, ShoutModel);
};

var tmp = function () {};
tmp.prototype = Model.prototype;

Shout.prototype = new tmp();
Shout.prototype.constructor = Shout;

_.extend(Shout.prototype, {
    find: function (user, query, cb) {

    }
});

Shout.create = function () {
    return new Shout();
};

module.exports = Shout;