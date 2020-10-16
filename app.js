import { startAnimating, setup } from "./astar.js"

window.onload = () => {
    const initSettings = JSON.parse(window.localStorage.getItem('settings'))
    //? JSON.parse(window.localStorage.getItem('settings')) : {
  //   fps: 15,
  //   x: 15,
  //   y: 15,
  //   diagonals: true
  // }
  let settings = initSettings
  setup()
  const start = document.getElementById('start')
  const fpsIn = document.getElementById('fps-input')
  const xSizeIn = document.getElementById('x-size-input')
  const ySizeIn = document.getElementById('y-size-input')
  const diagonalsIn = document.getElementById('diagonals-checkbox')
  const board = document.getElementById('board')
  
  start.addEventListener('click', () => startAnimating())

  xSizeIn.addEventListener('change', (e) => {
    const val = e.target.value
    if (val < 3)
      xSizeIn.value = 3
    if (val > 99) 
      xSizeIn.value = 99

    settings.x = val 
    updateBoard()
  })

  ySizeIn.addEventListener('change', (e) => {
    const val = e.target.value
    if (val < 3)
      ySizeIn.value = 3
    if (val > 99) 
      ySizeIn.value = 99

    settings.y = val 
    updateBoard()
  })
  
  fpsIn.addEventListener('change', (e) => {
    const val = e.target.value
    if (val < 1)
      ySizeIn.value = 1
    if (val > 99) 
      ySizeIn.value = 99

    settings.fps = val 
    updateBoard()
  })

  function updateBoard() {
    //Save settings
    window.localStorage.setItem('settings',  JSON.stringify(settings))
    // console.log(JSON.parse(window.localStorage.getItem('settings')))
    //Clear board
    board.innerHTML = ''
    //Create new board
    setup(settings)
  }
}
