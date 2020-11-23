// Manhattan distance heuristic
export function manhattanDist(cellA, cellB) {
  const d = Math.abs(cellA.x - cellB.x) + Math.abs(cellA.y - cellB.y)
  return d
}

// Straight line heuristic
export function euclideanDist(cellA, cellB) {
  const d = Math.sqrt(Math.pow(((cellA.x - cellB.x), 2)) + Math.pow((cellA.y - cellB.y), 2))
  return d
}

export function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >=0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1)
    }
  }
}

export let neighborSquares = (x, y) => {
  return [
    [x-1, y-1], [x, y-1], [x+1, y-1],
    [x-1, y],             [x+1, y],
    [x-1, y+1], [x, y+1], [x+1, y+1]
  ] 
}

// export function inBoundsAndOpenCell(x, y, rows, cols, grid) {
//   if (x > 0 && y > 0)
//     if (x < rows - 1 && y < cols - 1)
//       if (grid[x][y] instanceof Open)
//         return true
// }