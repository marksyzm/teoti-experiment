'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
    return nodemon({
        ignore: [
            'lib/browser/**',
            'lib/templates/**',
            'node_modules/**',
            'public/**',
            'build/**'
        ],
        script: 'nodemon-combined.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });
})