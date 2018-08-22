'use strict';

module.exports = (config, params, respond) => {
    // call the 'respond' callback whenever the script is finished
    // so it is even possible to do this with asynchronous tasks
    setTimeout(() => respond({success: true}), 2000);
};