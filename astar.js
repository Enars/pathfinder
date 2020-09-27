import Spot from "./spot.js"
import Row from "./row.js"

const cols = 10
const rows = 10
const grid = new Array(cols)

let openSet = []
let closedSet = []
let start
let end
let path = []

let requestId
var stop = false
var frameCount = 0
var fps, fpsInterval, startTime, now, then, elapsed


// initialize the timer variables and start the animation
startAnimating(15)


function startAnimating(fps) {
  setup()

  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  loop()
}

function loop() {

    // calc elapsed time since last loop
    requestId = requestAnimationFrame(loop)
    console.log(frameCount++)
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // Put your drawing code here
        if (openSet.length > 0)
          draw()
        else
            window.cancelAnimationFrame(requestId);
    }
}

function heuristic(spotA, spotB) {
  const d = Math.abs(spotA.i - spotB.i) + Math.abs(spotA.j - spotB.j)
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
function setup() {
  console.log('A*')

  // Making a multidimensional array
  for (var x = 0; x < cols; x++) {
    grid[x] = new Row(x)
    grid[x].draw()
  }


  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i,j);
      grid[i][j].draw()
    }
  }
  
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid, cols, rows)
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