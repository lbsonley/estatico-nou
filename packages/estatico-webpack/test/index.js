const test = require('ava');
// const sinon = require('sinon');
const path = require('path');
const fs = require('fs');
const del = require('del');
const utils = require('@unic/estatico-utils').test;
const merge = require('lodash.merge');
const task = require('../index.js');

const defaults = {
  webpack: {
    entry: {
      main: './test/fixtures/main.js',
    },
    output: {
      path: path.resolve('./test/results'),
      publicPath: '/',
    },
  },
};

test.cb('default', (t) => {
  task(defaults)(() => utils.compareFiles(t, path.join(__dirname, 'expected/default/*')));
});

test.cb('dev', (t) => {
  task(defaults, {
    dev: true,
  })(() => {
    const hasMinifiedFile = fs.existsSync('./expected/dev/main.min.js');

    t.is(hasMinifiedFile, false);

    utils.compareFiles(t, path.join(__dirname, 'expected/dev/*'));
  });
});

test.cb('ci', (t) => {
  task(defaults, {
    ci: true,
  })(() => utils.compareFiles(t, path.join(__dirname, 'expected/ci/*')));
});

test.cb('async', (t) => {
  const options = merge({}, defaults, {
    webpack: {
      entry: {
        main: './test/fixtures/async.js',
      },
      output: {
        publicPath: '/expected/async/',
      },
    },
  });

  task(options, {
    dev: true,
  })(() => utils.compareFiles(t, path.join(__dirname, 'expected/async/*')));
});

test.afterEach(() => del(path.join(__dirname, '/results')));
