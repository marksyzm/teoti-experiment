"use strict";

module.exports = function env(grunt) {
    grunt.loadNpmTasks("grunt-browserify");

    return {
        dist: {
            files: {
                "public/js/app.js": ["client/js/src/**/*.js"]
            }
        }
    };
};