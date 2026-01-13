import Phaser from "phaser";
import GameScene from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,                 // WebGL varsa WebGL, yoksa Canvas
  width: window.innerWidth,           // Ekran genişliği
  height: window.innerHeight,         // Ekran yüksekliği
  parent: "game-container",           // HTML içindeki div id
  backgroundColor: "#000000",         // Siyah arka plan
  scale: {
    mode: Phaser.Scale.RESIZE,        // Otomatik boyutlandırma
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [GameScene]                  // Yüklenecek sahne
};

// Yeni Phaser oyunu oluştur
const game = new Phaser.Game(config);

// Fullscreen / Mobil dokunma için basit örnek
window.addEventListener("resize", () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
