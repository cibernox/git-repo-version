'use strict';

var path       = require('path');
var getGitInfo = require('git-repo-info');

module.exports = function version(shaLength, root) {
  var projectPath = root || process.cwd();

  var info = getGitInfo();
  if (info.tag) {
    return info.tag;
  }

  var packageVersion  = require(path.join(projectPath, 'package.json')).version;
  return packageVersion + '.' + info.sha.slice(0, shaLength || 8);
};
