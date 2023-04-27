const add = function(state) {
  const {programCounter: baseAddress, memory} = state;

  const destination = memory[baseAddress + 3];
  const addent = memory[memory[baseAddress + 1]];
  const augend = memory[memory[baseAddress + 2]];

  memory[destination] = addent + augend;
  state.programCounter = baseAddress + 4;

  return  state;
}

const assign = function(state) {
  const {programCounter: baseAddress, memory} = state;

  const value = memory[baseAddress + 1];
  const destination = memory[baseAddress + 2];

  memory[destination] = value;
  state.programCounter = baseAddress + 3;

  return state;
}

const jump = function(state) {
}

exports.add = add;
exports.assign = assign;
exports.jump = jump;
