
function contentFade() {
  const maskContainer = document.querySelector(".mask-container");
  const overNavHeight = document.querySelector(".over-nav").scrollHeight;

  const fadeThreshold = 0;
  let fadeStart = window.scrollY - overNavHeight;

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

function hamburgerToCross() {

  navLinks = document.querySelector('.nav-links');
  overNav = document.querySelector('.over-nav');
  document.querySelector('#hamburger-icon').addEventListener('click', function () {
    navLinks.querySelectorAll('a').forEach((child) => {
      child.classList.toggle('transition');
    })


    navLinks.classList.toggle('active');
    overNav.classList.toggle('active');
    this.classList.toggle('active');
    this.querySelectorAll('div').forEach((element) => element.classList.remove('animation-off'));

  });
}

function mobileNavTransition() {
  navLinks = document.querySelector('.nav-links');
  overNav = document.querySelector('.over-nav');
  if (window.innerWidth < 769) {
    setTimeout(() => {
        navLinks.classList.add('nav-transition');
        overNav.classList.add('nav-transition');
    }, 1);
  
  } else {
    navLinks.classList.remove('nav-transition');
    overNav.classList.remove('nav-transition');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  contentFade();
  hamburgerToCross();
  mobileNavTransition();
});

window.onscroll = function () {
  contentFade();
};

window.addEventListener('resize', () => {
  mobileNavTransition();
  contentFade();
});
