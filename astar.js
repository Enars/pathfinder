import {Open, Closed} from "./spot.js"
import Row from "./row.js"

const cols = 15
const rows = 15
const grid = new Array(cols)
const diagonals = true
const walls = 0.3

let openSet = []
let closedSet = []
let start
let end
let path = []

let requestId
let stop = false
let frameCount = 0
const fps = 15
let startTime, now, then, elapsed, fpsInterval


// initialize the timer variables and start the animation

export function startAnimating() {
  fpsInterval = 1000 / fps
  then = Date.now()
  startTime = then
  loop()
}

function loop() {

    // calc elapsed time since last loop
    requestId = requestAnimationFrame(loop)
    //console.log(frameCount++)
    now = Date.now()
    elapsed = now - then

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // Draw the next iteration and stop when finished
        if (openSet.length > 0 && !stop)
          draw()
        else
            window.cancelAnimationFrame(requestId);
    }
}

function heuristic(cellA, cellB) {
  const d = Math.abs(cellA.x - cellB.x) + Math.abs(cellA.y - cellB.y)
  return d
} 

function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >=0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1)
    }
  }
}

// Setup grid, instantiate cells, count neighbors, set start and end, put start in openSet
export function setup() {
  console.log('A*')

  // Making a multidimensional array
  for (var x = 0; x < cols; x++) {
    grid[x] = new Row(x)
    grid[x].draw()
  }


  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      if (Math.random() > walls) 
        grid[x][y] = new Open(x,y);
      else 
        grid[x][y] = new Closed(x, y)
      grid[x][y].draw()
    }
  }
  
  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      grid[x][y].addNeighbors(grid, cols, rows, diagonals)
    }
  }

  start = grid[0][0]
  end = grid[cols - 1][rows - 1]

  openSet.push(start);
}

// Draw and work algorithm
function draw() {
  // Work

    var winner = 0
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i
      }
    }
    var current = openSet[winner]
    if (current === end) {
      stop = true
    }
    
    removeFromArray(openSet,current);
    closedSet.push(current)

    var neighbors = current.neighbors
    for (var i=0; i< neighbors.length;i++) {
      var neighbor = neighbors[i]

      if (!closedSet.includes(neighbor)) {
        var tempG = current.g + 1

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG
          }
        } else {
          neighbor.g = tempG
          openSet.push(neighbor)
        }

        neighbor.h = heuristic(neighbor,end)
        neighbor.f = neighbor.g + neighbor.h
        neighbor.previous = current
        
      }
    }

    //todo: no solution

  // Draw
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].color('white')
    }  
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].color('red')
  }
  
  for (var i = 0; i < openSet.length; i++) {
    openSet[i].color('green')
  }

  path = []
  let temp = current
  path.push(temp)
  while (temp.previous) {
    path.push(temp.previous)
    temp = temp.previous
  }

  for (var i = 0; i < path.length; i++) {
    path[i].color('blue')
  }
}