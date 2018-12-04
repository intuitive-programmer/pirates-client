const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 960, // Canvas width in pixels
  height: 704, // Canvas height in pixels
  parent: "container", // ID of the DOM element to add the canvas to
  scene: {
    preload: preload,
    create: create
  }
}

const game = new Phaser.Game(config);

function preload() {
  // Runs once, loads up assets like images and audio
  this.load.image("island-tiles", "./assets/tilesets/island-sheet.png")
}

function create() {
  // Load a map from a 2D array of tile indices
  const level = [
    [  72,  72,  72,  72,  72,  72,  72,  72,  72,  72,  72,  72,  72 ],
    [  72,   5,   7,   6,   6,   7,   7,   6,   7,   7,   6,   8,  72 ],
    [  72,  37,  38,  38,  38,  38,  38,  38,  38,  38,  38,  24,  72 ],
    [  72,  37,  38,  38,  38,  38,  38,  38,  38,  38,  38,  24,  72 ],
    [  72,  37,  38,  38,  38,  38,  38,  38,  38,  38,  38,  40,  72 ],
    [  72,  37,  38,  38,  38,  38,  38,  38,  38,  38,  38,  24,  72 ],
    [  72,  37,  38,  38,  38,  38,  38,  38,  38,  38,  38,  40,  72 ],
    [  72,  37,  38,  38,  38,  38,  38,  38,  38,  38,  38,  40,  72 ],
    [  72,  37,  38,  38,  38,  38,  38,  38,  38,  38,  38,  24,  72 ],
    [  72,  53,  54,  54,  55,  54,  55,  54,  54,  55,  55,  56,  72 ],
    [  72,  72,  72,  72,  72,  72,  72,  72,  72,  72,  72,  72,  72 ]
  ]

  // When loading from an array, make sure to specify the tileWidth and tileHeight
  const map = this.make.tilemap({ data: level, tileWidth: 64, tileHeight: 64 });
  const tiles = map.addTilesetImage("island-tiles");
  const layer = map.createStaticLayer(0, tiles, 0, 0);
}

function update(time, delta) {
  // Runs once per frame for the duration of the scene
}