'use strict';

const Hapi = require('@hapi/hapi');
const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Plugin = require('../');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const { beforeEach, describe, it } = lab;

const internals = {
    info: require('../package')
};

describe(internals.info.name + ' plugin registration.', () => {

    let server;

    beforeEach(() => {

        server = Hapi.server();
    });

    it('registers successfully', async () => {

        await server.register({
            plugin: Plugin,
            options: {
                includes: 'test/handlers/**/*.js'
            }
        });

        expect(server.registrations[internals.info.name]).to.exist();
    });

    it('returns an error if no files loaded', async () => {

        await expect(
            server.register({
                plugin: Plugin,
                options: {
                    includes: 'does/not/exist/**/*.js'
                }
            })
        ).to.reject(Error, 'No handler files found for pattern "does/not/exist/**/*.js"');
    });

    it('returns an error if includes option is missing', async () => {

        await expect(
            server.register({
                plugin: Plugin,
                options: {}
            })
        ).to.reject(Error, 'The "includes" option is required');
    });

    it('handles multiple include patterns', async () => {

        await server.register({
            plugin: Plugin,
            options: {
                includes: ['test/handlers/handler1.js', 'test/handlers/handler2.js']
            }
        });

        expect(server.registrations[internals.info.name]).to.exist();
    });

    it('respects ignore patterns', async () => {

        await expect(
            server.register({
                plugin: Plugin,
                options: {
                    includes: 'test/handlers/**/*.js',
                    ignores: ['test/handlers/**/*.js']
                }
            })
        ).to.reject(Error, 'No handler files found for pattern "test/handlers/**/*.js"');
    });

    it('uses relativeTo option for base path', async () => {

        await server.register({
            plugin: Plugin,
            options: {
                includes: 'handlers/**/*.js',
                relativeTo: process.cwd() + '/test'
            }
        });

        expect(server.registrations[internals.info.name]).to.exist();
    });
});

describe(internals.info.name + ' functionality.', () => {

    let server;

    beforeEach(async () => {

        server = Hapi.server();

        await server.register({
            plugin: Plugin,
            options: {
                includes: 'test/handlers/**/*.js'
            }
        });

        server.route({
            method: 'GET',
            path: '/route1',
            handler: {
                handler1: {
                    msg: 'Handler.'
                }
            }
        });

        await server.initialize();
    });

    it('able to execute handler1.', async () => {

        const res = await server.inject({
            method: 'GET',
            url: '/route1'
        });

        expect(res.statusCode).to.equal(200);
        expect(res.payload).to.equal('new handler: Handler.');
    });

    it('able to use handler2.', async () => {

        server.route({
            method: 'GET',
            path: '/route2',
            handler: {
                handler2: {
                    msg: 'Second Handler.'
                }
            }
        });

        const res = await server.inject({
            method: 'GET',
            url: '/route2'
        });

        expect(res.statusCode).to.equal(200);
        expect(res.payload).to.equal('new handler: Second Handler.');
    });
});
