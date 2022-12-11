import { trees } from './data.js'
import { sample } from './sample.js'

const grid = trees.trim().split(`\n`)

const gridLength = grid[0].length

function findScore({ segment, height }) {
  const blockIndex = segment.findIndex(tree => parseInt(tree) >= height)
  const segmentLength = segment.length
  return blockIndex === -1 ? segmentLength : blockIndex + 1
}

function findLinearScore(index, line) {
  const height = parseInt(line[index])
  const leftScore = findScore({ segment: line.slice(0, index).reverse(), height })
  const rightScore = findScore({ segment: line.slice(index + 1, line.length), height })
  return leftScore * rightScore
}

function findGridScore(grid, point) {
  try {
    const columnIndex = point[0]
    const rowIndex = point[1]
    const row = grid[rowIndex].split('')
    const column = grid.map(row => row[columnIndex])

    const score = findLinearScore(columnIndex, row) * findLinearScore(rowIndex, column)
    return score

  } catch (error) {
    if (error) {
      console.log({ point })
    }
  }

}

function findBestScore(grid) {
  let highestScore = 0

  for (let i = 0; i < gridLength; i++) {
    for (let x = 0; x < gridLength; x++) {
      const newScore = findGridScore(grid, [i, x])
      if (newScore > highestScore) {
        highestScore = newScore
      }
    }
  }
  return highestScore
}

const answer = findBestScore(grid)
console.log('answer', answer)

export {
  findScore,
  findLinearScore,
  findGridScore
}