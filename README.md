## gulp-md5-renamer
    Add a MD5 fingerprint to a static resource and replace the reference to these resources in the HTML file

## Install

```
npm i gulp-md5-renamer --save-dev
```

## Basic usage

```
var gulp = require('gulp');
var md5Renamer = require('gulp-md5-renamer');

gulp.task('md5:js', function (done) {
    gulp.src('dist/**/main.js')
        .pipe(md5(
            10,
            'dist/views/*.html',
        ))
        .pipe(gulp.dest('dist'))
        .on('end', done);
});

gulp.task('md5:css', function (done) {
    gulp.src('dist/**/index.js')
        .pipe(md5(
            10,
            'dist/views/*.html',
        ))
        .pipe(gulp.dest('dist'))
        .on('end', done);
});

gulp.task('default', ['md5:js', 'md5:css']);
```

### Advanced usage

```
var gulp = require('gulp');
var md5Renamer = require('gulp-md5-renamer');

gulp.task('md5:js', function (done) {
    gulp.src('dist/**/main.js')
        .pipe(md5(
            10,
            ['dist/views/*.html', 'dist/views/**/*.html'],
            {submenu: 'special_html_path.html'}
        ))
        .pipe(gulp.dest('dist'))
        .on('end', done);
});

gulp.task('md5:css', function (done) {
    gulp.src('dist/**/index.js')
        .pipe(md5(
            10,
            ['dist/views/*.html', 'dist/views/**/*.html'],
            {submenu: 'special_html_path.html'}
        ))
        .pipe(gulp.dest('dist'))
        .on('end', done);
});

gulp.task('default', ['md5:js', 'md5:css']);
```

## API

### size

Type: `Number`  
Desc: `the length of md5 value.`  
Default: `10`

### path

    Type: `String or Array`
    Desc: `path of html files`
    Default: `Null`

### mapping

    Type: `Object`
    Desc: `Define the mapping relationship between the special HTML file and the reference file`
    Default: `Null`

## TODO
    unit test
    demo

## thanks & Inspired

[gulp-md5-plus](https://www.npmjs.com/package/gulp-md5-plus)
