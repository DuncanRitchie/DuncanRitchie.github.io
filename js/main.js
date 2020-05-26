if (!!window.IntersectionObserver) {
    document.querySelector("body").classList.remove("no-intersection-observer");
    document.querySelector("body").classList.add("has-intersection-observer");
}