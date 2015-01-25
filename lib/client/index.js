"use strict";

var express     = require("express"),
    session     = require("express-session"),
    validate    = require("express-validation"),
    bodyParser  = require("body-parser");

var auth        = require("./authentication");

var publicDir   = __dirname + "/" + config.get("html:path"),
    views       = __dirname + "/" + config.get("html:views");

app.set("view engine", "ejs");
app.set("views", views);
app.set("view options", { layout: views + "/layout.ejs", root: views });
app.set("host", config.get("express:host"));
app.set("port", config.get("express:port"));
app.set("name", config.get("express:name"));

app.use( session({
    secret: config.get("express:session:secret"),
    resave: config.get("express:session:resave"),
    saveUninitialized : config.get("express:session:saveUninitialized")
}));
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(auth.passport.initialize());
app.use(auth.passport.session());