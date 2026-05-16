document.addEventListener('DOMContentLoaded', () => {
    // --- CUSTOM HUD CURSOR ---
    const cursor = document.querySelector('.cursor-reticle');
    const coords = document.querySelector('.cursor-coords');

    if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            if (coords) {
                coords.textContent = `X:${(e.clientX/10).toFixed(1)} Y:${(e.clientY/10).toFixed(1)}`;
            }
        });

        // Cursor Expansion on Interactive Elements
        const interactables = document.querySelectorAll('a, button, .ultra-card');
        interactables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.style.width = '80px';
                cursor.style.height = '80px';
                cursor.style.background = 'rgba(0, 255, 102, 0.1)';
                cursor.style.borderColor = 'var(--secondary)';
            });
            item.addEventListener('mouseleave', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.background = 'transparent';
                cursor.style.borderColor = 'var(--primary)';
            });
        });
    }

    // --- MOUSE WHEEL HORIZONTAL SCROLL ---
    const horizContainer = document.querySelector('.horizontal-scroll-container');
    if (horizContainer) {
        window.addEventListener('wheel', (e) => {
            const isInside = e.target.closest('.horizontal-scroll-container');
            if (isInside) {
                horizContainer.scrollLeft += e.deltaY + e.deltaX;
                // Only prevent default if we are actually scrolling horizontally
                if (horizContainer.scrollLeft > 0 && horizContainer.scrollLeft < (horizContainer.scrollWidth - horizContainer.clientWidth)) {
                     e.preventDefault();
                }
            }
        }, { passive: false });
    }

    // --- TERMINAL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal-stagger');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { 
        threshold: 0.05, // Lower threshold for better horizontal detection
        rootMargin: '0px 100px 0px 100px' // Detect slightly before entering viewport
    });

    revealElements.forEach(el => observer.observe(el));

    // --- DYNAMIC DATA FEED (Status Monitor) ---
    const statusMonitor = document.querySelector('.status-monitor');
    if (statusMonitor) {
        setInterval(() => {
            const temp = (30 + Math.random() * 5).toFixed(1);
            const load = (Math.random() * 100).toFixed(0);
            statusMonitor.innerHTML = `<span class="pulse-dot"></span> CORE_TEMP: ${temp}°C // LOAD: ${load}%`;
        }, 2000);
    }

    // --- SCROLL-REACTIVE BACKGROUND ---
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const bgGrid = document.querySelector('.bg-data-grid');
        
        // 1. Shift Grid Position for depth
        if (bgGrid) {
            const moveY = scrollPercent * -150;
            const moveX = scrollPercent * -80;
            bgGrid.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${scrollPercent * 8}deg)`;
        }

        // 2. Adaptive Color Shift
        if (scrollPercent > 0.4) {
            document.body.style.backgroundColor = '#0a0215'; // Deep Cyber Violet
        } else if (scrollPercent > 0.1) {
            document.body.style.backgroundColor = '#020a0a'; // Deep Cyan Tint
        } else {
            document.body.style.backgroundColor = '#02030a'; // Baseline Void
        }
    });

    // --- INERTIA SCROLL ---
    const horizontalContainer = document.querySelector('.horizontal-scroll-container');
    if (horizontalContainer) {
        let isScrolling = false;
        horizontalContainer.addEventListener('wheel', (e) => {
            horizontalContainer.scrollLeft += e.deltaY;
            e.preventDefault();
        }, { passive: false });
    }
});

// Additional Global Styles for the Ultra Aesthetic
const extraStyles = document.createElement('style');
extraStyles.innerHTML = `
    .hero-ultra {
        min-height: 100vh;
        display: flex;
        align-items: center;
        padding-top: 100px;
    }

    .hero-desc {
        font-size: 1.5rem;
        color: var(--text-hud);
        max-width: 800px;
        margin: 3rem 0;
        border-left: 4px solid var(--primary);
        padding-left: 2rem;
    }

    .hero-actions {
        display: flex;
        gap: 2rem;
    }

    .hud-nav {
        position: fixed;
        top: 0;
        width: 100%;
        padding: 3rem 0;
        z-index: 1000;
        border-bottom: 1px solid var(--primary-dim);
        background: linear-gradient(180deg, var(--bg-void) 0%, transparent 100%);
    }

    .hud-nav .container-wide {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-links {
        display: flex;
        gap: 3rem;
    }

    .nav-links a {
        font-family: 'JetBrains Mono', monospace;
        color: var(--text-pure);
        text-decoration: none;
        letter-spacing: 0.2em;
        transition: var(--transition-fast);
    }

    .nav-links a:hover {
        color: var(--primary);
        text-shadow: 0 0 10px var(--primary);
    }

    .status-monitor {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.7rem;
        color: var(--primary);
    }

    .pulse-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #00ff00;
        border-radius: 50%;
        margin-right: 0.5rem;
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(1.5); }
        100% { opacity: 1; transform: scale(1); }
    }

    .sectors-ultra {
        padding: 15rem 0;
    }

    .grid-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
    }

    .card-meta {
        font-family: 'JetBrains Mono', monospace;
        color: var(--secondary);
        font-size: 0.8rem;
        margin-bottom: 2rem;
    }

    .card-status {
        margin-top: 3rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.6rem;
        opacity: 0.6;
        text-align: right;
    }

    .hud-footer {
        padding: 5rem 0;
        border-top: 1px solid var(--primary-dim);
    }

    .footer-wrap {
        display: flex;
        justify-content: space-between;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.7rem;
        color: var(--text-hud);
    }

    .text-primary { color: var(--primary); }
`;
document.head.appendChild(extraStyles);
