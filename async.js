"use strict";

module.exports = function(config, params, respond) {
    // call the 'respond' callback whenever the script is finished
    // so it is even possible to do this with asynchronous tasks
    setTimeout(function() {
        respond({success: true});
    }, 2000);
};