'use strict';

const Lab = require('lab');
const Code = require('code');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const beforeEach = lab.beforeEach;
const expect = Code.expect;
const Hapi = require('hapi');

const internals = {
    info: require('../package')
};

describe(internals.info.name + ' plugin registration.', () => {

    it('registers successfully', (done) => {

        const server = new Hapi.Server();
        server.register({
            register: require('../'),
            options: { dir: 'test/artifacts' }
        }, (err) => {

            expect(err).to.not.exist();
            done();
        });
    });

    it('returns an error on invalid dir option', (done) => {

        const server = new Hapi.Server();
        server.connection();

        return server.register({
            register: require('../'),
            options: { dir: 'test/invalid' }
        }, (err) => {

            expect(err).to.exist();
            expect(err.message).to.include('ENOENT');

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
            register: require('../'),
            options: { dir: 'test/artifacts' }
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
