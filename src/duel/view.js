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

  renderDraw() {
    this.containerDiv.innerHTML = ''
    const drawAlertDiv = document.createElement('div')
    drawAlertDiv.id = "draw-alert"
    drawAlertDiv.innerText = "DRAW"
    this.containerDiv.appendChild(drawAlertDiv)
  }

  bindMethods () {
    this.renderPacesCounter = this.renderPacesCounter.bind(this)
    this.updatePacesCounter = this.updatePacesCounter.bind(this)
    this.renderDraw = this.renderDraw.bind(this)
  }
}