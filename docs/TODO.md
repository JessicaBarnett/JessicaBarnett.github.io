-----------------------------------------
# Stream of consciousness
-----------------------------------------

so, this slide height thing...

the goal is to make it so there isn't any excess space at the bottom of the slide.  So every time a slide is selected, the height of the images (not the image containers... why did I do that?) changes to match the selected slide's height.

it's... weird...

there's some resize issues.  I think the useOffset hook is calculating the width (which defines the offsets) based on a skewed height?  maybe I need to take the natural height not the defined height?


-----------------------------------------
# Done (recently)
-----------------------------------------

- Fix scroll Positioning when selecting/deselecting filters!!
- fix timing issues in page transitions!!
  - to projects
  - back btn from projects
  - nav bar from projects
- Mobile Tweaks
- fixes to get the build out (3/24)
- Maintain scroll position after coming back from projects
- Maintain filters during navigation
- Style "More Info" Link  (lit. just add a class)
- add a key to the table rows on project page
- Reorg type for projects AGAIN >_<
- add html sanitizer and render html content
- storybook link is boken (since I have a docs folder, renaming storybook-static to docs wasn't working.  renaming it to storybook instead, and changing links. )
- links in about section were not smooth scrolling (moved the scrollToId fn to a reusable util file to avoid prop drilling and fix this)
- project page: added a mobile-only slider, and made the existing sliders med+ only
- slider: half-fix for weird height-fixing issues.  I'm just not doing the height fixing on the mobile-only slider (the one having the issues because the images are so drastically different in height)
- on filter select change (not via tag clicks), scroll should not change!! right now it does!

-----------------------------------------
# In progress
-----------------------------------------
WIP
- content gen script
- content writing + image gathering

BUGS
- Fix weird button seam task would be a nice to have too (use clip-path)



-----------------------------------------
# ToDos
-----------------------------------------

## Content
- write actual content for woodcraft
- get more pictures from the wayback machine
- Write content for other projects!!

## Small fixes

## Med Fixes
- use clip mask instead of pseudos for vhs tabs
- search params for filters
- Mobile Audit
- Dark mode audit

-----------------------------------------
## Backlog
-----------------------------------------

## Maybes
- Use loaders for transitions in react route config?
- color scheme switches
- rewind back-to-top
- animate lines <3

## Tasks
- aria/A11y Audit
- prefers-reduced-motion
- Testing
- Spruce up the Storybook
- General Cleanup
- mobile audit
- browser testing
