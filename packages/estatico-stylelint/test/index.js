const test = require('ava');
const sinon = require('sinon');
const utils = require('estatico-utils').test;
const path = require('path');
const del = require('del');
const task = require('../index.js');

const defaults = {
  src: [
    './test/fixtures/*.scss',
  ],
  srcBase: './test/fixtures',
  dest: './test/results/',
};

test.cb('default', (t) => {
  const spy = sinon.spy(console, 'log');

  task(defaults, true)().on('end', () => {
    spy.restore();

    const log = utils.stripLogs(spy);

    t.regex(log, /estatico-stylelint Failed with 1 error/);

    t.end();
  });
});

test.afterEach(() => del(path.join(__dirname, '/results')));
