# Project Story

## Initial Conception

The long and short of this project is, I haven't updated this thing since... I want to say 2011? And I happened to find myself with some time available,  and a ticket to a local conference in 2 weeks.  It seemed to be the perfect time to spruce this place up, get updated information in there, and then maybe get some fancy business cards printed for the conference.  Gotta love business cards.

So, these are my initial parameters:

- I want to make this thing within 2 weeks, from start to finish.  Using the conference as my deadline.

- I **don't** want to use any photography.  Want to lean in a graphic design direction.  This is really just because I'm uh... not the best photographer.  (Unless it's cats.  I'm **great** at photographing cats!)

- I also **don't** want to do a ton of drawing if possible.  I want the bulk of my time spent on building the guts of the thing thing, not creating artwork.

- I want to go for something minimalist.  "Keep it simple Stu... Silly", as my animation professors used to say!  Simplicity keeps the process quick in more ways than one.


## Inspiration

First step was to go on the hunt for some really cool Portfolio sites that other people have made, with the goal of feeling out what content I might want to put in this thing.  Here's some awesome projects that caught my fancy:

- [Brittany Chiang](https://brittanychiang.com/)
- [Sarah L. Fossheim](https://fossheim.io/)
- [Dani Roxberry](https://droxey.com/)
- [Lynn Fisher](https://lynnandtonic.com/)
- [Matthew Williams](http://findmatthew.com/)

and some other websites that I looked at during the process:
- https://www.filamentgroup.com/

Then I started looking for aesthetic inspiration.

I have a friend who recently bought a VCR, and has been enjoying watching old anime and mosnter movies on it.  The nostalgia of the blue screen with the numbers, the static, the packaging, and that grainy quality is just something that's hard to find anywhere else.  Also the frustration of popping a tape in and realizing you forgot to rewind!

So when I started looking for inspiration for this new design, I found myself drawn to retro designs for books, casettes, and VHS tapes, and eventually honed in on the packaging for Blank VHS casettes.

| Polaroid      | Rainbow      |  Sony      |
| ------------- | ------------- | ------------- |
| ![Polaroid Blank VHS](/documentation/inspiration/polaroid-vhs.jpg) | ![Rainbow Blank VHS](/documentation/inspiration/rainbow-vhs.jpg) | ![Sony Blank VHS](/documentation/inspiration/sony-vhs.jpg) |

I know full well that I'm not the best designer, and this is partly because I **really** like bright obnoxious colors.  And I **really** liked that Polaroid Casette!

Fun fact, the [font that is used in the VHS logo](https://fontsinuse.com/uses/3650/vhs-logo) is known as "Lee" or "Lester Bold".  It's a "a very peculiar 1970s kind of typeface" created by one Leo Weisz for VGC. It was also used on the cover of Charlie's Angels in 1976.


## Rough Desgin Pass

With inspiration in hand, I went about making my design.  It started with a bunch of chicken scratch in a notebook, as all good things do.  These are only a few pages of many.

| "About this project"   | tetris and pacman?      |  A retro tv?      |
| ------------- | ------------- | ------------- |
| ![Doodle #1](/documentation/sketches/doodle-1.jpg) | ![Doodle #2](/documentation/sketches/doodle-2.jpg) | ![Doodle #3](/documentation/sketches/doodle-3.jpg) |

Then It came time to start making something more hi fidelity, which means getting into design software.  Unfortunately all the standard design tools have Subscription costs, and I'm quite judicious about where I put my money these days.  Hence I ended up using my artist workhorse procreate to bring life to my design, even though both Sketch and Figma are much easier to work with (particularly when it comes to text).

It turned out pretty well all things considered. This is a 580px canvas, initially meant for phones.  But I think I made things a bit too small, so it's more of a 725 px layout.

I know I'll have to make adjustments.  But at least now I have an idea of what I'm aiming for.  The real fine-tuning happens in the browser.

![Initial Design](/documentation/initial_design.png)


## Demolishing the Old, Scaffolding the New

Next, I made my project branch and got busy deleting EVERYTHING.  The old stack was just sass, html and vanilla js.  It was pretty and had some neat things going on.

But I was told it "looks like a student website" more times than once, and I'm feeling a lil self-conscious about it now.  I don't know.  Maybe I'll grab the assets and fold it into a little "history of this portfolio" section later on...

You have to admit it's kinda pretty.  And it helped get me into the industry, so it certainly did it's job.

![Old Home Page](/documentation/old_home_page.png)

In any case, my new stack will be quite different.

I was on the fence about using react, since it's such a small project.  It kind of feels like overkill.  But also, I definitely wanted some sort of html templating for project and resume entries, and just general reusability of elements.

I also kinda wanted to roll out storybook for this project, which is DEFINITELY overkill.  But it's fun overkill, and won't affect performance of the actual site, so I'm not bothered.

I was originally on the fence about Sass.  I love using it, but with a framework in place, isn't as necessary, since css can be scoped to the component.  That said, I do think it depends on how much global css I do end up with.


## Typography + basic layout

This design is typography heavy, so the next task is to get that all sorted out.  Heres some rabbit holes I stumbled into on the way:

### Variable Fonts

I went on the hunt for fonts, and whilst I was downloading the Inter font from google, I realized that font-importing is quite a bit different from the last time I did it.  Variable fonts are new to me.

So I spent some time reading up on variable fonts and the new @font-face rules I'd need.  Ended up implementing it without too much trouble.

I'll likely thin out the font variations later, but while I'm still building and tweaking the design, It's nice to have all the options available.

### Fluid Font sizing

When I was a fledgeling Developer a decade ago, I remember lots of people making a big deal about fluid fonts.  I was curious where the css world ended up in that regard, and thought I might be able to incorporate something like that.  Found some extremely good article

- [Modern Fluid Typography with CSS Clamp](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) by Adrian Bece, the best overview of the development of fluid type over the last 8 years or so and the modern approach using the css clamp function.  Puts a lot of time into how the "preferred value" is calculared, and also buts a heavy emphasis on Accessibility issues with this approach, and potential solutions, tradeoffs, etc.
- [Why should type be fluid, anyway?](https://elisehe.in/2021/03/13/fluid-type) by  Elise Hein.  Great overview of the actual use-cases of fluid type.
- [Fluid Typography with Sass Functions](https://www.smashingmagazine.com/2022/10/fluid-typography-clamp-sass-functions/) by Brecht De Ruyte has some very nice sass functions that automate (and explain in detail) a lot of this math.
- honorable mentions:
    - https://codepen.io/chriscoyier/pen/XWmMdx
    - https://css-tricks.com/simplified-fluid-typography/

I didn't realize css had gained so many handy functions since I last looked.  Clamp is new to me, and it seems extremely useful.  Also Container

I ended up spending most of a day in this rabbit hole, and then deciding to just stick with good old responsive font sizing for now.  Fluid would be nice, but the potential Accessibility tradeoff isn't worth it without having the time to really test.  I'll add this to my nice-to-haves pile and move along to other things.

## Organization

I'm a bit of a neat freak when it comes to my code, so I spent a decent amount of time figuring out the most sensible place to put my sass rules to keep them organized and concise.

I love that sass has introduced @use, instead of @import.  That removes a LOT of duplicate-code problems that used to plague projects I've worked on, and frees me up to put things pretty much wherever I want.

I decided I want mixins for font size/line height, a vertical rhythm scheme, media queries (naturally), and grids, and wanted colors and fonts in variable files.  Then I broke out partials for various things.

## Why am I doing everything in a global css file?

One question someone may ask: hey, jess.  You have react in this project.  Why aren't you writing your css in your components?

Solid question deserves a solid answer, and my answer is that:

1) It's a lot easier for me personally to work on a cohesive design, at least at this early stage (and on a small project) when I consider the whole page together, rather than looking at the components individually. Things like vertical rhythm, grid layout, etc, all are better figured out on a macro scale than a micro.

2) Generally speaking, I kind of like having "global" styles?  Obviously anything bespoke to a component ought to be in a component, but things like typography, which tend to exist across components, are better suited to a global scope imo.  Relying too much on component encapsulization can be a bit of a crutch, and lead to a disjointed design and way more css than you need,

If this project were more complicated, of course, then you would never catch me dumping ALL my css in a global file.  Been there, done that, thank you.  I've dealt with enough BEM, OOCSS, class-clashing, and specificity nightmares to last a lifetime.  But that said, I do still think having well-thought-out global styles is a good thing.  It cuts down the amount of repetition in your css overall, and keeps the design simple and cohesive.

As in all things, balance is of the utmost importance.

3) this is a tiny tiny project, and honestly react is kind of overkill anyway.


## Css/Scss things!

Css Grid is a thing of beauty.  I'm so glad browser support is where it is now.  My entire career is about as old as `display: grid;`, and it's nice to FINALLY be able to put it through its paces.  I've been very pleased with its flexibility thus far.

I have a sandbox on codepen that I've been referencing and tweaking a lot lately. https://codepen.io/GreatPumpkin/pen/vYBjpyG



