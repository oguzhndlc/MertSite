document.addEventListener('DOMContentLoaded', () => {

    let gameRunning = false;

    const bgMusic = new Audio("assets/music/game_background.mp3");
    bgMusic.loop = true;      // 🔁 LOOP
    bgMusic.volume = 0.4;

    let musicStarted = false;

    function checkOrientation() {
        const isMobile = window.innerWidth < 768;
        const isPortrait = window.innerHeight > window.innerWidth;

        if (isMobile && isPortrait) {
            document.getElementById("rotate-warning").style.display = "flex";
            gameRunning = false;
            bgMusic.pause();
        } else {
            document.getElementById("rotate-warning").style.display = "none";

            if (!gameRunning) {
                gameRunning = true;
                lastTime = 0; // ⏱️ animasyon reset
                requestAnimationFrame(animate);
            }
        }
    }

    function startMusicOnce() {
        if (!musicStarted) {
            bgMusic.play().catch(e => console.log(e));
            musicStarted = true;
        }
    }

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const sprite = new Image();
    sprite.src = 'assets/game_sprite_sheet.png'; // sprite sheet

    const bg = new Image();
    bg.src = 'assets/game_background.jpg'; // arka plan

    const frameWidth = 32;
    const frameHeight = 32;

    const animations = {
        idle: { y: 0, frames: 13, speed: 150 },
        walk: { y: 32, frames: 8, speed: 60 }
    };

    let currentAnim = 'idle';
    let frameX = 0;
    let lastTime = 0;

    let positionX = 50; // karakter başlangıç x
    const speed = 2;
    let facingRight = true;

    let bgX = 0; // arkaplan kaydırma

    const keys = { left: false, right: false };

    const leftBtn = document.getElementById("btn-left");
    const rightBtn = document.getElementById("btn-right");

    // SOL
    leftBtn.addEventListener("touchstart", () => {
        keys.left = true;
        startMusicOnce(); // 🎵 ilk dokunuş
    });

    leftBtn.addEventListener("touchend", () => {
        keys.left = false;
    });

    // SAĞ
    rightBtn.addEventListener("touchstart", () => {
        keys.right = true;
        startMusicOnce();
    });

    rightBtn.addEventListener("touchend", () => {
        keys.right = false;
    });


    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            startMusicOnce(); // 🎵 PC için
        }

        if (e.key === 'ArrowLeft') keys.left = true;
        if (e.key === 'ArrowRight') keys.right = true;
    });


    window.addEventListener('keyup', e => {
        if (e.key === 'ArrowLeft') keys.left = false;
        if (e.key === 'ArrowRight') keys.right = false;
    });

    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);


    const groundY = canvas.height - 54; // zemin

    function update() {
        const midScreen = canvas.width / 2;

        if (keys.left) {
            facingRight = false;
            currentAnim = 'walk';

            if (positionX > midScreen) {
                positionX -= speed;
            } else {
                bgX += speed;
            }
        } else if (keys.right) {
            facingRight = true;
            currentAnim = 'walk';

            if (positionX < midScreen) {
                positionX += speed;
            } else {
                bgX -= speed;
            }
        } else {
            currentAnim = 'idle';
        }
    }

    function drawBackground() {
        // Orijinal boyutu al
        const scale = canvas.height / bg.height; // yükseklik oranı
        const scaledWidth = bg.width * scale;

        // Sonsuz tekrar için
        const repeatCount = Math.ceil(canvas.width / scaledWidth) + 1;

        let xOffset = bgX % scaledWidth;
        if (xOffset > 0) xOffset -= scaledWidth;

        for (let i = 0; i < repeatCount; i++) {
            ctx.drawImage(bg, xOffset + i * scaledWidth, 0, scaledWidth, canvas.height);
        }
    }

    function animate(time) {
        if (!gameRunning) return; // ⛔ DİKEYDE ÇALIŞMAZ

        if (!lastTime) lastTime = time;
        const delta = time - lastTime;

        const anim = animations[currentAnim];
        if (delta > anim.speed) {
            frameX = (frameX + 1) % anim.frames;
            lastTime = time;
        }

        update();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();

        ctx.save();

        if (!facingRight) {
            ctx.translate(positionX + frameWidth, groundY);
            ctx.scale(-1, 1);
            ctx.drawImage(
                sprite,
                frameX * frameWidth,
                anim.y,
                frameWidth,
                frameHeight,
                0,
                0,
                frameWidth,
                frameHeight
            );
        } else {
            ctx.drawImage(
                sprite,
                frameX * frameWidth,
                anim.y,
                frameWidth,
                frameHeight,
                positionX,
                groundY,
                frameWidth,
                frameHeight
            );
        }

        ctx.restore();
        requestAnimationFrame(animate);
    }


    // 🔹 Yüklemeleri bekle
    sprite.onload = () => {
        bg.onload = () => {
            checkOrientation(); // ✅ sadece kontrol
        };
    };

});
