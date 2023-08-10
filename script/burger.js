const navigationBtn = document.querySelector('.navigation__burger');
const navigation = document.querySelector('.navigation');
const duration = 2500;
const distance = 10;
let requestId = NaN;

navigationBtn.addEventListener('click', () => {
    navigationBtn.classList.toggle('navigation__burger_active');
    navigation.classList.toggle('navigation_active');
});

const startAnimation = (duration, callback) => {
    let startAnimation = NaN;

    requestId = requestAnimationFrame(function step(timestamp) {
        startAnimation ||= timestamp;

        const progress = (timestamp - startAnimation) / duration;

        callback(progress);
        if (progress < 1) {
            requestId = requestAnimationFrame(step);
        }
    });
};

function elastic(x, timeFraction) {
    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
};


navigationBtn.addEventListener('click', () => {
    startAnimation(duration, (progress) => {
        const bottom = elastic(1.15, progress) * distance;
        navigation.style.transform = `translateY(${bottom}px)`;
    });
});