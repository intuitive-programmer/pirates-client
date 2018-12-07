let cursors;

let pirateCaptainIdle
let pirateCaptainShoot
let pirateCaptainDead

let pirateBotIdle
let pirateBotShoot
let pirateBotDead


class DuelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DuelScene', active: true })
  }

  preload() {
    // add map
    this.load.image("tiles", "./assets/tilesets/pirates_tiles_sheet.png")
    this.load.tilemapTiledJSON("map", "./assets/tilemaps/pirate-duel-layers-map.json")
    // add sprites

    //load pirate captain
    this.load.spritesheet('pirate-captain', 'assets/spritesheet/pirate-captain/pirate-captain-idle-shoot-large.png', { frameWidth: 204, frameHeight: 192 })
    this.load.spritesheet('pirate-captain-dead', 'assets/spritesheet/pirate-captain/pirate-captain-dead-large.png', { frameWidth: 236.6, frameHeight: 192 })

    //load pirate woman
    this.load.spritesheet('pirate-woman', 'assets/spritesheet/pirate-woman/big_piratewoman_idle_shoot.png', { frameWidth: 174.7, frameHeight: 192 })
    this.load.spritesheet('pirate-woman-dead', 'assets/spritesheet/pirate-woman/big_piratewoman_dead.png', { frameWidth: 231.7, frameHeight: 192 })

  }

  create() {
    // add map to canvas
    const map = this.make.tilemap({ key: "map" })
    const tileset = map.addTilesetImage("pirates_tiles_sheet.png", "tiles");

    const seaLayer = map.createStaticLayer('Sea', tileset, 0, 0)
    const beachLayer = map.createStaticLayer('Beach', tileset, 0, 0)
    const armamentsLayer = map.createStaticLayer('Armaments', tileset, 0, 0)
    const foliageLayer = map.createStaticLayer('Foliage', tileset, 0, 0)
    // add sprites to canvas

    let duelScene = this.scene.get('DuelShowdown')
    
    this.pirateCaptain = this.physics.add.sprite(300, 455, 'pirate-captain')
    this.pirateBot = this.physics.add.sprite(1300, 450, 'pirate-woman')
    this.pirateBot.flipX = true
    // *** BOT ANIMATIONS ***

    pirateBotIdle = true
    pirateBotShoot = false
    pirateBotDead = false

    this.anims.create({
      key: 'bot-idle',
      frames: this.anims.generateFrameNumbers('pirate-woman', { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1
    }) 
    this.anims.create({
      key: 'bot-shoot',
      frames: this.anims.generateFrameNumbers('pirate-woman', { start: 9, end: 16 }),
      frameRate: 10,
      repeat: 0
    }) 
    this.anims.create({
      key: 'bot-dead',
      frames: this.anims.generateFrameNumbers('pirate-woman-dead', { start: 0, end: 11 }),
      frameRate: 10,
      repeat: 0
    }) 

   


    //*** CAPTAIN ANIMATIONS ***
    pirateCaptainIdle = true

    // duelScene.events.on('idle-anim', () => {
    //   pirateCaptainIdle = !pirateCaptainIdle
    //   console.log('idle')
    // }, this)
    
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('pirate-captain', { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1
    })

    pirateCaptainShoot = false

    // duelScene.events.on('shoot-anim', () => {
    //   pirateCaptainShoot = !pirateCaptainShoot
    //   console.log('shoot')
    // }, this)

    this.anims.create({
      key: 'shoot',
      frames: this.anims.generateFrameNumbers('pirate-captain', { start: 10, end: 17 }),
      frameRate: 10,
      repeat: 0
    })

    pirateCaptainDead = false

    // duelScene.events.on('dead-anim', () => {
    //   pirateCaptainDead = !pirateCaptainDead
    //   console.log('dead')  
    // }, this)

    this.anims.create({
      key: 'dead',
      frames: this.anims.generateFrameNumbers('pirate-captain-dead', { start: 0, end: 11 }),
      frameRate: 10,
      repeat: 0
    })
  }

  update() {
    if(pirateBotIdle) {
      this.pirateBot.body.setVelocity(0)
      this.pirateBot.anims.play('bot-idle', true)
    } else if(pirateBotShoot) {
      this.pirateBot.body.setVelocity(0)
      this.pirateBot.anims.play('bot-shoot', true)
      pirateBotShoot = !pirateBotShoot
    } else if(pirateBotDead) {
      this.pirateBot.body.setVelocity(0)
      this.pirateBot.anims.play('bot-dead', true)
      pirateBotDead = !pirateBotDead
    }

    if(pirateCaptainIdle) {
      this.pirateCaptain.body.setVelocity(0)
      this.pirateCaptain.anims.play('idle', true)
    } else if(pirateCaptainShoot) {
      this.pirateCaptain.body.setVelocity(0)
      this.pirateCaptain.anims.play('shoot', true)
    } else if(pirateCaptainDead) {
      this.pirateCaptain.body.setVelocity(0)
      this.pirateCaptain.anims.play('dead', true)
      pirateCaptainDead = !pirateCaptainDead
    }
  }
}

class DuelOpeningScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DuelOpeningScene', active: true })
  }

  create() {    
    let topBar = this.add.graphics()
    topBar.fillStyle('#333300', 1)
    topBar.fillRect(0, 0, 1600, 240)
    
    let bottomBar = this.add.graphics()
    bottomBar.fillStyle('#333300', 1)
    bottomBar.fillRect(0, 720, 1600, 240)

    let duelText = {
      x: 600,
      y: 100,
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
      x: 375,
      y: 755,
      text: 'Behold! A mutiny! \nThe Quarter Mistress challenges YOU, the Captain. \nPrepare youself for a showdown.\nWhen you see the word "DRAW" click to fire your pistol. \nYou have one bullet, so make it count!',
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
      repeat: 4
    })
  }
  
  
  updatePacesAndReadyCard() {
    if(this.paces > 0) {
      this.pacesAndReadyCard.setText(`        ${this.paces}...`)
      this.paces--
    } else if(this.paces === 0){
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
      x: 575,
      y: 400,
      text: '',
      style: {
        fontSize: '96px',
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

    // this.reactionTimer
    this.botReactionTime = (Math.random() * 300) + 400
  }

  updateDrawCard() {
    // this.startReactionTimer()
    // this.startBotReactionTimer()

    this.startReactionTimers()
    this.drawCard.setText('!!DRAW!!')

    this.input.on('pointerup', this.reactionSpeed, this)
  }

  startReactionTimers() {
    this.startBotReactionTimer()
    this.startReactionTimer()
  }
  
  startBotReactionTimer() {
    this.botReactionTimer = this.time.addEvent({
      delay: this.botReactionTime,
      callbackScope: this,
      callback: this.duelOutcome
    })
  }

  duelOutcome() {
    pirateBotIdle = false
    pirateBotShoot = true
    console.log('duel outcome',pirateCaptainShoot)

    if(!pirateCaptainShoot) {
      pirateCaptainIdle = false
      pirateCaptainDead = true
      console.log("captain ded")

      this.input.off('pointerup', this.reactionSpeed, this)
      this.drawCard.setText('')

      this.scoreboardDelay = this.time.addEvent({
        delay: 3000,
        callbackscope: this,
        callback: this.scoreboardBit
      })
    }
  }
  
  
  scoreboardBit() {
    renderForm()
    const canvas = document.querySelector('#canvas')
    canvas.style.display = 'none'

    const scoreboard = document.querySelector('#scoreboard')
    scoreboard.style.display = 'block'
  }
  
  
  reactionSpeed() {
    this.drawCard.setText('')
    
    if(!pirateBotShoot) {
      pirateCaptainIdle = false
      pirateCaptainShoot = true
      pirateBotDead = true
      console.log('here',pirateCaptainShoot)

      CURRENTSCORE += 10
      this.time.addEvent({
        delay: 2000,
        callback: this.restartDuel,
        callbackScope: this
      })
    }
  }
  
  
  restartDuel() {
    let restartDuelScene = this.scene.get('DuelOpeningScene')
    console.log('2here',pirateCaptainShoot)

    this.drawCard.setText('')
    pirateCaptainDead = false
    pirateCaptainShoot = false
    pirateCaptainIdle = true
    pirateBotIdle = true

    console.log('3here',pirateCaptainShoot)

    this.input.off('pointerup', this.reactionSpeed, this)

    restartDuelScene.scene.restart()

  }
  
  startReactionTimer() {
    this.reactionTimer = this.time.addEvent({
      delay: 5000,
      callbackScope: this,
    })
  }
  // duelOutcome (reactionSpeed) {
    //   if(this.botReactionTime < reactionSpeed) {
      //     this.input.off('pointerup', this.reactionSpeed, this)
      //     this.drawCard.setText("  U DED!")
      //     pirateBotIdle = !pirateBotIdle
      
      //     pirateCaptainDead = !pirateCaptainDead
      
      
      //     this.time.addEvent({
        //       delay: 1500,
        //       callback: this.drawCard.setText(''),
        //       callbackScope: this
        //     })
        //     renderForm()
        //   } else {
          //     this.input.off('pointerup', this.reactionSpeed, this)
          //     this.drawCard.setText('U MED IT!')
          //     pirateBotIdle = !pirateBotIdle
          //     pirateBotDead = !pirateBotDead
          
          //     CURRENTSCORE += 10
          
          //     let restartDuelScene = this.scene.get('DuelOpeningScene')
          
          //     this.time.addEvent({
            //       delay: 1500,
            //       callback: () => {
              //         this.drawCard.setText('')
              //         pirateCaptainIdle = !pirateCaptainIdle
              //         pirateBotIdle = !pirateBotIdle
              //         restartDuelScene.scene.restart()
              //       },
              //       callbackScope: this
  //     })
  //   }
  // }
} 

