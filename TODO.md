
-----------------------------------------
# Done
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
- content gen script

-----------------------------------------
# In progress
-----------------------------------------
WIP
- content writing + image gathering

BUGS
- Fix weird button seam task would be a nice to have too (use clip-path instead of pseudos)

-----------------------------------------
## TODO
-----------------------------------------

## Features
- color scheme switches
- rewind back-to-top
- animate lines

## Tasks
- aria/A11y Audit
- prefers-reduced-motion
- Unit Testing
- browser testing **
- Storybook
  - fix any glaring issues
  - dev documentation for hooks, etc
  - update anything that's changed
- General Cleanup (id tasks and make a list.  Theres a lot)
  - js: Use loaders for transitions in react route config
  - js: do something about the ad-hoc timers in the page transition flow.
  - js: use util fn files MUCH more prolifically.  ex: a navUtils file or smth
  - js: prefer document.querySelector over useRef.  It's just... way less complicated.
  - css: use css variables more prolifically
  - css: structure things so theming is easier
  - address todos
  - address linter inconsistencies

