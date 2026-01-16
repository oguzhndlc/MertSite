// GameScene.js
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    player;
    cursors;
    ground;
    bg;
    arrow;
    bgMusic;

    isPortrait = false;

    mobileInput = {
        left: false,
        right: false,
        jump: false,
        down: false
    };

    arrowFrame = 0;
    arrowFrameTimer = 0;
    arrowFrameDelay = 125;

    jumpTimer = 0;
    jumpHoldTime = 500;

    preload() {
        const basePath = '/pages/games/first_game/assets/';
        this.load.image('bg', basePath + 'images/game_background.jpg');
        this.load.spritesheet('arrow', basePath + 'images/arrow.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('player', basePath + 'images/player.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.audio('bgMusic', basePath + 'music/game_background.mp3');
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        /* MULTI TOUCH */
        this.input.addPointer(3);

        /* BACKGROUND */
        const bgImg = this.textures.get('bg').getSourceImage();
        this.bg = this.add.tileSprite(0, 0, w, bgImg.height, 'bg')
            .setOrigin(0)
            .setScale(h / bgImg.height);

        /* ARROW */
        this.arrow = this.add.tileSprite(0, 0, w, 128, 'arrow')
            .setOrigin(0)
            .setScale(h / 128);

        /* ROTATE OVERLAY */
        this.rotateOverlay = this.add.rectangle(
            w / 2, h / 2, w, h, 0x000000, 0.85
        ).setDepth(1000).setVisible(false);

        this.rotateText = this.add.text(
            w / 2, h / 2,
            'Lütfen telefonu yan çevirin',
            { fontSize: '32px', color: '#ffffff' }
        ).setOrigin(0.5).setDepth(1001).setVisible(false);

        /* INPUT */
        this.cursors = this.input.keyboard.createCursorKeys();

        /* GROUND */
        this.ground = this.physics.add.staticGroup();
        this.ground.create(w / 2, h - 100)
            .setSize(w, 50)
            .setVisible(false);

        /* PLAYER */
        this.player = this.physics.add.sprite(w / 2, h / 2, 'player')
            .setScale(5)
            .setCollideWorldBounds(true);
        this.player.body.setGravityY(500);

        this.physics.add.collider(this.player, this.ground);

        /* ANIMS */
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
            frameRate: 10
        });

        this.anims.create({
            key: 'fastfall',
            frames: this.anims.generateFrameNumbers('player', { start: 79, end: 81 }),
            frameRate: 10
        });

        /* MUSIC */
        this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
        this.bgMusic.play();

        /* MOBILE CONTROLS */
        this.createMobileControls();

        /* ORIENTATION */
        this.scale.on('resize', this.checkOrientation, this);
        this.checkOrientation(this.scale.gameSize);
    }

    checkOrientation(gameSize) {
        const { width, height } = gameSize;
        this.isPortrait = height > width;

        this.rotateOverlay
            .setVisible(this.isPortrait)
            .setPosition(width / 2, height / 2)
            .setSize(width, height);

        this.rotateText
            .setVisible(this.isPortrait)
            .setPosition(width / 2, height / 2);

        this.input.enabled = !this.isPortrait;
    }

    createMobileControls() {
        if (!this.sys.game.device.input.touch) return;

        const w = this.scale.width;
        const h = this.scale.height;

        const btn = (x, y, txt) =>
            this.add.text(x, y, txt, {
                fontSize: '32px',
                backgroundColor: '#000000aa',
                color: '#ffffff',
                padding: { x: 20, y: 10 }
            })
            .setDepth(100)
            .setScrollFactor(0)
            .setInteractive();

        const left = btn(40, h - 120, '◀');
        const right = btn(140, h - 120, '▶');
        const jump = btn(w - 140, h - 120, '⬆');
        const down = btn(w - 140, h - 60, '⬇');

        left.on('pointerdown', () => this.mobileInput.left = true);
        left.on('pointerup', () => this.mobileInput.left = false);
        left.on('pointerout', () => this.mobileInput.left = false);

        right.on('pointerdown', () => this.mobileInput.right = true);
        right.on('pointerup', () => this.mobileInput.right = false);
        right.on('pointerout', () => this.mobileInput.right = false);

        jump.on('pointerdown', () => this.mobileInput.jump = true);
        jump.on('pointerup', () => this.mobileInput.jump = false);
        jump.on('pointerout', () => this.mobileInput.jump = false);

        down.on('pointerdown', () => this.mobileInput.down = true);
        down.on('pointerup', () => this.mobileInput.down = false);
        down.on('pointerout', () => this.mobileInput.down = false);
    }

    update(time, delta) {
        if (this.isPortrait) return;

        const p = this.player;
        const c = this.cursors;

        const left = c.left.isDown || this.mobileInput.left;
        const right = c.right.isDown || this.mobileInput.right;
        const up = c.up.isDown || this.mobileInput.jump;
        const down = c.down.isDown || this.mobileInput.down;

        if (left) {
            p.setVelocityX(-200);
            p.flipX = true;
            if (p.body.blocked.down) p.anims.play('run', true);
        } else if (right) {
            p.setVelocityX(200);
            p.flipX = false;
            if (p.body.blocked.down) p.anims.play('run', true);
        } else {
            p.setVelocityX(0);
            if (p.body.blocked.down) p.anims.play('idle', true);
        }

        if (up && p.body.blocked.down) {
            p.setVelocityY(-300);
            this.jumpTimer = this.jumpHoldTime;
            p.anims.play('jump', true);
        }

        if (up && this.jumpTimer > 0) {
            this.jumpTimer -= delta;
        }

        if (down && !p.body.blocked.down) {
            p.setVelocityY(1000);
            p.anims.play('fastfall', true);
        }

        this.bg.tilePositionX += p.body.velocity.x * delta / 1000;
        this.arrow.tilePositionX -= 200 * delta / 1000;

        this.arrowFrameTimer += delta;
        if (this.arrowFrameTimer >= this.arrowFrameDelay) {
            this.arrowFrame = (this.arrowFrame + 1) % 6;
            this.arrow.setFrame(this.arrowFrame);
            this.arrowFrameTimer = 0;
        }
    }
}
