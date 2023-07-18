import{r as te,a as De,c as qe,b as re,u as Ue,o as Ge}from"./index-0f77b665.js";var Ve=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ne={},Qe={get exports(){return ne},set exports(W){ne=W}};/** @license
 * eventsource.js
 * Available under MIT License (MIT)
 * https://github.com/Yaffle/EventSource/
 */(function(W,ae){(function(g){var D=g.setTimeout,H=g.clearTimeout,p=g.XMLHttpRequest,L=g.XDomainRequest,J=g.ActiveXObject,E=g.EventSource,b=g.document,oe=g.Promise,Z=g.fetch,pe=g.Response,k=g.TextDecoder,ye=g.TextEncoder,ie=g.AbortController;if(typeof window<"u"&&typeof b<"u"&&!("readyState"in b)&&b.body==null&&(b.readyState="loading",window.addEventListener("load",function(e){b.readyState="complete"},!1)),p==null&&J!=null&&(p=function(){return new J("Microsoft.XMLHTTP")}),Object.create==null&&(Object.create=function(e){function r(){}return r.prototype=e,new r}),Date.now||(Date.now=function(){return new Date().getTime()}),ie==null){var Fe=Z;Z=function(e,r){var n=r.signal;return Fe(e,{headers:r.headers,credentials:r.credentials,cache:r.cache}).then(function(t){var o=t.body.getReader();return n._reader=o,n._aborted&&n._reader.cancel(),{status:t.status,statusText:t.statusText,headers:t.headers,body:{getReader:function(){return o}}}})},ie=function(){this.signal={_reader:null,_aborted:!1},this.abort=function(){this.signal._reader!=null&&this.signal._reader.cancel(),this.signal._aborted=!0}}}function ge(){this.bitsNeeded=0,this.codePoint=0}ge.prototype.decode=function(e){function r(f,u,i){if(i===1)return f>=128>>u&&f<<u<=2047;if(i===2)return f>=2048>>u&&f<<u<=55295||f>=57344>>u&&f<<u<=65535;if(i===3)return f>=65536>>u&&f<<u<=1114111;throw new Error}function n(f,u){if(f===6*1)return u>>6>15?3:u>31?2:1;if(f===6*2)return u>15?3:2;if(f===6*3)return 3;throw new Error}for(var t=65533,o="",a=this.bitsNeeded,s=this.codePoint,c=0;c<e.length;c+=1){var d=e[c];a!==0&&(d<128||d>191||!r(s<<6|d&63,a-6,n(a,s)))&&(a=0,s=t,o+=String.fromCharCode(s)),a===0?(d>=0&&d<=127?(a=0,s=d):d>=192&&d<=223?(a=6*1,s=d&31):d>=224&&d<=239?(a=6*2,s=d&15):d>=240&&d<=247?(a=6*3,s=d&7):(a=0,s=t),a!==0&&!r(s,a,n(a,s))&&(a=0,s=t)):(a-=6,s=s<<6|d&63),a===0&&(s<=65535?o+=String.fromCharCode(s):(o+=String.fromCharCode(55296+(s-65535-1>>10)),o+=String.fromCharCode(56320+(s-65535-1&1023))))}return this.bitsNeeded=a,this.codePoint=s,o};var Oe=function(){try{return new k().decode(new ye().encode("test"),{stream:!0})==="test"}catch(e){console.debug("TextDecoder does not support streaming option. Using polyfill instead: "+e)}return!1};(k==null||ye==null||!Oe())&&(k=ge);var R=function(){};function P(e){this.withCredentials=!1,this.readyState=0,this.status=0,this.statusText="",this.responseText="",this.onprogress=R,this.onload=R,this.onerror=R,this.onreadystatechange=R,this._contentType="",this._xhr=e,this._sendTimeout=0,this._abort=R}P.prototype.open=function(e,r){this._abort(!0);var n=this,t=this._xhr,o=1,a=0;this._abort=function(i){n._sendTimeout!==0&&(H(n._sendTimeout),n._sendTimeout=0),(o===1||o===2||o===3)&&(o=4,t.onload=R,t.onerror=R,t.onabort=R,t.onprogress=R,t.onreadystatechange=R,t.abort(),a!==0&&(H(a),a=0),i||(n.readyState=4,n.onabort(null),n.onreadystatechange())),o=0};var s=function(){if(o===1){var i=0,l="",F=void 0;if("contentType"in t)i=200,l="OK",F=t.contentType;else try{i=t.status,l=t.statusText,F=t.getResponseHeader("Content-Type")}catch{i=0,l="",F=void 0}i!==0&&(o=2,n.readyState=2,n.status=i,n.statusText=l,n._contentType=F,n.onreadystatechange())}},c=function(){if(s(),o===2||o===3){o=3;var i="";try{i=t.responseText}catch{}n.readyState=3,n.responseText=i,n.onprogress()}},d=function(i,l){if((l==null||l.preventDefault==null)&&(l={preventDefault:R}),c(),o===1||o===2||o===3){if(o=4,a!==0&&(H(a),a=0),n.readyState=4,i==="load")n.onload(l);else if(i==="error")n.onerror(l);else if(i==="abort")n.onabort(l);else throw new TypeError;n.onreadystatechange()}},f=function(i){t!=null&&(t.readyState===4?(!("onload"in t)||!("onerror"in t)||!("onabort"in t))&&d(t.responseText===""?"error":"load",i):t.readyState===3?"onprogress"in t||c():t.readyState===2&&s())},u=function(){a=D(function(){u()},500),t.readyState===3&&c()};"onload"in t&&(t.onload=function(i){d("load",i)}),"onerror"in t&&(t.onerror=function(i){d("error",i)}),"onabort"in t&&(t.onabort=function(i){d("abort",i)}),"onprogress"in t&&(t.onprogress=c),"onreadystatechange"in t&&(t.onreadystatechange=function(i){f(i)}),("contentType"in t||!("ontimeout"in p.prototype))&&(r+=(r.indexOf("?")===-1?"?":"&")+"padding=true"),t.open(e,r,!0),"readyState"in t&&(a=D(function(){u()},0))},P.prototype.abort=function(){this._abort(!1)},P.prototype.getResponseHeader=function(e){return this._contentType},P.prototype.setRequestHeader=function(e,r){var n=this._xhr;"setRequestHeader"in n&&n.setRequestHeader(e,r)},P.prototype.getAllResponseHeaders=function(){return this._xhr.getAllResponseHeaders!=null&&this._xhr.getAllResponseHeaders()||""},P.prototype.send=function(){if((!("ontimeout"in p.prototype)||!("sendAsBinary"in p.prototype)&&!("mozAnon"in p.prototype))&&b!=null&&b.readyState!=null&&b.readyState!=="complete"){var e=this;e._sendTimeout=D(function(){e._sendTimeout=0,e.send()},4);return}var r=this._xhr;"withCredentials"in r&&(r.withCredentials=this.withCredentials);try{r.send(void 0)}catch(n){throw n}};function Ee(e){return e.replace(/[A-Z]/g,function(r){return String.fromCharCode(r.charCodeAt(0)+32)})}function we(e){for(var r=Object.create(null),n=e.split(`\r
`),t=0;t<n.length;t+=1){var o=n[t],a=o.split(": "),s=a.shift(),c=a.join(": ");r[Ee(s)]=c}this._map=r}we.prototype.get=function(e){return this._map[Ee(e)]},p!=null&&p.HEADERS_RECEIVED==null&&(p.HEADERS_RECEIVED=2);function me(){}me.prototype.open=function(e,r,n,t,o,a,s){e.open("GET",o);var c=0;e.onprogress=function(){var f=e.responseText,u=f.slice(c);c+=u.length,n(u)},e.onerror=function(f){f.preventDefault(),t(new Error("NetworkError"))},e.onload=function(){t(null)},e.onabort=function(){t(null)},e.onreadystatechange=function(){if(e.readyState===p.HEADERS_RECEIVED){var f=e.status,u=e.statusText,i=e.getResponseHeader("Content-Type"),l=e.getAllResponseHeaders();r(f,u,i,new we(l))}},e.withCredentials=a;for(var d in s)Object.prototype.hasOwnProperty.call(s,d)&&e.setRequestHeader(d,s[d]);return e.send(),e};function Te(e){this._headers=e}Te.prototype.get=function(e){return this._headers.get(e)};function Ce(){}Ce.prototype.open=function(e,r,n,t,o,a,s){var c=null,d=new ie,f=d.signal,u=new k;return Z(o,{headers:s,credentials:a?"include":"same-origin",signal:f,cache:"no-store"}).then(function(i){return c=i.body.getReader(),r(i.status,i.statusText,i.headers.get("Content-Type"),new Te(i.headers)),new oe(function(l,F){var z=function(){c.read().then(function(C){if(C.done)l(void 0);else{var w=u.decode(C.value,{stream:!0});n(w),z()}}).catch(function(C){F(C)})};z()})}).catch(function(i){if(i.name!=="AbortError")return i}).then(function(i){t(i)}),{abort:function(){c!=null&&c.cancel(),d.abort()}}};function Q(){this._listeners=Object.create(null)}function _e(e){D(function(){throw e},0)}Q.prototype.dispatchEvent=function(e){e.target=this;var r=this._listeners[e.type];if(r!=null)for(var n=r.length,t=0;t<n;t+=1){var o=r[t];try{typeof o.handleEvent=="function"?o.handleEvent(e):o.call(this,e)}catch(a){_e(a)}}},Q.prototype.addEventListener=function(e,r){e=String(e);var n=this._listeners,t=n[e];t==null&&(t=[],n[e]=t);for(var o=!1,a=0;a<t.length;a+=1)t[a]===r&&(o=!0);o||t.push(r)},Q.prototype.removeEventListener=function(e,r){e=String(e);var n=this._listeners,t=n[e];if(t!=null){for(var o=[],a=0;a<t.length;a+=1)t[a]!==r&&o.push(t[a]);o.length===0?delete n[e]:n[e]=o}};function X(e){this.type=e,this.target=void 0}function Se(e,r){X.call(this,e),this.data=r.data,this.lastEventId=r.lastEventId}Se.prototype=Object.create(X.prototype);function se(e,r){X.call(this,e),this.status=r.status,this.statusText=r.statusText,this.headers=r.headers}se.prototype=Object.create(X.prototype);function be(e,r){X.call(this,e),this.error=r.error}be.prototype=Object.create(X.prototype);var de=-1,M=0,q=1,$=2,fe=-1,j=0,ue=1,Re=2,Ne=3,Ie=/^text\/event\-stream(;.*)?$/i,He=1e3,Le=18e6,ce=function(e,r){var n=e==null?r:parseInt(e,10);return n!==n&&(n=r),le(n)},le=function(e){return Math.min(Math.max(e,He),Le)},U=function(e,r,n){try{typeof r=="function"&&r.call(e,n)}catch(t){_e(t)}};function x(e,r){Q.call(this),r=r||{},this.onopen=void 0,this.onmessage=void 0,this.onerror=void 0,this.url=void 0,this.readyState=void 0,this.withCredentials=void 0,this.headers=void 0,this._close=void 0,Pe(this,e,r)}function Me(){return p!=null&&"withCredentials"in p.prototype||L==null?new p:new L}var je=Z!=null&&pe!=null&&"body"in pe.prototype;function Pe(e,r,n){r=String(r);var t=Boolean(n.withCredentials),o=n.lastEventIdQueryParameterName||"lastEventId",a=le(1e3),s=ce(n.heartbeatTimeout,45e3),c="",d=a,f=!1,u=0,i=n.headers||{},l=n.Transport,F=je&&l==null?void 0:new P(l!=null?new l:Me()),z=l!=null&&typeof l!="string"?new l:F==null?new Ce:new me,C=void 0,w=0,A=de,G="",Y="",O="",ee="",m=j,ve=0,B=0,Be=function(h,v,_,S){if(A===M)if(h===200&&_!=null&&Ie.test(_)){A=q,f=Date.now(),d=a,e.readyState=q;var T=new se("open",{status:h,statusText:v,headers:S});e.dispatchEvent(T),U(e,e.onopen,T)}else{var y="";h!==200?(v&&(v=v.replace(/\s+/g," ")),y="EventSource's response has a status "+h+" "+v+" that is not 200. Aborting the connection."):y="EventSource's response has a Content-Type specifying an unsupported type: "+(_==null?"-":_.replace(/\s+/g," "))+". Aborting the connection.",he();var T=new se("error",{status:h,statusText:v,headers:S});e.dispatchEvent(T),U(e,e.onerror,T),console.error(y)}},Xe=function(h){if(A===q){for(var v=-1,_=0;_<h.length;_+=1){var S=h.charCodeAt(_);(S===`
`.charCodeAt(0)||S==="\r".charCodeAt(0))&&(v=_)}var T=(v!==-1?ee:"")+h.slice(0,v+1);ee=(v===-1?ee:"")+h.slice(v+1),h!==""&&(f=Date.now(),u+=h.length);for(var y=0;y<T.length;y+=1){var S=T.charCodeAt(y);if(m===fe&&S===`
`.charCodeAt(0))m=j;else if(m===fe&&(m=j),S==="\r".charCodeAt(0)||S===`
`.charCodeAt(0)){if(m!==j){m===ue&&(B=y+1);var N=T.slice(ve,B-1),I=T.slice(B+(B<y&&T.charCodeAt(B)===" ".charCodeAt(0)?1:0),y);N==="data"?(G+=`
`,G+=I):N==="id"?Y=I:N==="event"?O=I:N==="retry"?(a=ce(I,a),d=a):N==="heartbeatTimeout"&&(s=ce(I,s),w!==0&&(H(w),w=D(function(){K()},s)))}if(m===j){if(G!==""){c=Y,O===""&&(O="message");var V=new Se(O,{data:G.slice(1),lastEventId:Y});if(e.dispatchEvent(V),O==="open"?U(e,e.onopen,V):O==="message"?U(e,e.onmessage,V):O==="error"&&U(e,e.onerror,V),A===$)return}G="",O=""}m=S==="\r".charCodeAt(0)?fe:j}else m===j&&(ve=y,m=ue),m===ue?S===":".charCodeAt(0)&&(B=y+1,m=Re):m===Re&&(m=Ne)}}},Ae=function(h){if(A===q||A===M){A=de,w!==0&&(H(w),w=0),w=D(function(){K()},d),d=le(Math.min(a*16,d*2)),e.readyState=M;var v=new be("error",{error:h});e.dispatchEvent(v),U(e,e.onerror,v),h!=null&&console.error(h)}},he=function(){A=$,C!=null&&(C.abort(),C=void 0),w!==0&&(H(w),w=0),e.readyState=$},K=function(){if(w=0,A!==de){if(!f&&C!=null)Ae(new Error("No activity within "+s+" milliseconds. "+(A===M?"No response received.":u+" chars received.")+" Reconnecting.")),C!=null&&(C.abort(),C=void 0);else{var h=Math.max((f||Date.now())+s-Date.now(),1);f=!1,w=D(function(){K()},h)}return}f=!1,u=0,w=D(function(){K()},s),A=M,G="",O="",Y=c,ee="",ve=0,B=0,m=j;var v=r;if(r.slice(0,5)!=="data:"&&r.slice(0,5)!=="blob:"&&c!==""){var _=r.indexOf("?");v=_===-1?r:r.slice(0,_+1)+r.slice(_+1).replace(/(?:^|&)([^=&]*)(?:=[^&]*)?/g,function(I,V){return V===o?"":I}),v+=(r.indexOf("?")===-1?"?":"&")+o+"="+encodeURIComponent(c)}var S=e.withCredentials,T={};T.Accept="text/event-stream";var y=e.headers;if(y!=null)for(var N in y)Object.prototype.hasOwnProperty.call(y,N)&&(T[N]=y[N]);try{C=z.open(F,Be,Xe,Ae,v,S,T)}catch(I){throw he(),I}};e.url=r,e.readyState=M,e.withCredentials=t,e.headers=i,e._close=he,K()}x.prototype=Object.create(Q.prototype),x.prototype.CONNECTING=M,x.prototype.OPEN=q,x.prototype.CLOSED=$,x.prototype.close=function(){this._close()},x.CONNECTING=M,x.OPEN=q,x.CLOSED=$,x.prototype.withCredentials=void 0;var xe=E;p!=null&&(E==null||!("withCredentials"in E.prototype))&&(xe=x),function(e){{var r=e(ae);r!==void 0&&(W.exports=r)}}(function(e){e.EventSourcePolyfill=x,e.NativeEventSource=E,e.EventSource=xe})})(typeof globalThis>"u"?typeof window<"u"?window:typeof self<"u"?self:Ve:globalThis)})(Qe,ne);const $e={class:"chat flex justify-center"},ze={class:"fixed bottom-0 p-5 w-full grid grid-clos-3"},Ke={class:"col-span-2"},We=["value"],Ze={__name:"index",setup(W){let ae=te("http://43.153.30.133:8989/mschat/chatstream"),g=te("hello ai"),D=te("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"),H=te(123),p=De([]),L=De();const J=()=>{L=new ne.EventSourcePolyfill(`${ae.value}?message=${g.value}?&openapiKey=${D.value}`,{headers:{uid:H.value}}),L.onopen=E=>{console.log(E,"opening")},L.addEventListener("message",function(E){E.data!=="[DONE]"&&p.push(JSON.parse(E.data)),E.data==="[DONE]"&&(L.close(),console.log(p,"ending"))}),L.onerror=function(E){console.log(E,"error")}};return(E,b)=>(Ge(),qe("div",$e,[re("div",ze,[re("div",Ke,[re("input",{class:"border rounded mr-2",type:"text",value:Ue(g),onChange:b[0]||(b[0]=(...oe)=>E.changeMsg&&E.changeMsg(...oe))},null,40,We)]),re("div",{class:"px-4 py-2 col-span-1 text-white select-none rounded bg-purple-600 active:translate-y-1",onClick:J}," chat ")])]))}};export{Ze as default};
