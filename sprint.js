const arr = [-1, 4, 1, 7, 0, 0, 5, 0, 1, 12, 3, 18, 1, 2, 0, 0, 3, 6, 9];

const getStatus = function(opcode) {
  const status = {};
  const instruction = fetchInstruction(opcode);
  status[memory] = execute(instruction);


}






const instructionSet = {
  '1': function(baseAddress) {
    arr[arr[baseAddress + 3]] = arr[arr[baseAddress + 1]] + arr[arr[baseAddress + 2]];
    return baseAddress + 4;
  },

  '5': function(baseAddress) {
    const operand1 = arr[arr[baseAddress + 1]];
    const operand2 = arr[arr[baseAddress + 2]];
    const jumpAddress = arr[baseAddress + 3];

    return operand1 < operand2 ? jumpAddress : baseAddress + 4;
  },

  '3': function(baseAddress) {
    return arr[baseAddress + 1];
  },

  '7': function(baseAddress) {
    const source = arr[baseAddress + 1];
    let destination = arr[baseAddress + 2];
    const nextAddress = baseAddress + 3;

    //    arr[arr[baseAddress + 2]] = arr[baseAddress + 1];
    arr[destination] = source;
    return baseAddress + 3;
  }
}


const fetchInstruction = function(opcode) {
  return instructionSet[opcode];
}

const allocateMemory = function(size) {
  const memory = [];

  for(let index = 0; index < size; index++) {
    memory.push(0);
  }

  return memory;
}

const loadProgram = function(arr) {
  const memory = allocateMemory(30);

  for(let index = 0; index < arr.length; index++) {
    memory[index] = arr[index]; 
  } 

  return memory;
}

const run = function() {
  let programCounter = 3;
  const memory = loadProgram(arr);

  while(memory[programCounter] !== 9) {
    let currentStatus = getStatus(programCounter, memory);
    programCounter = currentStatus.programCounter;
    memory = currentStatus.memory;
  }
}

run();
console.log(arr);

