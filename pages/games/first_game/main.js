// main.js

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container",
  scene: {
    preload,
    create,
    update
  }
};

function preload() {
  this.load.image("logo", "assets/logo.png"); // Örnek
}

function create() {
  this.add.image(window.innerWidth/2, window.innerHeight/2, "logo");

  // Tam ekran başlangıç (ilk tıklamada)
  this.input.once('pointerdown', () => {
    if (!this.scale.isFullscreen) {
      this.scale.startFullscreen();
    }
  });
}

function update() {}

new Phaser.Game(config);
