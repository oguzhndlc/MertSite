// main.js
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container",
  scene: {
    preload,
    create,
    update
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

function preload() {
  this.load.image('sky', '/assets/game_background.jpg');
}

function create() {
  this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'sky');

  // Tam ekran başlatma
  this.input.once('pointerdown', () => {
    if (!this.scale.isFullscreen) {
      this.scale.startFullscreen();
    }
  });

  // Başlat butonu
  const startText = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'BAŞLAT', {
    font: '48px Arial',
    fill: '#ffffff'
  }).setOrigin(0.5);

  startText.setInteractive();
  startText.on('pointerdown', () => {
    startText.destroy();
    this.scene.start('gameScene'); // Eğer oyun sahnesine geçmek istersen
  });
}

function update() {}

new Phaser.Game(config);
