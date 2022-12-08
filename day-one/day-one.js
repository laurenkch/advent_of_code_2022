import { snacks } from './snacks.js'

function findTotalCalories(list) {
    const totalCalories = list.reduce((total, currentItem) => total + currentItem)
    return totalCalories
}

function makeListOfTotals(lists) {
    const listOfTotalCalories = lists.map(list => findTotalCalories(list))
    return listOfTotalCalories
}

function getSortedList(totals) {
    return totals.sort(function compareNumbers(a, b) {
        return b - a;
    })
}

function findHighestCalories(listOfLists) {
    const listOfTotalCalories = makeListOfTotals(listOfLists)
    const max = Math.max(...listOfTotalCalories)
    const sortedList = getSortedList(listOfTotalCalories)
    const slicedList = sortedList.slice(0, 3)
    return findTotalCalories(slicedList)
}
const answer = findHighestCalories(snacks)

console.log(answer)



