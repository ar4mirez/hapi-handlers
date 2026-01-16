# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.0] - 2025-01-16

### Breaking Changes

- **Node.js**: Minimum version is now 18.0.0 (was 4.0.0)
- **hapi**: Now requires @hapi/hapi v21+ (was hapi v13)
- **Plugin format**: Changed from `exports.register` to `exports.plugin` (hapi v17+ standard)
- **Handler signature**: Changed from `(request, reply)` to `(request, h)` response toolkit
- **Registration**: Now async/await based (throws errors instead of callbacks)

### Added

- Async/await support throughout the codebase
- Input validation for required `includes` option
- Comprehensive test suite with 8 test cases
- 97% code coverage
- GitHub Actions CI/CD workflows
- Support for ES module default exports in handlers
- Modern badges in README

### Changed

- Updated `glob` from v7 to v10.4.5 (native Promise support)
- Updated `@hapi/lab` to v26.0.0
- Updated `@hapi/code` to v9.0.3
- Use `server.decorate('handler', ...)` for handler registration
- Modernized README with migration guide and better examples

### Removed

- Removed `async` dependency (replaced with native async/await)
- Removed npm-shrinkwrap.json (outdated)
- Removed Travis CI configuration (replaced with GitHub Actions)

## [3.0.0] - 2016-05-09

### Changed

- Updated npm version metadata

## [2.0.0] - 2016-05-08

### Added

- `includes` option: accepts single string or array for multiple glob patterns
- `ignores` option: pattern(s) to exclude files
- `relativeTo` option: base directory for pattern resolution

### Removed

- `dir` option (replaced by `includes` with glob patterns)

## [1.0.0] - 2016-05-07

### Added

- Initial release
- Basic handler autoloading from directory
