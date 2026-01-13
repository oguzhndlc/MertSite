// GameScene.js
export default class GameScene extends Phaser.Scene {
    player;
    cursors;
    ground;
    jumpTimer = 0;
    jumpHoldTime = 500;
    bgMusic;        // arkaplan müziği
    escKey;         // geri tuşu
    bg;             // sonsuz arkaplan için tileSprite

    constructor() {
        super('GameScene');
    }

    preload() {
        const basePath = '/pages/games/first_game/assets/';
        this.load.image('bg', basePath + 'images/game_background.jpg');

        this.load.spritesheet('player', basePath + 'images/player.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.audio('bgMusic', basePath + 'music/game_background.mp3');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // TILESPRITE ARKAPLAN (resmin kendi boyutunu kullan, sol üstten başlat)
        this.bg = this.add.tileSprite(0, 0, width, this.textures.get('bg').getSourceImage().height, 'bg');
        this.bg.setOrigin(0, 0);
        this.bg.setScale(height / this.textures.get('bg').getSourceImage().height); 
        // resmi ekran yüksekliğine göre ölçekledik, yatay tekrar yapılacak

        // klavye
        this.cursors = this.input.keyboard.createCursorKeys();

        // geri tuşu (ESC)
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.escKey.on('down', () => {
            if (this.bgMusic) this.bgMusic.stop();
            this.scene.start('MenuScene');
        });

        // zemin (görünmez)
        this.ground = this.physics.add.staticGroup();
        this.ground.create(width / 2, height - 100, null)
            .setSize(width, 50)
            .setVisible(false);

        // oyuncu
        this.player = this.physics.add.sprite(width / 2, height / 2, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(500);
        this.player.setScale(5);

        this.physics.add.collider(this.player, this.ground);

        // animasyonlar
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 13, end: 20 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 65, end: 70 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'fastfall',
            frames: this.anims.generateFrameNumbers('player', { start: 79, end: 81 }),
            frameRate: 10,
        });

        // arkaplan müziğini başlat
        this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
        this.bgMusic.play();
    }

    update(time, delta) {
        const player = this.player;
        const cursors = this.cursors;

        // sağ - sol hareket
        if (cursors.left.isDown) {
            player.setVelocityX(-200);
            player.flipX = true;
            if (player.body.blocked.down) player.anims.play('run', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(200);
            player.flipX = false;
            if (player.body.blocked.down) player.anims.play('run', true);
        } else {
            player.setVelocityX(0);
            if (player.body.blocked.down) player.anims.play('idle', true);
        }

        // zıplama basılı tutma
        if (cursors.up.isDown && player.body.blocked.down) {
            player.setVelocityY(-300);
            this.jumpTimer = this.jumpHoldTime;
            player.anims.play('jump', true);
        }

        if (cursors.up.isDown && this.jumpTimer > 0) {
            player.setVelocityY(-300);
            this.jumpTimer -= delta;
        }

        if (cursors.up.isUp || this.jumpTimer <= 0) {
            this.jumpTimer = 0;
        }

        // fast fall
        if (cursors.down.isDown && !player.body.blocked.down) {
            player.setVelocityY(1000);
            player.anims.play('fastfall', true);
        }

        if (!player.body.blocked.down && !cursors.down.isDown) {
            player.anims.play('jump', true);
        }

        // SONSUZ ARKAPLAN HAREKETİ (yalnızca yatay)
        this.bg.tilePositionX += player.body.velocity.x * delta / 1000;
    }
}
