'use strict';

var uglifyPHP = require("uglify-php"), path = require("path");
module.exports = function(a, b) {
    if (!a) {
        throw Error("gulp-php-obfuscator: Missing file option");
    }
    b = b || {};
    if ("string" !== typeof a) {
        if ("string" === typeof a.path) {
            path.basename(a.path);
        } else {
            throw Error("gulp-php-obfuscator: Missing path in file options");
        }
    }
    uglifyPHP.minify(a, b).then(function(a) {
        return a;
    });
};