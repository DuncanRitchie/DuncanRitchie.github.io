//// The code to change the main images uses Intersection Observer.
//// The code to change text-wrap-guide does not.

const isViewportBigEnoughForScrollBehaviour = () => {
    return document.documentElement.clientWidth > 600;
}

const mainImages = document.getElementsByClassName("main-image");

if (!!window.IntersectionObserver) {
    //// Find which mainImage should be displayed, then change styling on mainImages accordingly.
    const sections =  document.getElementsByTagName("section");
    const scrollCallback = (entries, observer) => {
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
                        
                        console.log(mainImages[indexOfSectionVisible])
                    }
                }
            }
            //// indexOfSectionVisible will still be -1 if the observer has fired, but not reported an intersection.
            if (indexOfSectionVisible > -1) {
                for (let i = 0; i <= sections.length; i++) {
                    if (i < indexOfSectionVisible) {
                        mainImages[i].className = "main-image hidden";
                        mainImages[i].style.zIndex = 1;
                    }
                    else if (i == indexOfSectionVisible) {
                        mainImages[i].className = "main-image";
                        mainImages[i].style.zIndex = 0;
                    }
                    else {
                        mainImages[i].className = "main-image hidden";
                        mainImages[i].style.zIndex = 0;
                    }
                }
            }
        }
    }

    const intersectionObserver = new IntersectionObserver(scrollCallback, {threshold: [0.1]});

    for (let i = 0; i < sections.length; i++) {
        // console.log(`Observing Section ${i}: ${sections[i].id}`)
        intersectionObserver.observe(sections[i]);
    }
}

//// Code to move text-wrap-guide. It uses scroll position, but not Intersection Observer.

const textWrapGuide = document.getElementById("text-wrap-guide");
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
            const windowHeight = document.documentElement.clientHeight;
            const distanceScrolled = window.scrollY || window.pageYOffset;
            const startOfTextWrapping = 0;
            const endOfTextWrapping = Math.max(document.documentElement.clientHeight, document.documentElement.offsetHeight, document.documentElement.scrollHeight);
            moveTextWrapGuide(windowHeight, distanceScrolled, startOfTextWrapping, endOfTextWrapping);
        }
    }

    function updateScrollWithTimeout() {
        window.setTimeout(updateScroll, 100);
    }
    
    //// Listen for `scroll` event to update anything that can change after scrolling.
    window.addEventListener("scroll", updateScrollWithTimeout);
    //// Update scroll position on page load.
    window.addEventListener("load", updateScroll);
}
