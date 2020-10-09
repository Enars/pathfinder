import { startAnimating, setup } from "./astar.js"

window.onload = () => {
  setup()
  const start = document.getElementById('start')
  start.addEventListener('click', () => {
    startAnimating()  
  })
}