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
    gulp.src('dist/**/index.css')
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
    gulp.src('dist/**/index.css')
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

## Introduction
    + The plugin is used on the JS and CSS of the final output. The reference of CSS in the page is `/path/to/index.css`, and finally replaced by `/path/to/index.[hash].css. the reference of js in the page is `path/to/main.js`, finally replaced by `/path/to/main.[hash].js`.
    + If the item name is the same as the HTML file name (if the HTML file is the index.html, it's catalog name), pass in the `path` parameter.
    + If its are different, such as HTML's filename is landing_5.html, the reference to the static resource directory is the landing5. now pass in the `mapping` parameter
    + 该插件作用在最终产出的js和css上.页面中对css的引用为`/path/to/index.css`,插件作用后替换为`/path/to/index.hash.css`, 对js的引用为`/path/to/main.js`, 插件作用后替换为`/path/to/main.hash.js`
    + 如果项目名与html文件名(若html文件为index.html其目录名)相同，则传入`path`参数即可.
    + 如果二者不同，如html为landing_5.html，其引用的静态资源所在目录为landing5.二者不一致，此时传入`mapping`参数
        ```
        {landing5: 'landing_5.html'}
        ```

## TODO
    unit test
    demo
    support AMD style

## thanks & Inspired

[gulp-md5-plus](https://www.npmjs.com/package/gulp-md5-plus)
