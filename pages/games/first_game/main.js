import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update
  }
};

function preload() {
  this.load.image('sky', '/assets/game_background.jpg');
}

function create() {
  this.add.image(400, 300, 'sky');
  this.input.once('pointerdown', () => {
    if (!this.scale.isFullscreen) {
      this.scale.startFullscreen();
    }
  });
}

function update() {}

export default new Phaser.Game(config);
