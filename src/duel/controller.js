class DuelController {
  constructor (model, view) {
    this.model = model
    this.view = view
    this.bindMethods()
  }

  startPacesCounter () {
    const paces = this.model.paces
    this.view.renderPacesCounter(paces)
    setInterval(this.updatePacesCounter, 1000)
  }

  updatePacesCounter () {
    if(this.model.paces < 3) {
      const paces = ++this.model.paces
      this.view.updatePacesCounter(paces)
    }
  }

  bindMethods () {
    this.startPacesCounter = this.startPacesCounter.bind(this)
    this.updatePacesCounter = this.updatePacesCounter.bind(this)
  }
}

