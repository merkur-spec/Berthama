// ====== Overlay Setup ======
const main = document.querySelector('main');

// Create overlay inside main
let pageOverlay = document.createElement('div');
pageOverlay.id = 'page-overlay';
pageOverlay.style.position = 'absolute';      // relative to main
pageOverlay.style.top = '0';
pageOverlay.style.left = '0';
pageOverlay.style.width = '100%';
pageOverlay.style.height = '100%';            // full height of main
pageOverlay.style.backgroundColor = 'rgba(0,0,0,0)'; // start transparent
pageOverlay.style.pointerEvents = 'none';     // don't block clicks
pageOverlay.style.transition = 'background-color 0.5s ease';
pageOverlay.style.zIndex = '0';               // below sections, above background
main.appendChild(pageOverlay);


// ====== Fade Functions ======
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


// ====== Show Normal Page ======
async function showPage(pageId) {
    const current = document.querySelector('#normal-pages section.active');
    const next = document.getElementById(pageId);
    const landing = document.getElementById('landing');

    // Hide landing if active
    if (landing.classList.contains('active')) {
        landing.style.opacity = 0;
        landing.classList.remove('active');
    }

    document.getElementById('normal-pages').style.display = 'block';

    if (current) {
        await fadeOut(current);
    }

    fadeIn(next);

    // Darken only main content
    pageOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
}


// ====== Show Landing Page ======
async function showLanding() {
    const current = document.querySelector('#normal-pages section.active');
    const landing = document.getElementById('landing');

    if (current) {
        await fadeOut(current);
        document.getElementById('normal-pages').style.display = 'none';
    }

    landing.style.opacity = 0;
    fadeIn(landing);

    // Remove overlay when back on landing
    pageOverlay.style.backgroundColor = 'rgba(0,0,0,0)';
}
