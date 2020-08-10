
const mainImages = document.getElementsByClassName("main-image");

const mainImagesToRectangular = () => {
    for (let i = 0; i < mainImages.length; i++) {
        mainImages[i].classList.add("rectangular");
    }
}

window.addEventListener("load", mainImagesToRectangular);