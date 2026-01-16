// GameScene.js
export default class GameScene extends Phaser.Scene {
    player;
    cursors;
    ground;
    jumpTimer = 0;
    jumpHoldTime = 500;
    bgMusic;
    escKey;
    bg;
    arrow;

    arrowFrame = 0;
    arrowFrameTimer = 0;
    arrowFrameDelay = 125;

    // MOBİL INPUT STATE
    mobileInput = {
        left: false,
        right: false,
        jump: false,
        down: false
    };

    constructor() {
        super('GameScene');
    }

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
        const width = this.scale.width;
        const height = this.scale.height;

        /* ================= BACKGROUND ================= */
        const bgImg = this.textures.get('bg').getSourceImage();
        this.bg = this.add.tileSprite(0, 0, width, bgImg.height, 'bg')
            .setOrigin(0, 0)
            .setScale(height / bgImg.height);

        /* ================= ARROW TILE ================= */
        this.arrow = this.add.tileSprite(0, 0, width, 128, 'arrow', 0)
            .setOrigin(0, 0)
            .setScale(height / 128);

        /* ================= INPUT ================= */
        this.cursors = this.input.keyboard.createCursorKeys();

        this.escKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );
        this.escKey.on('down', () => {
            if (this.bgMusic) this.bgMusic.stop();
            this.scene.start('MenuScene');
        });

        /* ================= GROUND ================= */
        this.ground = this.physics.add.staticGroup();
        this.ground.create(width / 2, height - 100, null)
            .setSize(width, 50)
            .setVisible(false);

        /* ================= PLAYER ================= */
        this.player = this.physics.add.sprite(width / 2, height / 2, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(500);
        this.player.setScale(5);

        this.physics.add.collider(this.player, this.ground);

        /* ================= PLAYER ANIMS ================= */
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

        /* ================= MUSIC ================= */
        this.bgMusic = this.sound.add('bgMusic', {
            loop: true,
            volume: 0.5
        });
        this.bgMusic.play();

        /* ================= MOBILE CONTROLS ================= */
        this.createMobileControls();
    }

    createMobileControls() {
        if (!this.sys.game.device.input.touch) return;

        const w = this.scale.width;
        const h = this.scale.height;

        const makeBtn = (x, y, label) => {
            return this.add.text(x, y, label, {
                fontSize: '32px',
                backgroundColor: '#000000aa',
                color: '#ffffff',
                padding: { x: 20, y: 10 }
            })
            .setScrollFactor(0)
            .setDepth(100)
            .setInteractive();
        };

        // SOL
        const leftBtn = makeBtn(40, h - 120, '◀');
        leftBtn.on('pointerdown', () => this.mobileInput.left = true);
        leftBtn.on('pointerup', () => this.mobileInput.left = false);
        leftBtn.on('pointerout', () => this.mobileInput.left = false);

        // SAĞ
        const rightBtn = makeBtn(140, h - 120, '▶');
        rightBtn.on('pointerdown', () => this.mobileInput.right = true);
        rightBtn.on('pointerup', () => this.mobileInput.right = false);
        rightBtn.on('pointerout', () => this.mobileInput.right = false);

        // ZIPLA
        const jumpBtn = makeBtn(w - 140, h - 120, '⬆');
        jumpBtn.on('pointerdown', () => this.mobileInput.jump = true);
        jumpBtn.on('pointerup', () => this.mobileInput.jump = false);
        jumpBtn.on('pointerout', () => this.mobileInput.jump = false);

        // FAST FALL
        const downBtn = makeBtn(w - 140, h - 60, '⬇');
        downBtn.on('pointerdown', () => this.mobileInput.down = true);
        downBtn.on('pointerup', () => this.mobileInput.down = false);
        downBtn.on('pointerout', () => this.mobileInput.down = false);
    }

    update(time, delta) {
        const player = this.player;
        const cursors = this.cursors;

        const left = cursors.left.isDown || this.mobileInput.left;
        const right = cursors.right.isDown || this.mobileInput.right;
        const up = cursors.up.isDown || this.mobileInput.jump;
        const down = cursors.down.isDown || this.mobileInput.down;

        /* ================= PLAYER MOVE ================= */
        if (left) {
            player.setVelocityX(-200);
            player.flipX = true;
            if (player.body.blocked.down) player.anims.play('run', true);
        } else if (right) {
            player.setVelocityX(200);
            player.flipX = false;
            if (player.body.blocked.down) player.anims.play('run', true);
        } else {
            player.setVelocityX(0);
            if (player.body.blocked.down) player.anims.play('idle', true);
        }

        /* ================= JUMP ================= */
        if (up && player.body.blocked.down) {
            player.setVelocityY(-300);
            this.jumpTimer = this.jumpHoldTime;
            player.anims.play('jump', true);
        }

        if (up && this.jumpTimer > 0) {
            player.setVelocityY(-300);
            this.jumpTimer -= delta;
        }

        if (!up || this.jumpTimer <= 0) {
            this.jumpTimer = 0;
        }

        /* ================= FAST FALL ================= */
        if (down && !player.body.blocked.down) {
            player.setVelocityY(1000);
            player.anims.play('fastfall', true);
        }

        if (!player.body.blocked.down && !down) {
            player.anims.play('jump', true);
        }

        /* ================= BACKGROUND SCROLL ================= */
        this.bg.tilePositionX += player.body.velocity.x * delta / 1000;

        /* ================= ARROW SCROLL ================= */
        this.arrow.tilePositionX -= 200 * delta / 1000;

        /* ================= ARROW FRAME ================= */
        this.arrowFrameTimer += delta;
        if (this.arrowFrameTimer >= this.arrowFrameDelay) {
            this.arrowFrame = (this.arrowFrame + 1) % 6;
            this.arrow.setFrame(this.arrowFrame);
            this.arrowFrameTimer = 0;
        }
    }
}
