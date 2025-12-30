// Create a global overlay element
let pageOverlay = document.createElement('div');
pageOverlay.id = 'page-overlay';
pageOverlay.style.position = 'fixed';
pageOverlay.style.top = '0';
pageOverlay.style.left = '0';
pageOverlay.style.width = '100%';
pageOverlay.style.height = '100%';
pageOverlay.style.backgroundColor = 'rgba(0,0,0,0)'; // start transparent
pageOverlay.style.pointerEvents = 'none'; // don't block clicks
pageOverlay.style.transition = 'background-color 0.5s ease';
pageOverlay.style.zIndex = '0';
document.body.appendChild(pageOverlay);

// Fade functions
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

// Show normal page
async function showPage(pageId) {
    const current = document.querySelector('#normal-pages section.active');
    const next = document.getElementById(pageId);
    const landing = document.getElementById('landing');

    // Hide landing if it's active
    if (landing.classList.contains('active')) {
        landing.style.opacity = 0;
        landing.classList.remove('active');
    }

    document.getElementById('normal-pages').style.display = 'block';

    if (current) {
        await fadeOut(current);
    }
    fadeIn(next);

    // Darken the page overlay slightly
    pageOverlay.style.backgroundColor = 'rgba(0,0,0,0.35)';
}

// Show landing page
async function showLanding() {
    const current = document.querySelector('#normal-pages section.active');
    const landing = document.getElementById('landing');

    if (current) {
        await fadeOut(current);
        document.getElementById('normal-pages').style.display = 'none';
    }

    landing.style.opacity = 0;
    fadeIn(landing);

    // Remove dark overlay when back to landing
    pageOverlay.style.backgroundColor = 'rgba(0,0,0,0)';
}
