import { setup, animate, onUpdateSettings, run, toggleOpenClosed } from "./astar.js"

window.onload = () => {
  let state = {
    fps: 5,
    rows: 15,
    cols: 15
  }
  
  const start = document.getElementById('start')
  const update = document.getElementById('update')
  const fpsIn = document.getElementById('fps-input')
  const sizeIn = document.getElementById('size-input')
  const board = document.getElementById('board')
  
  start.addEventListener('click', () => run())
  update.addEventListener('click', () => updateBoard(state))

  fpsIn.addEventListener('drag', (e) => {
    const val = e.target.value
    // if (val < 1)
    //   fpsIn.value = 0.5
    // if (val > 99)
    //   fpsIn.value = 15
    state.fps = fpsIn.value
    onUpdateSettings(state)
  })

  sizeIn.addEventListener('change', (e) => {
    const val = e.target.value
    // if (val < 3)
    //   sizeIn.value = 3
    // if (val > 99)
    //   sizeIn.value = 99
    state.rows = sizeIn.value
    state.cols = sizeIn.value
    updateBoard(state)
  })

  function handleCellClick() {
    

  } 

  updateBoard(state)
}


function updateBoard(state) {
  document.getElementById('board').innerHTML = ''
  setup(state)
}

