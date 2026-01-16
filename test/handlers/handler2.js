'use strict';

module.exports = (route, options) => {

    return (request, h) => {

        return 'new handler: ' + options.msg;
    };
};
