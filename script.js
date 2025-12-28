function showPage(pageId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}
