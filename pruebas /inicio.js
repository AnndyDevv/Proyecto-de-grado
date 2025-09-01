var header = document.getElementById('Header');

window.addEventListener('scroll', ()=> {
    var scroll = window.scrollY
    if (scroll>10) {
        header.style.backgroundColor = '#ff7c2a'
    } else {
        header.style.backgroundColor = 'transparent'
    }

}) 