export default class Spot {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.f = 0
    this.g = 0
    this.h = 0
    this.neighbors = []
  }

  addNeighbors(grid) {
    if (i < cols - 1) {
      this.neighbors.push(grid[i+1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i-1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j+1]);
    }
    if (j > 0) {
    this.neighbors.push(grid[i][j-1]);
    }
  }
  
  draw() {
    const div = document.createElement('span')
    div.setAttribute('id', `${this.x}-${this.y}`)
    div.setAttribute('class', 'cell')
    document.getElementById('board').appendChild(div)
  }

  color(color) {
    const cell = document.getElementById(`${x}-${y}`)
    //todo
  }
}