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

const main = document.getElementsByTagName("main")[0];
const textWrapGuide = document.getElementsByClassName("text-wrap-guide")[0];
// Update scroll `target`, and start the animation if it is not running already
function moveTextWrapGuide () {
    const windowHeight =  document.documentElement.clientHeight;
    const newUpperEdge = window.scrollY || window.pageYOffset;
    // const newUpperEdge = 0;
    const newLowerEdge = windowHeight + newUpperEdge;
    const docHeight = Math.max(document.documentElement.clientHeight, document.documentElement.offsetHeight, document.documentElement.scrollHeight);
    const newShapeOutside = "polygon(0 0, 100% 0, 100% "+(newUpperEdge/2)+"px, 90% "+newUpperEdge+"px, 90% "+newUpperEdge+"px, 100% "+newLowerEdge+"px, 100% "+docHeight+"px, 0 "+docHeight+"px)";
    console.log(newUpperEdge);
    console.log(newShapeOutside);
    console.log(docHeight);

    textWrapGuide.style.height = docHeight + "px";
    textWrapGuide.style.shapeOutside = newShapeOutside;
    main.height = Math.round((docHeight/30)+0.5);;
}

function updateScroll () {
    window.setTimeout(moveTextWrapGuide, 100);
}
  
// Listen for `scroll` event to update `target` scroll position
window.addEventListener("scroll", updateScroll)