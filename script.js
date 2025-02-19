// bg behavior
(window.setScroll = () => document.body.style.setProperty('--scroll', scrollY / innerHeight))();
['scroll', 'resize'].forEach(e => addEventListener(e, setScroll));

const bg = document.querySelector('#bg');

addEventListener('touchstart', () => bg.style.setProperty('--multiplier', '0'));
addEventListener('mousemove', ({ clientX, clientY }) => {
    bg.style.setProperty('--tx', `${20 * (clientX - innerWidth / 2) / innerWidth}px`);
    bg.style.setProperty('--ty', `${20 * (clientY - innerHeight / 2) / innerHeight}px`);
});

['mouseenter', 'mouseleave'].forEach(e => document.addEventListener(e, () => {
    if (e === 'mouseleave') bg.removeAttribute('style');
    bg.style.transition = 'transform .1s linear';
    setTimeout(() => bg.style.transition = '', 100);
}));

// scroll arrow
document.querySelector('#arrow svg').addEventListener('click', () => {
    const start = performance.now();

    !function step() {
        const progress = (performance.now() - start) / 200;
        scrollTo({ top: (innerWidth > 780 ? .3 : .8) * innerHeight * easeOutCubic(progress) });
        if (progress < 1) requestAnimationFrame(step);
    }();

    function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }
});


// loader
function startLoader() {
    const loader = document.getElementById('loader');
    loader.classList.remove('hidden');
}

function finishLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
}

window.addEventListener('load', () => {
    finishLoader();
});

window.addEventListener('beforeunload', () => {
    startLoader();
});

window.addEventListener('popstate', () => {
    finishLoader();
});

window.addEventListener("DOMContentLoaded", () => {
    finishLoader()
});

async function updateTime() {
    try {
        const response = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Europe/Kiev");
        const data = await response.json();
        const time = new Date(data.dateTime).toLocaleTimeString();
        document.getElementById("time").innerText = time;
    } catch (error) {
        document.getElementById("time").innerText = "Ошибка загрузки времени";
    }
}

setInterval(updateTime, 1000);
updateTime();






