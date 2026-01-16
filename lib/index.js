'use strict';

const { glob } = require('glob');
const Path = require('path');

const internals = {};

internals.cast = (value) => {

    return Array.isArray(value) ? value : [value];
};

exports.plugin = {
    pkg: require('../package.json'),

    register: async function (server, options) {

        if (!options.includes) {
            throw new Error('The "includes" option is required');
        }

        const patterns = internals.cast(options.includes);
        const ignores = options.ignores ? internals.cast(options.ignores) : [];
        const cwd = options.relativeTo || process.cwd();

        for (const pattern of patterns) {
            const matches = await glob(pattern, {
                nodir: true,
                ignore: ignores,
                cwd
            });

            if (matches.length === 0) {
                throw new Error(`No handler files found for pattern "${pattern}"`);
            }

            for (const match of matches) {
                const fullPath = Path.join(cwd, match);
                const handlerName = Path.basename(match, Path.extname(match));
                const load = require(fullPath);

                const handler = load.default || load;

                server.decorate('handler', handlerName, handler);
            }
        }
    }
};
