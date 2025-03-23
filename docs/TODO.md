-----------------------------------------
# Stream of consciousness
-----------------------------------------

PAGE NAVIGATION SCROLL POSITIONING

ok, I know the scroll pos bug I've been dealing with is a timing issue.  Scroll is happening before navigation is finished and the element is swapped.  Not sure why, as I AM awaiuting the navigate event, but... adding a timer does fix the issue so, that's the problem.


FILTER CLICK SCROLL POSITIONING

thinking the approach will be to have an event on the filter buttons that will... wait until


-----------------------------------------
# Done (recently)
-----------------------------------------

- fix timing issues in page transitions
  - to projects
  - back btn from projects
  - nav bar from projects

-----------------------------------------
# In progress
-----------------------------------------

- Maintain scroll position after coming back from projects
  - edge case: going to/from project page with a filter applied





-----------------------------------------
# ToDos
-----------------------------------------

## Content
- write actual content for woodcraft
- get more pictures from the wayback machine
- Write content for other projects!!

## Small fixes
- Style "More Info" Link  (lit. just add a class)
- remove extra color swatches in sb

## Med Fixes
- Maintain Scroll Positioning on Filter Click
- FIX BUILD
- search params for filters
- Dark mode audit

-----------------------------------------
## Backlog
-----------------------------------------

## Maybes
- Use loaders in react route config?
- color scheme switch
- rewind back-to-top
- animate lines?

## tasks
- aria/A11y Audit
- Prefers-reduced-motion
- Testing
- Spruce up the Storybook
- General Cleanup
- mobile audit
- browser testing
