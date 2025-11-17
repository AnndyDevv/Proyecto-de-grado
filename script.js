 const btn = document.getElementById('menu-btn');
        const nav = document.getElementById('nav-menu');

        function checkWidth() {
            if (window.innerWidth < 700) {
                btn.style.display = 'block';
                nav.style.display = 'none';
            } else {
                btn.style.display = 'none';
                nav.style.display = 'flex';
            }
        }

        btn.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
        });

        window.addEventListener('resize', checkWidth);
        window.addEventListener('load', checkWidth);

        // Código del carrusel MEJORADO

        
        document.addEventListener("DOMContentLoaded", function () {
            const carousel = document.getElementById("carousel");
            const nextBtn = document.getElementById("nextBtn");
            const prevBtn = document.getElementById("prevBtn");

            if (!carousel) return;

            carousel.style.scrollBehavior = "smooth";
            carousel.style.scrollSnapType = "x mandatory";

            const cards = carousel.querySelectorAll(".card");
            cards.forEach(card => {
                card.style.scrollSnapAlign = "center";
            });

            function getStep() {
                const first = carousel.querySelector(".card");
                if (!first) return 345; // Ajustado para cards más estrechas
                const cardWidth = first.offsetWidth;
                const gap = parseInt(getComputedStyle(carousel).gap) || 25;
                return cardWidth + gap;
            }

            if (nextBtn) {
                nextBtn.addEventListener("click", () => {
                    const step = getStep();
                    carousel.scrollBy({ left: step, behavior: "smooth" });
                });
            }
            if (prevBtn) {
                prevBtn.addEventListener("click", () => {
                    const step = getStep();
                    carousel.scrollBy({ left: -step, behavior: "smooth" });
                });
            }

            let isDown = false;
            let startX;
            let scrollStart;

            carousel.addEventListener("pointerdown", (e) => {
                isDown = true;
                carousel.setPointerCapture(e.pointerId);
                startX = e.clientX;
                scrollStart = carousel.scrollLeft;
                carousel.classList.add("dragging");
            });

            carousel.addEventListener("pointermove", (e) => {
                if (!isDown) return;
                const dx = e.clientX - startX;
                carousel.scrollLeft = scrollStart - dx;
            });

            function releasePointer(e) {
                if (!isDown) return;
                isDown = false;
                try { carousel.releasePointerCapture(e.pointerId); } catch(_) {}
                carousel.classList.remove("dragging");
                const step = getStep();
                const index = Math.round(carousel.scrollLeft / step);
                carousel.scrollTo({ left: index * step, behavior: "smooth" });
            }

            carousel.addEventListener("pointerup", releasePointer);
            carousel.addEventListener("pointercancel", releasePointer);
            carousel.addEventListener("pointerleave", (e) => {
                if (isDown) releasePointer(e);
            });

            carousel.addEventListener("wheel", (e) => {
                if (Math.abs(e.deltaX) === 0 && Math.abs(e.deltaY) > 0) {
                    carousel.scrollLeft += e.deltaY;
                    e.preventDefault();
                }
            }, { passive: false });
        });

        //reveal 

        // ANIMACIÓN SCROLL REVEAL
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const options = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, options);

    reveals.forEach(el => observer.observe(el));
});
