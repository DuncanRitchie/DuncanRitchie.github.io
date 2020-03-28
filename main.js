//// Allow no more than one nav tickbox to be ticked at a time.
//// This results in no more than one nav submenu being open at a time.
const navLabels = document.querySelectorAll("nav ul label");
const navTickboxes = document.querySelectorAll("nav ul input");
for (let i = 0; i < navTickboxes.length; i++) {
    navLabels[i].addEventListener("click", (e)=>{
        for (let j = 0; j < navTickboxes.length; j++) {
            if (i !== j) {
                navTickboxes[j].checked = false;
            }
        }
    })
}

const textWrapGuide = document.getElementById("text-wrap-guide");
// Update scroll `target`, and start the animation if it is not running already.
function moveTextWrapGuide (windowHeight, distanceScrolled) {
    const newLowerEdge = windowHeight + distanceScrolled;
    const docHeight = Math.max(document.documentElement.clientHeight, document.documentElement.offsetHeight, document.documentElement.scrollHeight);
    const newShapeOutside = "polygon(0 0, 100% 0, 100% "+(distanceScrolled/2)+"px, 90% "+distanceScrolled+"px, 90% "+distanceScrolled+"px, 100% "+newLowerEdge+"px, 100% "+docHeight+"px, 0 "+docHeight+"px)";

    textWrapGuide.style.height = docHeight + "px";
    textWrapGuide.style.shapeOutside = newShapeOutside;
}

const mainImages = document.getElementsByClassName("main-image");

function showMainImages(windowHeight, distanceScrolled) {
    const indexOfSectionVisible = Math.round(distanceScrolled / windowHeight);
    for (let i = 0; i < mainImages.length; i++) {
        if (i == indexOfSectionVisible) {
            //console.log("Showing image "+i);
            mainImages[i].style.opacity = "1";
        }
        else {
            //console.log("Hiding image "+i);
            mainImages[i].style.opacity = "0";
        }
    }
}

function updateScroll() {
    let windowHeight = document.documentElement.clientHeight;
    let distanceScrolled = window.scrollY || window.pageYOffset;
    moveTextWrapGuide(windowHeight, distanceScrolled);
    showMainImages(windowHeight, distanceScrolled);
}

function updateScrollWithTimeout() {
    window.setTimeout(updateScroll, 100);
}
  
// Listen for `scroll` event to update the position of #text-wrap-guide.
window.addEventListener("scroll", updateScrollWithTimeout);
// Update scroll position on page load.
window.addEventListener("load", updateScroll);