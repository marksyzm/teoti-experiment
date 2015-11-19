'use strict';

var gulp = require("gulp");
var webpack = require("webpack-stream");
var _ = require("lodash");
var config = require("../../lib/shared/config");
var webpackConfig = require("../../lib/templates/"+config.get("template")+"/webpack.config");

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function () {
    var webpackBuildConfig = _.clone(webpackConfig);
    webpackBuildConfig.plugins = webpackBuildConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
    return gulp.src("lib/templates/"+config.get("template")+"/index.js")
        .pipe(webpack(webpackBuildConfig))
        .pipe(gulp.dest("public/bundle"));
});

gulp.task("build-dev", ["webpack:build-dev"]);

gulp.task("webpack:build-dev", function () {
    var webpackBuildDevConfig = _.clone(webpackConfig);
    webpackBuildDevConfig.devtool = "source-map";
    webpackBuildDevConfig.debug = true;
    webpackBuildDevConfig.watch = true;

    return gulp.src("lib/templates/"+config.get("template")+"/index.js")
        .pipe(webpack(webpackBuildDevConfig))
        .pipe(gulp.dest("public/bundle"));
});