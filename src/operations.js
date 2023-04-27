const add = function(state) {
  const {programCounter: baseAddress, memory} = state;

  const destination = memory[baseAddress + 3];
  const addent = memory[memory[baseAddress + 1]];
  const augend = memory[memory[baseAddress + 2]];

  memory[destination] = addent + augend;
  state.programCounter = baseAddress + 4;

  return  state;
}

exports.add = add;
