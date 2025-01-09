
----------------------------------------------------------------
# Notes to add to Obsidian later
----------------------------------------------------------------

### amazing tools
- https://svg-path.com/
- https://freesvgeditor.com/en/svg-editor-online

### Fun projects to do
- https://stylestage.dev/styles/manual/#contribute


### svgs
- remove height/width and add voiewbox to be able to scale w/ css
- remove in-file "fill="s to use the fill rule

### Inkscape
- png to svg -> https://designbundles.net/design-school/how-to-convert-a-jpegpng-to-a-vector-in-inkscape


### Typescript
- need to tell the compiler or linter to ignore an error?  I always have to look this up...
```typescript
// tslint:disable-next-line
// @ts-expect-error: Let's ignore a compile error like this unreachable code
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// eslint-disable-next-line
// @typescript-eslint/ban-ts-comment
```

- "Type 'CssVariablesT' must have a '[Symbol.iterator]()' method that returns an iterator."

REMEMBER THIS BECAUSE IT HAPPENS A LOT

you might be trying to spread an array into an object or destructure an object into an array

- Got an "object is possibly null" warning that yoou KNOW is not null?  You can use the ! to assert your confidence, ie: `document.getElementById(id)!`.

- Overloads!!  Never done these before [but I like them!](https://www.typescripttutorial.net/typescript-tutorial/typescript-function-overloadings/)
```typescript
    // hook return type
    type UseSelectedFilterReturnT = [
        FilterT | undefined | null,
        ((tag: TagT ) => void) & ((tagName: string ) => void)
    ];

    // overloads and definition
    function handleChange(tagName: string): void;
    function handleChange(tag: TagT): void;
    function handleChange(newValue: TagT | string): void {
        const tagName = typeof newValue === 'string' ? newValue : newValue.name;
        const matchingFilter = matchFilterByName(filters, tagName);
        if (matchingFilter?.name === value?.name) {
            setValue(null);
        } else {
            setValue(matchFilterByName(filters, tagName));
        }
    }
```


### Content Projection comparison!
- Love this! https://www.thisdot.co/blog/content-projection-in-front-end-javascript-frameworks

### node scripting
- fs = filesystem w/ callbacks, and fsp = filesystem with promises.


### Scss
@forward is the new @import!! just remember that @forward DOES NOT REPLACE @use if you actuaoly need to use that variable in that file.  In that case ypu need both @forward and @use. ex:
```scss
@use './variables' as *; // you need this too!!
@forward './variables';

background-color: $variable-from-variables;
```


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
- trying to add a key to a react fragment? Use the Fn instead! ```<React.Fragment key={companyName}>/* ... */React.Fragment>``` https://bobbyhadz.com/blog/react-add-key-to-fragment
-

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
