function sendEmail() {
    // THIS MACRO NO LONGER POINTS TO MAMROT'S EMAIL
    // const url = 'https://script.google.com/macros/deprecated'
    // 
    // Deprecated due to security issue const recipient = 'mamrot.carspanord@gmail.com'

    contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const message = contactForm.querySelector('#message');
        const userEmail = contactForm.querySelector('#email');

        if (userEmail == '' || message == '') {
            return alert('Email not sent. Please ensure all required fields are filled in.')
        }

        fetch(url + '?q=' + JSON.stringify([
            recipient, `E-Post fra ${userEmail.value}`, `Epost fra nettsidens kontakt form.\n\n${message.value}\n\nSendt fra: ${userEmail.value}`
        ])).then(() => {
            openModal();

        message.value = '';
        userEmail.value = '';
        })
    })
}

function openModal() {
    const body = document.querySelector('body');
    const modalContainer = document.querySelector('.modal');
    const modalWindow = document.querySelector('.modal-inner');
    const modalClose = document.querySelectorAll('.modal-close')


    function closeModal() {
        modalContainer.classList.remove('active');
        body.style.overflow = 'auto';
    }
    modalClose.forEach((button) => {
        button.addEventListener('click', closeModal);

    });

    modalContainer.addEventListener('click', (e) => {
        if (!e.target.closest('.modal-inner-contact')) {
            closeModal();
        }
    })

    modalContainer.classList.add('active');
    body.style.overflow = 'hidden';
}

document.addEventListener('DOMContentLoaded', () => {
    sendEmail();

});