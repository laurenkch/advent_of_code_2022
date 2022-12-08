import { rounds } from './rounds.js'

const PLAY_KEY = {
  'A': 'ROCK',
  'B': 'PAPER',
  'C': 'SCISSORS',
}

const OUTCOME_KEY = {
  'X': 0,
  'Y': 3,
  'Z': 6
}

const LOSING_PLAYS = {
  'ROCK': 'SCISSORS',
  'SCISSORS': 'PAPER',
  'PAPER': 'ROCK'
}

const WINING_PLAYS = {
  'ROCK': 'PAPER',
  'SCISSORS': 'ROCK',
  'PAPER': 'SCISSORS'
}

const POINTS_KEY = {
  'ROCK': 1,
  'PAPER': 2,
  'SCISSORS': 3
}

function findScore(roundCode) {
  const theirPlay = PLAY_KEY[roundCode[0]]
  const outcome = OUTCOME_KEY[roundCode[1]]
  if (outcome === 3) {
    return outcome + POINTS_KEY[theirPlay]
  } else if (outcome === 0) {
    return outcome + POINTS_KEY[LOSING_PLAYS[theirPlay]]
  } else {
    return outcome + POINTS_KEY[WINING_PLAYS[theirPlay]]
  }

}

// function findScore(plays) {
//   const theirPlay = PLAY_KEY[plays[0]]
//   const yourPlay = PLAY_KEY[plays[1]]
//   let total = POINTS_KEY[yourPlay]
//   if (theirPlay === yourPlay) {
//     return total + 3
//   } else if (WINS[yourPlay] === theirPlay) {
//     return total + 6
//   } else {
//     return total
//   }
// }

const totalScore = rounds.map(round => findScore(round)).reduce((total, currentScore) => total + currentScore)

console.log(totalScore)