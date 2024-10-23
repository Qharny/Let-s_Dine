window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const menuSection = document.querySelector('#menu');
    
    if (menuSection) {
        const menuPosition = menuSection.getBoundingClientRect().top;
        
        if (menuPosition <= header.offsetHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});