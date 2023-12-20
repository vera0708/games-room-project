const swiper = new Swiper('.swiper', {
    // direction: 'vertical',
    slidesPerView: 3,
    loop: true,
    mousewheel: true,
    keyboard: true,
    breakpoints: {
        630: {
            direction: 'vertical',
        }
    }
});