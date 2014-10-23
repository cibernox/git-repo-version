# git-repo-version

Generates a version string based on the version specified in your package.json and the sha revision of
the current commit/branch.

## Install

Tipically you will only need to install this as a devDependency as follows"

`npm install --save-dev calculate-version`

## Usage

This plugin automatically exports a function that when called calculates return the version string.

```js
var calculateVersion = require('calculate-version');
```

## Credits

The code that calculates the version has been extracted from https://github.com/emberjs/ember.js

