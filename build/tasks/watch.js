'use strict';

var gulp = require('gulp');

gulp.task('build-watch', ['build-dev', 'nodemon']);
gulp.task('watch', ['build-watch']);