import Vue from "vue"
Vue.filter("first10",(val)=>{
    return val.length > 25 ? val.substring(0,25)+'...' : val  ;
});