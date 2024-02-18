let carouselAutoInterval;

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

  function infiniteCarousel() {
    const carouselContainers = document.querySelectorAll(".carousel-container");
  
    carouselContainers.forEach((carouselContainer, carouselIndex) => {
      const carousel = carouselContainer.querySelector(".carousel");
      const slides = carousel.querySelectorAll(".carousel-object");
      const totalSlides = slides.length;
      const slideWidth =
        slides[0].offsetWidth +
        toPlainPx(slides[0], getComputedStyle(slides[0]).marginLeft);
      let gapWidth = toPlainPx(slides[0], getComputedStyle(carousel).gap);
      const totalWidth = slideWidth + gapWidth;
      let timer = false;
      let currentIndex = 0;
      let prevIndex;
  
      function moveRight() {
        if (timer) {
          carousel.appendChild(slides[prevIndex]);
        }
        prevIndex = currentIndex;
        currentIndex = (currentIndex + 1) % totalSlides;
  
        carousel.style.transform = `translateX(-${totalWidth}px)`;
        carousel.classList.add("carousel-transition");
        timer = true;
        setTimeout(() => {
          carousel.appendChild(slides[prevIndex]);
          carousel.style.transform = ``;
          carousel.classList.remove("carousel-transition");
          timer = false;
        }, 500);
      }
  
      function moveLeft() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        if (timer) {
          carousel.insertBefore(slides[currentIndex], carousel.firstChild);
        }
        prevIndex = currentIndex;
  
        carousel.style.transform = "translateX(-65rem)";
        carousel.insertBefore(slides[currentIndex], carousel.firstChild);
        timer = true;
        setTimeout(() => {
          carousel.style.transform = "";
          carousel.classList.add("carousel-transition");
        }, 1);
  
        setTimeout(() => {
          carousel.classList.remove("carousel-transition");
          timer = false;
        }, 499);
      }
  
      if (carouselContainer.dataset.buttons) {
        const nextSlide = carouselContainer.querySelector(".btn-next");
        const prevSlide = carouselContainer.querySelector(".btn-prev");
  
        nextSlide.addEventListener("click", () => {
          moveRight();
        });
  
        prevSlide.addEventListener("click", () => {
          moveLeft();
        });
      }
      if (carouselContainer.dataset.auto) {
        if (carouselAutoInterval[carouselIndex] !== undefined) {
          clearInterval(carouselAutoInterval[carouselIndex]);
        }
        carouselAutoInterval[carouselIndex] = setInterval(moveRight, 2500);
      }
    });
  };
  
  

  document.addEventListener("DOMContentLoaded", () => {
    const numCarousel = document.querySelectorAll('.carousel-container').length;
    carouselAutoInterval = Array(numCarousel);
    infiniteCarousel();
    contentFade();
    modalOpener();
  });
  
  window.onscroll = function () {
    contentFade();
  };
  
  window.onresize = function () {
    infiniteCarousel();
    contentFade();
  };
  