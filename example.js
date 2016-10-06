"use strict";

// always (!) export an executing function with the following parameters:
// - 'params' contains the url given parameters
// - 'respond' is a callback function to tell the server the script is finished
// - 'error' is an optional callback you can use to respond errors and failed executions
module.exports = function(params, respond, error) {
    // call the 'respond' callback whenever the script is finished
    respond({success: true});
};