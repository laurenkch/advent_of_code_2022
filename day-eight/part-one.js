import { trees } from './data.js'
import { sample } from './sample.js'

const grid = trees.trim().split(`\n`)

const gridLength = grid[0].length

function checkVisibility({ segment, height }) {
  const treeIsOnEnd = segment.length === 0
  const treeIsTall = !segment.some(tree => parseInt(tree) >= height)
  const treeIsVisible = treeIsOnEnd || treeIsTall
  return treeIsVisible
}

function findLineVisibility(index, line) {
  const height = parseInt(line[index])
  const startVisibility = checkVisibility({ segment: line.slice(0, index), height })
  const endVisibility = checkVisibility({ segment: line.slice(index + 1, line.length), height })
  return startVisibility || endVisibility
}

function findGridVisibility(grid, point) {
  try {
    const columnIndex = point[0]
    const rowIndex = point[1]
    const tree = parseInt(grid[rowIndex][columnIndex])
    const row = grid[rowIndex].split('')
    const column = grid.map(row => row[columnIndex])

    const isVisibleOnGrid = findLineVisibility(columnIndex, row, tree) || findLineVisibility(rowIndex, column, tree)
    return isVisibleOnGrid

  } catch (error) {
    if (error) {
      console.log({ point })
    }
  }

}

function findTotalTreeVisibility(grid) {
  let count = 0

  for (let i = 0; i < gridLength; i++) {
    for (let x = 0; x < gridLength; x++) {
      const isVisible = findGridVisibility(grid, [i, x])
      if (isVisible) {
        count++
      }
    }
  }
  return count
}

const answer = findTotalTreeVisibility(grid)
console.log('answer', answer)

export {
  checkVisibility,
  findLineVisibility,
  findGridVisibility
}