"use strict";

module.exports = function mocha_istanbul(grunt) {
	grunt.loadNpmTasks("grunt-mocha-istanbul");

	return {
        coverage: {
            src: "test",
            options: {
                coverage:true
            }
        },
        coveralls: {
            src: "test",
            options: {
                coverage:true
            }
        }
	};
};
