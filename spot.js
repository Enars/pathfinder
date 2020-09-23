export default class Spot {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.f = 0
    this.g = 0
    this.h = 0
    this.neighbors = []
  }

  addNeighbors(grid, cols, rows) {
    if (this.x < cols - 1) {
      this.neighbors.push(grid[this.x+1][this.y]);
    }
    if (this.x > 0) {
      this.neighbors.push(grid[this.x-1][this.y]);
    }
    if (this.y < rows - 1) {
      this.neighbors.push(grid[this.x][this.y+1]);
    }
    if (this.y > 0) {
    this.neighbors.push(grid[this.x][this.y-1]);
    }
  }
  
  draw() {
    const el = document.createElement('div')
    el.setAttribute('id', `cell-${this.x}-${this.y}`)
    el.setAttribute('class', 'cell')
    document.getElementById(`row-${this.x}`).appendChild(el)
  }

  color(color) {
    const cell = document.getElementById(`cell-${this.x}-${this.y}`)
    cell.style.backgroundColor = color;
  }
}