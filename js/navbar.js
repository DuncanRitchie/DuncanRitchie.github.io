//// Initially, the nav HTML contains a tickbox and a label to toggle each submenu
//// (the “checkbox hack”). This works okay, but it needs to be replaced
//// with something more semantically correct if JavaScript is available.
const navLabels = document.querySelectorAll("nav ul label");
const navTickboxes = document.querySelectorAll("nav ul input");

for (let i = 0; i < navTickboxes.length; i++) {
    const tickbox = navTickboxes[i];
    const label = navLabels[i];

    //// Create a <button> element with attributes from tickbox & label.
    const newButton = document.createElement('button');
    newButton.type = 'button';
    newButton.id = label.id;
    newButton.textContent = label.textContent;
    newButton.title = tickbox.title;
    newButton.setAttribute('aria-controls', tickbox.getAttribute('aria-controls'));
    newButton.setAttribute('aria-expanded', 'false');

    //// On click, make it close all submenus except the one that should be open.
    //// There should never be more than one submenu open.
    newButton.addEventListener('click', (_) => {
        const newState = newButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
        const buttons = [...document.querySelectorAll('nav [aria-expanded="true"]')];
        buttons.map(button => {
            button.setAttribute('aria-expanded', 'false');
        });
        newButton.setAttribute('aria-expanded', newState);
    });

    //// Replace the tickbox & label in the Dom.
    tickbox.parentNode.replaceChild(newButton, tickbox);
    label.remove();
}

//// Hide nav submenus after an item has been clicked.
const navSubmenuItems = document.querySelectorAll("nav ul ul li a");
for (let i = 0; i < navSubmenuItems.length; i++) {
    navSubmenuItems[i].addEventListener("click", (e)=>{
        closeCurrentSubmenu();
    });
}

//// TO DO: Update all code below to use the buttons created above, instead of the checkbox hack;
//// eg, button[aria-expanded="true"] instead of input:checked

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
    const currentSubmenuTickbox = document.querySelector('nav button[aria-expanded="true"]');
    if (currentSubmenuTickbox) {
        currentSubmenuTickbox.setAttribute("aria-expanded", 'false');
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

//// Close nav menus when a click happens outside the nav.
const nav = document.querySelector("nav");
document.addEventListener('click', function (event) {
    const isClickedOutside = !nav.contains(event.target);
    if (isClickedOutside) {
        closeCurrentSubmenu();
    }
});
