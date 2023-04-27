const {readFileSync} = require('fs');
const {add} = require('./operations.js');
const {load} = require('./loader.js');

const programStringified = readFileSync('./code.json', 'utf-8');
const program = JSON.parse(programStringified);

const instructionSet = {
  '1': add 
}

const determineOperation = function({memory, programCounter}) {
  const opcode = memory[programCounter];
  return instructionSet[opcode];
}

const run = function(program) {
  const memory = load(program);
  let state = { memory, programCounter: 0 };

  const HALT = 9;
  while(memory[state.programCounter] !== HALT) {
    let operation = determineOperation(state);
    state = operation(state);
  }

  formatOutput(state.memory);
}

const formatOutput = function(list) {
  list.forEach(function(element) {
    process.stdout.write(` ${element} |`);
  })
}

run(program);

