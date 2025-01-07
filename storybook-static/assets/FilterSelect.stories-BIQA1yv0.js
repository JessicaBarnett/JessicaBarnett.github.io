import{f as u}from"./generator-DzuCpTd-.js";import{j as e}from"./jsx-runtime-j_jdvEMj.js";import"./index-B-o1Wr-g.js";import"./_commonjsHelpers-Cpj98o6Y.js";const l=({filters:m,selectedFilter:a,onFilterChange:o})=>e.jsxs("div",{className:"filter-projects-group half",children:[e.jsx("label",{className:"filter-projects-label",htmlFor:"filterProjects",children:"Filter"}),e.jsxs("select",{className:"filter-projects-select",name:"filterProjects",id:"filterProjects",value:(a==null?void 0:a.name)??void 0,onChange:o,children:[e.jsx("option",{value:"",children:"All"}),m.map(t=>e.jsx("option",{value:t.name,"data-tags":t.tags,children:t.displayName}))]})]});l.__docgenInfo={description:"",methods:[],displayName:"FilterSelect",props:{filters:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    displayName: string,
    name: string,
    tags: TagT[]
}`,signature:{properties:[{key:"displayName",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"tags",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    displayName?: string,
    name: string
}`,signature:{properties:[{key:"displayName",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}}]}}],raw:"TagT[]",required:!0}}]}}],raw:"FilterT[]"},description:""},selectedFilter:{required:!0,tsType:{name:"union",raw:"FilterT | undefined",elements:[{name:"signature",type:"object",raw:`{
    displayName: string,
    name: string,
    tags: TagT[]
}`,signature:{properties:[{key:"displayName",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"tags",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    displayName?: string,
    name: string
}`,signature:{properties:[{key:"displayName",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}}]}}],raw:"TagT[]",required:!0}}]}},{name:"undefined"}]},description:""},onFilterChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(e: React.ChangeEvent<HTMLSelectElement>) => void",signature:{arguments:[{type:{name:"ReactChangeEvent",raw:"React.ChangeEvent<HTMLSelectElement>",elements:[{name:"HTMLSelectElement"}]},name:"e"}],return:{name:"void"}}},description:""}}};const d=u(3),f={title:"components/FilterSelect",component:l,parameters:{},tags:["autodocs"],argTypes:{},args:{}},r={args:{filters:d,selectedFilter:void 0,onFilterChange:()=>{console.log("clicked")}}};var n,s,i;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    filters: filters,
    selectedFilter: undefined,
    onFilterChange: () => {
      console.log('clicked');
    }
  }
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const v=["Default"];export{r as Default,v as __namedExportsOrder,f as default};
