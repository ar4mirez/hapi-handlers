'use strict';

const Cast = require('cast-array');
const Async = require('async');
const Glob = require('glob');
const Path = require('path');

exports.register = (server, options, next) => {

    const globtions = {
        nodir: true,
        strict: true,
        ignore: options.ignores && Cast(options.ignores) || [],
        cwd: options.relativeTo || process.cwd()
    };

    Async.each(Cast(options.includes), (pattern, nextPattern) => {

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
