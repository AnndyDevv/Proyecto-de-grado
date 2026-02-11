document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const dotsContainer = document.getElementById("carouselDots");

    if (!carousel) return;

    carousel.style.scrollBehavior = "smooth";
    carousel.style.scrollSnapType = "x mandatory";

    const cards = carousel.querySelectorAll(".card");
    cards.forEach((card) => {
        card.style.scrollSnapAlign = "center";
    });

    let dots = [];

    function getStep() {
        const first = carousel.querySelector(".card");
        if (!first) return 345;
        const cardWidth = first.offsetWidth;
        const gap = parseInt(getComputedStyle(carousel).gap) || 25;
        return cardWidth + gap;
    }

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
        try { carousel.releasePointerCapture(e.pointerId); } catch (_) {}
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

document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach((el) => observer.observe(el));
});
