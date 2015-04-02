"use strict";

var path        = require("path"),
    express     = require("express"),
    flash       = require("connect-flash"),
    bodyParser  = require("body-parser");

var auth        = require("./authentication"),
    config      = require("./config"),
    routes      = require("./routes"),
    middleware  = require("./middleware"),
    app         = express();

require("node-jsx").install({ extension: ".jsx" });

app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.set("views", path.resolve(config.get("html:views")));
app.set("host", config.get("express:host"));
app.set("port", config.get("express:port"));
app.set("name", config.get("express:name"));

app.use(middleware.session);
app.use(middleware.noCache);
app.use(express.static(path.resolve(config.get("html:path"))));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(auth.passport.initialize());
app.use(auth.passport.session());

//app.param("forumSlug", middleware.forumSlug);

for (var route in routes) {
    if (route === "forum") { continue; }
    app.use("/"+route, routes[route].router);
}
app.use("/", routes.forum.router);
app.use(middleware.error);

app.listen(app.get("port"));
console.info(app.get("name")+" server running in port #"+app.get("port"));