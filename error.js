'use strict';

module.exports = (config, params, respond, error) => {
    // call the 'error' callback whenever the script has failed
    // you may add a custom message
    error('something went wrong');
};