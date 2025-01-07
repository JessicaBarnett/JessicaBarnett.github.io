
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


## JSX
- Nested loop example (mind your parens...)
```
{ Object.keys(filteredProjects).map(companyName => (
    <>
        <h4 className="section-subheading subtitle-2">{companyName}</h4>
        <ul>
        { filteredProjects[companyName].map(project => (
            <Project project={project} selectedTags={selectedFilter?.tags ?? []} onTagSelect={onTagSelect}></Project>
        ))}
        </ul>
    </>
))}
```


## Math

calculated the bevel angle for the rainbows using trigonometry, which I totally forgot about

xx = x + (d * cos(alpha))
yy = y + (d * sin(alpha))

```javascript
// given destination point, angle, and distance, calculates next point
const nextPoint = (p: PointT, angle: number, d: number): PointT => {
    return { x: p.x + (d * Math.cos(angle)), y: p.y + (d * Math.sin(angle)) };
}
```

ref: https://math.stackexchange.com/questions/143932/calculate-point-given-x-y-angle-and-distance
