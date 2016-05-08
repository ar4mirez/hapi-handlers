'use strict';

const Async = require('async');
const Glob = require('glob');
const Path = require('path');

exports.register = (server, options, next) => {

    const isArray = Array.isArray || function (arr) {

        return {}.toString.call(arr) === '[object Array]';
    };

    const cast = (value) => {

        return isArray(value) ? value : [value];
    };

    const globtions = {
        nodir: true,
        strict: true,
        ignore: options.ignores && cast(options.ignores) || [],
        cwd: options.relativeTo || process.cwd()
    };

    Async.each(cast(options.includes), (pattern, nextPattern) => {

        const matches = Glob.sync(pattern, globtions);

        if (matches.length === 0) {
            return nextPattern('No handler files found for pattern ' + pattern);
        }

        Async.each(matches, (match, nextMatch) => {

            const load = require(globtions.cwd + '/' + match);
            server.handler(Path.basename(match, Path.extname(match)), load.default || load);

            return nextMatch();

        }, (err) => {

            return nextPattern(err);
        });

    }, (err) => {

        return next(err);
    });
};


exports.register.attributes = {
    pkg: require('../package.json')
};
