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

for (let i = 0; i < navSubmenuItems.length; i++) {
    navSubmenuItems[i].addEventListener("keydown", (e)=>{
        switch (e.keyCode) {
            case 38:
                //// Go up an item.
                i==0 || navSubmenuItems[i-1].focus();
                break;
            case 40:
                //// Go down an item.
                i==navSubmenuItems.length || navSubmenuItems[i+1].focus();
                break;
            default:
                break;
        }
    });
}
