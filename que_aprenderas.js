
        document.addEventListener("DOMContentLoaded", () => {
            const reveals = document.querySelectorAll(".reveal");
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            }, { threshold: 0.15 });
            reveals.forEach(el => observer.observe(el));
        });
        
        // Script para el menú responsive (botón ☰)
        const menuBtn = document.getElementById('menu-btn');
        const navMenu = document.getElementById('nav-menu');
        if (menuBtn && navMenu) {
            menuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
