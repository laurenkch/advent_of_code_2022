import { packet } from './data.js'

const startOfPacketMarker = 4
const startOfMessageMarker = 14

const marker = startOfMessageMarker

function findMarker(string) {
  let index = 0
  let markerIndex = null
  while (!markerIndex) {
    const sample = string.slice(index, index + marker)
    const numOfUniqueValues = new Set(Array.from(sample)).size
    if (numOfUniqueValues === marker) {
      markerIndex = index
    }
    index++
  }
  return markerIndex + marker
}

const answer = findMarker(packet)

console.log(answer)