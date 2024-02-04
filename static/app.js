let carouselAutoInterval;

function contentFade() {
  const maskContainer = document.querySelector(".mask-container");
  const navHeight = document.querySelector("nav").offsetHeight;
  const fadeThreshold = 0;
  let fadeStart = navHeight + window.scrollY;

  maskContainer.style.cssText = `-webkit-mask:  linear-gradient( to bottom,
      rgba(0, 0, 0 ,0) 0px,
      rgba(0, 0, 0 ,0) ${fadeStart}px,
      rgba(0, 0, 0 , 1) ${fadeStart + fadeThreshold}px);`;
}

function toPlainPx(element, style) {
  if (style.includes("%")) {
    style = (parseFloat(style) * element.parentElement.offsetWidth) / 100;
  }
  if (!parseFloat(style)) {
    style = 0;
  }
  return parseFloat(style);
}

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
      }, 10);

      setTimeout(() => {
        carousel.classList.remove("carousel-transition");
        timer = false;
      }, 490);
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
}

document.addEventListener("DOMContentLoaded", () => {
  const numCarousel = document.querySelectorAll('.carousel-container').length;
  carouselAutoInterval = Array(numCarousel);

  infiniteCarousel();
  contentFade();
});

window.onscroll = function () {
  contentFade();
};

window.onresize = function () {
  infiniteCarousel();
  contentFade();
};
