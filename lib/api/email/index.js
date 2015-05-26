"use strict";
var fs = require("fs"),
    Email = require("email").Email,
    Handlebars = require("handlebars");

var config = require("../../shared/config");

var email = {
    activateUser: function (user, cb) {
        var template = fs.readFileSync(config.get("html:views")+"/emails/activate.html", "utf-8");
        var msg = new Email({
            from: config.get("email:from"),
            to: user.email,
            subject: "Activate Account with " + config.get("brand:name"),
            bodyType: "html",
            body: Handlebars.compile(template)({
                brandName: config.get("brand:name"),
                link: "/account/activate?code="+user.activationCode,
                user: user
            }),
            altText: "Welcome to "+ config.get("brand:name") + ", "+user.username+"\n\n" +
                    "Activate your account with this link: \n\n" +
                    "/account/activate?code="+user.activationCode
        });
        msg.send(cb);
    }
};

module.exports = email;