
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

document.addEventListener("DOMContentLoaded", () => {
  contentFade();
});

window.onscroll = function () {
  contentFade();
};

window.onresize = function () {

  contentFade();
};
