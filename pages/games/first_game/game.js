import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';

const config = {
    type: Phaser.AUTO,

    // 🎯 LANDSCAPE TASARIM BOYUTU
    width: 1280,
    height: 720,

    parent: 'game-container',

    scale: {
        mode: Phaser.Scale.FIT,          // ekranı doldurur, oran bozulmaz
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },

    scene: [MenuScene, GameScene]
};

new Phaser.Game(config);
