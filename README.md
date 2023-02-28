# DuncanRitchie.github.io / www.duncanritchie.co.uk
I’m a junior dev in Chester, UK, and this is my site.

![Screenshot of my website, in desktop Firefox](https://github.com/DuncanRitchie/portfolio-screenshots/blob/main/minified/new-desktop-withcaption-firefox-home__small.png)

## Assets
This is a static site with three HTML pages: [index.html](https://www.duncanritchie.co.uk/), [code.html](https://www.duncanritchie.co.uk/code.html), and [aboutme.html](https://www.duncanritchie.co.uk/aboutme.html). For three pages, there’s quite a lot going on.

It is hosted by Netlify. Other repos of mine are published to subfolders, eg www.duncanritchie.co.uk/blog/ and www.duncanritchie.co.uk/snake/.

The font is Alegreya, self-hosted. I’m also self-hosting the logos of GitHub and LinkedIn as SVGs, which are from Font Awesome.

The little downward arrowhead used on the navbar is an SVG I made in Inkscape and minified. Actually, for Internet Explorer it’s two SVGs — a green version appears on mouse (h)over — but modern browsers can change the colour with CSS.

Images are hosted by Cloudinary, and I’m making use of its facility for serving pictures with different sizes and formats (WebP/Jpeg for photos, WebP/PNG for screenshots).

All the photos accompanying the sections were taken by me, except the photo of me, which was taken by my mum.

My favicon is the head of a fulmar, the North Atlantic seabird. The background of my Latin vocabulary website [velut](https://www.duncanritchie.co.uk/code.html#velut) and the avatars of my two GitHub accounts ([1](https://github.com/DuncanRitchie/) and [2](https://github.com/DuncanRitchie2/)) are derived from the same photo, which I took while at uni in Scotland.

![My favicon with the fulmar](https://www.duncanritchie.co.uk/favicon-96x96.png)

## Redesign
I created the site in 2019 and redesigned it the following year.
This readme used to contain information about the old design and how I have revamped the site, but I’ve since moved that into a [post on my personal blog](https://www.duncanritchie.co.uk/blog/developing-my-personal-website).

There are minor improvements remaining to be done. But overall, I’m delighted with what I’ve made. It looks good (to me, at least); and I’ve learnt more about HTML, Aria, CSS, and JavaScript: eg, the `<picture>` tag, `rem` units, the `shape-outside` property, `@supports` queries, intersection observers, Local Storage, and the `prefers-reduced-motion` setting.

## Lighthouse scores
The Lighthouse profiling tool now gives my site 100% scores on Accessibility, SEO, and Best Practices on desktop and mobile on all three pages. Performance fluctuates between 84% and 87%.

My most recent scores are in the table. My old site ranked about the same for performance.

| Page          | Device  | Performance | Accessibility | Best Practices | SEO |
| :-----------: | :-----: | ----------: | ------------: | -------------: | --: |
| Home          | Mobile  |          87 |           100 |            100 | 100 |
| My code       | Mobile  |          84 |           100 |            100 | 100 |
| More about me | Mobile  |          87 |           100 |            100 | 100 |
| Home          | Desktop |          85 |           100 |            100 | 100 |
| My code       | Desktop |          86 |           100 |            100 | 100 |
| More about me | Desktop |          85 |           100 |            100 | 100 |

## Deployments
To see the old design, which I’ve kept on the [before-2020-redesign](https://github.com/DuncanRitchie/DuncanRitchie.github.io/tree/before-2020-redesign) branch, go to [old.duncanritchie.co.uk](https://old.duncanritchie.co.uk/).

Since 31st May 2020 the new design has been live at [www.duncanritchie.co.uk](https://www.duncanritchie.co.uk/). It is on the [main](https://github.com/DuncanRitchie/DuncanRitchie.github.io/tree/main) branch.

## Development
Since this is handcoded HTML, there is no `npm install` or equivalent.

If I’m using VS Code’s Live Server extension, I can see the site as I work on it at http://127.0.0.1:5500.
