# ToDos
----------------------------------------------------------------

----------------------------------------------------------------
## In Progress
---------------------------------------------------------------- dialog
  - esc to close

- slider
  - add "click to expand"
  - improve button scaling
  - accessibility audit!!

- More info section
  - @mobile
    - banner slider hidden
    - all images visible in secondary slider
  - @wide
    - banner slider visible
    - only mobile images visible in secondary slider
  - content organization
    - Stack displayed as a table
    - role/period/type/business as a datalist
lo
- Css Modules / scoping
- accessibility audit
- animate lines

----------------------------------------------------------------
## Backlog
----------------------------------------------------------------

#### Bugs
- figure out scroll jankiness **
- tiled bg texture isn't as nicely tiled as it could be... **

#### Copy/Content
- Go over all the copy *

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