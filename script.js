// ====== Overlay Setup ======
const overlay = document.createElement('div');
overlay.id = 'page-overlay';
document.body.appendChild(overlay);

const navLinks = document.querySelectorAll('nav a');
const logo = document.querySelector('header h1');

// ====== Fade Functions ======
function fadeInOverlay() {
    overlay.classList.add('active');
}

function fadeOutOverlay() {
    overlay.classList.remove('active');
}

function fadeOutElement(element) {
    return new Promise(resolve => {
        element.style.opacity = 0;
        setTimeout(() => {
            element.classList.remove('active');
            resolve();
        }, 500);
    });
}

function fadeInElement(element) {
    element.classList.add('active');
    setTimeout(() => {
        element.style.opacity = 1;
    }, 20);
}

// ====== Show Normal Page ======// ====== Show Normal Page (Faster Overlay) ======
async function showPage(pageId) {
    const current = document.querySelector('#normal-pages section.active');
    const next = document.getElementById(pageId);
    const landing = document.getElementById('landing');

    // Fade-in overlay immediately
    fadeInOverlay();

    // Hide landing if active
    if (landing.classList.contains('active')) {
        await fadeOutElement(landing);
    }

    document.getElementById('normal-pages').style.display = 'block';

    if (current) {
        await fadeOutElement(current);
    }

    fadeInElement(next);
}


// ====== Show Landing Page ======
async function showLanding() {
    const current = document.querySelector('#normal-pages section.active');
    const landing = document.getElementById('landing');

    if (current) {
        await fadeOutElement(current);
        document.getElementById('normal-pages').style.display = 'none';
    }

    fadeInElement(landing);

    // Fade-out overlay
    fadeOutOverlay();
}

// ====== Event Listeners ======
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const target = link.getAttribute('data-target');
        if (target) showPage(target);
    });
});

logo.addEventListener('click', showLanding);
