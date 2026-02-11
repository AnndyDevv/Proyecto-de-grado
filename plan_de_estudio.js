 document.addEventListener("DOMContentLoaded", () => {
    // ====================================
    // ANIMACIÓN DE REVEAL (scroll)
    // ====================================
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
    // ====================================
    // MENÚ RESPONSIVE (botón ☰)
    // ====================================
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    // ====================================
    // ANIMACIÓN DE CARDS (campos laborales)
    // ====================================
    const careerCards = document.querySelectorAll(".career-card");
    
    const careerObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    careerObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );
    
    careerCards.forEach(card => careerObserver.observe(card));

    // Animación diagonal para las cards
    const diagonalGroups = [
        Array.from(careerCards).slice(0, 2), // primeras 2
        Array.from(careerCards).slice(2, 4), // siguientes 2
        Array.from(careerCards).slice(4, 5)  // última
    ];

    const diagonalObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                diagonalGroups.forEach((grupo, i) => {
                    if (grupo.includes(entry.target)) {
                        setTimeout(() => {
                            grupo.forEach(card => card.classList.add('visible'));
                        }, i * 600);
                    }
                });
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    careerCards.forEach(card => diagonalObserver.observe(card));

    // ====================================
    // CARRUSEL DE MATERIALES
    // ====================================
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn && nextBtn && carousel) {
        // Mejora: desplazamiento por ancho de card + soporte drag
        carousel.style.scrollBehavior = 'smooth';
        carousel.style.scrollSnapType = 'x mandatory';

        const cards = carousel.querySelectorAll('.card');
        cards.forEach(card => card.style.scrollSnapAlign = 'center');

        function getStep() {
            const first = carousel.querySelector('.card');
            if (!first) return 345;
            const cardWidth = first.offsetWidth;
            const gap = parseInt(getComputedStyle(carousel).gap) || 25;
            return cardWidth + gap;
        }

        nextBtn.addEventListener('click', () => { const step = getStep(); carousel.scrollBy({ left: step, behavior: 'smooth' }); });
        prevBtn.addEventListener('click', () => { const step = getStep(); carousel.scrollBy({ left: -step, behavior: 'smooth' }); });

        let isDown = false; let startX; let scrollStart;

        carousel.addEventListener('pointerdown', (e) => { isDown = true; carousel.setPointerCapture(e.pointerId); startX = e.clientX; scrollStart = carousel.scrollLeft; carousel.classList.add('dragging'); });
        carousel.addEventListener('pointermove', (e) => { if (!isDown) return; const dx = e.clientX - startX; carousel.scrollLeft = scrollStart - dx; });

        function releasePointer(e) { if (!isDown) return; isDown = false; try { carousel.releasePointerCapture(e.pointerId); } catch(_) {} carousel.classList.remove('dragging'); const step = getStep(); const index = Math.round(carousel.scrollLeft / step); carousel.scrollTo({ left: index * step, behavior: 'smooth' }); }

        carousel.addEventListener('pointerup', releasePointer);
        carousel.addEventListener('pointercancel', releasePointer);
        carousel.addEventListener('pointerleave', (e) => { if (isDown) releasePointer(e); });

        carousel.addEventListener('wheel', (e) => { if (Math.abs(e.deltaX) === 0 && Math.abs(e.deltaY) > 0) { carousel.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
    }
});
