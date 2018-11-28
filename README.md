# git-repo-version

Generates a version string based on the version specified in your `package.json` and the sha revision of
the current commit/branch.

## Install

Typically you will only need to install this as a devDependency as follows

`npm install --save-dev git-repo-version`

## Usage

This plugin automatically exports a function that when called calculates return the version string with a sha of the given length (defaults to 8). You can also specify second parameter to include commit date in the output `{ includeDate: true }`.

```js
var getVersion = require('git-repo-version');
getVersion(); // "1.5.0+a1b2c3d4"
getVersion({ shaLength: 10 }); // "1.5.0+a1b2c3d4e5"
getVersion({ shaLength: 10, includeDate: true }); // "1.5.0+a1b2c3d4e5 2016-10-24T18:26:53.000Z"
getVersion({ shaLength: 0, includeDate: true }); // "1.5.0 2016-10-24T18:26:53.000Z"
```

The version number is determined by first valid condition:

* If current commit is tagged and version number in app's `package.json` is not include in tag name,
  it will use tag name.
* If app has a version number in its `package.json`, it will use version number in `package.json`
  and append the SHA of the current commit at the end (p.e. `1.5.0-beta.1+a1b2c3d4`).
* If current HEAD is a branch, it will use the name of the that branch and append the SHA
  (p.e. `develop+a1b2c3d4`).
* It will use the string `DETACHED_HEAD` as fallback (p.e `DETACHED_HEAD+1a2b3c4d`)

## Running tests

Simply run `npm test`
