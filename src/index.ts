'use strict'

const uglifyPHP = require('uglify-php');

const through = require('through2');
const gutil = require('gulp-util');

// file can be a vinyl file object or a string
// when a string it will construct a new one
module.exports = function(opt: object) {
    return through.obj(function (file: any, enc: any, callback: Function) {
        var isBuffer: boolean,
            outBuffer: any;
        //Empty file and directory not supported
        if (file === null || file.isDirectory()) {
            this.push(file);
            return callback();
        }
        isBuffer = file.isBuffer();
        if(isBuffer){
            uglifyPHP.minify(file.path).then(function (result: string) {
                outBuffer = new Buffer(result);
                var aFile = new gutil.File();
                aFile.path = file.path;
                aFile.contents = outBuffer;
                callback(null,aFile);
            });
        }else{
            this.emit('error',
                new gutil.PluginError("gulp-php-obfuscator",
                    'Only Buffer format is supported'));
            callback();
        }
    });
};