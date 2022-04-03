//// Allow no more than one nav tickbox to be ticked at a time.
//// This results in no more than one nav submenu being open at a time.
const navLabels = document.querySelectorAll("nav ul label");
const navTickboxes = document.querySelectorAll("nav ul input");

for (let i = 0; i < navTickboxes.length; i++) {
    const tickbox = navTickboxes[i];
    const label = navLabels[i];

    const newButton = document.createElement('button');
    newButton.type = 'button';
    newButton.textContent = label.textContent;
    newButton.title = tickbox.title;
    newButton.setAttribute('aria-expanded', 'false');
    newButton.setAttribute('aria-has-popup', 'true');
    newButton.setAttribute('aria-pressed', 'false');
    newButton.addEventListener('click', (_) => {
        const newState = newButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
        const buttons = [...document.querySelectorAll('nav [aria-expanded="true"]')];
        buttons.map(button => {
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-pressed', 'false');
        });
        newButton.setAttribute('aria-expanded', newState);
        newButton.setAttribute('aria-pressed', newState);
    });

    tickbox.parentNode.replaceChild(newButton, tickbox);
    label.remove();
}


for (let i = 0; i < navTickboxes.length; i++) {
    navTickboxes[i].addEventListener("click", (e)=>{
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

//// Keyboard events on nav tickboxes.
//// When a nav tickbox is focused, keypresses should have the effect of clicks (of opening/hiding the submenu)
//// When opening the submenu, the first item receives focus,
//// except on Arrow Up, in which case the last item receives focus.
for (let i = 0; i < navTickboxes.length; i++) {
    navTickboxes[i].addEventListener("keydown", (e)=>{
        //// On Arrow Up.
        if (e.keyCode == 38) {
            //// If the current submenu is open, close it.
            if (document.querySelector("nav input:checked ~ label:focus")) {
                navLabels[i].click();
            }
            //// Otherwise, open the menu and focus the last item.
            else {
                navLabels[i].click();
                document.querySelector("nav input:focus ~ ul li:last-child a").focus();
            }
            return;
        }
        //// Default behaviour on Enter is to follow the first link in the menu.
        //// We don’t want this; we want to open or close the menu.
        if (e.keyCode === 13) {
            e.preventDefault();
        }
        //// On any key other than Arrow Up, but not Tab or Enter or Shift or Space.
        if (e.keyCode !== 9 && e.keyCode !== 16 && e.keyCode !== 32) {
            //// If the current submenu is open, close it.
            if (document.querySelector("nav input:checked ~ label:focus")) {
                navLabels[i].click();
            }
            //// Otherwise, open the menu and focus the first item.
            else {
                navLabels[i].click();
                document.querySelector("nav input:focus ~ ul li:first-child a").focus();
            }
            return;
        }
    });
}

//// Does nothing if no submenu is open.
const closeCurrentSubmenu = () => {
    const currentSubmenuTickbox = document.querySelector("nav input:checked");
    if (currentSubmenuTickbox) {
        currentSubmenuTickbox.checked = false;
        currentSubmenuTickbox.setAttribute("aria-expanded", false);
        currentSubmenuTickbox.focus();
    }
}

//// Keyboard events on nav submenu items.
for (let i = 0; i < navSubmenuItems.length; i++) {
    navSubmenuItems[i].addEventListener("keydown", (e)=>{
        switch (e.keyCode) {
            /// Arrow Up.
            case 38:
                //// If the item is the first in its submenu (assuming 2 submenus), close the submenu.
                if (i==0 || i==document.querySelectorAll("nav ul *:first-child li").length) {
                    closeCurrentSubmenu();
                }
                //// Otherwise, go up an item.
                else {
                    navSubmenuItems[i-1].focus();
                }
                break;
            //// Arrow Down.
            case 40:
                //// If the item is the last in its submenu (assuming 2 submenus), close the submenu.
                if (i==document.querySelectorAll("nav ul *:first-child li").length-1 || i == navSubmenuItems.length-1) {
                    closeCurrentSubmenu();
                }
                //// Otherwise, go down an item.
                else {
                    navSubmenuItems[i+1].focus();
                }
                break;
            default:
                break;
        }
    });
}

//// Set aria-expanded on each menu on load, and when its state changes.
for (let i = 0; i < navTickboxes.length; i++) {
    const setAriaExpanded = () => {
        const newAriaExpanded = navTickboxes[i].getAttribute("aria-expanded") === "false";
        navTickboxes[i].setAttribute("aria-expanded", newAriaExpanded);
    }
    setAriaExpanded();
    navTickboxes[i].addEventListener("change", setAriaExpanded)
}

//// Close nav menus when a click happens outside the nav.
const nav = document.querySelector("nav");
document.addEventListener('click', function (event) {
    const isClickedOutside = !nav.contains(event.target);
    if (isClickedOutside) {
        closeCurrentSubmenu();
    }
});
