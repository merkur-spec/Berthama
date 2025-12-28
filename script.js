function fadeOut(element) {
    return new Promise(resolve => {
        element.style.opacity = 0;
        setTimeout(() => {
            element.classList.remove('active');
            element.style.pointerEvents = 'none';
            resolve();
        }, 500); // match CSS transition
    });
}

function fadeIn(element) {
    element.classList.add('active');
    element.style.pointerEvents = 'auto';
    setTimeout(() => {
        element.style.opacity = 1;
    }, 20); // tiny delay to allow CSS to register
}

async function showPage(pageId) {
    const current = document.querySelector('#normal-pages section.active');
    const next = document.getElementById(pageId);

    // hide landing
    const landing = document.getElementById('landing');
    if (landing.classList.contains('active')) {
        landing.style.opacity = 0;
        landing.classList.remove('active');
    }

    document.getElementById('normal-pages').style.display = 'block';

    if (current) {
        await fadeOut(current);
    }
    fadeIn(next);
}

async function showLanding() {
    const current = document.querySelector('#normal-pages section.active');
    const landing = document.getElementById('landing');

    if (current) {
        await fadeOut(current);
        document.getElementById('normal-pages').style.display = 'none';
    }

    landing.style.opacity = 0; // start transparent
    fadeIn(landing);
}
