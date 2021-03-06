//// The code to change the main images uses Intersection Observer.
//// The code to change text-wrap-guide does not.

const textWrapGuide = document.getElementById("text-wrap-guide");
const body = document.getElementsByTagName("body")[0];
const layoutToggle = document.getElementById("layout-toggle");

const isViewportBigEnoughForScrollBehaviour = () => {
    //// The number also appears in main.css media queries for screenwidth above and below.
    return document.documentElement.clientWidth > 624
        && body.classList.contains("diagonal");
}

const mainImages = document.getElementsByClassName("main-image");

if (!!window.IntersectionObserver) {
    //// Find which mainImage should be displayed, then change styling on mainImages accordingly.
    const sections =  document.getElementsByTagName("section");
    const mainImageFigures = document.getElementsByClassName("main-image-figure");
    const displayDiagonalImages = (entries, observer) => {
        if (isViewportBigEnoughForScrollBehaviour()) {
            //// Find which mainImage should be displayed by finding which section is intersecting with screen.
            //// If two sections are on the screen, indexOfSectionVisible will be set to the first section
            //// in one loop iteration and then set to the second section in another loop iteration, so 
            //// it will be the second section that will determine which mainImage is displayed.
            let indexOfSectionVisible = -1;
            for (let i = 0; i < entries.length; i++) {
                for (let j = 0; j < sections.length; j++) {
                    if (entries[i].target.id === sections[j].id
                        && entries[i].intersectionRatio > 0.1) {
                        indexOfSectionVisible = j + 1;
                        
                        // console.log(mainImages[indexOfSectionVisible])
                    }
                }
            }
            //// indexOfSectionVisible will still be -1 if the observer has fired, but not reported an intersection.
            if (indexOfSectionVisible > -1) {
                for (let i = 0; i <= sections.length; i++) {
                    //// Pre-emptively hide all captions.
                    if (i < sections.length) {
                        mainImageFigures[i].classList.remove("with-caption");
                    }
                    //// Hide and change z-index of images according to which section should be visible.
                    if (i < indexOfSectionVisible - 1) {
                        mainImages[i].classList.add("hidden");
                        mainImages[i].style.zIndex = 1;
                    }
                    else if (i == indexOfSectionVisible - 1) {
                        mainImages[i].classList.add("hidden");
                        mainImages[i].style.zIndex = 1;
                        mainImageFigures[i].classList.add("with-caption");
                    }
                    else if (i == indexOfSectionVisible) {
                        mainImages[i].classList.remove("hidden");
                        mainImages[i].style.zIndex = 0;
                    }
                    else {
                        mainImages[i].classList.add("hidden");
                        mainImages[i].style.zIndex = 0;
                    }
                }
            }
        }
        //// There was a bug in that the default main image would appear, when making the viewport small.
        else {
            document.getElementsByClassName("default-main-image")[0].classList.add("hidden");
            if (!!textWrapGuide) {
                textWrapGuide.classList.add("hidden");
            }
        }
    }

    const intersectionObserver = new IntersectionObserver(displayDiagonalImages, {threshold: [0.1, 0.9]});

    for (let i = 0; i < sections.length; i++) {
        // console.log(`Observing Section ${i}: ${sections[i].id}`)
        intersectionObserver.observe(sections[i]);
    }

    function resetRectangularLayout() {
        for (let i = 0; i <= sections.length; i++) {
            mainImages[i].classList.remove("hidden");
            mainImages[i].style.zIndex = 0;
        }
    }

    //// Code to move text-wrap-guide. It uses scroll position, but not Intersection Observer.

    if (!!textWrapGuide) {
        //// Make the section text flow correctly against the diagonal by moving #text-wrap-guide.
        function moveTextWrapGuide (windowHeight, distanceScrolled, startOfTextWrapping, endOfTextWrapping) {
            const newLowerEdge = windowHeight + distanceScrolled;
            const newShapeOutside = "polygon(0 " + startOfTextWrapping + ", 90% 0, 90% "+(distanceScrolled/2)+"px, 90% "+distanceScrolled+"px, 90% "+distanceScrolled+"px, 100% "+newLowerEdge+"px, 100% "+endOfTextWrapping+"px, 0 "+endOfTextWrapping+"px)";

            textWrapGuide.style.height = endOfTextWrapping + "px";
            textWrapGuide.style.shapeOutside = newShapeOutside;
        }

        function updateScroll() {
            if (isViewportBigEnoughForScrollBehaviour()) {   
                textWrapGuide.classList.remove("hidden");         
                const windowHeight = document.documentElement.clientHeight;
                const distanceScrolled = window.scrollY || window.pageYOffset;
                const startOfTextWrapping = 0;
                const endOfTextWrapping = Math.max(windowHeight, document.documentElement.offsetHeight, document.documentElement.scrollHeight);
                moveTextWrapGuide(windowHeight, distanceScrolled, startOfTextWrapping, endOfTextWrapping);
            }
        }

        function resizeDocument() {
            moveTextWrapGuide(0, 0, 0, 0);
            updateScroll();
        };

        //// Prevents `callback` from being called more than once in `window` milliseconds.
        //// Assumes `callback` has no arguments.
        function throttle(callback, window) {
            let waiting = false;
            return function () {
                if (!waiting) {
                    callback();
                    waiting = true;
                    setTimeout(function () {
                        waiting = false;
                    }, window);
                }
            }
        }

        function updateScrollWithThrottle() {
            throttle(updateScroll, 50)();
        }
        
        //// Listen for `scroll` event to update anything that can change after scrolling.
        window.addEventListener("scroll", updateScrollWithThrottle);
        //// Update scroll position on page load.
        window.addEventListener("load", updateScroll);
        //// Also do some scroll-related things on window resize.
        window.onresize = resizeDocument;


        function setStylesFromToggle() {
            if (layoutToggle.ariaPressed === "true") {
                body.classList.add("diagonal");
                body.classList.remove("rectangular");
                layoutToggle.ariaPressed = "false";
                layoutToggle.title="Switch to a layout that doesn’t have text and photos sliding horizontally";
                updateScroll();
                displayDiagonalImages();
            }
            else {
                body.classList.add("rectangular");
                body.classList.remove("diagonal");
                layoutToggle.ariaPressed = "true";
                layoutToggle.title="Switch to a layout with text and photos sliding in on scroll";
                resetRectangularLayout();
            }
        }

        //// Toggle the layout when the layout-toggle button is toggled.
        layoutToggle.addEventListener("click", setStylesFromToggle)
        //// Ensure the layout matches the toggle on page-load, because Firefox persists the checked state across page-loads.
        window.addEventListener("load", setStylesFromToggle);
    }

}
