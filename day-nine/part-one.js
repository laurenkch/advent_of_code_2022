import { sample } from './sample.js'
import { movements } from './data.js'
import * as fs from 'fs';

export function write(name, data) {
  fs.writeFile(name, JSON.stringify(data, null, 2), (error) => {
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

const increment = {
  'U': +1,
  'D': -1,
  'L': -1,
  'R': +1
}

const incrementFunction = {
  'U': (index, increment) => parseInt(index) + parseInt(increment),
  'D': (index, increment) => parseInt(index) - parseInt(increment),
  'L': (index, increment) => parseInt(index) - parseInt(increment),
  'R': (index, increment) => parseInt(index) + parseInt(increment)
}

function findNewValue(index, distance, direction) {
  return incrementFunction[direction](index, distance)
}

function moveHead(point, instruction) {
  const [direction, distance] = instruction
  const oldValue = point[INDEX[direction]]
  const newValue = findNewValue(oldValue, distance, direction)
  point[INDEX[direction]] = newValue
  return point
}

function moveDiagonally(tailPoint, xdiff, ydiff) {
  let [tailX, tailY] = tailPoint

  if (xdiff >= 1) {
    tailX = incrementFunction['R'](tailX, 1)
  }
  if (xdiff <= -1) {
    tailX = incrementFunction['L'](tailX, 1)
  }
  if (ydiff >= 1) {
    tailY = incrementFunction['U'](tailY, 1)
  }
  if (ydiff <= -1) {
    tailY = incrementFunction['D'](tailY, 1)
  }
  return [tailX, tailY]
}

function moveTail(tailPoint, headPoint) {
  let pointsVisited = []
  const [tailX, tailY] = tailPoint
  const [headX, headY] = headPoint
  const xdiff = headX - tailX
  const ydiff = headY - tailY

  if (
    (Math.abs(xdiff) >= 1) && (Math.abs(ydiff) >= 2) || (Math.abs(xdiff) >= 2) && (Math.abs(ydiff) >= 1)) {
    const newPoint = moveDiagonally(tailPoint, xdiff, ydiff)
    pointsVisited = [...pointsVisited, newPoint, ...moveTail(newPoint, headPoint)]
  } else if (headX - tailX > 1) {
    const newPoint = [findNewValue(tailX, 1, 'R'), tailY]
    pointsVisited = [...pointsVisited, newPoint, ...moveTail(newPoint, headPoint)]
  } else if (headY - tailY > 1) {
    const newPoint = [tailX, findNewValue(tailY, 1, 'U')]
    pointsVisited = [...pointsVisited, newPoint, ...moveTail(newPoint, headPoint)]
  } else if (headX - tailX < -1) {
    const newPoint = [findNewValue(tailX, 1, 'L'), tailY]
    pointsVisited = [...pointsVisited, newPoint, ...moveTail(newPoint, headPoint)]
  } else if (headY - tailY < -1) {
    const newPoint = [tailX, findNewValue(tailY, 1, 'D')]
    pointsVisited = [...pointsVisited, newPoint, ...moveTail(newPoint, headPoint)]
  }
  return pointsVisited
}

function moveHeadAndTail(instruction, currentHead, currentTail) {
  const newHeadPoint = moveHead(currentHead, instruction)
  const tailVisits = moveTail(currentTail, newHeadPoint)
  const newTailPoint = tailVisits.length > 0 ? tailVisits[tailVisits.length - 1] : currentTail
  return { tailVisits, newHeadPoint, newTailPoint }
}

function findTotalPoints(instructions) {
  let tail = [0, 0]
  let head = [0, 0]
  let totalTailVisits = [tail]
  instructions.forEach(instruction => {
    const {
      newHeadPoint,
      newTailPoint,
      tailVisits } = moveHeadAndTail(instruction, head, tail)
    tail = newTailPoint
    head = newHeadPoint
    totalTailVisits = [...totalTailVisits, ...tailVisits]
  })

  const setofpoints = new Set([...totalTailVisits].map(x => JSON.stringify(x)))
  return setofpoints.size
}

console.log(findTotalPoints(instructions))



export { moveHead, moveTail }