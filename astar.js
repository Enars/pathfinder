import Spot from "./spot.js"
import Row from "./row.js"

const cols = 10;
const rows = 10;
const wait = 1
const grid = new Array(cols);

let openSet = [];
let closedSet = [];
let start;
let end;
let path = []

setup();
while(openSet.length > 0) {
  draw()
}
function heuristic(spotA, spotB) {
  // var d = dist(a.i, a.j, b.i, b.j);
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

// P5 har alltid en setup(main) fil
function setup() {
  console.log('A*')

  // w = width/cols;
  // h = height/rows;

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

//P5 har alltid en draw fil som ritar
function draw() {
  //if (openSet.length > 0) {

    var winner = 0
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i
      }
    }
    var current = openSet[winner]

    if (current === end) {
    
    }

    removeFromArray(openSet,current);
    //ta bort current från openSet
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


    //keep going
    //todo: no solution

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