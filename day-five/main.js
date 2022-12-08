import { instructions } from './data.js'

export const state = {
  1: ['D', 'L', 'J', 'R', 'V', 'G', 'F'],
  2: ['T', 'P', 'M', 'B', 'V', 'H', 'J', 'S'],
  3: ['V', 'H', 'M', 'F', 'D', 'G', 'P', 'C'],
  4: ['M', 'D', 'P', 'N', 'G', 'Q'],
  5: ['J', 'L', 'H', 'N', 'F',],
  6: ['N', 'F', 'V', 'Q', 'D', 'G', 'T', 'Z'],
  7: ['F', 'D', 'B', 'L'],
  8: ['M', 'J', 'B', 'S', 'V', 'D', 'N'],
  9: ['G', 'L', 'D']
}

function moveCratesForMover9000(instruction, state) {
  const numberToMove = instruction[0]
  const fromColumn = instruction[1]
  const toColumn = instruction[2]
  for (let i = 0; i < numberToMove; i++) {
    const crate = state[fromColumn].pop()
    state[toColumn].push(crate)
  }
}

function moveCratesForMover9001(instruction, state) {
  const numberToMove = instruction[0]
  const fromColumn = instruction[1]
  const toColumn = instruction[2]
  const movingCrates = state[fromColumn].splice(-numberToMove)
  state[toColumn].push(...movingCrates)
}
function readInstructions(instructions, state) {
  instructions.forEach(entry => moveCratesForMover9001(entry, state))
  return getTopCrate(state)
}

function getTopCrate(state) {
  const topCrates = Object.values(state).map(stack => stack.slice(stack.length - 1, stack.length))
  return topCrates.join('')
}
const answer = readInstructions(instructions, state)
console.log(answer)