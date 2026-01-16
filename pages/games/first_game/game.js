const config = {
    type: Phaser.AUTO,
    parent: 'game-container',

    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
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

const game = new Phaser.Game(config);
