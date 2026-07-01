/* ==========================================================================
   1. RUNTIME STYLE INJECTION (Dynamic Helper Styles)
   ========================================================================== */
const injectPremiumStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Glowing coalescing text letter effect */
        .coalescing-char.glow-text {
            text-shadow: 0 0 12px rgba(255, 215, 0, 0.85), 0 0 24px rgba(255, 77, 109, 0.6);
            color: #fff;
        }

        /* Clicking Ripple circle */
        .ripple-circle {
            position: absolute;
            background: rgba(255, 255, 255, 0.45);
            border-radius: 50%;
            transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 1);
            pointer-events: none;
            z-index: 10;
            animation: rippleEffect 0.75s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform, opacity;
        }
        @keyframes rippleEffect {
            to {
                transform: translate3d(-50%, -50%, 0) scale3d(5, 5, 1);
                opacity: 0;
            }
        }

        /* Stable Typewriter cursor layout */
        .poem-verse {
            border-right: 2px solid transparent;
            display: inline-block;
            width: 100%;
        }
        .poem-verse.typing-active {
            border-right-color: var(--gold);
            animation: blinkCursor 0.8s step-end infinite;
        }
        @keyframes blinkCursor {
            from, to { border-color: transparent }
            50% { border-color: var(--gold) }
        }

        /* Music toggle dynamic visual heartbeat classes */
        .music-controller-wrapper.music-playing .btn-music-toggle {
            animation: heartbeat 1.5s infinite ease-in-out;
            box-shadow: var(--glow-gold);
            border-color: var(--gold);
        }
    `;
    document.head.appendChild(style);
};
injectPremiumStyles();

/* ==========================================================================
   2. ACCELERATED CANVAS PHYSICS & PARTICLE ENGINE (60 FPS GPU Rendering)
   ========================================================================== */
const canvas = document.getElementById('magic-canvas');
const ctx = canvas.getContext('2d');
const particles = [];

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// Resize canvas context, accounting for high-DPI/Retina screens
const resizeCanvasContext = () => {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    
    ctx.scale(dpr, dpr);
};
window.addEventListener('resize', resizeCanvasContext, { passive: true });
resizeCanvasContext();

// Spawn Helper for Canvas Engine
const spawnParticle = (type, x, y, options = {}) => {
    particles.push({
        type: type, // 'heart', 'sparkle', 'petal', 'firefly', 'note', 'circle'
        x: x,
        y: y,
        vx: options.vx !== undefined ? options.vx : (Math.random() - 0.5) * 4,
        vy: options.vy !== undefined ? options.vy : (Math.random() - 0.5) * 4,
        vRot: options.vRot !== undefined ? options.vRot : (Math.random() - 0.5) * 0.06,
        rotation: options.rotation !== undefined ? options.rotation : Math.random() * Math.PI * 2,
        scale: options.scale || 1,
        size: options.size !== undefined ? options.size : 10,
        life: options.life || 1000,
        maxLife: options.life || 1000,
        color: options.color || '#ff4d6d',
        gravity: options.gravity || 0,
        opacity: options.opacity || 1,
        content: options.content || '♬', // specific notes characters
        fade: options.fade !== undefined ? options.fade : true
    });
};

/* Vector Path Renderers */
const drawVectorHeart = (x, y, w, h, rot, color) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(0, -h / 4);
    ctx.bezierCurveTo(-w / 2, -h / 2, -w, -h / 4, -w, h / 4);
    ctx.bezierCurveTo(-w, h * 0.55, -w / 4, h * 0.75, 0, h);
    ctx.bezierCurveTo(w / 4, h * 0.75, w, h * 0.55, w, h / 4);
    ctx.bezierCurveTo(w, -h / 4, w / 2, -h / 2, 0, -h / 4);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
};

const drawVectorSparkle = (x, y, size, color) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(0, 0, size, 0);
    ctx.quadraticCurveTo(0, 0, 0, size);
    ctx.quadraticCurveTo(0, 0, -size, 0);
    ctx.quadraticCurveTo(0, 0, 0, -size);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
};

const drawVectorPetal = (x, y, w, h, rot, color) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.quadraticCurveTo(-w / 2, -h / 4, -w / 2, 0);
    ctx.quadraticCurveTo(-w / 2, h / 2, 0, h / 2);
    ctx.quadraticCurveTo(w / 2, h / 2, w / 2, 0);
    ctx.quadraticCurveTo(w / 2, -h / 4, 0, -h / 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
};

const drawVectorFirefly = (x, y, size, color) => {
    ctx.save();
    ctx.beginPath();
    const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
    glow.addColorStop(0, color);
    glow.addColorStop(0.2, color);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.arc(x, y, size * 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
};

const drawVectorNote = (x, y, note, size, color) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = `${size}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(note, x, y);
    ctx.restore();
};

const drawVectorCircle = (x, y, size, color) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
};

// Canvas Particle Tick Loop (Runs continuously at 60 FPS)
const canvasRenderLoop = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const now = performance.now();
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Progress percentage calculation
        p.life -= 16.67; // Assuming 60fps tick rate
        
        if (p.life <= 0) {
            particles.splice(i, 1);
        } else {
            const ageRatio = p.life / p.maxLife;
            const alpha = p.fade ? ageRatio * p.opacity : p.opacity;

            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.rotation += p.vRot;

            if (alpha > 0) {
                ctx.save();
                ctx.globalAlpha = alpha;
                
                switch (p.type) {
                    case 'heart':
                        drawVectorHeart(p.x, p.y, p.size, p.size, p.rotation, p.color);
                        break;
                    case 'sparkle':
                        drawVectorSparkle(p.x, p.y, p.size, p.color);
                        break;
                    case 'petal':
                        drawVectorPetal(p.x, p.y, p.size, p.size * 1.3, p.rotation, p.color);
                        break;
                    case 'firefly':
                        drawVectorFirefly(p.x, p.y, p.size, p.color);
                        break;
                    case 'note':
                        drawVectorNote(p.x, p.y, p.content, p.size, p.color);
                        break;
                    case 'circle':
                        drawVectorCircle(p.x, p.y, p.size, p.color);
                        break;
                }
                ctx.restore();
            }
        }
    }
    requestAnimationFrame(canvasRenderLoop);
};
requestAnimationFrame(canvasRenderLoop);

/* ==========================================================================
   3. INTRO ANIMATION TIMELINE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const introSection = document.getElementById('intro-section');
    const introTitle = document.getElementById('intro-title');
    const introSubtitle = document.getElementById('intro-subtitle');
    const openHeartBtn = document.getElementById('btn-open-heart');
    const largeHeartWrapper = document.querySelector('.large-heart-wrapper');
    const largeHeart = document.querySelector('.large-animated-heart');
    const cursorGlow = document.getElementById('cursor-glow');

    // Hide elements dynamically to accommodate transition entry
    openHeartBtn.classList.add('hidden');
    introSubtitle.style.opacity = 0;

    // Coalescing Characters Wrap (Floating character particles)
    const originalText = "For Someone Very Special ❤️";
    const buildCoalescingSpans = () => {
        introTitle.innerHTML = originalText.split('').map(char => {
            const x = (Math.random() - 0.5) * 600;
            const y = (Math.random() - 0.5) * 600;
            const rot = (Math.random() - 0.5) * 360;
            return `<span class="coalescing-char" style="display: inline-block; transform: translate3d(${x}px, ${y}px, 0) scale3d(0, 0, 1) rotate3d(0, 0, 1, ${rot}deg); opacity: 0; filter: blur(12px); transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease, filter 1.2s ease;">${char === ' ' ? '&nbsp;' : char}</span>`;
        }).join('');
    };

    const triggerCoalescence = () => {
        const chars = document.querySelectorAll('.coalescing-char');
        chars.forEach((char, index) => {
            setTimeout(() => {
                char.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotate3d(0, 0, 1, 0deg)';
                char.style.opacity = 1;
                char.style.filter = 'none'; /* Completely remove filter to prevent subpixel text blurriness */
                char.classList.add('glow-text');
            }, index * 15);
        });

        // Dissolve coalescing title and transition back to primary titles
        setTimeout(() => {
            chars.forEach((char) => {
                char.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                char.style.opacity = 0;
                char.style.transform = 'translate3d(0, -30px, 0) scale3d(0.7, 0.7, 1)';
                char.style.filter = 'blur(8px)';
            });

            setTimeout(() => {
                introTitle.innerHTML = "A Journey of Love";
                introTitle.style.opacity = 0;
                introTitle.style.transform = 'translate3d(0, 20px, 0)';
                introTitle.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

                setTimeout(() => {
                    introTitle.style.opacity = 1;
                    introTitle.style.transform = 'translate3d(0, 0, 0)';
                    setTimeout(() => {
                        introTitle.style.transform = 'none';
                        introTitle.style.filter = 'none';
                    }, 850);
                }, 50);

                setTimeout(() => {
                    introSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    introSubtitle.style.opacity = 1;
                    introSubtitle.style.transform = 'translate3d(0, 0, 0)';
                    setTimeout(() => {
                        introSubtitle.style.transform = 'none';
                        introSubtitle.style.filter = 'none';
                    }, 850);
                }, 200);

                setTimeout(() => {
                    openHeartBtn.classList.remove('hidden');
                    openHeartBtn.style.opacity = 0;
                    openHeartBtn.style.transform = 'scale3d(0.85, 0.85, 1) translateY(20px)';
                    openHeartBtn.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    setTimeout(() => {
                        openHeartBtn.style.opacity = 1;
                        openHeartBtn.style.transform = 'scale3d(1, 1, 1) translateY(0)';
                        setTimeout(() => {
                            openHeartBtn.style.transform = 'none';
                        }, 850);
                    }, 30);
                }, 400);

            }, 800);

        }, chars.length * 15 + 1800);
    };

    // Fade centerpiece heart in
    largeHeart.style.opacity = 0;
    largeHeart.style.transform = 'scale3d(0, 0, 1) rotate3d(0, 0, 1, -15deg)';
    largeHeart.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    
    setTimeout(() => {
        largeHeart.style.opacity = 1;
        largeHeart.style.transform = 'scale3d(1, 1, 1) rotate3d(0, 0, 1, 0deg)';
    }, 200);

    // Expand and explode large heart
    setTimeout(() => {
        largeHeart.style.transition = 'transform 0.8s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.5s ease, filter 0.6s ease';
        largeHeart.style.transform = 'scale3d(2.6, 2.6, 1)';
        largeHeart.style.filter = 'drop-shadow(0 0 45px rgba(255, 77, 109, 1))';

        setTimeout(() => {
            largeHeart.style.transform = 'scale3d(0, 0, 1)';
            largeHeart.style.opacity = 0;

            const rect = largeHeartWrapper.getBoundingClientRect();
            const cx = rect.left + rect.width / 2 + window.scrollX;
            const cy = rect.top + rect.height / 2 + window.scrollY;

            // Trigger canvas particle explosion
            for (let i = 0; i < 75; i++) {
                const angle = (i / 75) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
                const speed = 2 + Math.random() * 8;
                spawnParticle(
                    Math.random() > 0.4 ? 'heart' : 'sparkle',
                    cx,
                    cy,
                    {
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        color: Math.random() > 0.4 ? 'var(--bright-rose)' : 'var(--gold-bright)',
                        size: Math.random() * 8 + 5,
                        life: 1000 + Math.random() * 600,
                        gravity: 0.045
                    }
                );
            }

            buildCoalescingSpans();
            triggerCoalescence();

        }, 800);

    }, 1200);

    /* ==========================================================================
       4. OPEN MY HEART TRANSITION
       ========================================================================== */
    openHeartBtn.addEventListener('click', (e) => {
        createClickRipple(e, openHeartBtn);

        const clickX = e.pageX;
        const clickY = e.pageY;
        
        // Spawn heart/sparkle physics particles from the click coordinate
        for (let i = 0; i < 40; i++) {
            const angle = (i / 40) * Math.PI * 2;
            const speed = 1.5 + Math.random() * 6;
            spawnParticle(
                Math.random() > 0.5 ? 'heart' : 'sparkle',
                clickX,
                clickY,
                {
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: 'var(--soft-pink)',
                    size: Math.random() * 7 + 4,
                    life: 1000 + Math.random() * 500,
                    gravity: 0.02
                }
            );
        }

        setTimeout(() => {
            introSection.style.transition = 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
            introSection.style.opacity = 0;
            introSection.style.transform = 'scale3d(1.05, 1.05, 1)';

            const mainContent = document.getElementById('main-love-content');
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = 0;
            mainContent.style.transition = 'opacity 1.5s ease';

            attemptMusicAutoplay();

            setTimeout(() => {
                mainContent.style.opacity = 1;
                introSection.classList.add('hidden');
                initializePortalSequences();
            }, 300);

        }, 750);
    });

    // Ripple click helper
    const createClickRipple = (event, element) => {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-circle';
        
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    };

    /* ==========================================================================
       5. PERSISTENT AUDIO SYSTEM
       ========================================================================== */
    const audio = document.getElementById('romantic-bg-music');
    const musicToggleBtn = document.getElementById('music-toggle');
    const musicWrapper = document.querySelector('.music-controller-wrapper');
    const iconMusicOn = document.querySelector('.icon-music-on');
    const iconMusicOff = document.querySelector('.icon-music-off');

    const updateMusicUI = (isPlaying) => {
        if (isPlaying) {
            musicWrapper.classList.add('music-playing');
            iconMusicOn.classList.remove('hidden');
            iconMusicOff.classList.add('hidden');
            musicToggleBtn.setAttribute('aria-pressed', 'true');
        } else {
            musicWrapper.classList.remove('music-playing');
            iconMusicOn.classList.add('hidden');
            iconMusicOff.classList.remove('hidden');
            musicToggleBtn.setAttribute('aria-pressed', 'false');
        }
    };

    const attemptMusicAutoplay = () => {
        audio.play().then(() => {
            updateMusicUI(true);
        }).catch(() => {
            console.log("Autoplay blocked. User action required to play.");
            updateMusicUI(false);
        });
    };

    musicToggleBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                updateMusicUI(true);
                spawnVisualMusicNotes();
            });
        } else {
            audio.pause();
            updateMusicUI(false);
        }
    });

    const spawnVisualMusicNotes = () => {
        const rect = musicToggleBtn.getBoundingClientRect();
        const notes = ['♫', '♪', '♩', '♬'];
        const cx = rect.left + rect.width / 2 + window.scrollX;
        const cy = rect.top + rect.height / 2 + window.scrollY;

        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const char = notes[Math.floor(Math.random() * notes.length)];
                spawnParticle('note', cx, cy, {
                    vx: (Math.random() - 0.5) * 3,
                    vy: -1.5 - Math.random() * 2,
                    color: 'var(--gold-bright)',
                    size: Math.random() * 6 + 12,
                    life: 1500,
                    gravity: -0.01,
                    content: char
                });
            }, i * 150);
        }
    };

    /* ==========================================================================
       6. CURSOR GLOW AND PHYSICS TRAILS (Hardware-accelerated)
       ========================================================================== */
    let lastCursorTime = 0;
    
    // Track mouse positioning efficiently without reflows
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // GPU Offloaded Transform Translation
        cursorGlow.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;

        const now = performance.now();
        if (now - lastCursorTime > 35) { // Throttle particle count
            lastCursorTime = now;
            spawnParticle(
                'sparkle',
                x + window.scrollX,
                y + window.scrollY,
                {
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: Math.random() * 1.2 + 0.8,
                    color: 'var(--gold-bright)',
                    size: Math.random() * 4 + 3,
                    life: 800 + Math.random() * 400,
                    gravity: 0.01
                }
            );
        }
    });

    /* ==========================================================================
       7. VIEWPORT OBSERVERS & LOVE CARD TILT
       ========================================================================== */
    const initializePortalSequences = () => {
        // Section slide/fade viewport observer
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible-element');
                    if (entry.target.id === 'poem-section') {
                        startTypingPoetrySequence();
                    }
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        const targets = [
            document.getElementById('poem-section'),
            document.querySelector('.heading-wrapper'),
            document.querySelector('.love-card-wrapper'),
            document.getElementById('passcode-section'),
            document.getElementById('gallery-section')
        ];

        targets.forEach(t => {
            if (t) observer.observe(t);
        });

        // 3D Glassmorphism Mouse Interaction and Reflect Sweeps
        const loveCard = document.querySelector('.love-card');
        if (loveCard) {
            loveCard.addEventListener('mousemove', (e) => {
                const rect = loveCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const cx = rect.width / 2;
                const cy = rect.height / 2;

                const tiltX = (cy - y) / 12;
                const tiltY = (x - cx) / 16;

                // hardware accelerated transform
                loveCard.style.transform = `translate3d(0, -10px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1)`;

                // Update reflection custom variables dynamically
                const pctX = (x / rect.width) * 100;
                const pctY = (y / rect.height) * 100;
                loveCard.style.setProperty('--reflection-x', `${pctX}%`);
                loveCard.style.setProperty('--reflection-y', `${pctY}%`);
            });

            loveCard.style.transform = 'translate3d(0, 0, 0)';
            
            loveCard.addEventListener('mouseleave', () => {
                loveCard.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                loveCard.style.setProperty('--reflection-x', '50%');
                loveCard.style.setProperty('--reflection-y', '50%');
            });
        }

        // Passive Scroll Parallax
        const poemSection = document.getElementById('poem-section');
        document.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroBg = document.querySelector('.hero-bg-elements');
            const poemBg = document.querySelector('.poem-bg-decor');

            if (heroBg) {
                heroBg.style.transform = `translate3d(0, ${scrolled * 0.12}px, 0)`;
            }
            if (poemBg && poemSection) {
                poemBg.style.transform = `translate3d(0, ${(scrolled - poemSection.offsetTop) * 0.12}px, 0)`;
            }
        }, { passive: true });

        // Scroll to passcode trigger from card button
        const revealBtn = document.getElementById('btn-reveal-surprise');
        if (revealBtn) {
            revealBtn.addEventListener('click', () => {
                const passcodeSec = document.getElementById('passcode-section');
                if (passcodeSec) {
                    passcodeSec.scrollIntoView({ behavior: 'smooth' });
                    // Focus the passcode input
                    const passcodeInp = document.getElementById('passcode-input');
                    if (passcodeInp) {
                        setTimeout(() => passcodeInp.focus(), 800);
                    }
                }
            });
        }

        // Passcode Input verification logic
        const verifyBtn = document.getElementById('btn-verify-passcode');
        const passcodeInp = document.getElementById('passcode-input');
        const passcodeErr = document.getElementById('passcode-error');
        const passcodeCard = document.querySelector('.passcode-card');
        const gallerySec = document.getElementById('gallery-section');

        const performPasscodeVerification = () => {
            const codeVal = passcodeInp.value.trim().toUpperCase();
            if (codeVal === 'TANYUSH1324') {
                passcodeErr.classList.add('hidden');
                
                // Trigger visual success feedback: particle explosion from verifyBtn coords
                const rect = verifyBtn.getBoundingClientRect();
                const cx = rect.left + rect.width / 2 + window.scrollX;
                const cy = rect.top + rect.height / 2 + window.scrollY;
                
                for (let i = 0; i < 40; i++) {
                    const angle = (i / 40) * Math.PI * 2;
                    const speed = 2 + Math.random() * 6;
                    spawnParticle(
                        Math.random() > 0.5 ? 'heart' : 'sparkle',
                        cx,
                        cy,
                        {
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed,
                            color: Math.random() > 0.5 ? 'var(--gold-bright)' : 'var(--bright-rose)',
                            size: Math.random() * 8 + 5,
                            life: 1500,
                            gravity: 0.03
                        }
                    );
                }

                // Unlock gallery section
                gallerySec.classList.remove('hidden');
                
                // Smooth scroll to gallery
                setTimeout(() => {
                    gallerySec.scrollIntoView({ behavior: 'smooth' });
                    
                    // Extra burst of environment particles on unlock
                    const galleryRect = gallerySec.getBoundingClientRect();
                    const gX = galleryRect.left + galleryRect.width / 2 + window.scrollX;
                    const gY = galleryRect.top + 200 + window.scrollY;
                    for (let i = 0; i < 30; i++) {
                        spawnParticle('sparkle', gX + (Math.random() - 0.5) * 300, gY + (Math.random() - 0.5) * 100, {
                            vx: (Math.random() - 0.5) * 2,
                            vy: -1 - Math.random() * 2,
                            color: 'var(--gold-bright)',
                            size: Math.random() * 5 + 3,
                            life: 2000
                        });
                    }
                }, 500);

            } else {
                // Shake and show error
                passcodeErr.classList.remove('hidden');
                passcodeCard.classList.remove('shake-element');
                void passcodeCard.offsetWidth; // Trigger reflow to restart animation
                passcodeCard.classList.add('shake-element');
                
                // Spawn small sad/sparkle error particles
                const rect = passcodeInp.getBoundingClientRect();
                const cx = rect.left + rect.width / 2 + window.scrollX;
                const cy = rect.top + rect.height / 2 + window.scrollY;
                for (let i = 0; i < 10; i++) {
                    spawnParticle('sparkle', cx + (Math.random() - 0.5) * 100, cy, {
                        vx: (Math.random() - 0.5) * 3,
                        vy: Math.random() * 2,
                        color: '#ff4d6d',
                        size: Math.random() * 4 + 2,
                        life: 600
                    });
                }

                // Remove shake class after animation completes
                setTimeout(() => {
                    passcodeCard.classList.remove('shake-element');
                }, 500);
            }
        };

        if (verifyBtn && passcodeInp) {
            verifyBtn.addEventListener('click', performPasscodeVerification);
            passcodeInp.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    performPasscodeVerification();
                }
            });
        }
    };

    /* ==========================================================================
       8. LAYOUT-STABLE POEM TYPING SYSTEM
       ========================================================================== */
    let poetryTypingStarted = false;
    const startTypingPoetrySequence = () => {
        if (poetryTypingStarted) return;
        poetryTypingStarted = true;

        const verses = document.querySelectorAll('.poem-verse');
        
        // Wrap characters in opacity 0 spans on load to lock spacing/prevent reflows
        verses.forEach(verse => {
            const text = verse.innerHTML;
            let wrappedHTML = '';
            let insideHTMLTag = false;

            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === '<') {
                    insideHTMLTag = true;
                    wrappedHTML += char;
                } else if (char === '>') {
                    insideHTMLTag = false;
                    wrappedHTML += char;
                } else if (insideHTMLTag) {
                    wrappedHTML += char;
                } else {
                    wrappedHTML += `<span class="typewriter-char" style="opacity: 0; transition: opacity 0.3s ease;">${char}</span>`;
                }
            }
            verse.innerHTML = wrappedHTML;
        });

        // Sequential character reveal animation
        const revealChars = (verseIndex, charIndex) => {
            if (verseIndex >= verses.length) {
                revealBadgeFooter();
                return;
            }

            const currentVerse = verses[verseIndex];
            const chars = currentVerse.querySelectorAll('.typewriter-char');

            if (chars.length === 0) {
                revealChars(verseIndex + 1, 0);
                return;
            }

            currentVerse.classList.add('typing-active');

            if (charIndex < chars.length) {
                const span = chars[charIndex];
                span.style.opacity = '1';

                // Random character delay variance to mimic hand writing
                const delay = span.textContent === ',' || span.textContent === '.' ? 150 : (15 + Math.random() * 20);
                setTimeout(() => {
                    revealChars(verseIndex, charIndex + 1);
                }, delay);
            } else {
                currentVerse.classList.remove('typing-active');
                setTimeout(() => {
                    revealChars(verseIndex + 1, 0);
                }, 400);
            }
        };

        // Start typing timeline
        revealChars(0, 0);
    };

    const revealBadgeFooter = () => {
        const loveBadge = document.querySelector('.animated-love-footer');
        if (loveBadge) {
            loveBadge.style.opacity = '0';
            loveBadge.style.transition = 'opacity 2.5s ease-in-out';
            setTimeout(() => {
                loveBadge.style.opacity = '1';

                // Particle explosion around text badge coordinates
                const rect = loveBadge.getBoundingClientRect();
                const x = rect.left + rect.width / 2 + window.scrollX;
                const y = rect.top + rect.height / 2 + window.scrollY;

                for (let i = 0; i < 20; i++) {
                    spawnParticle(
                        'heart',
                        x,
                        y,
                        {
                            vx: (Math.random() - 0.5) * 5,
                            vy: -Math.random() * 4 - 1,
                            color: 'var(--bright-rose)',
                            size: Math.random() * 5 + 4,
                            life: 1200 + Math.random() * 600,
                            gravity: 0.02
                        }
                    );
                }
            }, 400);
        }
    };

    /* ==========================================================================
       9. TIMED POPUP SURPRISE SYSTEM (Removed - replaced by passcode/gallery flow)
       ========================================================================== */
    // Timed popups have been removed in favor of a smooth passcode lock verification flow.

    /* ==========================================================================
       10. CANVASED BACKGROUND MAGIC SPAN ENGINE (Extra Magic)
       ========================================================================== */
    // Spawns environment petals, hearts, fireflies directly inside canvas arrays
    const runEnvironmentMagicSpawner = () => {
        setInterval(() => {
            const mainContent = document.getElementById('main-love-content');
            if (mainContent && !mainContent.classList.contains('hidden') && document.visibilityState === 'visible') {
                
                // Spawn drifting heart bubbles
                spawnParticle(
                    'heart',
                    Math.random() * canvasWidth + window.scrollX,
                    canvasHeight + window.scrollY + 10,
                    {
                        vx: (Math.random() - 0.5) * 1.2,
                        vy: -0.6 - Math.random() * 1.2,
                        color: 'rgba(255, 77, 109, 0.4)',
                        size: Math.random() * 8 + 5,
                        life: 8000 + Math.random() * 4000,
                        gravity: -0.004,
                        vRot: (Math.random() - 0.5) * 0.02
                    }
                );

                // Spawn falling rose petals
                spawnParticle(
                    'petal',
                    Math.random() * canvasWidth + window.scrollX,
                    window.scrollY - 15,
                    {
                        vx: (Math.random() - 0.5) * 1 + 0.3,
                        vy: 1.2 + Math.random() * 1.8,
                        color: Math.random() > 0.4 ? 'var(--bright-rose)' : '#c9182b',
                        size: Math.random() * 7 + 6,
                        life: 8000 + Math.random() * 3000,
                        gravity: 0.008,
                        vRot: (Math.random() - 0.5) * 0.03
                    }
                );

                // Spawn warm glowing fireflies
                spawnParticle(
                    'firefly',
                    Math.random() * canvasWidth + window.scrollX,
                    canvasHeight + window.scrollY + 10,
                    {
                        vx: (Math.random() - 0.5) * 1.5,
                        vy: -1.0 - Math.random() * 1.5,
                        color: 'var(--gold-bright)',
                        size: Math.random() * 2 + 1.2,
                        life: 6000 + Math.random() * 3000,
                        gravity: -0.003
                    }
                );
            }
        }, 1500);
    };
    runEnvironmentMagicSpawner();
});
