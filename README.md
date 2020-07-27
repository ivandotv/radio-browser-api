# TypeScript - Babel - Jest - Rollup Quick Start Template

Opinionated template repository for creating javascript libraries with typescript, rollup babel, and jest.

## Getting Started

You can immediately create your repo by clicking on the `Use this template` button in the Github page UI.
Or you can use [deGit](https://github.com/Rich-Harris/degit) which is a very convenient tool to quickly download the repository `degit https://github.com/ivandotv/node-module-typescript`

### Then

1. Run `npm outdated` for minor updates, or you can run `npx npm-check-updates` to see if any packages need major upgrades.
2. Run `npm install`

## Table of Contents

- [Typescript via babel](#typescript-via-babel)
- [Rollup configuration](#rollup)
- [Jest](#jest)
- [ESLint and Prettier](#eslint-and-prettier)
- [Continous Integration](#continous-integration)
- [Git Hooks](#git-hooks)
- [Debugging](#debugging)
- [Nodemon](#nodemon)
- [Conventional Commits](#Conventional-commits)
- [Generating Documentation](#generating-documentation)
- [Renovate Bot](#renovate-bot)

### Typescript via Babel

Typescript files are compiled via babel, which makes compilation a lot faster. However, as a consequence typescript types are not type-checked. Fear not there are scripts (`type-check` and `type-check:watch`) to check and watch for typescript errors.

Babel is set to compile two versions of your source code (with no polyfills):

- `build:cjs` (common js) which targets node `v10`
- `build:esm` (ES6) which targets node `v12`

There are also two additional babel plugins included:

- [babel-plugin-dev-expression](https://github.com/4Catalyzer/babel-plugin-dev-expression#readme) which replaces:

```js
if (__DEV__) {
  //dev only code
}
```

with:

```js
if (process.env.NODE_ENV !== 'production') {
  //dev only code
}
```

Also this:

```js
const myApp{
    version:__VERSION__
}
```

Is replaced with the environment variable `PKG_VERSION` or with `package.json` `version` field.

```js
const myApp{
    version:"1.0.1"
}
```

- [babel-plugin-transform-define](https://github.com/FormidableLabs/babel-plugin-transform-define) which is used for the browser builds to replace:

```js
if (process.env.NODE_ENV !== 'production') {
  //dev only code
}
```

with:

```js
if ('production' !== 'production') {
  //dev only code
}
```

Which will be replaced by babel to:

```js
if (false) {
  //dev only code
}
```

And rollup will just tree shake that piece of code into oblivion :)

### Rollup

Rollup is used to compile and bundle the code for the browser. Rollup configuration compiles:

- `umd` versions with and without polyfills
- `esm` versions for modern browsers with and without polyfills. Version without polyfills will be referenced by `package.json` `module` field.

For `umd` version babel browser targets are: `['>0.2%', 'not dead', 'not op_mini all']` (same as create-react-app)

For `esm` browser targets are: `esmodules:true`

**Peer dependencies will not be bundled**!

### Jest

Jest is used for testing. You can write your tests in typescript and they will be compiled via babel for the nodejs version that is running the tests. The testing environment is set to `node` you might want to change that if you need access to `DOM` in your tests.
I think there is no faster way to run typescript tests in jest. :)

The coverage threshold is set to `80%` globally.

Two plugins are added to jest:

- `jest-watch-typeahead` (for filtering tests by file name or test name)
- `jest-junit` for reporting coverage.

### ESLint and Prettier

- ESLint is set up to use [standardJS configuration](https://standardjs.com/index.html#typescript) for typescript.
- with a few overrides which I think are common sense. You can see the overrides inside the [.eslintrc.js](.eslintrc.js) file. If you don't like it, just remove the `.eslintrc.js` file.

Prettier is set up to work together with eslint and there should be no conflicts.

### Continous Integration

[CircleCI](https://circleci.com/) is used for continuous integration.

Tests are run for node versions 10, 12 and 13.

CircleCI is also set up to upload code coverage to [codecov.io](https://codecov.io) however you can also use [coveralls](https://coveralls.io) for code coverage ( it's currently commented out).

### Git Hooks

There is one git hook setup via [husky](https://www.npmjs.com/package/husky) package in combination with [lint-staged](https://www.npmjs.com/package/lint-staged). Before committing the files all staged files will be run through ESLint and Prettier.

### Debugging

If you are using VS Code as your editor,
there are two debug configurations:

- Debug the application by starting at `index.ts` file
- Debug currently focused test file inside the editor.

### Nodemon

Nodemon is set to watch `dist/cjs` directory (where ES5 compile code is saved) and it will automatically reload `index.js`

### Conventional Commits

If you are not using [Conventional commits specifiction](https://www.conventionalcommits.org/en/v1.0.0/) for your commit messages, you should. Conventional commits CLI client is installed and it can be run by `npm run commit`.

### Generating documentation

You can generate documentation for your source files via [typedoc](https://typedoc.org)(`npm run docs`).
Currently, it is set up to go into `docs/api` directory and it is generated in markdown so it can be displayed on Github.

- Private members are excluded.
- Only exported properties are documented.

### Renovate Bot

There is a renovate bot configuration file for automatically updating dependencies. Make sure to active renovate bot first via [github marketplace.](https://github.com/marketplace/renovate)
