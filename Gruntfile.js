"use strict";

module.exports = function (grunt) {

    require("grunt-config-dir")(grunt, {
        configDir: require("path").resolve("tasks")
    });

    grunt.registerTask("test-cov",    [ "env:test", "mongoimport", "jshint", "mochacli:tests", "mocha_istanbul:coverage"]);
    grunt.registerTask("test",        [ "env:test", "mongoimport", "jshint", "mochacli:tests" ]);
    grunt.registerTask("coverage",    [ "env:test", "mongoimport", "jshint", "mocha_istanbul:coverage" ]);
    grunt.registerTask("coveralls",   [ "env:test", "mongoimport", "jshint", "mocha_istanbul:coveralls" ]);
    grunt.registerTask("dev",         [ "watchers", "sass:dev", "concurrent:target"]);
    grunt.registerTask("default",     [ "watchers", "sass:dist"]);
    grunt.registerTask("package",     [ "default"]);
    grunt.registerTask("watchers",    [ "jshint" ]);
    grunt.registerTask("lint",        [ "jshint" ]);
};