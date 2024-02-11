function modalOpener() {
    const body = document.querySelector('body');
    const modalCards = document.querySelectorAll('.modal-card');
    const modalContainer = document.querySelector('.modal');
    const modalWindow = modalContainer.querySelector('.modal-inner-gallery');
  
    function closeModal() {
      modalContainer.classList.remove('active');
      body.style.overflow = 'auto';
    }
  
    function openModal(modalCard) {
      const imageSrc = modalCard.dataset.image;
      const image = new Image();
      image.src = `static/images/high_res/${imageSrc}.jpg`;
      const button = document.createElement('button');
      button.innerHTML = '<img src="static/images/close-x.svg" alt="">';
      button.id = 'modal-close';
      button.addEventListener('click', closeModal);
 
  
      modalContainer.classList.add('active');
      modalWindow.innerHTML = '';
  
      let modalContent = document.createElement('div');
  
      modalContent.appendChild(image);
    modalContent.appendChild(button);

  
      modalContent.classList.add('modal-content');
  
      modalWindow.appendChild(modalContent);
      body.style.overflow = 'hidden';
    }
  
  
    modalContainer.addEventListener('click', (event) => {
      if (!event.target.closest('.modal-inner-gallery')) {
        closeModal();
      }
    })
  
    modalCards.forEach((modalCard) => {
      modalCard.addEventListener('click', () => {
        openModal(modalCard);
      })
    })
  };

  document.addEventListener('DOMContentLoaded', () => {
    modalOpener();
  })