document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-enabled');
    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply reveal to sections and cards
    const revealElements = document.querySelectorAll('section, .service-card, .project-card');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Dynamic Glow Effect for Project Cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Logo Glitch Effect (Randomly triggers)
    const logo = document.querySelector('.logo');
    setInterval(() => {
        if (Math.random() > 0.95) {
            logo.style.textShadow = '2px 0 #ff00ff, -2px 0 #00f3ff';
            setTimeout(() => {
                logo.style.textShadow = '0 0 10px var(--accent-glow)';
            }, 100);
        }
    }, 500);

    // Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
