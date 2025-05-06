## [5.1.0](https://github.com/ivandotv/radio-browser-api/compare/v5.0.0...v5.1.0) (2022-03-04)

## 6.0.3

### Patch Changes

- 7b023e6: revert back to https

## 6.0.2

### Patch Changes

- 6d34893: fixed bug in getStationByUrl
- fef1705: export types

## 6.0.1

### Patch Changes

- 561ea26: "tagList" should be the only one that is not lowercased

## 6.0.0

### Major Changes

- 7532211: Switch package to be type module by default

## 5.2.5

### Patch Changes

- adb8cac: Do not lower case query parameters. closes [#95](https://github.com/ivandotv/radio-browser-api/issues/95)

## 5.2.4

### Patch Changes

- 9a0ef2e: update packages
- ca49d5d: create .mjs file extensions

## 5.2.3

### Patch Changes

- 3783e09: add "module" export to package

## 5.2.2

### Patch Changes

- 70f93b3: Refactor setting up radio tags. It appears that microbundle is not transpiling correctly combination of array and set.

## 5.2.1

### Patch Changes

- eb6f815: switch to microbundle build process, this effectively decreased size of the bundle for 1.1KB.
- b462652: fix lint errors
- 8b45156: remmove temporary http browser fix

## [5.0.0](https://github.com/ivandotv/radio-browser-api/compare/v4.0.5...v5.0.0) (2021-11-19)

### ⚠ BREAKING CHANGES

- const value has been changed

### fix

- byLanguageExact typo ([476580c](https://github.com/ivandotv/radio-browser-api/commit/476580c67372d07fc8714fda086793e6964430a8))

### [4.0.5](https://github.com/ivandotv/radio-browser-api/compare/v4.0.4...v4.0.5) (2021-08-31)

### [4.0.4](https://github.com/ivandotv/radio-browser-api/compare/v4.0.3...v4.0.4) (2021-08-23)

### [4.0.3](https://github.com/ivandotv/radio-browser-api/compare/v4.0.2...v4.0.3) (2021-07-17)

### [4.0.1](https://github.com/ivandotv/radio-browser-api/compare/v4.0.0...v4.0.1) (2021-07-14)

- **readme:** update readme ([fe833f7](https://github.com/ivandotv/radio-browser-api/commit/fe833f77364f750f7fcdb5d7b8c8ea5a9b1a89f7))

## [4.0.0](https://github.com/ivandotv/radio-browser-api/compare/v3.0.0...v4.0.0) (2021-06-21)

### ⚠ BREAKING CHANGES

- Static methods to resolve base url have been removed

### feat

- remove all static methods and automatically resolve base url ([bbd0501](https://github.com/ivandotv/radio-browser-api/commit/bbd0501e4cc057d1780d367a04d139d8255e7522))

## [2.3.0](https://github.com/ivandotv/radio-browser-api/compare/v2.2.4...v2.3.0) (2021-06-01)

### ⚠ BREAKING CHANGES

- fetch is no longer passed in via constructor. It should be available in the
  environment

- expect fetch to be available ([f1e628d](https://github.com/ivandotv/radio-browser-api/commit/f1e628d0011986261060fdd4e4e6262506d877bf))
- refactor constructor initialization ([92effb1](https://github.com/ivandotv/radio-browser-api/commit/92effb1577b737d20c04057b9fc103a540c4b162))

### [2.2.4](https://github.com/ivandotv/radio-browser-api/compare/v2.2.3...v2.2.4) (2021-02-12)

### [2.2.3](https://github.com/ivandotv/radio-browser-api/compare/v2.2.2...v2.2.3) (2021-02-12)

### [2.2.2](https://github.com/ivandotv/radio-browser-api/compare/v2.2.1...v2.2.2) (2021-02-08)

- **test:** move "fetch" to global object just for tests ([4776917](https://github.com/ivandotv/radio-browser-api/commit/477691716ce4e3357a6cfe3e8474f75322c96437))

### [2.2.1](https://github.com/ivandotv/radio-browser-api/compare/v2.2.0...v2.2.1) (2021-02-02)

- **readme:** remove references to peer dependency ([4bc9278](https://github.com/ivandotv/radio-browser-api/commit/4bc927857023897a69cdfd1fb627349edfb13f66))

## [2.2.0](https://github.com/ivandotv/radio-browser-api/compare/v2.1.1...v2.2.0) (2021-02-01)

- **readme:** update typescrip example ([4c8f727](https://github.com/ivandotv/radio-browser-api/commit/4c8f727bc72decae51feb2a474d78577115a7544))

### [2.1.1](https://github.com/ivandotv/radio-browser-api/compare/v2.1.0...v2.1.1) (2020-12-05)

- **readme:** Update readme ([2af7b0a](https://github.com/ivandotv/radio-browser-api/commit/2af7b0a70e201c4e1e2cbe3b9ac787df168c8bad))

## [2.1.0](https://github.com/ivandotv/radio-browser-api/compare/v2.0.0...v2.1.0) (2020-11-27)

## [2.0.0](https://github.com/ivandotv/radio-browser-api/compare/v1.0.3...v2.0.0) (2020-11-27)

### ⚠ BREAKING CHANGES

- Stop building polyfill versions

### ci

- Stop building polyfill versions ([9a1aeb9](https://github.com/ivandotv/radio-browser-api/commit/9a1aeb93e2485282a1804672040743e8e2af0af9))

### [1.0.3](https://github.com/ivandotv/radio-browser-api/compare/v1.0.2...v1.0.3) (2020-11-20)

### ⚠ BREAKING CHANGES

- change constructor signature

- make user agent mandatory ([0e02f72](https://github.com/ivandotv/radio-browser-api/commit/0e02f72f8f8b0fbe9ca9fa84d8c22e76b40adaad))

### [1.0.2](https://github.com/ivandotv/radio-browser-api/compare/v1.0.1...v1.0.2) (2020-11-04)

- **readme:** Fix markdown links ([f8ccaf4](https://github.com/ivandotv/radio-browser-api/commit/f8ccaf46a81ef287035098c0022ebda09392464a))

### [1.0.1](https://github.com/ivandotv/radio-browser-api/compare/v1.0.0...v1.0.1) (2020-11-04)

- **readme:** Add badges ([581d74a](https://github.com/ivandotv/radio-browser-api/commit/581d74acc52bebcd2ea4742aad1f38769518cb1d))
- Add MIT licence ([a12e3f1](https://github.com/ivandotv/radio-browser-api/commit/a12e3f1eb84ea94d56e199925cd8c105e0cedccb))

## 1.0.0 (2020-11-04)

### ⚠ BREAKING CHANGES

- station object is changed
- Signature of the station response has been changed
- make the user agent optional
- hide broken stations by default

### feat

- change station object ([16edcd2](https://github.com/ivandotv/radio-browser-api/commit/16edcd28bb1747b2a7bc2ae85dd8303e7f3face8))
- parse tags and language properties in to arrays ([c6c6f95](https://github.com/ivandotv/radio-browser-api/commit/c6c6f9589ef9fa5cbfc758d0108ab30c1af4508b))
- hide broken stations by default ([55d14fe](https://github.com/ivandotv/radio-browser-api/commit/55d14feb12fc100b1f7074dea42dc6bfb0dc5d02))

* Write readme ([a38654e](https://github.com/ivandotv/radio-browser-api/commit/a38654e25bca55ff4adb340585c3e0cdcc2da45f))
* Add comments to methods ([9df8025](https://github.com/ivandotv/radio-browser-api/commit/9df8025529a8573de4e82bab9c2c967baaf06ab5))
* make the user agent optional ([c480a2b](https://github.com/ivandotv/radio-browser-api/commit/c480a2bd3f806e2466dd29b9e69035dde68f5e52))
* **breaking:** rename class ([a2dde64](https://github.com/ivandotv/radio-browser-api/commit/a2dde6469f7e75905aafa90b9d565dec092050b6))
