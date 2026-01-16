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
        const w = this.scale.width;
        const h = this.scale.height;

        /* ===== BACKGROUND ANIM ===== */
        this.anims.create({
            key: 'menuBgAnim',
            frames: this.anims.generateFrameNumbers('menuBg', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        this.bg = this.add.sprite(w / 2, h / 2, 'menuBg')
            .setDisplaySize(w, h)
            .play('menuBgAnim');

        /* ===== FONT ===== */
        const font = new FontFace(
            'PixelFont',
            'url(/pages/games/first_game/assets/fonts/pixel.ttf)'
        );

        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
            this.createUI();
        });

        /* ===== ROTATE OVERLAY ===== */
        this.rotateOverlay = this.add.rectangle(
            w / 2, h / 2, w, h, 0x000000, 0.85
        ).setDepth(1000).setVisible(false);

        this.rotateText = this.add.text(
            w / 2, h / 2,
            'Lütfen telefonu yan çevirin',
            { fontFamily: 'PixelFont', fontSize: '32px', color: '#ffffff' }
        ).setOrigin(0.5).setDepth(1001).setVisible(false);

        /* ===== RESIZE ===== */
        this.scale.on('resize', this.onResize, this);
        this.onResize(this.scale.gameSize);
    }

    createUI() {
        const w = this.scale.width;
        const h = this.scale.height;

        this.title = this.add.text(
            w / 2,
            h / 1.5,
            'Platformer Oyunu',
            {
                fontFamily: 'PixelFont',
                fontSize: '90px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }
        ).setOrigin(0.5);

        this.startButton = this.add.text(
            w / 2,
            h / 2.5,
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

        this.startButton.on('pointerup', async () => {

            if (!this.scale.isFullscreen) {
                await this.scale.startFullscreen();
            }

            if (screen.orientation?.lock) {
                try {
                    await screen.orientation.lock('landscape');
                } catch (e) {
                    console.warn('Orientation kilitlenemedi');
                }
            }

            this.scene.start('GameScene');
        });
    }

    onResize(gameSize) {
        const w = gameSize.width;
        const h = gameSize.height;

        const isPortrait = h > w;

        /* BACKGROUND */
        this.bg.setPosition(w / 2, h / 2);
        this.bg.setDisplaySize(w, h);

        /* UI */
        if (this.title && this.startButton) {
            this.title.setPosition(w / 2, h / 1.5);
            this.startButton.setPosition(w / 2, h / 2.5);
            this.startButton.setAlpha(isPortrait ? 0.4 : 1);
            this.startButton.disableInteractive();
            if (!isPortrait) this.startButton.setInteractive();
        }

        /* ROTATE OVERLAY */
        this.rotateOverlay
            .setVisible(isPortrait)
            .setPosition(w / 2, h / 2)
            .setSize(w, h);

        this.rotateText
            .setVisible(isPortrait)
            .setPosition(w / 2, h / 2);
    }
}
