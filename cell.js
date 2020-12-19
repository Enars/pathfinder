import { neighborSquares } from './helpers.js'
import { toggleOpenClosed } from './astar.js'
/**
 * Cell parent class of Open (passable), Closed (impassable), location x, y
 */
class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.neighbors = []
  }
  addNeighbors() {}
  color() {}
  draw() {
    const cellType = this instanceof Open ? 'open' : 'closed'
    const el = document.createElement('div')
    el.setAttribute('id', `cell-${this.x}-${this.y}`)
    el.setAttribute('class', cellType)
    el.addEventListener('click', () => toggleOpenClosed(this))
    document.getElementById(`row-${this.x}`).appendChild(el)
    // document.getElementById(`cell-${this.x}-${this.y}`).addEventListener('onClick', () => {
    //   console.log('hej')
    //   this.bind(el)
    //   toggleOpenClosed()
    // })
  }
  replace() {
    const cellType = this instanceof Open ? 'open' : 'closed'
    const el = document.createElement('div')
    el.setAttribute('id', `cell-${this.x}-${this.y}`)
    el.setAttribute('class', cellType)
    el.addEventListener('click', () => toggleOpenClosed(this))
    return el
  }
} 

export class Closed extends Cell {
  constructor(x, y) {
    super(x, y)
  }
}

export class Open extends Cell {
  constructor(x, y) {
    super(x, y)
    this.f = 0
    this.g = 0
    this.h = 0
  }

  addNeighbors(x, y, grid, cols, rows) {
    let allNeighbors = neighborSquares(x, y)
    
    allNeighbors.forEach(n => {
      let neighborX = n[0]
      let neighborY = n[1]

      if (inBoundsAndOpenCell(neighborX, neighborY))
        this.neighbors.push(grid[neighborX][neighborY])
    })
    
    function inBoundsAndOpenCell(x, y) {
      if (x >= 0 && y >= 0)
        if (x < rows && y < cols)
          if (grid[x][y] instanceof Open)
            return true
    }
  }

  color(color) {
    const cell = document.getElementById(`cell-${this.x}-${this.y}`)
    cell.style.backgroundColor = color
  }
}