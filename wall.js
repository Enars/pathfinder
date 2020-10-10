export default class Wall {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    
    draw() {
        const el = document.createElement('div')
        el.setAttribute('id', `wall-${this.x}-${this.y}`)
        el.setAttribute('class', 'wall')
        document.getElementById(`row-${this.x}`).appendChild(el)
    }
}