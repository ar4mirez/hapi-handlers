# Contributing to hapi-handlers

Thank you for your interest in contributing to hapi-handlers! This document provides guidelines for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We welcome contributions from everyone.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Setup

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/hapi-handlers.git
   cd hapi-handlers
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run tests to ensure everything works:
   ```bash
   npm test
   ```

## Development Workflow

### Running Tests

```bash
# Run all tests with coverage
npm test

# Generate HTML coverage report
npm run test:coverage
```

### Code Style

This project uses the hapi style guide, enforced by `@hapi/lab`. The linter runs automatically with tests.

Key style points:
- 4-space indentation
- Single quotes for strings
- Strict mode (`'use strict';`) at the top of every file
- Blank lines after function declarations
- No trailing whitespace

## Making Changes

### Branch Naming

Use descriptive branch names:
- `feat/add-new-feature`
- `fix/resolve-glob-issue`
- `docs/update-readme`
- `refactor/simplify-loader`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(handlers): add support for nested directories
fix(glob): resolve pattern matching edge case
docs(readme): add migration guide for v4
test(handlers): add async handler tests
```

### Pull Requests

1. Create a feature branch from `master`
2. Make your changes
3. Ensure tests pass: `npm test`
4. Push to your fork
5. Open a PR against `ar4mirez/hapi-handlers:master`

**PR Requirements:**
- [ ] Tests pass with >80% coverage
- [ ] No linter errors
- [ ] Conventional commit messages
- [ ] Documentation updated (if applicable)
- [ ] CHANGELOG.md updated (for user-facing changes)

## Reporting Issues

### Bug Reports

Please include:
- Node.js version
- hapi-handlers version
- @hapi/hapi version
- Minimal reproduction case
- Expected vs actual behavior
- Any error messages

### Feature Requests

- Describe the use case
- Explain why existing functionality doesn't meet your needs
- Provide examples of desired behavior

## Questions?

Feel free to open an issue for questions or discussions about the project.
