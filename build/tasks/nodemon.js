'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
    return nodemon({
        ignore: [
            'node_modules/**',
            'public/js/**',
            'tasks/**'
        ],
        script: 'nodemon-combined.js',
        ext: 'js jsx',
        env: { 'NODE_ENV': 'development' }
    });
})