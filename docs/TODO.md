# ToDos
----------------------------------------------------------------

----------------------------------------------------------------
## In Progress
----------------------------------------------------------------


- FIGURE OUT PAGE TRANSITIONS
- figure out scroll management across page transitions

- Css Modules / scoping
- esc to close dialog (or go back to home)
- animate lines

- Nail down final data structure
- content: start collecting images and text for these more info pages
- accessibility audit
- slider: expand icon
- dark mode audit
- mobile audit

----------------------------------------------------------------
## Backlog
----------------------------------------------------------------

#### Bugs
- figure out scroll jankiness **
- tiled bg texture isn't as nicely tiled as it could be... **


#### Features
- "rewind" back to top button!
- animate lines **
- switch for dark mode
- more-info section **
- page transitions (for more-info sections)
  - tiles: https://codepen.io/alvarotrigo/pen/wvpbRmE
  - curtain: https://codepen.io/alvarotrigo/pen/qBpGLYq
  - transition inspo: https://alvarotrigo.com/blog/css-page-transitions/
- Articles/blog (link in social and in nav)
- change rainbow color themes? (grayscale looks so good!)

#### Storybook
- storybook doesn't actually trigger dark mode?
- align breakpoints in sb to breakpoints in project
- what knobs can I add to the stories?

#### Organization
- grid? other layout one-offs?  consolidation?
- standardize linter settings?

----------------------------------------------------------------
## Notes
----------------------------------------------------------------

can I pin to the element (btn) that was clicked?


like, get the scroll offset of the element I clicked on post-adjustment,

https://ux.stackexchange.com/questions/147067/is-there-a-standard-algorithm-for-maintaining-scroll-position-of-a-list-when-the

I didn't realize there was a ux stackexchange!


What I really want... is the position of the btn from the top of the viewport

- get position of the btn that was clicked (from top) (before list shift)
-
-

// how to SET the position of an element relative to the viewport
I can GET it with boundingClientRect