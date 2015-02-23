"use strict";

module.exports = function (grunt) {

    require("grunt-config-dir")(grunt, {
        configDir: require("path").resolve("tasks")
    });

    grunt.registerTask("test-cov",    [ "env:test", "lint", "browserify:dist", "mochacli:tests", "mocha_istanbul:coverage"]);
    grunt.registerTask("test",        [ "env:test", "lint", "browserify:dist", "mochacli:tests" ]);
    grunt.registerTask("coverage",    [ "env:test", "lint", "browserify:dist", "mocha_istanbul:coverage" ]);
    grunt.registerTask("coveralls",   [ "env:test", "lint", "browserify:dist", "mocha_istanbul:coveralls" ]);
    grunt.registerTask("dev",         [ "build", "concurrent:target" ]);
    grunt.registerTask("build",       [ "lint", "browserify:dev", "sass:dev" ]);
    grunt.registerTask("default",     [ "lint", "browserify:dist", "sass:dist" ]);
    grunt.registerTask("package",     [ "default"]);
    grunt.registerTask("lint",        [ "jshint" ]);
};