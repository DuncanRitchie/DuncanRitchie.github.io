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
    });
}

//// When a nav label is focused, keypresses should have the effect of clicks (of opening/hiding the submenu)
for (let i = 0; i < navLabels.length; i++) {
    navLabels[i].addEventListener("keydown", (e)=>{
        //// On Arrow Down.
        if (e.keyCode == 40) {
            let firstItemOfSubmenu = document.querySelectorAll("nav input:checked ~ label:focus ~ ul li a")[0];
            //// If the current submenu is not open, it needs to be opened for its first item to be found.
            if (!firstItemOfSubmenu) {
                navLabels[i].click();
                firstItemOfSubmenu = document.querySelectorAll("nav input:checked ~ label:focus ~ ul li a")[0];
            }
            firstItemOfSubmenu.focus();
            return;
        }
        //// On Arrow Up.
        if (e.keyCode == 38) {
            //// If the current submenu is open, close it.
            document.querySelectorAll("nav input:checked ~ label:focus") && navLabels[i].click();
            return;
        }
        //// If the key pressed is not Tab or Shift.
        if (e.keyCode !== 9 && e.keyCode !== 16) {
            navLabels[i].click();
        }
    });
}

const closeCurrentSubmenu = () => {
    const currentSubmenuLabel = document.querySelector("nav input:checked ~ label");
    currentSubmenuLabel.click();
    currentSubmenuLabel.focus();
}

for (let i = 0; i < navSubmenuItems.length; i++) {
    navSubmenuItems[i].addEventListener("keydown", (e)=>{
        switch (e.keyCode) {
            /// Arrow Up.
            case 38:
                //// If the item is the first in its submenu (assuming 2 submenus).
                if (i==0 || i==document.querySelectorAll("nav ul *:first-child li").length) {
                    closeCurrentSubmenu();
                }
                else {
                    //// Go up an item.
                    navSubmenuItems[i-1].focus();
                }
                break;
            //// Arrow Down.
            case 40:
                //// Go down an item.
                console.log("number of submenu items", navSubmenuItems.length)
                console.log("i", i)
                if (i==document.querySelectorAll("nav ul *:first-child li").length-1 || i == navSubmenuItems.length-1) {
                    closeCurrentSubmenu();
                }
                else {
                    navSubmenuItems[i+1].focus();
                }
                break;
            default:
                break;
        }
    });
}
