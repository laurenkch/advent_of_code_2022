export function getUniquePointsList(points) {
  let reference = {}
  for (let i = 0; i < points.length; i++) {
    const values = Object.values(reference)
    if (!Object.values(reference).some(point => JSON.stringify(point) === JSON.stringify(points[i]))) {
      reference = { ...reference, [i]: points[i] }
    }
  }
  return reference
}

export function getSymbolForTailPoints(currentPoint, tailPoints) {
  let symbol = '.'
  if (tailPoints.some(point => point === JSON.stringify(currentPoint))) {
    symbol = '#'
  }
  return symbol
}



export function getSymbolForAllPoints(currentPoint, list) {
  let symbol = '*'
  const entries = Object.entries(list)
  for (const [key, value] of entries) {
    if ((JSON.stringify(value) === JSON.stringify(currentPoint))) {
      if (parseInt(key) === 0) {
        symbol = 'H'
      } else {
        symbol = key
      }
    }
  }
  return symbol
}

export function mapTailVisits(points) {
  const xValues = points.map(point => JSON.parse(point)[0])
  const yValues = points.map(point => JSON.parse(point)[1])
  const maxX = Math.max(...xValues)
  const minX = Math.min(...xValues)
  const maxY = Math.max(...yValues)
  const minY = Math.min(...yValues)

  const printout = []

  for (let y = maxY; y >= minY; y--) {
    const row = []
    for (let x = minX; x <= maxX; x++) {
      const symbol = getSymbolForTailPoints([x, y], points)
      row.push(symbol)
    }
    printout.push(row)
  }
  return printout
}


export function mapAllPoints(points) {
  let uniquePoints = getUniquePointsList(points)

  const xValues = Object.values(uniquePoints).map(point => point[0])
  const yValues = Object.values(uniquePoints).map(point => point[1])
  const maxX = Math.max(...xValues)
  const minX = Math.min(...xValues)
  const maxY = Math.max(...yValues)
  const minY = Math.min(...yValues)

  const printout = []

  for (let y = maxY; y >= minY; y--) {
    const row = []
    for (let x = minX; x <= maxX; x++) {
      const symbol = getSymbolForAllPoints([x, y], uniquePoints)
      row.push(symbol)
    }
    printout.push(row)
  }
  return printout
}

