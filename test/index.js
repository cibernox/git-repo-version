var assert = require('assert');
var getVersion = require('../index.js');
var packageVersion = require('../package.json').version;
var path = require('path');
var fs = require('fs');

describe('getVersion', function () {
  it('should return default output (version number + sha)', function () {
    var result = getVersion({ includeCommitsSinceLastTag: false });
    var revision = require('child_process').execSync('git rev-parse HEAD').toString().trim().substring(0, 8);
    var expected = packageVersion + '+' + revision;

    assert.equal(result, expected);
  });

  it('should return custom sha length', function () {
    const shaLength = 5;
    var result = getVersion({ shaLength: shaLength, includeCommitsSinceLastTag: false });
    var revision = require('child_process').execSync('git rev-parse HEAD').toString().trim().substring(0, 5);
    var expected = packageVersion + '+' + revision;

    assert.equal(result, expected);
  });

  it('should return full sha', function () {
    const shaLength = 40;
    var result = getVersion({ shaLength: shaLength, includeCommitsSinceLastTag: false });
    var revision = require('child_process').execSync('git rev-parse HEAD').toString().trim();
    var expected = packageVersion + '+' + revision;

    assert.equal(result, expected);
  });

  it('should not include sha when shaLength set to zero', function () {
    const shaLength = 0;
    var result = getVersion({ shaLength: shaLength, includeCommitsSinceLastTag: false });
    var expected = packageVersion;

    assert.equal(result, expected);
  });

  it('should include date', function () {
    var result = getVersion({ includeDate: true, includeCommitsSinceLastTag: false });
    var revision = require('child_process').execSync('git rev-parse HEAD').toString().trim().substring(0, 8);
    var lastCommitDate = require('child_process').execSync('git log -1 --format=%ai').toString().trim();
    var isoDate = new Date(lastCommitDate).toISOString();
    var expected = packageVersion + '+' + revision + ' ' + isoDate;

    assert.equal(result, expected);
  });

  it('should include commitsSinceLastTag', function () {
    var projectPath = path.join(__dirname, 'fixtures/tag-on-parent');

    const testdirs = [
      '.git',
      '.git/objects',
      '.git/objects/fb/',
      '.git/refs/',
      '.git/refs/heads/',
      '.git/refs/tags',
    ];
    testdirs.forEach(function(dir) {
      fs.mkdirSync(path.join(projectPath, dir));
    });

    const testfiles = [
      'objects/fb/26504da0ed5cd9ed366f7428c06a8433fd76e6',
      'HEAD',
      'refs/heads/master',
      'refs/tags/parent-magic-tag',
      'index'
    ];
    testfiles.forEach(function(file) {
      fs.linkSync(path.join(projectPath, 'dot-git', file),path.join(projectPath, '.git', file));
    });

    var result = getVersion({
      includeCommitsSinceLastTag: true,
      projectPath
    });

    testfiles.forEach(function(file) {
      fs.unlinkSync(path.join(projectPath, '.git', file));
    });

    testdirs.reverse().forEach(function(dir) {
      fs.rmdirSync(path.join(projectPath, dir));
    });

    assert.equal(result, '1.0.0+1+fb26504d');
  });
});
