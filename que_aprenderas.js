
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

        //cards

        document.addEventListener("DOMContentLoaded", () => {
            const cards = document.querySelectorAll(".curriculum-card");
          
            const observer = new IntersectionObserver(
              entries => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // evita reanimación
                  }
                });
              },
              { threshold: 0.2 }
            );
          
            cards.forEach(card => observer.observe(card));
          });
          

          //cards 2

          const cards = document.querySelectorAll('.curriculum-card');

          const diagonales = [
            [cards[0], cards[3]], // 1 y 4
            [cards[1], cards[4]], // 2 y 5
            [cards[2], cards[5]]  // 3 y 6
          ];
        
          const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                diagonales.forEach((grupo, i) => {
                  if (grupo.includes(entry.target)) {
                    // ⏱ aumentamos el delay para que se note más
                    setTimeout(() => {
                      grupo.forEach(card => card.classList.add('visible'));
                    }, i * 600); // antes era 300, ahora 600ms entre grupos
                  }
                });
                obs.unobserve(entry.target);
              }
            });
          }, { threshold: 0.3 });
        
          cards.forEach(card => observer.observe(card));