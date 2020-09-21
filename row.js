export default class Row {
  constructor(x)
  draw() {
    const div = document.createElement('div')
    div.setAttribute('id', `${this.x}-${this.y}`)
    div.setAttribute('class', 'cell')
    document.getElementById('board').appendChild(div)
  }

  color(color) {
    const cell = document.getElementById(`${x}-${y}`)
    //todo
  }
}