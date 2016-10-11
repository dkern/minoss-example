"use strict";

// always export an executing function with the following parameters:
// - 'config' contains all configuration files for this module
// - 'params' contains the url given parameters
// - 'respond' is a callback function to tell the server the script is finished
// - 'error' is an optional callback you can use to respond errors and failed executions
module.exports = function(config, params, respond) {
    // call the 'respond' callback whenever the script is finished
    respond({success: true});
};