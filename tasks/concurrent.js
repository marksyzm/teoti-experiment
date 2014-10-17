"use strict";

module.exports = function concurrent(grunt) {
	grunt.loadNpmTasks("grunt-concurrent");

	return {
        target: ["watch", "nodemon:dev"],
        options: {
            logConcurrentOutput: true
        }
    };
};