import{p as m}from"./generator-DzuCpTd-.js";import{j as t}from"./jsx-runtime-j_jdvEMj.js";import{T as d}from"./Tag-DVGR8u8N.js";import{t as l}from"./util-B1Rsfge3.js";import"./index-B-o1Wr-g.js";import"./_commonjsHelpers-Cpj98o6Y.js";const c=({project:e,selectedTags:i,onTagSelect:p})=>t.jsxs("li",{className:"entry",children:[t.jsx("h5",{className:"title-3",children:e.title}),t.jsx("p",{children:e.description}),e.tags.map(r=>t.jsx(d,{tag:r,isSelected:l(r,i),onClick:p}))]},e.id);c.__docgenInfo={description:"",methods:[],displayName:"Project",props:{project:{required:!0,tsType:{name:"ProjectT"},description:""},selectedTags:{required:!0,tsType:{name:"Array",elements:[{name:"TagT"}],raw:"TagT[]"},description:""},onTagSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(tag: TagT) => void",signature:{arguments:[{type:{name:"TagT"},name:"tag"}],return:{name:"void"}}},description:""}}};const g=m(1),S={title:"components/Project",component:c,parameters:{},tags:["autodocs"],argTypes:{},args:{}},a={args:{project:g,selectedTags:[],onTagSelect:e=>{console.log(`Tag "${e.displayName}" selected`)}}};var s,o,n;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    project: projectData,
    selectedTags: [],
    onTagSelect: (tag: TagT) => {
      console.log(\`Tag "\${tag.displayName}" selected\`);
    }
  }
}`,...(n=(o=a.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};const h=["Default"];export{a as Default,h as __namedExportsOrder,S as default};
