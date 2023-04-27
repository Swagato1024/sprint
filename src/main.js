const {readFileSync} = require('fs');
const {add, assign, jump} = require('./operations.js');
const {load} = require('./loader.js');

const code = require('./code.json');

const instructionSet = {
  '0': assign,
  '1': add,
  '3': jump
}

const determineOperation = function({memory, programCounter}) {
  const opcode = memory[programCounter];
  return instructionSet[opcode];
}

const isNotHalt = function({programCounter, memory}) {
  const instruction = memory[programCounter];
  return instruction !== 9;
}

const run = function(code) {
  const memory = load(code);
  const state = { memory, programCounter: 0 };

  while(isNotHalt(state)) {
    let operation = determineOperation(state);
    operation(state);
  }

  formatOutput(state.memory);

  return state.memory;
}

const formatOutput = function(list) {
  list.forEach(function(element) {
    process.stdout.write(` ${element} |`);
  })
}

//run(code);

exports.run = run;
