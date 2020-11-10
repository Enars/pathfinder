import { setup, animate, update } from "./astar.js"

window.onload = () => {
  let state = {
    fps: 15,
    x: 15,
    y: 15,
    diagonals: true
  }
  
  const start = document.getElementById('start')
  const fpsIn = document.getElementById('fps-input')
  const xSizeIn = document.getElementById('x-size-input')
  const ySizeIn = document.getElementById('y-size-input')
  const diagonalsIn = document.getElementById('diagonals-checkbox')
  const board = document.getElementById('board')
  
  start.addEventListener('click', () => {
    animate(state.fps)
  })

  fpsIn.addEventListener('change', (e) => {
    const val = e.target.value
    if (val < 1)
      fpsIn.value = 0.5
    if (val > 99)
      fpsIn.value = 99
    state.fps = fpsIn.value
    update(state.fps)
  })

  xSizeIn.addEventListener('change', (e) => {
    const val = e.target.value
    if (val < 3)
      xSizeIn.value = 3
    if (val > 99)
      xSizeIn.value = 99
    state.x = xSizeIn.value
    updateBoard(state)
  })

  ySizeIn.addEventListener('change', (e) => {
    const val = e.target.value
    if (val < 3)
      ySizeIn.value = 3
    if (val > 99)
      ySizeIn.value = 99
    state.y = ySizeIn.value
    updateBoard(state)
  })
  updateBoard(state)
}

function updateBoard(state) {
  document.getElementById('board').innerHTML = ''
  setup()
}

