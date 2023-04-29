const {readFileSync} = require('fs');
const {add, assign, jump, jumpLessThan} = require('./operations.js');
const {load} = require('./loader.js');

const code = require('./code.json');

const instructionSet = {
  '0': assign,
  '1': add,
  '3': jump,
  '5': jumpLessThan
}

const determineOperation = function({memory, programCounter}) {
  const opcode = memory[programCounter];
  return instructionSet[opcode];
}

const isNotHalt = function({programCounter, memory}) {
  const instruction = memory[programCounter];
  return instruction !== 9;
}

const toNumber = function(n) {
  return +n;
}


const parse = function(symbolTable, tokens) {
  return tokens.map(function(token) {
    const label = /[A-Z][A-Z]*/
    const labelDeclaration = /[A-Z]*:/
    let lexeme = token;

    if(label.test(token)) {
      lexeme =  symbolTable[token];
    }

    if(labelDeclaration.test(token)) {
      lexeme = token.split(':')[1];
    }

    return toNumber(lexeme);
  });
}

const tokenize = function(sourceCode) {
  return sourceCode.split(' ');
}

const generateSymbolTable = function(symbols) {
  const symbolTable = {};

  return symbols.reduce(function(entries, symbol, index) {
    const regex = /[A-Z]:/
    if(regex.test(symbol)) {
      entries[symbol.split(':')[0]] = index;
    }

    return entries;
  }, {});
}

const run = function(code) {
  const tokens = tokenize(code);
  const symbolTable = generateSymbolTable(tokens);
  const lexemes = parse(symbolTable, tokens);

  const memory = load(lexemes);
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

run('3 MAIN 0 0 0 MAIN:9');

exports.run = run;
