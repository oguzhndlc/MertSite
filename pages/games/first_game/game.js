import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';

const width = window.innerWidth;
const height = window.innerHeight;

const config = {
    type: Phaser.AUTO,

    // 🔹 İlk yükleme ölçüsü
    width: width,
    height: height,

    parent: 'game-container',

    // 🔹 MULTI TOUCH (AYNI ANDA BİRDEN FAZLA TUŞ)
    input: {
        activePointers: 3
    },

    // 🔹 MOBİL + ROTATION DESTEKLİ SCALE
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },

    scene: [MenuScene, GameScene] // Menü önce, oyun sonra
};

const game = new Phaser.Game(config);

/* 🔹 TARAYICI DÖNDÜĞÜNDE PHASER'I HABERDAR ET */
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
