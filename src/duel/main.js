const duelModel = new DuelModel()
const duelView = new DuelView()
const duelController = new DuelController(duelModel, duelView)

const BootScene = new Phaser.Class({
 
  Extends: Phaser.Scene,

  initialize:

  function BootScene ()
  {
      Phaser.Scene.call(this, { key: 'BootScene' });
  },

  preload: function ()
  {
      // load the resources here
  },

  create: function ()
  {
      this.scene.start('WorldScene');
  }
});

var WorldScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function WorldScene ()
  {
      Phaser.Scene.call(this, { key: 'WorldScene' });
  },
  preload: function ()
  {
      
  },
  create: function ()
  {
      // create your world here
  }
});

const config = {
  type: Phaser.AUTO,
  parent: 'container',
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 }
      }
  },
  scene: [
      BootScene,
      WorldScene
  ]
};
const game = new Phaser.Game(config);