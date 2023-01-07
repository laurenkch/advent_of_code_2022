import { movements } from './data.js'
import * as fs from 'fs';

export function write(name, data) {
  fs.writeFile(name, JSON.stringify(data, null, 2), (error) => {
    if (error) {
      console.log(error)
    }
  })
}
function appendToFile(name, data) {
  fs.appendFile(name, JSON.stringify(data, null, 2), (error) => {
    if (error) {
      console.log(error)
    }
  })
}

const instructions = movements.trim().split(`\n`).map(item => item.split(' '))

const INDEX = {
  'U': 1,
  'D': 1,
  'L': 0,
  'R': 0
}

function incrementIndex(index) {
  return parseInt(index) + 1
}

function decrementIndex(index) {
  return parseInt(index) - 1
}

const directionKey = {
  'U': (index) => incrementIndex(index),
  'D': (index) => decrementIndex(index),
  'L': (index) => decrementIndex(index),
  'R': (index) => incrementIndex(index)
}

function moveDiagonally(tailPoint, xdiff, ydiff) {
  let [tailX, tailY] = tailPoint

  if (xdiff >= 1) {
    tailX = incrementIndex(tailX)
  }
  if (xdiff <= -1) {
    tailX = decrementIndex(tailX)
  }
  if (ydiff >= 1) {
    tailY = incrementIndex(tailY)
  }
  if (ydiff <= -1) {
    tailY = decrementIndex(tailY)
  }
  return [tailX, tailY]
}

function maybeIncrementPoint(head, tail) {
  const [headX, headY] = head
  const [tailX, tailY] = tail

  const xdiff = headX - tailX
  const ydiff = headY - tailY

  if (
    (Math.abs(xdiff) >= 1) && (Math.abs(ydiff) >= 2) || (Math.abs(xdiff) >= 2) && (Math.abs(ydiff) >= 1)) {
    return moveDiagonally(tail, xdiff, ydiff)
  } else if (headX - tailX > 1) {
    return [incrementIndex(tailX), tailY]
  } else if (headY - tailY > 1) {
    return [tailX, incrementIndex(tailY)]
  } else if (headX - tailX < -1) {
    return [decrementIndex(tailX), tailY]
  } else if (headY - tailY < -1) {
    return [tailX, decrementIndex(tailY)]
  }
  return tail
}

function stepRope(prevRope, direction) {
  const head = prevRope[0]
  const indexToChange = INDEX[direction]
  head[indexToChange] = directionKey[direction](head[indexToChange])
  let newRope = [head]
  for (let i = 1; i <= 9; i++) {
    const prevPoint = newRope[i - 1]
    const nextPoint = prevRope[i]
    newRope.push(maybeIncrementPoint(prevPoint, nextPoint))
  }
  return newRope
}

function moveRope(prevRope, instruction) {
  const [direction, distance] = instruction
  let newRope = prevRope
  let tailVisits = [prevRope[9]]
  for (let i = 0; i < parseInt(distance); i++) {
    const steppedRope = stepRope(newRope, direction)
    newRope = steppedRope
    tailVisits = [...tailVisits, steppedRope[9]]
  }
  return { newRope, tailVisits }
}

function findTotalPoints(instructions) {
  let rope = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
  let totalTailVisits = [[0, 0]]
  instructions.forEach(instruction => {
    const {
      newRope,
      tailVisits } = moveRope(rope, instruction)

    rope = newRope
    totalTailVisits = [...totalTailVisits, ...tailVisits]
  })

  const setOfPoints = new Set([...totalTailVisits].map(x => JSON.stringify(x)))
  return setOfPoints.size
}

console.log(findTotalPoints(instructions))
