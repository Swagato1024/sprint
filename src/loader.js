const allocateMemory = function(size) {
  const memory = [];

  memory.length = size;
  return memory;
}

const load = function(program) {
  const memory = allocateMemory(30);

  for(let index = 0; index < program.length; index++) {
    memory[index] = program[index]; 
  } 

  return memory;
}

exports.load = load;
