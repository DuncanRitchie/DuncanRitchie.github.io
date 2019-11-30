let  cujToggles = document.getElementsByClassName("cuj-toggle")
let jumbotrons = document.getElementsByClassName("jumbotron-main")
let showJumbotrons = false

const addAnimatableAttribute = () => {
    for (let jumbotron of jumbotrons) {
        jumbotron.setAttribute("animatable","true")
    }
}

const hideJumbotrons = () => {
    for (let jumbotron of jumbotrons) {
        jumbotron.style.opacity = 0
        jumbotron.style.transform = "rotateX(90deg)"
        showJumbotrons = false
    }
}

const toggleJumbotrons = () => {
    if (showJumbotrons) {
        // This hides all jumbotrons on the page
        for (j=0;j<jumbotrons.length;j++) {
            jumbotrons[j].style.opacity = 0
            jumbotrons[j].style.transform = "rotateX(90deg)"
        }
        // This changes the text to "Show text"
        for (k=0;k<cujToggles.length;k++) {
            cujToggles[k].textContent = "Show text"
        }
        showJumbotrons = false
    }
    else {
        // This shows all jumbotrons on the page
        for (j=0;j<jumbotrons.length;j++) {
            jumbotrons[j].style.opacity = 1
            jumbotrons[j].style.transform = "rotateX(0)"
        }
        // This changes the text to "Hide text"
        for (k=0;k<cujToggles.length;k++) {
            cujToggles[k].textContent = "Hide text"
        }
        showJumbotrons = true
    }
}

for (i=0;i<cujToggles.length;i++) {
    cujToggles[i].addEventListener("click",()=>{
        toggleJumbotrons()
    })
}

hideJumbotrons()
window.setTimeout(addAnimatableAttribute,0)
window.setTimeout(toggleJumbotrons,0)