import { rucksackContents } from './rucksack-contents.js'

function splitContents(contents) {
  const midpoint = contents.length / 2
  const compartmentOne = contents.slice(0, midpoint)
  const compartmentTwo = contents.slice(midpoint, contents.length)
  return [compartmentOne.split(''), compartmentTwo.split('')]
}

function findCommonValue(contents) {
  const compartments = splitContents(contents)
  const commonValue = compartments[0].find(item => compartments[1].includes(item))
  return commonValue
}

function maybeAddChunk(finalArray, currentIndex, originalArray) {
  if (currentIndex % 3 !== 0) {
    return finalArray
  }
  const chunk = originalArray.slice(currentIndex, currentIndex + 3)
  return [...finalArray, chunk]
}


const newList = rucksackContents.reduce((finalArray, currentValue, currentIndex, originalArray) =>
  maybeAddChunk(finalArray, currentIndex, originalArray), [])

function findCommoneValueOfThree(group) {
  const firstElfContents = group[0]
  const secondElfContents = group[1]
  const thirdElfContents = group[2]

  const letter = firstElfContents.split('').find(letter => secondElfContents.split('').includes(letter) && thirdElfContents.split('').includes(letter))
  return letter
}

function getPriority(contents) {
  const value = findCommoneValueOfThree(contents)
  const code = value.charCodeAt()
  if (code > 97) {
    return code - 96
  } else {
    return code - 38
  }
}

const answer = newList.map(group => getPriority(group)).reduce((total, currentItem) => total + currentItem)

console.log(answer)
