import { startAnimating } from "./astar.js"

export function initView() {
    const restart = document.getElementById('restart')
    restart.addEventListener('click', () => { 
      startAnimating()
    })
    // onClick = () => {
    //   console.log("hej")
    // }
}

