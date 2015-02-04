"use strict";

var path        = require("path"),
    express     = require("express"),
    exphbs      = require("express-handlebars"),
    session     = require("express-session"),
    bodyParser  = require("body-parser");

var auth        = require("./authentication"),
    config      = require("./config"),
    routes      = require("./routes"),
    publicDir   = path.resolve(config.get("html:path")),
    views       = path.resolve(config.get("html:views")),
    layouts     = path.resolve(config.get("html:layouts")),
    partials    = path.resolve(config.get("html:partials")),
    app         = express();

app.engine(".html", exphbs({ defaultLayout: "layout", layoutsDir: layouts, partialsDir: partials, "extname": ".html" }));
app.set("view engine", ".html");
app.set("views", views);
app.set("host", config.get("express:host"));
app.set("port", config.get("express:port"));
app.set("name", config.get("express:name"));

app.use(session(config.get("express:session")));
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth.passport.initialize());
app.use(auth.passport.session());

for (var route in routes) {
    if (route === "home") {
        continue;
    }
    app.use("/"+route, routes[route].router);
}
app.use("/", routes.home.router);

//var server = app.listen(app.get("port"));
app.listen(app.get("port"));

console.info("Server running in port #"+app.get("port"));