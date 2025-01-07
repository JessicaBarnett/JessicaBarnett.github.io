import { Meta, Unstyled } from "@storybook/blocks";
import * as sharedVars from '../data/css-variables.json';
import "../src/App.css";
import "./storybook.css";

<Meta title="about/Development" />

<h1>Development</h1>

This project utilizes the following:

<table>
    <tr class="sb-grid-1-1-3">
        <th>SPA Framework</th>
        <td>React</td>
        <td class='sb-align-left'>Chosen for its lightness, ease-of-use, and ubiquity.  It's honestly probably overkill for a one page portfolio.</td>
    </tr>
    <tr class="sb-grid-1-1-3">
        <th>JS Flavor</th>
        <td>Typescript</td>
        <td class='sb-align-left'>The self-documentation and bug-prevention provided typescript makes the extra overhead worth it in my opinion.</td>
    </tr>
    <tr class="sb-grid-1-1-3">
        <th>CSS Flavor</th>
        <td>Sass (dart-sass)</td>
        <td class='sb-align-left'>CSS can do a lot on its own, but Sass still has a lot of features that I like having, like mixins, functions, nesting and partials.  Also I find the variables a lot less clunky than CSS's syntax.</td>
    </tr>
    <tr class="sb-grid-1-1-3">
        <th>Bundler / Build Tool</th>
        <td>Vite</td>
        <td class='sb-align-left'>I honestly just used this to try it.  It purports to be a lot faster than Webpack, which would certainly be a plus.</td>
    </tr>
    <tr class="sb-grid-1-1-3">
        <th>Deployment</th>
        <td>Github actions</td>
        <td class='sb-align-left'>Seems to be the easiest when it comes to github pages deployment, and it's extremely full featured.  Looks like there's a lot you can do with it.</td>
    </tr>
    <tr class="sb-grid-1-1-3">
        <th>Documentation</th>
        <td>Storybook</td>
        <td class='sb-align-left'>The gold-standard for creating amazing style-guides.</td>
    </tr>
</table>

<img class="sb-img" src="/assets/docs/build-wips/build-wip-1.png" />
<img class="sb-img" src="/assets/docs/build-wips/build-wip-2.png" />

<div class="sb-fake-phone"><img src="/assets/docs/build-wips/build-wip-3.png" /></div>

<div class="sb-fake-phone"><img src="/assets/docs/build-wips/build-wip-4.png" /></div>

<div class="sb-fake-phone"><img src="/assets/docs/build-wips/build-wip-5.png" /></div>

<div class="sb-fake-phone"><img src="/assets/docs/build-wips/build-wip-6.png" /></div>

<div class="sb-fake-phone"><img src="/assets/docs/build-wips/build-wip-7.png" /></div>