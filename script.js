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
    const isExperience = document.querySelector('.experience-page') !== null;

    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
        if (isAbout) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('.main-header', { y: -30, opacity: 0, duration: 0.8, clearProps: 'all' })
                .from('.about-img', { opacity: 0, x: 50, duration: 1.1, clearProps: 'all' }, '-=0.6')
                .from('.about-title', { opacity: 0, x: -30, duration: 0.8, clearProps: 'all' }, '-=0.5')
                .from('.about-text p', { opacity: 0, y: 15, stagger: 0.1, duration: 0.6, clearProps: 'all' }, '-=0.4')
                .from('.about-card', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, clearProps: 'all' }, '-=0.3')
                .from('.global-nav-section', { opacity: 0, y: 30, duration: 0.8, clearProps: 'all' }, '-=0.2');
        } else if (isProjects) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('.main-header', { y: -30, opacity: 0, duration: 0.8, clearProps: 'all' })
                .from('.projects-title', { opacity: 0, y: 20, duration: 0.8, clearProps: 'all' }, '-=0.5')
                .from('.project-item', { opacity: 0, y: 40, stagger: 0.2, duration: 1, clearProps: 'all' }, '-=0.4')
                .from('.global-nav-section', { opacity: 0, y: 30, duration: 0.8, clearProps: 'all' }, '-=0.2');
        } else if (isExperience) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('.main-header', { y: -30, opacity: 0, duration: 0.8, clearProps: 'all' })
                .from('.experience-title', { opacity: 0, y: 20, duration: 0.8, clearProps: 'all' }, '-=0.5')
                .from('.timeline-item', { opacity: 0, y: 30, stagger: 0.2, duration: 0.8, clearProps: 'all' }, '-=0.3')
                .from('.global-nav-section', { opacity: 0, y: 30, duration: 0.8, clearProps: 'all' }, '-=0.2');
        } else if (isContact) {
            gsap.from('.contact-content', { opacity: 0, y: 30, duration: 1, ease: 'power3.out', clearProps: 'all' });
            gsap.from('.global-nav-section', { opacity: 0, y: 30, duration: 1, delay: 0.5, clearProps: 'all' });
        } else {
            // ── HOME PAGE ──────────────────
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('.main-header', { y: -30, opacity: 0, duration: 0.8, clearProps: 'all' })
                .from('.character-img', { opacity: 0, x: -50, duration: 1, clearProps: 'all' }, '-=0.6')
                .from('.hero-name', { opacity: 0, x: 30, duration: 0.7, clearProps: 'all' }, '-=0.6')
                .from('.hero-title', { opacity: 0, x: 20, duration: 0.6, clearProps: 'all' }, '-=0.5')
                .from('.hero-bio', { opacity: 0, x: 15, duration: 0.6, clearProps: 'all' }, '-=0.4')
                .from('.hero-cta', { opacity: 0, x: 15, duration: 0.6, clearProps: 'all' }, '-=0.4')
                .from('.nav-card', { opacity: 0, y: 30, stagger: 0.1, duration: 0.8, clearProps: 'all' }, '-=0.4');
        }
    } else {
        // Mobile fallback: force visibility of all animated elements
        gsap.set('.main-header, .hero-content, .character-img, .nav-card, .about-img, .project-item, .timeline-item, .contact-content, .global-nav-section', {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            visibility: 'visible'
        });
        gsap.set('.skill-progress', { width: 0 });
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
