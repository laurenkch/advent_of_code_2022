import { moveHead, moveTail } from './part-one.js'

describe('moveHead', () => {
  it('moves "R"', () => {
    const result = moveHead([0, 5], ['R', 4])
    expect(result).toEqual([4, 5])
  })
  it('moves "L"', () => {
    const result = moveHead([1, 5], ['L', 1])
    expect(result).toEqual([0, 5])
  })
  it('moves "U"', () => {
    const result = moveHead([0, 0], ['U', 1])
    expect(result).toEqual([0, 1])
  })
  it('moves "D"', () => {
    const result = moveHead([0, 5], ['D', 1])
    expect(result).toEqual([0, 4])
  })
  it('moves "R" across the zero line', () => {
    const result = moveHead([-2, 5], ['R', 4])
    expect(result).toEqual([2, 5])
  })
  it('moves "L" across the zero line', () => {
    const result = moveHead([2, 5], ['L', 4])
    expect(result).toEqual([-2, 5])
  })
  it('moves "U" across the zero line', () => {
    const result = moveHead([0, -2], ['U', 4])
    expect(result).toEqual([0, 2])
  })
  it('moves "D" across the zero line', () => {
    const result = moveHead([0, 2], ['D', 4])
    expect(result).toEqual([0, -2])
  })
  it('moves "R" with a negative starting value', () => {
    const result = moveHead([-10, 5], ['R', 4])
    expect(result).toEqual([-6, 5])
  })
  it('moves "L" for with a negative starting value', () => {
    const result = moveHead([-10, 5], ['L', 1])
    expect(result).toEqual([-11, 5])
  })
  it('moves "U" with a negative starting value', () => {
    const result = moveHead([0, -10], ['U', 1])
    expect(result).toEqual([0, -9])
  })
  it('moves "D" with a negative starting value', () => {
    const result = moveHead([1, -10], ['D', 1])
    expect(result).toEqual([1, -11])
  })
})

describe('moveTail', () => {
  it('moves the tail to the right on the same row', () => {
    const tailPoint = [0, 5]
    const headPoint = [4, 5]

    const results = moveTail(tailPoint, headPoint)
    expect(results[results.length - 1]).toEqual([3, 5])
  })
  it('crosses the 0 line to the right', () => {
    const tailPoint = [-2, 5]
    const headPoint = [4, 5]

    const results = moveTail(tailPoint, headPoint)
    expect(results[results.length - 1]).toEqual([3, 5])
  })
  it('moves the tail up on the same column', () => {
    const tailPoint = [0, 0]
    const headPoint = [0, 5]

    const results = moveTail(tailPoint, headPoint)
    expect(results[results.length - 1]).toEqual([0, 4])
  })
  it('crosses the zero line upwards', () => {
    const tailPoint = [0, -2]
    const headPoint = [0, 5]

    const results = moveTail(tailPoint, headPoint)
    expect(results[results.length - 1]).toEqual([0, 4])
  })
  it('moves the tail left on the same row', () => {
    const tailPoint = [4, 5]
    const headPoint = [0, 5]

    const results = moveTail(tailPoint, headPoint)
    expect(results[results.length - 1]).toEqual([1, 5])
  })
  it('crosses the zero line to the left', () => {
    const tailPoint = [5, 5]
    const headPoint = [-3, 5]

    const results = moveTail(tailPoint, headPoint)
    expect(results[results.length - 1]).toEqual([-2, 5])
  })
  it('moves the tail down on the same column', () => {
    const tailPoint = [4, 5]
    const headPoint = [0, 5]

    const results = moveTail(tailPoint, headPoint)
    expect(results[results.length - 1]).toEqual([1, 5])
  })
  it('crosses the zero line down on the column', () => {
    const tailPoint = [4, 5]
    const headPoint = [4, -2]

    const results = moveTail(tailPoint, headPoint)
    expect(results[results.length - 1]).toEqual([4, -1])
  })
  it('moves the tail on a positive x and y diagonal, if necessary', () => {
    const tailPoint = [0, 0]
    const headPoint = [1, 5]

    const results = moveTail(tailPoint, headPoint)
    expect(results).toEqual([[1, 1], [1, 2], [1, 3], [1, 4]])
  })
  it('crosses zero on a positive x and y diagonal, if necessary', () => {
    const tailPoint = [-1, -5]
    const headPoint = [0, 5]

    const results = moveTail(tailPoint, headPoint)
    expect(results).toEqual([[0, -4], [0, -3], [0, -2], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4]])
  })
  it('moves the tail on a negative x and y diagonal, if necessary', () => {
    const tailPoint = [4, 5]
    const headPoint = [3, 0]

    const results = moveTail(tailPoint, headPoint)
    expect(results).toEqual([[3, 4], [3, 3], [3, 2], [3, 1]])
  })
  it('moves the tail negative x and positive y diagonal, if necessary', () => {
    const tailPoint = [3, 0]
    const headPoint = [2, 5]

    const results = moveTail(tailPoint, headPoint)
    expect(results).toEqual([[2, 1], [2, 2], [2, 3], [2, 4]])
  })
  it('moves the tail positive x and negative y diagonal, if necessary', () => {
    const tailPoint = [2, 5]
    const headPoint = [3, 0]

    const results = moveTail(tailPoint, headPoint)
    expect(results).toEqual([[3, 4], [3, 3], [3, 2], [3, 1]])
  })
})