
    window.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('menu-btn');
      const nav = document.getElementById('nav-menu');

      function checkWidth() {
        if (window.innerWidth < 700) {
          btn.style.display = 'block';
          nav.classList.remove('active');
        } else {
          btn.style.display = 'none';
          nav.style.display = 'flex';
        }
      }

      btn.addEventListener('click', () => {
        nav.classList.toggle('active');
      });

      window.addEventListener('resize', checkWidth);
      window.addEventListener('load', checkWidth);
    });
