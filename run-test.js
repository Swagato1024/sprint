const {describe, it} = require('node:test');
const {deepStrictEqual} = require('assert');

const {run} = require('./src/main.js');
console.log(run);
console.log('testing will begin in a second');

describe('sprint', function() {
  it('should assign to given address', function() {
    deepStrictEqual(run([0,50,10,1,10,8,11,9,20,0,50,-1]), [
      0, 50, 10, 1, 10, 8, 11, 9, 20, 0, 50, 70
    ] );
  });
});
