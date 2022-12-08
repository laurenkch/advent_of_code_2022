import { packet } from './data.js'

function findMarker(string) {
  let index = 0
  let markerIndex = null
  while (!markerIndex) {
    const sample = string.slice(index, index + 4)
    const numOfUniqueValues = new Set(Array.from(sample)).size
    if (numOfUniqueValues === 4) {
      markerIndex = index
    }
    index++
  }
  return markerIndex + 4
}

const answer = findMarker(packet)

console.log(answer)