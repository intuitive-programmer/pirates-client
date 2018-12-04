class DuelModel {
  constructor () {
    this.mode = 0

    this.enemyPirateTimer = null
    this.enemyPirateDead = false

    this.pacesTimer = null
    this.pacesText = null
    this.paces = 1

    this.shotAt = 0

    this.reactionTimeMin = 100
    this.reactionTimeMax = 500
    this.bindMethods()
  }

  bindMethods () {
    
  }
}

// Shootout.Game = function (game) {

//   this.cowboy = null;
//   this.draw = null;

//   this.cowboyTimer = null;
//   this.cowboyDead = false;

//   this.paceTimer = null;
//   this.paceText = null;
//   this.pace = 1;

//   this.shotAt = 0;

//   this.mode = Shootout.INTRO;

//   //  You have between 100ms and 500ms to shoot first
//   this.reactionTimeMin = 100;
//   this.reactionTimeMax = 500;

// };