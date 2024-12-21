# Post-launch ASAP
----------------------------------------------------------------

## High Priority
- [med] Offscreen canvas rendering to fix that black screen on scroll (https://web.dev/articles/offscreen-canvas)
- [med-hard] why is the texture not loading?
- [easy] contact textarea font (it's courier ew)
- [med] reset lines on contact form submission
- [hard] fill in TBA sections
- [easy] form validation (html5, nothing fancy)
- [easy] transitions
- dark mode adaptations.
- test in mobile browsers

## High Interest
- storybook


----------------------------------------------------------------
# After Launch
----------------------------------------------------------------

## High Priority
- add a "more" link to projects, which opens up a popup with more info + pictures


## High Interest
- animate lines!!


## Other
- Articles/blog (link in social and in nav)
- "rewind" back to top button!
- re-enable click-tag-to-select-filter


----------------------------------------------------------------
# Notes to add to Obsidian later
----------------------------------------------------------------

# AMAZING TOOL
- https://svg-path.com/
- https://freesvgeditor.com/en/svg-editor-online


### svgs
- remove height/width and add voiewbox to be able to scale w/ css
- remove in-file "fill="s to use the fill rule

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
