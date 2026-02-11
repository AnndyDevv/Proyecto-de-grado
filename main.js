 const brandTitle = document.querySelector('.brand h1');
        if (brandTitle) {
            const rawTitle = brandTitle.textContent.replace(/\s+/g, ' ').trim();
            const nameOnly = rawTitle.replace(/^U\.?\s*E\.?\s*/i, '').trim();
            if (nameOnly && !brandTitle.querySelector('.brand-title-name')) {
                brandTitle.textContent = '';
                brandTitle.classList.add('brand-title');
                const ueSpan = document.createElement('span');
                ueSpan.className = 'brand-title-ue';
                ueSpan.textContent = 'U.E';
                const nameSpan = document.createElement('span');
                nameSpan.className = 'brand-title-name';
                nameSpan.textContent = nameOnly;
                brandTitle.append(ueSpan, nameSpan);
            }
        }

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
            const dotsContainer = document.getElementById("carouselDots");

            if (!carousel) return;

            carousel.style.scrollBehavior = "smooth";
            carousel.style.scrollSnapType = "x mandatory";

            const cards = carousel.querySelectorAll(".card");
            cards.forEach(card => {
                card.style.scrollSnapAlign = "center";
            });

            let dots = [];

            function updateActiveDot() {
                if (!dots.length) return;
                const step = getStep();
                const index = Math.round(carousel.scrollLeft / step);
                dots.forEach((dot, dotIndex) => {
                    dot.classList.toggle("active", dotIndex === index);
                    dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
                });
            }

            if (dotsContainer && cards.length) {
                dotsContainer.innerHTML = "";
                dots = Array.from(cards).map((_, index) => {
                    const dot = document.createElement("button");
                    dot.className = "carousel-dot";
                    dot.type = "button";
                    dot.setAttribute("aria-label", `Ir a la tarjeta ${index + 1}`);
                    dot.addEventListener("click", () => {
                        const step = getStep();
                        carousel.scrollTo({ left: step * index, behavior: "smooth" });
                    });
                    dotsContainer.appendChild(dot);
                    return dot;
                });
                updateActiveDot();
            }

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
                    setTimeout(updateActiveDot, 220);
                });
            }
            if (prevBtn) {
                prevBtn.addEventListener("click", () => {
                    const step = getStep();
                    carousel.scrollBy({ left: -step, behavior: "smooth" });
                    setTimeout(updateActiveDot, 220);
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
                updateActiveDot();
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
                    updateActiveDot();
                }
            }, { passive: false });

            carousel.addEventListener("scroll", () => {
                window.requestAnimationFrame(updateActiveDot);
            });
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

document.addEventListener("DOMContentLoaded", () => {
    const toTopBtn = document.getElementById("to-top");
    if (!toTopBtn) return;

    function toggleButton() {
        toTopBtn.classList.toggle("visible", window.scrollY > 320);
    }

    window.addEventListener("scroll", toggleButton);
    toggleButton();

    toTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
