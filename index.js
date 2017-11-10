'use strict';

const uglifyPHP = require('uglify-php');

var through = require('through2');
var gutil = require('gulp-util')

// file can be a vinyl file object or a string
// when a string it will construct a new one
module.exports = function(opt) {
    return through.obj(function (file, enc, callback) {
        var isBuffer = false,
            inputString = null,
            result = null,
            outBuffer=null;
        //Empty file and directory not supported
        if (file === null || file.isDirectory()) {
            this.push(file);
            return callback();
        }
        isBuffer = file.isBuffer();
        if(isBuffer){
            uglifyPHP.minify(file.path, opt).then(function (result) {
                outBuffer = new Buffer(result);
                var aFile = new gutil.File();
                aFile.path = file.path;
                aFile.contents = outBuffer;
                callback(null,aFile);
            });
        }else{
            this.emit('error',
                new PluginError("gulp-php-obfuscator",
                    'Only Buffer format is supported'));
            callback();
        }
    });
};