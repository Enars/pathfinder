export default class Row {
  constructor(x) {
    this.x = x
    }
  draw() {
    const el = document.createElement('div')
    el.setAttribute('id', `row-${this.x}`)
    el.setAttribute('class', 'row')
    document.getElementById('board').appendChild(el)
  }
}