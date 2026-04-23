document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('main-header');

    // ── Header scroll glass effect ─────────────────
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Mobile Menu Toggle ───────────────────────
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }


    // ── Detect which page we're on ─────────────────
    const isAbout = document.querySelector('.about-page') !== null;
    const isProjects = document.querySelector('.projects-page') !== null;
    const isContact = document.querySelector('.contact-page') !== null;

    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
        if (isAbout) {
            // ── ABOUT PAGE animations ─────────────────
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('.main-header', { y: -30, opacity: 0, duration: 0.8 })
                .from('.bg-text', { opacity: 0, duration: 1 }, '-=0.4')
                .from('.about-img', { opacity: 0, x: 50, duration: 1.1 }, '-=0.8')
                .from('.about-tag', { opacity: 0, scale: 0.85, duration: 0.7 }, '-=0.4')
                .from('.about-eyebrow', { opacity: 0, x: -30, duration: 0.6 }, '-=0.5')
                .from('.about-title', { opacity: 0, x: -40, duration: 0.8 }, '-=0.5')
                .from('.about-text p', { opacity: 0, x: -20, stagger: 0.15, duration: 0.6 }, '-=0.5')
                .from('.skills-section', { opacity: 0, y: 14, duration: 0.6 }, '-=0.3')
                .from('.about-meta-row', { opacity: 0, y: 14, duration: 0.6 }, '-=0.4')
                .from('.about-card', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.3');
        } else if (isProjects) {
            // ── PROJECTS PAGE animations ──────────────
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('.main-header', { y: -30, opacity: 0, duration: 0.8 })
                .from('.bg-text', { opacity: 0, duration: 1.2 }, '-=0.4')
                .from('.projects-hero-image', { opacity: 0, x: 40, duration: 1 }, '-=0.8')
                .from('.projects-eyebrow', { opacity: 0, y: 16, duration: 0.6 }, '-=0.5')
                .from('.projects-title', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
                .from('.projects-subtitle', { opacity: 0, y: 14, duration: 0.6 }, '-=0.5')
                .from('.project-item', { opacity: 0, y: 30, stagger: 0.2, duration: 0.8 }, '-=0.2');
        } else if (isContact) {
            // ── CONTACT PAGE: Static (Animations removed for clarity and persistence) ──
            gsap.set('.contact-page', { opacity: 1 });
        } else {
            // ── HOME PAGE animations ──────────────────
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('.main-header', { y: -30, opacity: 0, duration: 0.8 })
                .from('.bg-text', { opacity: 0, duration: 1.2 }, '-=0.4')
                .from('.character-img', { opacity: 0, x: -50, duration: 1 }, '-=0.8')
                .from('.hero-name', { opacity: 0, x: 30, duration: 0.7 }, '-=0.6')
                .from('.hero-title', { opacity: 0, x: 20, duration: 0.6 }, '-=0.5')
                .from('.hero-bio', { opacity: 0, x: 15, duration: 0.6 }, '-=0.4')
                .from('.hero-cta', { opacity: 0, x: 15, duration: 0.6 }, '-=0.4');
        }
    } else {
        // Mobile fallback: immediate opacity 1 or simple reveal
        gsap.set('.skill-progress', { width: 0 }); // reset for mobile manual trigger
    }

    // Always animate skill bars
    setTimeout(() => {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const w = bar.getAttribute('data-width');
            bar.style.width = w + '%';
        });
    }, 500);

    // ── Shared: subtle blob parallax on mouse ─────
    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            const xN = (e.clientX / window.innerWidth - 0.5);
            const yN = (e.clientY / window.innerHeight - 0.5);

            gsap.to('.blob-left', { x: xN * 30, y: yN * 30, duration: 3, ease: 'power1.out' });
            gsap.to('.blob-right', { x: -xN * 25, y: -yN * 25, duration: 3, ease: 'power1.out' });
            gsap.to('.bg-text', { x: xN * 18, y: yN * 18, duration: 4, ease: 'power1.out' });
        });
    }
});
