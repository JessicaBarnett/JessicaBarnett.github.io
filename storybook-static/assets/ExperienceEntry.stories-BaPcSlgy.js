import{e as g}from"./generator-DzuCpTd-.js";import{j as r}from"./jsx-runtime-j_jdvEMj.js";import{T as p}from"./Tag-DVGR8u8N.js";import{t as u}from"./util-B1Rsfge3.js";import"./index-B-o1Wr-g.js";import"./_commonjsHelpers-Cpj98o6Y.js";const m=({entry:e,selectedTags:o,onTagSelect:l})=>r.jsxs("li",{className:"entry",children:[r.jsxs("div",{className:"supertitle-3",children:[r.jsx("time",{dateTime:e.start,children:e.start})," -"," ",r.jsx("time",{dateTime:e.end,children:e.end})]}),r.jsx("h4",{className:"title-3",children:e.title}),r.jsx("p",{className:"subtitle-3",children:e.company}),e.tags.map(a=>r.jsx(p,{tag:a,isSelected:u(a,o),onClick:l}))]});m.__docgenInfo={description:"",methods:[],displayName:"ExperienceEntry",props:{entry:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    title: string,
    company: string,
    start: string,
    end: string,
    tags: TagT[]
}`,signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"company",value:{name:"string",required:!0}},{key:"start",value:{name:"string",required:!0}},{key:"end",value:{name:"string",required:!0}},{key:"tags",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    displayName?: string,
    name: string
}`,signature:{properties:[{key:"displayName",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}}]}}],raw:"TagT[]",required:!0}}]}},description:""},selectedTags:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    displayName?: string,
    name: string
}`,signature:{properties:[{key:"displayName",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}}]}}],raw:"TagT[]"},description:""},onTagSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(tag: TagT) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    displayName?: string,
    name: string
}`,signature:{properties:[{key:"displayName",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}}]}},name:"tag"}],return:{name:"void"}}},description:""}}};const d=g(1),j={title:"components/ExperienceEntry",component:m,parameters:{},tags:["autodocs"],argTypes:{},args:{}},t={args:{entry:d,selectedTags:[],onTagSelect:e=>{console.log(`Tag "${e.displayName}" selected`)}}};var n,s,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    entry: experienceEntry,
    selectedTags: [],
    onTagSelect: (tag: TagT) => {
      console.log(\`Tag "\${tag.displayName}" selected\`);
    }
  }
}`,...(i=(s=t.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const N=["Default"];export{t as Default,N as __namedExportsOrder,j as default};
