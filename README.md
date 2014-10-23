# git-repo-version

Generates a version string based on the version specified in your package.json and the sha revision of
the current commit/branch.

## Install

Tipically you will only need to install this as a devDependency as follows"

`npm install --save-dev git-repo-version`

## Usage

This plugin automatically exports a function that when called calculates return the version string.

```js
var version = require('git-repo-version')();
```

## Credits

The code that calculates the version has been extracted from https://github.com/emberjs/ember.js

