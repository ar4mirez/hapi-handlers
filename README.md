# hapi-handlers
[![Build Status][travis-badge]][travis-url]
[![Dependencies][david-badge]][david-url]
[![Dev dependencies][david-dev-badge]][david-url]

[travis-badge]: https://travis-ci.com/ar4mirez/hapi-handlers.svg?token=Y5c2Yh3HiTw9G5oH7ZkQ&branch=master
[travis-url]: https://travis-ci.com/ar4mirez/hapi-handlers
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
