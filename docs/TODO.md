# Post-launch ASAP
----------------------------------------------------------------

Bugs
- reset lines on contact form submission [mid]

Content
- fill in the TBAs [involved]
- write the 3 sections out [involved]

Features
- more-info section [involved]
- click-tag-to-select [midHigh]
- button transition [easy]
- animate lines [High]

Deployment
- Fix the Deploy
- Deploy storybook

Other
- use Css vars instead of sass vars for line colors
- use js to allow changing the line colors (grayscale looks do good!! )
- can trapezoids be cutouts instead? can css do that?  maybe with svg?
- extend texture to the nav


## ToDo
- About section - add 3 sections for info about specialties + get rid of the 3 buttons.
- add a "more" link to projects, which opens up a popup with more info + pictures
- Animate Lines

- [med] Offscreen canvas rendering to fix that black screen on scroll (https://web.dev/articles/offscreen-canvas)
- [med] reset lines on contact form submission
- [hard] fill in TBA sections
- [easy] transitions
- test in mobile browsers


- storybook: breakpoints page
- storybook: development page
- storybook: "submitted" state story
- storybook: breakpoints?
- storybook: hook up fns?


----------------------------------------------------------------
# After Launch
----------------------------------------------------------------

## High Priority
- add a "more" link to projects, which opens up a popup with more info + pictures

## Other
- Articles/blog (link in social and in nav)
- "rewind" back to top button!
- re-enable click-tag-to-select-filter


----------------------------------------------------------------
# Notes to add to Obsidian later
----------------------------------------------------------------

### amazing tools
- https://svg-path.com/
- https://freesvgeditor.com/en/svg-editor-online


### svgs
- remove height/width and add voiewbox to be able to scale w/ css
- remove in-file "fill="s to use the fill rule

### Inkscape
- png to svg -> https://designbundles.net/design-school/how-to-convert-a-jpegpng-to-a-vector-in-inkscape



### node scripting
- fs = filesystem w/ callbacks, and fsp = filesystem with promises.


### regex
- reference regex capturing groups in the replace function callback to convert kebab-case-variable-names to camelCaseVariablesNames.  see copyScssVarsToJson.cjs file and look at: https://stackoverflow.com/questions/3954927/how-to-replace-captured-groups-only


### deployment
- deploy storybook to gh pages: https://medium.com/swlh/how-to-deploy-storybook-to-github-pages-4894097d49ab


## Storybook
- "unattached" documentation (no story connected) https://storybook.js.org/docs/writing-docs/mdx#writing-unattached-documentation

- It looks like the Canvas element, which is the sort of "demo block" that storybook uses, HAS to be tied to a story.  Which means I cant pop one in there for like, colors or headings.  This is that was causing me issues creating unattached docs earlier.

- To create a block without Storybook's own styling applied, use the Unstyled Block. https://storybook.js.org/docs/api/doc-blocks/doc-block-unstyled

- preview.ts file to set order of categories


## React
- refObjects have a .current, ref callbacks don't.
  I need to distinctify between Ref (joined type, could NOT have a current) and RefObject
  `import { RefObject, useLayoutEffect } from "react";`

