"use strict";

module.exports = function env(grunt) {
	grunt.loadNpmTasks("grunt-env");

	return {
		test: { NODE_ENV: "TEST" },
		coverage: { NODE_ENV: "COVERAGE" }
	};
};
