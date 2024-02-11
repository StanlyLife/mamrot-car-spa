function servicePageScaling() {
    const serviceCards = document.querySelectorAll('.services-category');
    serviceCards.forEach((serviceCard) => {
        const textHeight = serviceCard.querySelector('.service-category-text').scrollHeight;
        serviceCard.style.minHeight = `${textHeight + 50}px`

    })

}

document.addEventListener("DOMContentLoaded", () => {
    servicePageScaling();
});

window.onresize = function () {
    servicePageScaling();
};