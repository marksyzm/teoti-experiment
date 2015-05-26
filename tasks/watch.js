'use strict';

var gulp = require('gulp');
var _ = require('lodash');

gulp.task('watch-items', function () {
    gulp.watch('./public/sass/**', ['sass']);
});

gulp.task('build-watch', ['sass', 'watch-items', 'browserify-watch', 'nodemon']);

gulp.task('watch', ['build-watch']);