import { setup, animate, update } from "./astar.js"

window.onload = () => {
  let state = {
    fps: 5,
    x: 15,
    y: 15,
    diagonals: true
  }
  
  const start = document.getElementById('start')
  const fpsIn = document.getElementById('fps-input')
  const sizeIn = document.getElementById('size-input')
  const board = document.getElementById('board')
  
  start.addEventListener('click', () => {
    animate(state.fps)
  })

  fpsIn.addEventListener('change', (e) => {
    const val = e.target.value
    // if (val < 1)
    //   fpsIn.value = 0.5
    // if (val > 99)
    //   fpsIn.value = 15
    state.fps = fpsIn.value
    update(state.fps)
  })

  sizeIn.addEventListener('change', (e) => {
    const val = e.target.value
    if (val < 3)
      sizeIn.value = 3
    if (val > 99)
      sizeIn.value = 99
    state.x = sizeIn.value
    updateBoard(state)
  })

  updateBoard(state)
}

function updateBoard(state) {
  document.getElementById('board').innerHTML = ''
  setup()
}

