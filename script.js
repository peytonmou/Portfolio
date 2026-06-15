document.addEventListener('DOMContentLoaded', () => {

    // ── Scroll-reveal: fade-in project cards on scroll ──────────────────────
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const projectCards = document.querySelectorAll('.project-card');
    const sections = document.querySelectorAll('.section-title, .exp-column');

    [...projectCards, ...sections].forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Inject .visible helper styles
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ── Navbar background blur on scroll ────────────────────────────────────
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // ── Project sliders (carousels) ──────────────────────────────────────────
    const sliders = document.querySelectorAll('.project-slider');
    sliders.forEach(slider => {
        const track = slider.querySelector('.slides-track');
        const nextButton = slider.querySelector('.next-arrow');
        const prevButton = slider.querySelector('.prev-arrow');
        const dotsContainer = slider.querySelector('.slider-dots');

        // Guard: skip this slider if any required element is missing
        if (!track || !nextButton || !prevButton || !dotsContainer) return;

        const slides = Array.from(track.children);
        const dots = Array.from(dotsContainer.children);

        if (slides.length === 0) return;

        let currentIndex = 0;

        const updateSlider = (index) => {
            // Clamp index within bounds
            index = Math.max(0, Math.min(index, slides.length - 1));
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
            currentIndex = index;
        };

        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            updateSlider((currentIndex + 1) % slides.length);
        });

        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            updateSlider((currentIndex - 1 + slides.length) % slides.length);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                updateSlider(index);
            });
        });
    });

}); 