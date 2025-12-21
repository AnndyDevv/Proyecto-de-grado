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
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -300, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
});
