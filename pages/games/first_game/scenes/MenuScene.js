// MenuScene.js
export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        const basePath = '/pages/games/first_game/assets/';

        // Menü arkaplanı artık sprite sheet
        // Örneğin 30 kare, her kare 800x600
        this.load.spritesheet('menuBg', basePath + 'images/menu_background.png', {
            frameWidth: 560,
            frameHeight: 272
        });

        // Eğer font dosyasını preload etmek istiyorsan Phaser yapısı ile değil,
        // FontFace API ile yükleyeceğiz. Burada sadece path gerekir.
    }

    create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Menü arkaplan animasyonu
    this.anims.create({
        key: 'menuBgAnim',
        frames: this.anims.generateFrameNumbers('menuBg', { start: 0, end: 7 }),
        frameRate: 15,
        repeat: -1
    });

    const bg = this.add.sprite(width / 2, height / 2, 'menuBg');
    bg.setDisplaySize(width, height);
    bg.play('menuBgAnim');

    // 🔄 ROTATE UYARISI (iOS için şart)
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
    ).setOrigin(0.5).setDepth(100).setVisible(false);

    // Orientation kontrolü
    this.scale.on('resize', () => {
        const isPortrait = window.innerHeight > window.innerWidth;

        this.rotateText.setVisible(isPortrait);
        this.scene.isPaused() !== isPortrait &&
            (isPortrait ? this.scene.pause() : this.scene.resume());
    });

    // Font yükleme
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

        const startButton = this.add.text(width / 2, height / 2.5, 'BAŞLAT', {
            fontFamily: 'PixelFont',
            fontSize: '32px',
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        // 📱 MOBİL FULLSCREEN + LANDSCAPE
        startButton.on('pointerdown', async () => {

            // 1️⃣ Fullscreen
            if (!this.scale.isFullscreen) {
                await this.scale.startFullscreen();
            }

            // 2️⃣ Landscape kilidi (Android)
            if (screen.orientation && screen.orientation.lock) {
                try {
                    await screen.orientation.lock('landscape');
                } catch (e) {
                    console.warn('Orientation kilitlenemedi');
                }
            }

            // 3️⃣ Oyuna geç
            this.scene.start('GameScene');
        });
    });

    // Fullscreen çıkınca kilidi kaldır
    this.scale.on('leavefullscreen', () => {
        if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
        }
    });
}

}
