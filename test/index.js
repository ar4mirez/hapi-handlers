'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Plugin = require('../');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const it = lab.it;

const internals = {
    info: require('../package')
};

describe(internals.info.name + ' plugin registration.', () => {

    let server;

    beforeEach((done) => {

        server = new Hapi.Server();

        return done();
    });

    it('registers successfully', (done) => {

        server.register({
            register: Plugin,
            options: {
                includes: 'test/handlers/**/*.js'
            }
        }, (err) => {

            expect(err).to.not.exist();

            return done();
        });
    });

    it('returns an error if no files loaded', (done) => {

        server.register({
            register: Plugin,
            options: {
                includes: 'does/not/exist/**/*.js'
            }
        }, (err) => {

            expect(err).to.exist();
            expect(err).to.include('No handler files found for pattern');

            return done();
        });
    });
});

describe(internals.info.name + ' functionality.', () => {

    let server;

    beforeEach((done) => {

        server = new Hapi.Server();
        server.connection();
        server.register({
            register: Plugin,
            options: {
                includes: 'test/handlers/**/*.js'
            }
        }, done);
    });

    beforeEach((done) => {

        server.route({
            method: 'GET',
            path: '/route1',
            handler: {
                handler1: {
                    msg: 'Handler.'
                }
            }
        });

        server.initialize(done);
    });

    it('able to execute handler1.', (done) => {

        server.inject({
            method: 'GET',
            url: '/route1'
        }, (res) => {

            expect(res.statusCode).to.be.equal(200);

            return done();
        });
    });
});
