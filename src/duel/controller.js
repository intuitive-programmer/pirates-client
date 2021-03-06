class DuelController {
  constructor (model, view) {
    this.model = model
    this.view = view
    this.bindMethods()
  }

  startDuel () {
    setInterval(() => {
      ++this.model.duelTimer
      this.startDuelShowdown()
    }, 1000)
    this.startPacesCounter()
  }

  startPacesCounter () {
    // this.model.paceTimer = this.game.time.create(false)
    // this.model.paceTimer.repeat(500, 10, this.updatePacesCounter, this)
    // this.paceTimer.start()
    const paces = this.model.paces
    this.view.renderPacesCounter(paces)
    setInterval(() => {
      this.updatePacesCounter()
    }, 1000)
  }

  updatePacesCounter () {
    if(this.model.paces < 3) {
      const paces = ++this.model.paces
      this.view.updatePacesCounter(paces)
    }
  }

  startDuelShowdown () {
    if(this.model.duelTimer === 5) {
      this.model.setTimeDelay
      this.model.timeDelay
      setTimeout(this.view.renderDraw, this.model.timeDelay)
    }
  }

  bindMethods () {
    this.startPacesCounter = this.startPacesCounter.bind(this)
    this.updatePacesCounter = this.updatePacesCounter.bind(this)
  }
}
