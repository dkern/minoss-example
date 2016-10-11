"use strict";

module.exports = function(config, params, respond) {
    // the 'config' parameter contains all configurations of this
    // module, stored in the 'config/' folder
    // the filename of the configuration are the properties of the 'config' object
    // so you can access the `test.js` configuration like this:

    respond({
        success: true, 
        configValue: config.test.myConfigName
    });
};