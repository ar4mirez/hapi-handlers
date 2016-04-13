'use strict';

const Fs = require('fs');
const Async = require('async');

exports.register = function (server, options, next) {

    return Fs.readdir(options.dir, (err, list) => {

        if (err) {
            return next(err);
        }

        return Async.each(list, (file, callback) => {

            const path = process.cwd() + '/' + options.dir + '/' + file;
            const handler = require(path);

            server.handler(file.replace(/\.js/, ''), handler);

            return callback();
        }, () => {

            server.log(['hapi-handlers'], 'Registered all handlers in ' + options.dir);

            return next();
        });
    });
};


exports.register.attributes = {
    pkg: require('../package.json')
};
