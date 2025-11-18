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