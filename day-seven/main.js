import { readout } from './data.js'
import { sample } from './sampleData.js'

import * as fs from 'fs';

const formattedReadout = readout.trim().split('$ ')
write('formattedReadout.txt', formattedReadout)

export function write(name, data) {
  fs.writeFile(name, JSON.stringify(data, null, 2), (error) => {
    if (error) {
      console.log(error)
    }
  })
}

function cleanCommand(command) {
  if (command !== '') {
    return command.trim().replace('cd ', '').replace('/n ', '')
  }
}

function cleanDir(name) {
  return name.trim().replace('dir', '').trim()
}

function cleanFile(name) {
  const [size, fileName] = name.split(' ')
  return { [fileName]: parseInt(size) }
}

function handleList(listCommand) {
  const commandArray = listCommand.replace('ls', '').trim().split(/\n/)
  let file = {}
  commandArray.forEach(listItem => {
    if (listItem.includes('dir')) {
      file = {
        ...file,
        [cleanDir(listItem)]: {}
      }
    } else {
      file = {
        ...file,
        ...cleanFile(listItem)
      }
    }
  })
  return file
}

function calculateFileSize(fileName, listOfFiles) {
  let totalSize = 0
  const emptyDir = { [fileName]: 0 }
  const contents = listOfFiles[fileName]
  fs.appendFileSync('output.txt', `${JSON.stringify(fileName)}, ${JSON.stringify(contents, null, 2)}`)
  try {
    for (const [key, value] of Object.entries(contents)) {
      if (typeof (value) === 'number') {
        totalSize = totalSize + value
      } else {
        const size = calculateFileSize(`${fileName}${key}`, listOfFiles)
        totalSize = totalSize + size
      }
    }
    return totalSize
  } catch (error) {
    console.log(`cannot find ${fileName}`)
  }
}

function makeList(commands) {
  let fileDepth = []
  let currentFile = ''
  let list = {}

  commands.forEach((command, index) => {
    let root = fileDepth.join('')
    if (command.slice(0, 2) === 'ls') {
      const files = handleList(command)
      list = { ...list, [root]: files }
    } else if (command.includes('..')) {
      fileDepth.pop()
      currentFile = fileDepth.at(-1)
    } else {
      currentFile = cleanCommand(command)
      fileDepth.push(currentFile)
    }
  })

  return list
}

function calculateFileSizes(commands) {
  const list = makeList(commands)
  return Object.keys(list).map(fileName => {
    return { [fileName]: calculateFileSize(fileName, list) }
  })
}

function findFilesUnderLimit(commands) {
  const limit = 100000
  const list = makeList(commands)
  const listOfFileSizes = calculateFileSizes(commands)
  write('listOfFileSizes.txt', listOfFileSizes)
  return listOfFileSizes.filter(file => {
    const [[fileName, size], ...rest] = Object.entries(file)
    return size <= limit
  })
}

findFilesUnderLimit(formattedReadout)

function findFilesOverLimit(commands, limit) {
  const listOfFileSizes = calculateFileSizes(commands)
  write('listOfFileSizes.txt', listOfFileSizes)
  return listOfFileSizes.filter(file => {
    const [[fileName, size], ...rest] = Object.entries(file)
    return size >= limit
  })
}

function findSumOfFilesUnderLimit(commands, limit) {
  const filesUnderLimit = findFilesUnderLimit(commands, limit)
  return filesUnderLimit.reduce((acc, current) => {
    const [[fileName, size], ...rest] = Object.entries(current)
    return acc + size
  }, 0)
}

const systemSize = 70000000
const spaceNeeded = 30000000
const usedSpace = 44359867

const freeSpace = systemSize - usedSpace
const sizeToDelete = spaceNeeded - freeSpace

function findSmallestFileOverLimit(commands, limit) {
  const filesOverLimit = findFilesOverLimit(commands, limit)
  const list = filesOverLimit.map(file => {
    const [[fileName, size], ...rest] = Object.entries(file)
    return size
  })
  return Math.min(...list)
}

console.log('smallest', findSmallestFileOverLimit(formattedReadout, sizeToDelete))