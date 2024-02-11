function modalOpener() {
    const body = document.querySelector('body');
    const modalCards = document.querySelectorAll('.modal-card');
    const modalContainer = document.querySelector('.modal');
    const modalWindow = modalContainer.querySelector('.modal-inner');
    const modalClose = modalContainer.querySelector('#modal-close');
  
    function closeModal() {
      modalContainer.classList.remove('active');
      body.style.overflow = 'auto';
    }
  
    function openModal(modalCard) {
      const image = modalCard.querySelector('img').cloneNode(true);
      const heading = modalCard.querySelector('h3').cloneNode(true);
      const modalBody = modalCard.querySelectorAll('.modal-main-text');
  
      modalContainer.classList.add('active');
      modalWindow.innerHTML = '';
  
      let modalContent = document.createElement('div');
  
      modalContent.appendChild(image);
      modalContent.appendChild(heading);
  
      modalBody.forEach((node) => {
        let currentText = node.cloneNode(true);
        modalContent.appendChild(currentText);
      })
  
      modalContent.classList.add('modal-content');
  
      modalWindow.appendChild(modalContent);
      body.style.overflow = 'hidden';
    }
  
  
    modalClose.addEventListener('click', closeModal);
  
    modalContainer.addEventListener('click', (event) => {
      if (!event.target.closest('.modal-inner')) {
        closeModal();
      }
    })
  
    modalCards.forEach((modalCard) => {
      modalCard.addEventListener('click', () => {
        openModal(modalCard);
      })
    })
  };