export class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  addNeighbors() {}
  draw() {
    const cellType = this instanceof Spot ? Spot : Wall
    const el = document.createElement('div')
    console.log(`${objectType}`)
    el.setAttribute('id', `${objectType}-${this.x}-${this.y}`)
    el.setAttribute('class', 'spot')
    document.getElementById(`row-${this.x}`).appendChild(el)
  }
  color() {}
}

export class Wall extends Cell {
  constructor(x, y) {
    super(x, y)
  }
}

export class Spot extends Cell {
  constructor(x, y) {
    super(x, y)
    this.f = 0
    this.g = 0
    this.h = 0
    this.neighbors = []
  }

  addNeighbors(grid, cols, rows, diagonals) {
    if (this.x < cols - 1) {
      this.neighbors.push(grid[this.x+1][this.y])
    }
    if (this.x > 0) {
      this.neighbors.push(grid[this.x-1][this.y])
    }
    if (this.y < rows - 1) {
      this.neighbors.push(grid[this.x][this.y+1])
    }
    if (this.y > 0) {
    this.neighbors.push(grid[this.x][this.y-1])
    }
    if (diagonals) {
      if (this.x < cols - 1 && this.y < rows - 1) {
        this.neighbors.push(grid[this.x + 1][this.y + 1])
      }
      if (this.x > 0 && this.y < rows - 1) {
        this.neighbors.push(grid[this.x - 1][this.y + 1])
      }
      if (this.x < cols - 1 && this.y > 0)
        this.neighbors.push(grid[this.x + 1][this.y - 1])
  
      if (this.x > 0 && this.y > 0) {
        this.neighbors.push(grid[this.x - 1][this.y - 1])
      }
    }
  }

  color(color) {
    const cell = document.getElementById(`spot-${this.x}-${this.y}`)
    cell.style.backgroundColor = color
  }
}