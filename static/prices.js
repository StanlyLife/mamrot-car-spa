function modalOpener() {
    const body = document.querySelector('body');
    const modalButtons = document.querySelectorAll('.pricelist-image-button');
    const modalContainer = document.querySelector('.modal');
    const modalWindow = modalContainer.querySelector('.modal-inner-prices');

    function closeModal() {
        modalContainer.classList.remove('active');
        body.style.overflow = 'auto';
    }

    function openModal(modalButton) {
        const imageSrc = modalButton.dataset.image;
        const image = new Image();
        image.src = `static/images/prices_images/${imageSrc}.jpg`;
        const button = document.createElement('button');
        button.innerHTML = '<img src="static/images/close-x.svg" alt="">';
        button.id = 'modal-close';
        button.addEventListener('click', closeModal);


        modalContainer.classList.add('active');
        modalWindow.innerHTML = '';

        const modalContent = document.createElement('div');

        modalContent.appendChild(image);
        modalContent.appendChild(button);


        modalContent.classList.add('modal-content');

        modalWindow.appendChild(modalContent);
        body.style.overflow = 'hidden';
    }


    modalContainer.addEventListener('click', (e) => {
        if (!e.target.closest('.modal-inner-prices')) {
            closeModal();
        }
    });

    modalButtons.forEach((modalButton) => {
        modalButton.addEventListener('click', () => {
          openModal(modalButton);
        })
      });
}


document.addEventListener('DOMContentLoaded', () => {
    modalOpener();
})