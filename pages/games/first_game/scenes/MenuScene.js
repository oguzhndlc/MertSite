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

        /* =========================
           BACKGROUND ANIMATION
        ========================= */

        this.anims.create({
            key: 'menuBgAnim',
            frames: this.anims.generateFrameNumbers('menuBg', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        const bg = this.add.sprite(width / 2, height / 2, 'menuBg');
        bg.setDisplaySize(width, height);
        bg.play('menuBgAnim');

        /* =========================
           ROTATE WARNING (iOS SAFE)
        ========================= */

        this.rotateText = this.add.text(
            width / 2,
            height / 2,
            'Lütfen telefonu yan çevirin',
            {
                fontSize: '28px',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 20, y: 10 }
            }
        )
        .setOrigin(0.5)
        .setDepth(100)
        .setVisible(false);

        this.isPortrait = false;

        this.scale.on('resize', () => {
            this.isPortrait = window.innerHeight > window.innerWidth;
            this.rotateText.setVisible(this.isPortrait);

            // SADECE input kilitle
            this.input.enabled = !this.isPortrait;
        });

        /* =========================
           FONT LOAD
        ========================= */

        const font = new FontFace(
            'PixelFont',
            'url(/pages/games/first_game/assets/fonts/pixel.ttf)'
        );

        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);

            /* =========================
               TITLE
            ========================= */

            this.add.text(width / 2, height / 1.5, 'Platformer Oyunu', {
                fontFamily: 'PixelFont',
                fontSize: '90px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5);

            /* =========================
               START BUTTON
            ========================= */

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

            startButton.on('pointerdown', async () => {

                // 1️⃣ FULLSCREEN
                if (!this.scale.isFullscreen) {
                    await this.scale.startFullscreen();
                }

                // 2️⃣ LANDSCAPE LOCK (Android only)
                if (
                    this.scale.isFullscreen &&
                    screen.orientation?.lock &&
                    !this.sys.game.device.os.iOS
                ) {
                    try {
                        await screen.orientation.lock('landscape');
                    } catch (e) {
                        // sessiz geç
                    }
                }

                // 3️⃣ GAME SCENE
                this.scene.start('GameScene');
            });
        });

        /* =========================
           FULLSCREEN EXIT CLEANUP
        ========================= */

        this.scale.on('leavefullscreen', () => {
            if (screen.orientation?.unlock) {
                screen.orientation.unlock();
            }
        });
    }
}
