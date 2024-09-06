document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const scrollToProjectsButton = document.getElementById('scrollToProjects');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });

            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });

    scrollToProjectsButton.addEventListener('click', () => {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message
