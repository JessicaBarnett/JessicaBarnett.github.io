NOTE:
- copy/rename this file in the `content/*` directory to add a new project
- fill in all fields in the yml
  - `details` & `media` are only required if you want a more-info page
  - see `/src/types/data-types.ts > ProjectT` for type definition + optional fields
  - put `<SLIDER>` somewhere in the markdown area to indicate where the mobile slider should be situated.
  - delete this note block
- when finished, remember `npm run ProjectGen`, which will turn this file into a json object in `data/projects.json`


```yml
slug:
company:
list:
  title:
  description:
detail: (optional)
  title:
  subtitle: (optional)
  role:
  time: make sure this is quoted!  Needs to be a string not a number
  type:
  table:
    - heading:
      value:
tags:
  - displayName:
    name:
media:
  - name:
    url: /assets/projects/FILENAME.png
    alt:
    width: 360 | 560 | 760 | 1280 | 1920
```

#### Something Catchy

your text here

<SLIDER>

#### Challenge

more text here

#### Results

final text here