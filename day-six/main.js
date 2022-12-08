import { packet } from './data.js'

const sampleString = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'

function findMarker(string) {
  let index = 0
  let markerIndex = null
  console.log('markerIndex', markerIndex)
  while (!markerIndex) {
    const sample = string.slice(index, index + 4)
    console.log('index', index)
    console.log('sample', sample)
    const numOfUniqueValues = new Set(Array.from(sample)).size
    console.log('numOfUniqueValues', numOfUniqueValues)
    if (numOfUniqueValues === 4) {
      markerIndex = index
    }
    index++
  }
  return markerIndex + 4
}

console.log(findMarker(packet))