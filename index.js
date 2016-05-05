/**
 * @file gulp-md5-renamer
 * @author luwenlong(zuiwosuifeng@gmail.com)
 */

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var crypto = require('crypto');
var glob = require('glob');

module.exports = function (size, ifile, mapping) {
    size = size || 10;
    return through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-md5-renamer', 'Streaming not supported'));
            return cb();
        }

        if(!file.contents){
            return cb();
        }

        var hash = calcMd5(file, size);
        var filename = path.basename(file.path);
        var relativepath = path.relative(file.base ,file.path);
        var subname = relativepath.replace(new RegExp(filename) , '').replace('/', '');
        var dir;

        if(file.path[0] === '.'){
            dir = path.join(file.base, file.path);
        }
        else {
            dir = file.path;
        }

        dir = path.dirname(dir);

        var md5_filename = filename.split('.')
            .map(function(item, i, arr){
                return i == arr.length - 2 ? item + '_'+ hash : item;
            })
            .join('.');

        // 适用于html文件的目录名/文件名与资源目录名一致的情况
        if (Array.isArray(ifile)) {
            ifile.forEach(function(i_ifile){
                i_ifile && glob(i_ifile, function(err, i_files){
                    if (err) {
                        return console.log(err);
                    }

                    i_files.forEach(function (i_ilist) {
                        if (i_ilist.indexOf(subname) > -1) {
                            var result = fs.readFileSync(i_ilist, 'utf8')
                                .replace(new RegExp(filename,"g"), md5_filename);

                            fs.writeFileSync(i_ilist, result, 'utf8');
                        }
                    })
                })
            })
        }
        else {
            ifile && glob(ifile, function(err, files){
                if (err) {
                    return console.log(err);
                }

                files.forEach(function (ilist) {
                    if (ilist.indexOf(subname) > -1) {
                        var result = fs.readFileSync(ilist, 'utf8')
                            .replace(new RegExp(filename,"g"), md5_filename);

                        fs.writeFileSync(ilist, result, 'utf8');
                    }
                });
            })
        }

        // 根据映射文件替换
        if (!!mapping) {
            for (var sn in mapping) {
                glob(file.base + '**/' + mapping[sn], function (err, files) {
                    if (err) {
                        return console.log(err);
                    }

                    files.forEach(function (file) {
                        if (subname === sn) {
                            var result = fs.readFileSync(file, 'utf8')
                                .replace(new RegExp(filename,"g"), md5_filename);

                            fs.writeFileSync(file, result, 'utf8');
                        }
                    });
                })
            }
        }

        file.path = path.join(dir, md5_filename);

        this.push(file);

        cb();
    }, function (cb) {
        cb();
    });
};


function calcMd5(file, slice){
    var md5 = crypto.createHash('md5');
    md5.update(file.contents, 'utf8');

    return slice > 0 ? md5.digest('hex').slice(0, slice) : md5.digest('hex');
}
