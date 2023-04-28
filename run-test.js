const {describe, it} = require('node:test');
const {deepStrictEqual} = require('assert');

const {run} = require('./src/main.js');
console.log(run);
console.log('testing will begin in a second');

describe('sprint', function() {
  it('should assign to given address', function() {
    deepStrictEqual(run('0,50,10,1,10,8,11,9,20,0,50,-1'), [
      0, 50, 10, 1, 10, 8, 11, 9, 20, 0, 50, 70
    ] );
  });

  it('should jump to given location', function() {
    deepStrictEqual(run('3,3,10,1,10,8,11,9,20,0,50,-1'), [
      3, 3, 10, 1, 10, 8, 11, 9, 20, 0, 50, 70
    ] );
  });

  it('Should jump when the condition is true', function() {
    deepStrictEqual(run('3, 4, 5, 0, 5, 2, 3, 14, 1, 8, 3, 3, 3, 4, 9 '), [
      3, 4, 5, 6, 5, 2, 3, 14, 1, 8, 3, 3, 3, 4, 9
    ] );
  });


});
