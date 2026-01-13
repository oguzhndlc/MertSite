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

        // Menü arkaplan animasyonu oluştur
        this.anims.create({
            key: 'menuBgAnim',
            frames: this.anims.generateFrameNumbers('menuBg', { start: 0, end: 7 }), // 30 kare örnek
            frameRate: 15, // FPS
            repeat: -1     // sonsuz tekrar
        });

        // Arkaplan sprite'ını sahneye ekle
        const bg = this.add.sprite(width / 2, height / 2, 'menuBg');
        bg.setDisplaySize(width, height); // ekrana oturur
        bg.play('menuBgAnim');            // animasyonu başlat

        // Özel fontu yükle
        const font = new FontFace('PixelFont', 'url(/pages/games/first_game/assets/fonts/pixel.ttf)');

        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);

            // Başlık
            this.add.text(width / 2, height / 1.5, 'Platformer Oyunu', {
                fontFamily: 'PixelFont', // yüklediğimiz font adı
                fontSize: '90px',
                color: '#ffffff',         // yazı rengi
                stroke: '#000000',        // çerçeve rengi
                strokeThickness: 4        // çerçevenin kalınlığı
            }).setOrigin(0.5);

            // Başlat butonu
            const startButton = this.add.text(width / 2, height / 2.5, 'BAŞLAT', {
                fontFamily: 'PixelFont', // istersen buton fontu da değiştirebilirsin
                fontSize: '32px',
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: { x: 20, y: 10 }
            }).setOrigin(0.5).setInteractive();

            startButton.on('pointerdown', () => {
                this.scene.start('GameScene'); // GameScene’e geçiş
            });
        });
    }
}
