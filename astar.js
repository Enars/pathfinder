import { Open, Closed } from "./cell.js"
import { removeFromArray, manhattanDist } from "./helpers.js"
import Row from "./row.js"

let cols 
let rows
let grid
const walls = 0.3

let openSet = []
let closedSet = []
let start
let end
let path = []

let requestId
let stop = false
//let frameCount = 0
let changeFps = false
let fps = 5
let startTime, now, then, elapsed, fpsInterval


export function onUpdateSettings(state) {
  fps = state.fps
  changeFps = true
  console.log("fps changed to: " + fps)
}

// initialize the timer variables and start the animation
export function animate(fps) {
  fpsInterval = 1000 / fps
  then = Date.now()
  startTime = then
  changeFps = false
  loop()
}

function loop() {
    // calc elapsed time since last loop
    requestId = requestAnimationFrame(loop)
    now = Date.now()
    elapsed = now - then

    if (changeFps) {
      window.cancelAnimationFrame(requestId);
      animate(fps)
    }

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
      
      // Draw the next iteration and stop when finished
      if (openSet.length > 0 && !stop) {
        work()
        
        //if (!stop)
          draw()
        
      }
      else
        window.cancelAnimationFrame(requestId);
  }
}

export function clear() {
  start = grid[0][0] 
  end = grid[cols - 1][rows - 1] 

  stop = false
  path = []
  closedSet = []
  openSet = []
}

export function run() {
  clear()
  openSet.push(start);
  animate(fps)
}

export function processNeighbors() {

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y].addNeighbors(x, y, grid, cols, rows)
    }
  }
}

export function toggleOpenClosed(cell) {
  let isOpen = cell instanceof Open
  const x = cell.x
  const y = cell.y
  const domCell = document.getElementById(`cell-${x}-${y}`)
  const row = document.getElementById(`row-${x}`)

  // Remove the old cell
  domCell.remove()
  delete grid[x][y]

  if (isOpen) {
    /**
     * FIX: closed does not work, gets traversed through. Check if the element at location truly is changed, or see if neighbors update properly
     */
    console.log('closed')
    grid[x][y] = new Closed(x,y);
  } else {
    console.log('opened')
    grid[x][y] = new Open(x,y);
  }
  // Draw the newly created node
  grid[x][y].draw()
  
  // Move it to the original location
  const newDomCell = row.lastChild

  /**
   * Possible fix needed: check if is first??
   */
  const nextElement = document.getElementById(`cell-${x}-${y+1}`)
  row.insertBefore(newDomCell, nextElement)

  // Redetermine neighbors, clear moves, redraw grid
  processNeighbors()
  clear()
  draw()
}

// Setup grid, instantiate cells, count neighbors, set start and end, put start in openSet
export function setup(state) {
  console.log('Setup')
  stop = true
  cols = state.cols
  rows = state.rows
  grid = new Array(cols)

  // Making a multidimensional array
  for (let x = 0; x < cols; x++) {
    grid[x] = new Row(x)
    grid[x].draw()
  }

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (Math.random() > walls || x == 0 && y == 0 || x == cols - 1 && y == rows - 1) 
        grid[x][y] = new Open(x,y);
      else 
        grid[x][y] = new Closed(x, y)
      grid[x][y].draw()
    }
  }

  processNeighbors()
}

// Draw and work algorithm
function work() {
  // Work
  let winner = 0
  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i].f < openSet[winner].f) {
      winner = i
    }
  }
  let current = openSet[winner]
  if (current === end) {
    stop = true
  }
  
  removeFromArray(openSet, current);
  closedSet.push(current)

  const neighbors = current.neighbors
  for (let i=0; i< neighbors.length;i++) {
    let neighbor = neighbors[i]

    if (!closedSet.includes(neighbor)) {
      const tempG = current.g + 1

      let improvement = false
      if (openSet.includes(neighbor)) {
        if (tempG < neighbor.g) {
          neighbor.g = tempG
          improvement = true
        }
      } else {
        neighbor.g = tempG
        openSet.push(neighbor)
        improvement = true
      }
      if (improvement) {
        neighbor.h = manhattanDist(neighbor,end)
        neighbor.f = neighbor.g + neighbor.h
        neighbor.previous = current
      }
    }
  }
}

function draw() {
  // Draw
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].color('white')
    }  
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].color('purple')
  }
  
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].color('lightblue')
  }

  path = []
  let temp = [...closedSet].pop();
  if (temp){
  path.push(temp)
  while (temp.previous) {
    path.push(temp.previous)
    temp = temp.previous
  }

  for (let i = 0; i < path.length; i++) {
    path[i].color('blue')
  }}
}
