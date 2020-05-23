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
    });
}

//// Hide nav submenus after an item has been clicked.
const navSubmenuItems = document.querySelectorAll("nav ul ul li a");
for (let i = 0; i < navSubmenuItems.length; i++) {
    navSubmenuItems[i].addEventListener("click", (e)=>{
        for (let j = 0; j < navTickboxes.length; j++) {
            navTickboxes[j].checked = false;
        }
    })
}

const textWrapGuide = document.getElementById("text-wrap-guide");
//// Make the section text flow correctly against the diagonal by moving #text-wrap-guide.
function moveTextWrapGuide (windowHeight, distanceScrolled) {
    const newLowerEdge = windowHeight + distanceScrolled;
    const docHeight = Math.max(document.documentElement.clientHeight, document.documentElement.offsetHeight, document.documentElement.scrollHeight);
    const newShapeOutside = "polygon(0 0, 90% 0, 90% "+(distanceScrolled/2)+"px, 90% "+distanceScrolled+"px, 90% "+distanceScrolled+"px, 100% "+newLowerEdge+"px, 100% "+docHeight+"px, 0 "+docHeight+"px)";

    textWrapGuide.style.height = docHeight + "px";
    textWrapGuide.style.shapeOutside = newShapeOutside;
}

const sections =  document.getElementsByTagName("section");
const mainImages = document.getElementsByClassName("main-image");
const scrollCallback = (entries, observer) => {
    console.log("scrollCallback invoked");
    for (let i = 0; i < sections.length; i++) {
        if (sections[i]==entries[0].target) {
            console.log(sections[i], "is in scroll")
            sections[i].className="in-scroll";
        }
        else {
            sections[i].className="out-of-scroll";
        }
    }
    entries.forEach(entry=>{
        console.log(entry);
        //let mainImage = document.querySelector(".main-image");
        if (entry.intersectionRatio > 0) {
            entry.target.className = "in-scroll";
        }
        else {
            entry.target.className = "out-of-scroll";
        }
    });
}
const intersectionObserver = new IntersectionObserver(scrollCallback, {threshold: [0.1]});

for (let i = 0; i < sections.length; i++) {
    console.log(`Observing Heading ${i}: ${sections[i].firstChild.textContent}`)
    intersectionObserver.observe(sections[i]);
}

//// Set z-index to 1 on images earlier than the image to show,
//// and set z-index to 0 on the image to show and the images after.
//// This ensures that the image to show is always revealed by the
//// previously displayed image disappearing.
function showMainImages(windowHeight, distanceScrolled) {
    const indexOfSectionVisible = Math.round(distanceScrolled / windowHeight);
    let zIndex = 1;
    for (let i = 0; i < mainImages.length; i++) {
        if (i == indexOfSectionVisible) {
            //console.log("Showing image "+i);
            mainImages[i].className = "main-image";
            zIndex = 0;
        }
        else {
            //console.log("Hiding image "+i);
            mainImages[i].className = "main-image hidden";
        }
        mainImages[i].style.zIndex = zIndex;
    }
}

function updateScroll() {
    let windowHeight = document.documentElement.clientHeight;
    let distanceScrolled = window.scrollY || window.pageYOffset;
    moveTextWrapGuide(windowHeight, distanceScrolled);
    //showMainImages(windowHeight, distanceScrolled);
}

function updateScrollWithTimeout() {
    window.setTimeout(updateScroll, 100);
}
  
//// Listen for `scroll` event to update anything that can change after scrolling.
window.addEventListener("scroll", updateScrollWithTimeout);
//// Update scroll position on page load.
window.addEventListener("load", updateScroll);