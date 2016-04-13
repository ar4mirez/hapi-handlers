# hapi-handlers
[![Npm Version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Dependencies][david-badge]][david-url]
[![Dev dependencies][david-dev-badge]][david-url]

[![NPM](https://nodei.co/npm/hapi-handlers.png)](https://nodei.co/npm/hapi-handlers/)

[npm-badge]: https://badge.fury.io/js/hapi-handlers.svg
[npm-url]: https://badge.fury.io/js/hapi-handlers
[travis-badge]: https://travis-ci.org/ar4mirez/hapi-handlers.svg?branch=master
[travis-url]: https://travis-ci.org/ar4mirez/hapi-handlers
[david-badge]: https://david-dm.org/ar4mirez/hapi-handlers.svg
[david-dev-badge]: https://david-dm.org/ar4mirez/hapi-handlers/dev-status.svg
[david-url]: https://david-dm.org/ar4mirez/hapi-handlers
[david-dev-url]: https://david-dm.org/ar4mirez/hapi-handlers#info=devDependencies

Plugin to autoload handlers based on patterns.

### How to use:
- Install `hapi-handlers` npm package in your project our plugin.
`npm i hapi-handlers`
- Register plugin in your hapi server:

### Registering

```javascript
const server = new Hapi.Server();

server.connection();

server.register({
    register: require('hapi-handlers'),
    options: {dir: 'path/to/handlers'}
}, (err) => {
  // continue application
});
```

manifest style:
```javascript
registrations: [
    ...
    {
        plugin: {
            register: 'hapi-handlers',
            options: {
                dir: 'path/to/handlers'
            }
        }
    }
];
```

Your handlers are available in your routes using the handle file name:
```javascript

server.route({
    method: 'GET',
    path: '/route',
    config: {
        handler: {
            handlerName: {} // assuming your handle file is handlerName
        }
    }
})
```

#### Handler Signature
```javascript
'use strict';

module.exports = (route, options) => {

    return (request, reply) => {

        return reply({
            message: 'Hello World.'
        });
    };
};
```
