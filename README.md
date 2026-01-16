# hapi-handlers

[![npm version](https://img.shields.io/npm/v/hapi-handlers.svg)](https://www.npmjs.com/package/hapi-handlers)
[![CI](https://github.com/ar4mirez/hapi-handlers/actions/workflows/ci.yml/badge.svg)](https://github.com/ar4mirez/hapi-handlers/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/node/v/hapi-handlers.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Plugin to autoload handlers for [hapi.js](https://hapi.dev/) based on glob patterns.

## Requirements

- **Node.js** >= 18.0.0
- **@hapi/hapi** >= 21.0.0

## Installation

```bash
npm install hapi-handlers
```

## Usage

### Basic Registration

```javascript
const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({ port: 3000 });

    await server.register({
        plugin: require('hapi-handlers'),
        options: {
            includes: 'path/to/**/*Handler.js'
        }
    });

    // Your handlers are now available
    server.route({
        method: 'GET',
        path: '/hello',
        handler: {
            helloHandler: {
                message: 'Hello World!'
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
```

### Multiple Patterns

```javascript
await server.register({
    plugin: require('hapi-handlers'),
    options: {
        includes: [
            'handlers/**/*.js',
            'api/**/handler.js'
        ],
        ignores: ['**/*.test.js']
    }
});
```

### With Glue/Confidence Manifest

```javascript
const manifest = {
    server: {
        port: 3000
    },
    register: {
        plugins: [
            {
                plugin: 'hapi-handlers',
                options: {
                    includes: 'handlers/**/*.js',
                    relativeTo: __dirname
                }
            }
        ]
    }
};
```

## Options

### `includes` (required)

- **Type:** `string` | `string[]`
- **Description:** The [glob](https://github.com/isaacs/node-glob) pattern(s) to match handler files.

```javascript
// Single pattern
includes: 'handlers/**/*.js'

// Multiple patterns
includes: ['handlers/**/*.js', 'api/**/handler.js']
```

### `ignores`

- **Type:** `string` | `string[]`
- **Description:** Pattern(s) to exclude from matching.

```javascript
ignores: ['**/*.test.js', '**/*.spec.js']
```

### `relativeTo`

- **Type:** `string`
- **Default:** `process.cwd()`
- **Description:** The base directory for resolving patterns.

```javascript
relativeTo: __dirname
```

## Handler Signature

Handler files should export a function that returns a hapi handler function:

```javascript
// handlers/userHandler.js
'use strict';

module.exports = (route, options) => {
    // route: the hapi route configuration
    // options: options passed from route handler config

    return (request, h) => {
        return {
            message: options.message || 'Default message',
            user: request.params.id
        };
    };
};
```

### Using the Handler

```javascript
server.route({
    method: 'GET',
    path: '/user/{id}',
    handler: {
        userHandler: {
            message: 'User details'
        }
    }
});
```

### Async Handlers

```javascript
module.exports = (route, options) => {
    return async (request, h) => {
        const user = await fetchUser(request.params.id);
        return user;
    };
};
```

## Migration from v2/v3

Version 4.0.0 has breaking changes to support hapi v21+:

### Plugin Registration

```javascript
// v2/v3 (hapi v13-v16)
server.register({
    register: require('hapi-handlers'),
    options: { ... }
}, callback);

// v4 (hapi v21+)
await server.register({
    plugin: require('hapi-handlers'),
    options: { ... }
});
```

### Handler Signature

```javascript
// v2/v3
module.exports = (route, options) => {
    return (request, reply) => {
        return reply({ message: 'Hello' });
    };
};

// v4
module.exports = (route, options) => {
    return (request, h) => {
        return { message: 'Hello' };
        // or: return h.response({ message: 'Hello' });
    };
};
```

### Server Connection

```javascript
// v2/v3
const server = new Hapi.Server();
server.connection({ port: 3000 });

// v4
const server = Hapi.server({ port: 3000 });
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT - see [LICENSE](LICENSE) for details.
