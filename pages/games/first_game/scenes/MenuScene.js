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
        const resizeAll = () => {
            const width = this.scale.width;
            const height = this.scale.height;

            bg.setPosition(width / 2, height / 2);
            bg.setDisplaySize(width, height);

            title.setPosition(width / 2, height / 1.5);
            startButton.setPosition(width / 2, height / 2.5);
        };

        /* ===== BACKGROUND ===== */
        this.anims.create({
            key: 'menuBgAnim',
            frames: this.anims.generateFrameNumbers('menuBg', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        const bg = this.add.sprite(
            this.scale.width / 2,
            this.scale.height / 2,
            'menuBg'
        );

        bg.setDisplaySize(this.scale.width, this.scale.height);
        bg.play('menuBgAnim');

        /* ===== FONT ===== */
        const font = new FontFace(
            'PixelFont',
            'url(/pages/games/first_game/assets/fonts/pixel.ttf)'
        );

        let title;
        let startButton;

        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);

            title = this.add.text(
                this.scale.width / 2,
                this.scale.height / 1.5,
                'Platformer Oyunu',
                {
                    fontFamily: 'PixelFont',
                    fontSize: '90px',
                    color: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 4
                }
            ).setOrigin(0.5);

            startButton = this.add.text(
                this.scale.width / 2,
                this.scale.height / 2.5,
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
            .setInteractive({ useHandCursor: true });

            /* ===== FULLSCREEN + LANDSCAPE ===== */
            startButton.on('pointerup', async () => {

                // FULLSCREEN
                if (!this.scale.isFullscreen) {
                    await this.scale.startFullscreen();
                }

                // LANDSCAPE LOCK (Android / PWA)
                if (screen.orientation && screen.orientation.lock) {
                    try {
                        await screen.orientation.lock('landscape');
                    } catch (e) {
                        console.warn('Orientation kilitlenemedi');
                    }
                }

                this.scene.start('GameScene');
            });
        });

        /* ===== RESIZE / ROTATION LISTENER ===== */
        this.scale.on('resize', resizeAll);
    }
}
