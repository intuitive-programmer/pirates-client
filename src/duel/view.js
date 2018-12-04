class DuelView {
  constructor () {
    this.containerDiv = document.querySelector('#container')
    this.bindMethods()
  }

  renderPacesCounter (paces) {
    const pacesTimerDiv = document.createElement('div')
    pacesTimerDiv.id = "paces-timer"
    pacesTimerDiv.innerText = `Paces: ${paces}`
    this.containerDiv.appendChild(pacesTimerDiv)
  }
  
  updatePacesCounter (paces) {
    const pacesTimerDiv = document.querySelector('#paces-timer')
    pacesTimerDiv.innerText = `Paces: ${paces}`
  }

  bindMethods () {

  }
}