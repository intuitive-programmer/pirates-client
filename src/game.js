let config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 960,
  backgroundColor: '#558000',
  parent: 'canvas',
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [
    DuelScene,
    DuelOpeningScene,
    DuelShowdown
  ]
}

const game = new Phaser.Game(config);