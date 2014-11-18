'use strict';

var path = require('path');

module.exports = function version(shaLength, root) {

  var projectPath = root || process.cwd();

  var packageVersion  = require(path.join(projectPath, 'package.json')).version;

  if (packageVersion.indexOf('+') > -1) {
    if (shaLength == null){
      shaLength = 8;
    }
    var info = require('git-repo-info')();
    return packageVersion + '.' + info.sha.slice(0, shaLength);
  } else {
    return packageVersion;
  }
};
