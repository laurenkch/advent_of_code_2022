import { assignments } from './data.js'

function countOverlap(array) {
  const totalOverlap = array.reduce((accumulator, currentValue) => {
    if (assignmentsPartiallyOverlap(currentValue)) {
      return accumulator + 1
    }
    else {
      return accumulator
    }
  }, 0)
  return totalOverlap
}

function assignmentsPartiallyOverlap(pairOfAssignments) {
  const sortedAssignments = pairOfAssignments.sort((a, b) => (a[0] - b[0]))
  const firstAssignment = sortedAssignments[0]
  const secondAssignment = sortedAssignments[1]

  return (firstAssignment[1] >= secondAssignment[0])
}

function assignmentsCompletelyOverlap(pairOfAssignments) {
  const firstAssignment = pairOfAssignments[0]
  const secondAssignment = pairOfAssignments[1]
  if ((firstAssignment[0] >= secondAssignment[0] && firstAssignment[1] <= secondAssignment[1]) ||
    (firstAssignment[0] <= secondAssignment[0] && firstAssignment[1] >= secondAssignment[1])) {
    return true
  } else {
    return false
  }
}

const answer = countOverlap(assignments)

console.log(answer)