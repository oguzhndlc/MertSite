// MenuScene.js
export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        const basePath = '/pages/games/first_game/assets/';

        this.load.spritesheet('menuBg', basePath + 'images/menu_background.png', {
            frameWidth: 560,
            frameHeight: 272
        });
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        /* ===== BACKGROUND ===== */
        this.anims.create({
            key: 'menuBgAnim',
            frames: this.anims.generateFrameNumbers('menuBg', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        const bg = this.add.sprite(width / 2, height / 2, 'menuBg');
        bg.setDisplaySize(width, height);
        bg.play('menuBgAnim');

        /* ===== FONT ===== */
        const font = new FontFace(
            'PixelFont',
            'url(/pages/games/first_game/assets/fonts/pixel.ttf)'
        );

        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);

            this.add.text(width / 2, height / 1.5, 'Platformer Oyunu', {
                fontFamily: 'PixelFont',
                fontSize: '90px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5);

            const startButton = this.add.text(
                width / 2,
                height / 2.5,
                'BAŞLAT',
                {
                    fontFamily: 'PixelFont',
                    fontSize: '32px',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: { x: 20, y: 10 }
                }
            )
            .setOrigin(0.5)
            .setInteractive();

            /* ===== FULLSCREEN ===== */
            startButton.on('pointerdown', async () => {
                if (!this.scale.isFullscreen) {
                    await this.scale.startFullscreen();
                }

                this.scene.start('GameScene');
            });
        });
    }
}
