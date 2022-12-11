import { findLinearScore, findScore, findGridScore } from './part-two.js'

const line = ['3', '0', '3', '7', '3']

const left_results = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 1
}

const right_results = {
  0: 2,
  1: 1,
  2: 1,
  3: 1,
  4: 0
}

const linear_results = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 0
}

line.forEach((item, index) => {
  describe('findLeftScore', () => {
    const height = parseInt(item)
    const segment = line.slice(0, index).reverse()
    it(`should return ${left_results[index]} if testing the ${index}th tree in a line`, () => {
      const result = findScore({ segment, height })
      expect(result).toBe(left_results[index]);
    })
  })
  describe('findRightScore', () => {
    const height = parseInt(item)
    const segment = line.slice(index + 1, line.length)
    it(`should return ${right_results[index]} if testing the ${index}th tree in a line`, () => {
      const result = findScore({ segment, height })
      expect(result).toBe(right_results[index]);
    })
  })

  describe('findLinearScore', () => {
    it(`should return ${linear_results[index]} for the ${index}th tree`, () => {
      const result = findLinearScore(index, line)
      expect(result).toBe(linear_results[index]);
    })
  })
})

describe('findGridScore', () => {
  // 30373
  // 25512
  // 65332
  // 33549
  // 35390
  const grid = ['30373', '25512', '65332', '33549', '35390']
  it('should return 4 for the second 5 on the second row', () => {
    const point = [2, 1]
    const result = findGridScore(grid, point)
    expect(result).toBe(4)

  })
  it('should return 8 for the middle 5 in the fourth row', () => {
    const point = [2, 3]
    const result = findGridScore(grid, point)
    expect(result).toBe(8)
  })
})