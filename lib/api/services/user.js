"use strict";
var _ = require("lodash");
var md5 = require("md5");
var pbkdf2 = require("pbkdf2");
var generatePassword = require("password-generator");
var getSlug = require("speakingurl");

var UserModel = require("../models/user");
var Model = require("./model");
var email = require("../email");
var config = require("../../shared/config");

class User extends Model {
  constructor () {
    super(UserModel);
  }

  static create () {
    return new User();
  }

  static checkPassword (rawPassword, savedPassword, salt, algorithm) {
    switch (algorithm) {
      case "pbdkdf2":
        return pbkdf2.compareSync(savedPassword, rawPassword, salt, 1, 20, "sha256");
      default: // md5
        return savedPassword === md5(md5(rawPassword)+salt);
    }
  }

  static handleRegisterUser (user) {
    if (user.register) {
      delete user.register;
      if (!user.password) { return "Password must be supplied"; }
      if (user.password !== user.passwordConfirm) { return "Passwords do not match"; }
      if (user.email !== user.emailConfirm) { "Passwords do not match"; }
    }
    return null;
  }

  static setUserPassword (user) {
    user.algorithm = "pbdkdf2";
    user.salt = pbkdf2.generateSaltSync(32);
    user.password = pbkdf2.hashSync(user.password, user.salt, 1, 20, "sha256");
  }

  /**
   * General user authentication with password switching based on algorithm type
   * @param username
   * @param password
   * @param cb
   */
  authenticate (username, password, cb) {
    this.findOne({ username: username }, "password salt algorithm", "", (err, user) => {
      if (!user) { return cb(new Error("User does not exist."), null); }

      if (!User.checkPassword(password, user.password, user.salt, user.algorithm)) {
        return cb(new Error("Password does not match."), null);
      }

      cb(null, user);
    });
  }

  /**
   * Find users and allow to apply a filter to search by username
   * @param query
   * @param cb
   */
  find (query, sort, populate, cb) {
    var limit = config.get("limit:"+(query.limit || "default" || 100));
    var sort = query.sort;
    var skip = (query.page - 1) * limit;

    if (query.filter) {
      query.username = new RegExp("^"+query.filter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
    }

    delete query.page;
    delete query.filter;
    delete query.limit;
    delete query.sort;

    this.model.find(query)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .exec((err, users) => {
        if (err) { return cb(err); }
        this.model.count(query, (err, count) => {
          if (err) { return cb(err); }
          cb(null, users, Model.getPagination(count, skip, limit));
        });
      });
  }

  save (user, query, cb) {
    this.checkUsernameEmail(null, user.username, user.email, (err) => {
      if (err) { return cb(err, null); }

      var registerUserError = User.handleRegisterUser(user);
      if (registerUserError) { return cb(new Error(registerUserError), null); }

      if (!user.password) {
        user.password = generatePassword();
        user.resetPassword = true;
      }

      user.slug = getSlug(user.username);

      var salt = pbkdf2.generateSaltSync(32);
      user.activationCode = pbkdf2.hashSync(user.username, salt, 1, 20, "sha256");

      User.setUserPassword(user);

      super.save(user, null, (err, user) => {
        if (err) { return cb(err, null); }
        if (!user.active) {
          email.activateUser(user, (err) => {
            if (err) { return cb(err, null); }
            cb(err, user);
          });
          return;
        }
        cb(err, user);
      });
    });
  }

  update (query, user, cb) {
    var sendEmail = false;
    if (this.base) {
      console.trace(this);
    }

    this.checkUsernameEmail(query._id, user.username, user.email, (err) => {
      if (err) { return cb(err, null); }
      if (user.username) { user.slug = getSlug(user.username); }
      if (user.password) { User.setUserPassword(user); }
      if (!user.active && user.sendEmail) {
        sendEmail = true;
        delete user.sendEmail;
      }
      super.update({ _id: query._id }, user, (err, user) => {
        if (err) { return cb(err, null); }
        if (sendEmail) {
          email.activateUser(user, (err) => {
            if (err) { return cb(err, null); }
            cb(null, user);
          });
          return;
        }
        cb(null, user);
      });
    });
  }

  checkUsernameEmail (id, username, email, cb) {
    this.findOne({ username: username }, "", "", (err, user) => {
      if (err) { return cb(err); }
      if ((user && !id) || (user && id && user._id !== id)) {
        return cb(new Error("Another user has this username"));
      }
      this.findOne({ email: email }, "", "", (err, user) => {
        if (err) { return cb(err); }
        if ((user && !id) || (user && id && user._id !== id)) {
          return cb(new Error("Another user has this email address"));
        }
        cb(null);
      });
    });
  }

  changePassword (userId, password, passwordConfirm, cb) {
    if (password !== passwordConfirm) {
      return cb(new Error("Passwords do not match"), null);
    }
    this.findOne({ _id: userId }, "password salt algorithm", "", (err, user) => {
      if (err) { return cb(err, null); }
      if (!user) { return cb(new Error("User not found"), null); }
      if (!User.checkPassword(password, user.password, user.salt, user.algorithm)) {
        User.setUserPassword(user);

        super.update({ _id: userId }, user, (err, user) => {
          if (err) { return cb(err, 400); }
          cb(null, user);
        });
      }
    });
  }
}

module.exports = User;