function sendEmail() {
    const url = 'https://script.google.com/macros/s/AKfycbzIhFof1kn4mqW-Rfs7tfBI4zCA3Ka45O0PUvF8FwWL7KPMrn6o2qVzE0QMzjl-FgNuVQ/exec'
    const recipient = 'john.d.mcgurk@hotmail.com'

    contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const message = contactForm.querySelector('#message').value;
        const userEmail = contactForm.querySelector('#email').value;

        if (userEmail == '' || message == '') {
            return alert('Email not sent. Please ensure all required fields are filled in.')
        }

        fetch(url + '?q=' + JSON.stringify([
            recipient, `E-Post fra ${userEmail}`, `Epost fra nettsidens Kontakt form.\n${message}\nSendt fra: ${userEmail}`
        ])).then(() => {
            const body = document.querySelector('body');
            const modalContainer = document.querySelector('.modal');
            const modalWindow = document.querySelector('.modal-inner');
            const modalClose = document.querySelector('#modal-close')


            function closeModal() {
                modalContainer.classList.remove('active');
                body.style.overflow = 'auto';
            }

            modalClose.addEventListener('click', closeModal);

            modalContainer.addEventListener('click', (event) => {
                if (!event.target.closest('.modal-inner')) {
                  closeModal();
                }
              })

            modalContainer.classList.add('active');
            modalWindow.innerHTML = '';

            let modalContent = document.createElement('div');
            


            modalContent.classList.add('modal-content');

            modalWindow.appendChild(modalContent);
            body.style.overflow = 'hidden';
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    sendEmail();

});