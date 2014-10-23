'use strict';

var path = require('path');

module.exports = function version() {
  var packageVersion  = require(path.join(process.cwd(), 'package.json')).version;

  if (packageVersion.indexOf('+') > -1) {
    var info = require('git-repo-info')();
    return packageVersion + '.' + info.abbreviatedSha.slice(0,8);
  } else {
    return packageVersion;
  }
};
