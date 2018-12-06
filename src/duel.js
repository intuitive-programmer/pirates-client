class DuelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DuelScene', active: true })
  }

  preload() {
    // add map
    this.load.image('pirate-duel-64x64', './assets/tilemaps/tiles/pirates_tiles_sheet.png')
    this.load.tilemapTiledJSON('pirate-duel-layers-map', 'assets/maps/pirate-duel-layers-map.json')
    // add sprites
  }

  create() {
    // add map to canvas
    let duelMap = this.make.tilemap({ key: 'pirate-duel-layers-map'})
    let duelTiles = duelMap.addTilesetImage('pirate-duel-64x64')

    const seaLayer = duelMap.createStaticLayer('Sea', duelTiles, 0, 0)
    const beachLayer = duelMap.createStaticLayer('Beach', duelTiles, 0, 0)
    const armamentsLayer = duelMap.createStaticLayer('Armaments', duelTiles, 0, 0)
    const foliageLayer = duelMap.createStaticLayer('Foliage', duelTiles, 0, 0)
    // add sprites to canvas
    this.delayOpeningScene = this.time.addEvent({
      delay: 2000,
      callback: this.startOpeningScene,
      callbackScope: this
    })
  }

  update() {
    // add animations to sprites
  }

  startOpeningScene() {
    this.scene.launch('DuelOpeningScene')
  }
}

class DuelOpeningScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DuelOpeningScene', active: false })
  }

  create() {    
    let topBar = this.add.graphics()
    topBar.fillStyle('#333300', 1)
    topBar.fillRect(0, 0, 800, 125)
    
    let bottomBar = this.add.graphics()
    bottomBar.fillStyle('#333300', 1)
    bottomBar.fillRect(0, 475, 800, 125)

    let duelText = {
      x: 160,
      y: 40,
      text: 'Click to Start!',
      style: {
        fontSize: '56px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center',
        shadow: {
          color: '#000000',
          fill: true,
          offsetX: 2,
          offsetY: 2,
          blur: 8
        }
      }
    }
    this.pacesAndReadyCard = this.make.text(duelText)

    this.paces = 3

    let instructionText = {
      x: 70,
      y: 525,
      text: 'You need to kill and kill good... Ya kno!',
      style: {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center',
        shadow: {
          color: '#000000',
          fill: true,
          offsetX: 2,
          offsetY: 2,
          blur: 8
        }
      }
    }
    this.instructionsCard = this.make.text(instructionText)

    this.input.on('pointerup', this.startTimer, this)
  }

  startTimer() {
    this.input.off('pointerup', this.startTimers, this)
    this.startPacesAndReadyTimer()
  }

  startPacesAndReadyTimer() {
    this.pacesAndReadyCard.setText('')

    this.time.addEvent({
      delay: 1000,
      callback: this.updatePacesAndReadyCard,
      callbackScope: this,
      repeat: 5
    })
  }
  
  
  updatePacesAndReadyCard() {
    if(this.paces > 0) {
      this.pacesAndReadyCard.setText(`        ${this.paces}...`)
      this.paces--
    } else if(this.paces === 0) {
      this.pacesAndReadyCard.setText('Turn & Face...')
      this.paces--
    } else if(this.paces === -1){
      this.pacesAndReadyCard.setText('    Ready...')
      this.paces--
    } else {
      this.pacesAndReadyCard.setText('')
      this.instructionsCard.setText('')
      this.scene.launch('DuelShowdown')
    }
  }
}

let currentScore = 0

class DuelShowdown extends Phaser.Scene {
  
  constructor() {
    super({ key: 'DuelShowdown', active: false })
  }

  create() {
    let drawText = {
      x: 150,
      y: 250,
      text: '',
      style: {
        fontSize: '80px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center',
        shadow: {
          color: '#000000',
          fill: true,
          offsetX: 2,
          offsetY: 2,
          blur: 8
        }
      }
    }
    this.drawCard = this.make.text(drawText)

    let drawDelay = (Math.random() * 10000) + 1000

    this.drawTimer = this.time.addEvent({
      delay: drawDelay,
      callback: this.updateDrawCard,
      callbackScope: this,
      startAt: 1000
    })

    this.reactionTimer
    this.botReactionTime = (Math.random() * 300) + 400
  }

  updateDrawCard() {
    this.startReactionTimer()

    this.drawCard.setText('!!DRAW!!')

    this.input.on('pointerup', this.reactionSpeed, this)
  }
  
  startReactionTimer() {
    this.reactionTimer = this.time.addEvent({
      delay: 5000,
      callbackScope: this,
    })
  }
  
  reactionSpeed() {
    this.drawCard.setText('')
    
    let reactionSpeed = this.reactionTimer.getElapsed()
    this.duelOutcome(reactionSpeed)
  }

  duelOutcome (reactionSpeed) {
    if(this.botReactionTime < reactionSpeed) {
      this.drawCard.setText("  U DED!")
      console.log(CURRENTSCORE)
      this.input.off('pointerup', this.reactionSpeed, this)

      this.time.addEvent({
        delay: 1500,
        callback: this.drawCard.setText(''),
        callbackScope: this
      })
      renderForm()
    } else {
      this.drawCard.setText('U MED IT!')
      CURRENTSCORE += 10
      console.log(CURRENTSCORE)
      this.input.off('pointerup', this.reactionSpeed, this)
      
      let restartDuelScene = this.scene.get('DuelOpeningScene')
      
      this.time.addEvent({
        delay: 1500,
        callback: () => {
          this.drawCard.setText('')
          restartDuelScene.scene.restart()
        },
        callbackScope: this
      })
    }
  }
} 

class ScoreboardScene extends Phaser.Scene {

  constructor() {
    super({ key: 'ScoreboardScene', active: false })
  }


}
