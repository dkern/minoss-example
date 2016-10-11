"use strict";

module.exports = function(config, params, respond) {
    // the 'params' parameter contains all url parameters of this request
    // there will always be at least 'module', 'script' and 'output' property set
    // to access the data use the parameter name as property

    var value = config.test.myConfigName;
    respond({
        success : true,
        module  : params.module,
        script  : params.script,
        output  : params.output,
        test    : params.test || "try to call this script with url parameter '?test=your value'"
    });
};