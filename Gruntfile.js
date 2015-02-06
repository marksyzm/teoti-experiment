"use strict";

module.exports = function (grunt) {

    require("grunt-config-dir")(grunt, {
        configDir: require("path").resolve("tasks")
    });

    grunt.registerTask("test-cov",    [ "env:test", "mongoimport", "lint", "mochacli:tests", "mocha_istanbul:coverage"]);
    grunt.registerTask("test",        [ "env:test", "mongoimport", "lint", "mochacli:tests" ]);
    grunt.registerTask("coverage",    [ "env:test", "mongoimport", "lint", "mocha_istanbul:coverage" ]);
    grunt.registerTask("coveralls",   [ "env:test", "mongoimport", "lint", "mocha_istanbul:coveralls" ]);
    grunt.registerTask("dev",         [ "build", "concurrent:target" ]);
    grunt.registerTask("build",       [ "browserify:dev", "lint", "sass:dev" ]);
    grunt.registerTask("default",     [ "browserify:dist", "lint", "sass:dist" ]);
    grunt.registerTask("package",     [ "default"]);
    grunt.registerTask("lint",        [ "jshint" ]);
};