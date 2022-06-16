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
    newButton.classList.add('nav-menu-toggle');
    newButton.id = label.id;
    newButton.innerHTML = label.innerHTML;
    newButton.title = tickbox.title;
    newButton.setAttribute('aria-controls', tickbox.getAttribute('aria-controls'));
    newButton.setAttribute('aria-expanded', 'false');

    //// On click, make it close all submenus except the one that should be open.
    //// There should never be more than one submenu open.
    newButton.addEventListener('click', (_) => {
        if (isSubmenuOpen(newButton)) {
            closeAllSubmenus();
        }
        else {
            openSubmenu(newButton);
        }
    });

    //// Replace the tickbox & label in the Dom.
    tickbox.parentNode.replaceChild(newButton, tickbox);
    label.remove();
}

function isSubmenuOpen(toggleButton) {
    return toggleButton.getAttribute('aria-expanded') === 'true';
}

function getAllSubmenuButtons() {
    return [...document.querySelectorAll('.nav-menu-toggle')];
}

function getOpenSubmenuButton() {
    return getAllSubmenuButtons().find(button=>isSubmenuOpen(button));
}

function closeAllSubmenus() {
    const buttons = getAllSubmenuButtons();
    buttons.map(button => {
        button.setAttribute('aria-expanded', 'false');
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

function openSubmenu(toggleButton) {
    closeAllSubmenus();
    toggleButton.setAttribute('aria-expanded', 'true');
}

//// Keyboard events on nav toggle buttons.
getAllSubmenuButtons().map(button => {
    button.addEventListener("keydown", (e)=>{
        switch (e.keyCode) {
            case 27: // Escape
                closeAllSubmenus();
                break;
            case 38: // Arrow Up: open the menu and focus the last item.
                openSubmenu(button);
                document.querySelector("nav .nav-menu-toggle:focus ~ ul li:last-child a").focus();
                break;
            case 40: // Arrow Down, open the menu and focus the first item.
                openSubmenu(button);
                document.querySelector("nav .nav-menu-toggle:focus ~ ul li:first-child a").focus();
                break;
        }
    });
});

const navSubmenuItems = [...document.querySelectorAll("nav ul ul li a")];
navSubmenuItems.map((item, i) => {
    //// Hide nav submenus after an item has been clicked.
    item.addEventListener("click", (e)=>{
        closeCurrentSubmenu();
    });

    //// Keyboard events on nav submenu items.
    item.addEventListener("keydown", (e)=>{
        switch (e.keyCode) {
            //// Escape.
            case 27:
                closeAllSubmenus();
                break;
            //// Arrow Up.
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
});

//// Close nav menus when a click happens outside the nav.
const nav = document.querySelector("nav");
document.addEventListener('click', function (event) {
    const isClickedOutside = !nav.contains(event.target);
    if (isClickedOutside) {
        closeCurrentSubmenu();
    }
});
