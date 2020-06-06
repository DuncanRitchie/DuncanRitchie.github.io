if (!!window.IntersectionObserver) {
    document.querySelector("body").classList.remove("no-intersection-observer");
    document.querySelector("body").classList.add("has-intersection-observer");
}

mainImages = document.getElementsByClassName("main-image");
const mainImagePictures = document.getElementsByClassName("main-image-picture");

for (let i = 0; i < mainImages.length; i++) {
    mainImages[i].addEventListener("mouseover", () => {
        mainImagePictures[i].classList.add("with-caption");
    })
    mainImages[i].addEventListener("mouseout", () => {
        mainImagePictures[i].classList.remove("with-caption");
    })
}