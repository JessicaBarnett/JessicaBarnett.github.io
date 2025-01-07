import{j as n}from"./jsx-runtime-j_jdvEMj.js";const r=({tag:e,isSelected:a=!1,onClick:t=()=>{}})=>n.jsx("button",{className:`tag btn filter-projects ${a?"selected":""}`,type:"button",value:e.name,onClick:()=>t(e),children:e.displayName??e.name});r.__docgenInfo={description:"",methods:[],displayName:"Tag",props:{tag:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    displayName?: string,
    name: string
}`,signature:{properties:[{key:"displayName",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}}]}},description:""},isSelected:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(tag: TagT) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    displayName?: string,
    name: string
}`,signature:{properties:[{key:"displayName",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}}]}},name:"tag"}],return:{name:"void"}}},description:"",defaultValue:{value:"() => {}",computed:!1}}}};export{r as T};
