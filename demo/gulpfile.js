/**
 * @file gulp-md5-renamer demo
 * @author luwenlong(zuiwosuifeng@gmail.com)
 */

var gulp = require('gulp');
var md5Renamer = require('gulp-md5-renamer');

gulp.task('copy', function (done) {
    gulp.src('src/**/*')
        .pipe(gulp.dest('dist'))
        .on('end', done);
});

gulp.task('md5:js', ['copy'], function (done) {
    gulp.src('dist/**/main.js')
        .pipe(md5Renamer(
            10,
            ['dist/views/*.html', 'dist/views/**/*.html'],
            {landing3: 'landing_3.html'}
        ))
        .pipe(gulp.dest('dist'))
        .on('end', done);
});

gulp.task('md5:css', ['copy'], function (done) {
    gulp.src('dist/**/index.css')
        .pipe(md5Renamer(
            10,
            ['dist/views/*.html', 'dist/views/**/*.html'],
            {landing3: 'landing_3.html'}
        ))
        .pipe(gulp.dest('dist'))
        .on('end', done);
});

gulp.task('default', ['md5:js', 'md5:css']);
