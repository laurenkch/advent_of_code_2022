import { checkVisibility, findLineVisibility, findGridVisibility } from './part-one.js'

const line = ['3', '0', '3', '7', '3']

const start_results_key = {
  0: true,
  1: false,
  2: false,
  3: true,
  4: false
}

const end_results_key = {
  0: false,
  1: false,
  2: false,
  3: true,
  4: true
}


line.forEach((item, index) => {
  describe('checkStartVisibility', () => {
    const height = parseInt(item)
    const segment = line.slice(0, index)
    it(`should return ${start_results_key[index]} if testing the ${index} tree in a line`, () => {
      const result = checkVisibility({ segment, height })
      expect(result).toBe(start_results_key[index]);
    })
  })
})

line.forEach((item, index) => {
  describe('checkEndVisibility', () => {
    const height = parseInt(item)
    const segment = line.slice(index + 1, line.length - 1)
    it(`should return ${end_results_key[index]} if testing the ${index} tree in this line`, () => {
      const result = checkVisibility({ segment, height })
      expect(result).toBe(end_results_key[index]);
    })
  })
})

describe('findLineVisibility', () => {
  const index = 2
  it('should return true if tree is visible from left side', () => {
    const line = ['0', '1', '3', '3', '3']
    const result = findLineVisibility(index, line)
    expect(result).toBe(true)

  })
  it('should return true if tree is visible from right side', () => {
    const line = ['3', '3', '3', '1', '0']
    const result = findLineVisibility(index, line)
    expect(result).toBe(true)
  })
  it('should return false if tree is not visible from either side', () => {
    const line = ['3', '3', '1', '1', '3']
    const result = findLineVisibility(index, line)
    expect(result).toBe(false)
  })
})

describe('findGridVisibility', () => {
  // 30373
  // 55512
  // 05352
  // 53549
  // 35390
  const grid = ['30373', '55512', '05352', '53549', '35390']
  it('should return true if tree is visible from top', () => {
    const point = [1, 1]
    const result = findGridVisibility(grid, point)
    expect(result).toBe(true)

  })
  it('should return true if tree is visible from bottom', () => {
    const point = [2, 3]
    const result = findGridVisibility(grid, point)
    expect(result).toBe(true)
  })
  it('should return true if tree is visible from left', () => {
    const point = [1, 2]
    const result = findGridVisibility(grid, point)
    expect(result).toBe(true)
  })
  it('should return true if tree is visible from right', () => {
    const point = [3, 2]
    const result = findGridVisibility(grid, point)
    expect(result).toBe(true)
  })
  it('should return false if tree is not visible from any direction', () => {
    const point = [2, 2]
    const result = findGridVisibility(grid, point)
    expect(result).toBe(false)
  })
})

