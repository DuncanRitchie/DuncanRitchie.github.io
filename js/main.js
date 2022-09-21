if (!!window.IntersectionObserver) {
	document.querySelector("body").classList.remove("no-intersection-observer");
	document.querySelector("body").classList.add("has-intersection-observer");
}

//// Headings have {position: absolute} on rectangular & diagonal layout.
//// This is necessary so that they are superimposed on the main images.
//// However, it means that text following the heading will sit behind
//// the heading, rather than under it.
//// To fix this, we set the padding-top of the element immediately
//// after the heading to be equal to the height of the heading.
//// At least one heading has a border-top; this width (the thickness of
//// the border) needs to be subtracted from the padding-top.
//// For some reason we also need to subtract 1rem (24px) from the
//// padding in the “Developing this website” article.
//// The padding-top is also defined in the CSS, with breakpoints for
//// where more padding is needed because the heading is wrapping onto
//// a second line. If the padding-top were not defined in the CSS,
//// and the user tried to navigate between (eg) code.html#velut and
//// aboutme.html#latin, the navigation would happen before the padding
//// was added, so could be wrong by several dozen pixels up or down.
//// Having this JavaScript makes the padding-top more accurate,
//// especially at the breakpoints where the headings wrap onto two lines.
const setPaddingAfterAbsolutelyPositionedHeadings = () => {
	const elementsToAddPaddingTo = document.querySelectorAll("article:not(.showcase-group) h2 + *");
	if (document.documentElement.clientWidth > 674) {
		const fullWidthElements = document.querySelectorAll("section article:not(.showcase-group) h2");

		for (let i = 0; i < fullWidthElements.length; i++) {
			const borderTopWidthAsText = getComputedStyle(fullWidthElements[i]).borderTopWidth //// Eg, "52.8px"
			const borderTopWidth = +borderTopWidthAsText.substr(0, borderTopWidthAsText.length - 2); //// Remove the "px" and convert to number
			const isDevelopmentArticle = fullWidthElements[i].id === "website-development-heading" //// Hack to give one article less padding
			const paddingNeeded = fullWidthElements[i].offsetHeight - borderTopWidth - (isDevelopmentArticle ? 24 : 0);

			elementsToAddPaddingTo[i].style.paddingTop = `${paddingNeeded}px`;
		}
	}
	else {
		for (let i = 0; i < elementsToAddPaddingTo.length; i++) {
			elementsToAddPaddingTo[i].style.paddingTop = `0px`;
		}
	}
}

//// In Firefox, when navigating to a article on a different page
//// (eg to code.html#velut from a page that isn’t code.html),
//// the navigation seems to occur before `setPaddingAfterAbsolutelyPositionedHeadings`
//// is run. This means that the location that is moved to in the page
//// can be some distance above/below the target element.
//// (It’s the same behaviour as happens without the CSS.)
//// I therefore don’t let the function run in Firefox!
const isNotFirefox = navigator.userAgent.indexOf('irefox') == -1;
if (isNotFirefox) {
	window.addEventListener("load", setPaddingAfterAbsolutelyPositionedHeadings);
	window.addEventListener("resize", setPaddingAfterAbsolutelyPositionedHeadings);
}
