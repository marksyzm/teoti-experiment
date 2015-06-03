'use strict';

var transformTools = require('browserify-transform-tools');
var templateReplaceRegEx = /["']\+config\.template\+["']/;
var config = require("../lib/shared/config");

var transformRequires = transformTools.makeRequireTransform(
    'requireTemplate',
    { evaluateArguments: true, excludeExtensions: [ ".json" ] },
    function (args, opts, cb) {
        if (args[0].match(templateReplaceRegEx)) {
            var newRequire = "require("+args[0].replace(templateReplaceRegEx, config.get("template"))+ ")";
            return cb(null, newRequire);
        }
        cb();
    }
);

module.exports = transformRequires;