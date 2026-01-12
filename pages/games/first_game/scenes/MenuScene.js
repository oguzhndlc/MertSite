import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const { width, height } = this.scale;

    // Arkaplan rengi
    this.cameras.main.setBackgroundColor("#1d1d1d");

    // Başlık
    this.add.text(width / 2, height / 2 - 50, "Benim Oyunum", {
      fontSize: "48px",
      color: "#ffffff"
    }).setOrigin(0.5);

    // Başlat butonu
    const startButton = this.add.text(width / 2, height / 2 + 50, "BAŞLAT", {
      fontSize: "36px",
      backgroundColor: "#ffffff",
      color: "#000000",
      padding: { x: 20, y: 10 },
      align: "center"
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    // Tıklama olayı
    startButton.on("pointerdown", () => {
      // 1️⃣ Tam ekran yap
      if (!this.scale.isFullscreen) {
        this.scale.startFullscreen();
      }

      // 2️⃣ Oyun sahnesine geç
      this.scene.start("GameScene");
    });
  }
}
