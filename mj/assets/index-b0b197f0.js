import{a as y}from"./axios-aba6f0e0.js";import{r as u,a as h,d as _,w,c as d,b as n,u as i,t as x,e as b,o as p}from"./index-0f77b665.js";const k=""+new URL("openai-logo-35978533.webp",import.meta.url).href,l=y.create({baseURL:"http://43.153.30.133",timeout:5e4,headers:{"Content-Type":"x-www-form-urencoded"}});function D(e){switch(e.status){case 400:break;case 401:break;case 404:break;default:throw new Error("未知错误")}}function B(e){switch(e.status){case 200:return Promise.resolve(e.data);default:return e.data}}l.interceptors.request.use(e=>e,e=>(e.data={},e.data.msg="服务器异常",Promise.resolve(e)));l.interceptors.response.use(e=>B(e),e=>{D(e)});const C=e=>l.post("/mschat/login",e),K=e=>l.post("/mschat/checktotal",e);function m(e){let o=e.getFullYear(),t=e.getMonth()+1,a=e.getDate();return t<10&&(t="0"+t),a<10&&(a="0"+a),o+"-"+t+"-"+a}const j={class:"login flex flex-col justify-center items-center"},T=n("img",{class:"w-60 m-auto",src:k,alt:""},null,-1),E={class:"flex flex-col justify-center items-center"},H=["value"],L={key:0,class:"toast-cp fixed bottom-60 bg-black bg-opacity-70 px-4 py-2 rounded text-white text-sm"},R={__name:"index",setup(e){let o=u(""),t=u(!1),a=u("");h();const v=s=>{o.value=s.target.value},r=_(()=>{const s=new Date,c=new Date;return c.setDate(s.getDate()-90),{now:m(s),old:m(c)}}),f=async()=>{if(o.value){let s=await C({openapiKey:o.value});t.value=!0,console.log(s,"dd"),a.value=s.msg}else t.value=!0,a.value="the key can not be null! "},g=async()=>{if(o.value){console.log(r,"www");let s=await K({startDate:r.value.now,endDate:r.value.old,openapiKey:o.value});t.value=!0,a.value=s.msg}else t.value=!0,a.value="the key can not be null! "};return w(t,()=>{setTimeout(()=>{t.value=!1},1500)}),(s,c)=>(p(),d("div",j,[T,n("div",E,[n("input",{class:"l-inp w-80 p-3 border border-gray-300 rounded-lg text-sm focus:border-purple-600",type:"text",placeholder:"plesae provide your key form openai",value:i(o),onChange:v},null,40,H),n("div",{class:"flex justify-center"},[n("div",{class:"px-4 py-2 text-white select-none rounded mt-10 mr-10 bg-purple-600 active:translate-y-1",onClick:f}," login "),n("div",{class:"px-4 py-2 text-white select-none rounded mt-10 bg-purple-600 active:translate-y-1",onClick:g}," usage ")])]),i(t)?(p(),d("div",L,x(i(a)),1)):b("",!0)]))}};export{R as default};