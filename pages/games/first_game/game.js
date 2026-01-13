import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';

const width = window.innerWidth;
const height = window.innerHeight;

const config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    parent: 'game-container',
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
