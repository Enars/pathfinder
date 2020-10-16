import { startAnimating, setup } from "./astar.js"

window.onload = () => {
  const initSettings = {
    fps: 15,
    x: 15,
    y: 15,
    diagonals: true
  }
  setup()
  const start = document.getElementById('start')
  const fpsIn = document.getElementById('fps-input')
  const xSizeIn = document.getElementById('x-size-input')
  const ySizeIn = document.getElementById('y-size-input')
  const diagonalsIn = document.getElementById('diagonals-checkbox')
  
  start.addEventListener('click', () => {
    startAnimating()  
  })
  xSizeIn.addEventListener('change', (e) => {
    
    console.log(e.target.value)
  })
}
