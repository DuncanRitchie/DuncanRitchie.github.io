# DuncanRitchie.github.io / www.duncanritchie.co.uk
I’m a junior dev in Chester, UK, and this is my site.

## Assets
This is a static site with three HTML pages: index.html, code.html, and aboutme.html. It is hosted by GitHub Pages, to let me publish other repos to subfolders, eg www.duncanritchie.co.uk/calculator/ and www.duncanritchie.co.uk/snake/ .

Font icons (all three of them) are from Font Awesome. The non-icon font is Alegreya.

The little downward arrowhead used on the navbar is an SVG I made in Inkscape and minified. Actually it’s two SVGs — a green version appears on mouse (h)over.

Images are hosted by Cloudinary, and I’m making use of its facility for serving pictures with different sizes and formats (WebP/Jpeg for photos, WebP/PNG for screenshots).

All the photos accompanying the sections were taken by me, except the photo of me, which was taken by my mum.

My favicon is the head of a fulmar, the North Atlantic seabird. The background of my Latin vocabulary website [velut](https://www.duncanritchie.co.uk/code.html#velut) and the avatars of my two GitHub accounts ([1](https://github.com/DuncanRitchie/) and [2](https://github.com/DuncanRitchie2/)) are derived from the same photo, which I took while at uni in Scotland.

## History — creating the site in 2019
I started pursuing a career in web/software development by enrolling on a 12-week course at a bootcamp called Code Nation, which luckily for me had just opened up their second campus in my home city. Three weeks in (18th Feb 2019), we students started creating portfolio websites with what basics we had learnt about HTML, CSS, JavaScript, and Git. We had been introduced to the CSS library Bootstrap, so my [first commit](https://github.com/DuncanRitchie/DuncanRitchie.github.io/commit/4c743da3db2b8fa48fd2b27a6f6e3216b4c712da) is just “Hello, world!” with all of Bootstrap imported. I [removed](https://github.com/DuncanRitchie/DuncanRitchie.github.io/commit/5d5f382d5e8670e065ee2bc7f2a431e26b6722af) all the Bootstrap BS the next day when I realised I didn’t have to host it myself.

So I got the site into a vaguely decent shape and made sure it was responsive to different screen sizes and accessible to keyboard-users. The use of Bootstrap was most obvious from the markup of the navigation bar and from the use of the word “jumbotron” for a full-width `<div>` containing paragraphs.

My repo used to be www.github.com/duncanritchie/portfolio, which was live at www.duncanritchie.co.uk/Portfolio/, before I realised that I could get root hosting by moving it to a repo with the same name as my github.io address. Pretty basic stuff, but all new to me!

I continued adding projects to code.html, commenting out less interesting projects, changing wording, and improving the CSS. This went on after I graduated from the bootcamp, secured an apprenticeship, went back to the bootcamp for my training part of the apprenticeship, graduated again, and started proper work for my employer Information Catalyst. Eventually the thought occurred to me (no earlier than September 2019) that a visitor should be able to print my site to paper; I’m not sure who would want to, but I [implemented the styles](https://github.com/DuncanRitchie/DuncanRitchie.github.io/commit/77a0880a44d0facc89b95c39c259f58b68b7b91a). And I had a brief flirt with using scroll-snapping, but found that the entire viewport yanking from section to section wasn’t the best user experience.

## History — the 2020 redesign
I wasn’t entirely satisfied with my site. I had three quibbles remaining.

My design had the afore-mentioned jumbotrons splayed out in front of full-width background photos, with a button to hide or show the jumbotrons to reveal the photos better. This was reasonably good, but I disliked not being able to see both the photo and the text at the same time.

My site was using Bootstrap, which is a perfectly decent library, I’m not criticizing it. As a newbie, I appreciated being able to create an accessible, responsive, professional-looking navbar without much learning, and I liked having some model code showing me things like ARIA roles and screenreader-only classes. But I felt I should break away from Bootstrap, and be less reliant on external styling. A site with three pages can do without so large a dependency. I can surely manage to make my own navbar!

The last and probably the least of my quibbles was that I had a photo of myself on the homepage, which only displayed on screens wider than 767 pixels because I had never figured out how to make it look decent on mobile. Cropping it would cut much of my face off; keeping the aspect ratio would make the picture take up most of the screen, and I don’t think visitors really want my face taking up so much of their screen. So `@media (max-width:767px) { .jumbotron-image { display: none;} }` it was!

Yes, I could have just swapped the photo out for one that could be cropped better. Yes, images can be floated to not cause gaps in the layout. But by the beginning of 2020, I had bigger visions. I was going to revamp the whole site.

My process for designing the look of my Latin vocabulary site, back in May 2019, was to open Inkscape, set the page dimensions to the size of a phone, and use my photo of the flying fulmar for the background and decide on a colour-scheme based off it. The sky of the photo got replaced with a paler blue gradient, and text was overlayed, with the placement of the fulmar being adjusted away from the title text.

In a similar way, my redesign of www.duncanritchie.co.uk started with me choosing a photo of myself, importing it to Inkscape, then basing the colour scheme off it, with a gradient background to extend the colours from the photo. I solved the issue of me wanting to see the photo and text together (on desktop) by having the photo take up the left side of the screen and putting the text on the right. To make the photo look more connected to the text, I settled on a diagonal dividing line between them.

On [aboutme.html](https://www.duncanritchie.co.uk/aboutme.html), there are several sections, with a photo for each. On wide enough screens, the photos (`class="main-image"`) are fixed in position to the viewport, so they all take up the left side of the screen; the Intersection Observer API is used in the [JavaScript](https://github.com/DuncanRitchie/DuncanRitchie.github.io/blob/master/js/scroll.js) to control which image is visible, by watching for section headings to come into or out of view. A CSS transition on the `clip-path` property makes the effect look less jarring.

(The Edge browser does not currently support `clip-path: polygon(...)`, so the image visible changes on scroll, but without the transition, and the image visible is the one previous to the correct image. A rectangular `clip-path` would probably work; I’m looking into it. `shape-outside: polygon(...)` also doesn’t work in Edge.)

The photos, however, do not affect the layout of the text — their fixed position puts them outside of the document flow. To make the text fit against the diagonal edge, I needed an extra `<div>` in the HTML (`id="text-wrap-guide"`), with appropriate `width`, `height`, and `shape-outside` properties. [JavaScript](https://github.com/DuncanRitchie/DuncanRitchie.github.io/blob/master/js/scroll.js) is used to make the values change when the viewport is scrolled or resized. A CSS transition on `shape-outside` makes the text move more smoothly.

On [code.html](https://www.duncanritchie.co.uk/code.html), my showcase of projects meant that I couldn’t have the diagonal layout: I want the showcase to take up the width of the screen, instead of being squashed into the right side. I’ve therefore made a more rectangular layout with narrower photos; the images are less relevant to the page anyway.

Accessibility is something I’ve improved by:
* increasing the font sizes,
* not having text over pictures (except for the headings),
* using `<img>` tags with `alt` text instead of `<div>` with `background-image`, and
* inserting screenreader-only text next to the GitHub icons on my project showcase.

I’ve improved the site’s responsiveness to screen-size by:
* wrapping `<img>` elements in `<picture>` to specify different-sized images for different-sized screens;
* making extensive use of `rem` units, with the value of `1rem` interpolated between 19px at viewport-width 360px and 28px at viewport-width 2400px; and
* creating a `grid` layout for the navbar on mobile.

It is also crucial to consider browser differences. I’ve mentioned that Edge does not support polygonal `clip-path` or `shape-outside` values. I mainly use Firefox in developing this site, but from the start of the redesign process I have also looked at the site in JavaScript-less Internet Explorer, as well as modern versions of Chrome, Opera, and Edge. Browsers that don’t support intersection observers can’t do the scrolling effects on the photos and text-wrapping, so on such browsers I’ve made the photos float statically beside the text. Browsers that don’t support the WebP image format get Jpeg and PNG fallbacks.

There are minor improvements remaining to be done. CSS for printing, most importantly. I will also be improving the legibility of headings when they are superimposed on photos (as the [Wave](https://wave.webaim.org/report#/www.duncanritchie.co.uk) tool correctly complains about it). But overall, I’m delighted with what I’ve made. It looks good (to me, at least); and I’ve learnt more about HTML, CSS, and JavaScript: eg, the `<picture>` tag, `rem` units, the `shape-outside` property, and intersection observers.

The Lighthouse profiling tool now gives my site 100% scores on Accessibility, SEO, and Best Practices on mobile and desktop on all three pages. Performance fluctuates between 97% and 100%. Lighthouse ranked my old site slightly worse.

## Deployments
To see the old design, which I’ve kept on the [master-before-2020-redesign](https://github.com/DuncanRitchie/DuncanRitchie.github.io/tree/master-before-2020-redesign) branch, go to [old.duncanritchie.co.uk](https://old.duncanritchie.co.uk/).

Since 31st May 2020 the new design has been live on the [master](https://github.com/DuncanRitchie/DuncanRitchie.github.io/tree/master) branch at [www.duncanritchie.co.uk](https://www.duncanritchie.co.uk/).
