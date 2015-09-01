var gulp = require('gulp');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('./public/sass/style.scss')
        .pipe(autoprefixer({ browsers: 'last 2 version', cascade: false }))
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest('./public/css/'));
});