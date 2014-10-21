"use strict";

module.exports = function watch(grunt) {
	grunt.loadNpmTasks("grunt-contrib-watch");

	return {
        sass: {
            files: ["public/css/**/*.scss", "public/sass/**/*.scss"],
            tasks: ["sass:dev"]
        },
        validation: {
            files: ["public/views/**/*.html"],
            tasks: ["validation"]
        },
        jshint: {
            files: [
                "public/js/app/**/*.js",
                "public/js/test/**/*.js",
                "app/**/*.js",
                "index.js"
            ],
            tasks: ["jshint"]
        },
        server: {
            files: [
                "index.js",
                "app/**"
            ],
            options: {
                autoreload: true,
                ignore: [
                    "node_modules/**/*.js",
                    "public/js/**"
                ]
            }
        }
    };
};