function showPage(pageId) {
    // hide landing
    document.getElementById('landing').classList.remove('active');
    // show normal pages
    document.getElementById('normal-pages').style.display = 'block';

    // show requested section
    const sections = document.querySelectorAll('#normal-pages section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showLanding() {
    // show landing
    document.getElementById('landing').classList.add('active');
    // hide normal pages
    document.getElementById('normal-pages').style.display = 'none';
}
