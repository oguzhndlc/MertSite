import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    const { width, height } = this.scale;

    // Arkaplan
    this.cameras.main.setBackgroundColor("#007700");

    // Karakter placeholder (yeşil kare)
    this.player = this.add.rectangle(width / 2, height - 100, 50, 50, 0xffffff);
    this.player.setOrigin(0.5, 0.5);

    // Hız
    this.playerSpeed = 300; // px/s

    // Klavye kontrolleri
    this.cursors = this.input.keyboard.createCursorKeys();

    // Mobil butonlar
    this.createMobileControls();
  }

  update(time, delta) {
    const deltaSec = delta / 1000; // ms → s
    let velocityX = 0;

    // Klavye kontrolleri
    if (this.cursors.left.isDown) velocityX = -this.playerSpeed;
    if (this.cursors.right.isDown) velocityX = this.playerSpeed;

    // Mobil kontroller
    if (this.moveLeft) velocityX = -this.playerSpeed;
    if (this.moveRight) velocityX = this.playerSpeed;

    // Karakteri hareket ettir
    this.player.x += velocityX * deltaSec;

    // Ekrandan çıkmasını önle
    const halfWidth = this.player.width / 2;
    if (this.player.x < halfWidth) this.player.x = halfWidth;
    if (this.player.x > this.scale.width - halfWidth) this.player.x = this.scale.width - halfWidth;
  }

  createMobileControls() {
    const { width, height } = this.scale;

    // Sol buton
    const leftBtn = this.add.rectangle(80, height - 80, 100, 100, 0x000000, 0.5)
      .setOrigin(0.5)
      .setInteractive();
    const rightBtn = this.add.rectangle(width - 80, height - 80, 100, 100, 0x000000, 0.5)
      .setOrigin(0.5)
      .setInteractive();

    leftBtn.on("pointerdown", () => this.moveLeft = true);
    leftBtn.on("pointerup", () => this.moveLeft = false);
    leftBtn.on("pointerout", () => this.moveLeft = false);

    rightBtn.on("pointerdown", () => this.moveRight = true);
    rightBtn.on("pointerup", () => this.moveRight = false);
    rightBtn.on("pointerout", () => this.moveRight = false);
  }
}
