(()=>{var e={9110:(e,t,a)=>{a(9665),a(5231),a(3075),a(548),a(2079),a(8218),a(6046),onmessage=function(e){switch(e.data.operation){case"connect":c();break;case"disconnect":l();break;case"read":f(e.data.data);break;case"stop reading":s.cancel();break;case"write":d(e.data.data);break}};let r,s,o=!1,n=!0;const i=[];async function c(){const e=[{usbVendorId:1155,usbProductId:22336}],t=await navigator.serial.getPorts({filters:e});r=t[0],r.open({baudRate:1}).then((()=>{self.postMessage({operation:"connect",status:1})})).catch((async e=>{if(e.toString().includes("The port is already open"))return await r.close(),c();self.postMessage({operation:"connect",status:0,error:e})}))}function l(){r&&!r.closed&&r.close().then((()=>{self.postMessage({operation:"disconnect",status:1})})).catch((e=>{e.toString().includes("The port is already closed.")||self.postMessage({operation:"disconnect",status:0,error:e})}))}function d(e){i.push(e),n&&p()}async function p(){n=!1;while(i.length){const e=i[0];if(!r.writable)return void self.postMessage({operation:"write",status:0,error:"Writable stream closed"});const t=r.writable.getWriter();if(e.mode.startsWith("cli")){"cli/delimited"===e.mode&&e.data.push("\r\n");const a=new TextEncoder;e.data.forEach((async(r,s)=>{let o=r;e.data[s+1]&&(o=r+"\r\n"),await t.write(a.encode(o).buffer)}))}else{if("raw"!==e.mode)throw new Error("Unknown write mode:",e.mode);await t.write(e.data[0].buffer)}await t.close().then((()=>{i.shift(),self.postMessage({operation:"write/end"}),self.postMessage({operation:"write",status:1})})).catch((e=>{self.postMessage({operation:"write",status:0,error:e})}))}n=!0}async function f(e){try{s=r.readable.getReader()}catch(n){if(self.postMessage({operation:"read",status:0,error:n}),!n.toString().includes("locked to a reader"))throw n}const t=new TextDecoder;let a=new Uint8Array(0);o=!1;while(!o)await s.read().then((({done:r,value:s})=>{if(r)o=!0;else if(e)self.postMessage({operation:e+" output",data:s});else{const e=new Uint8Array(a.length+s.length);e.set(a),e.set(s,a.length),a=e,t.decode(a.slice(-12)).replace(/\s/g,"").endsWith(">:")&&(o=!0,self.postMessage({operation:"read",data:"read",status:1}))}})).catch((e=>{if(!e.toString().includes("The device has been lost."))throw e;o=!0}));await s.cancel().then((()=>{self.postMessage({operation:"read",status:1,data:a})})).catch((e=>{self.postMessage({operation:"read",status:0,error:e})}))}}},t={};function a(r){var s=t[r];if(void 0!==s)return s.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,a),o.exports}a.m=e,a.x=()=>{var e=a.O(void 0,[736],(()=>a(9110)));return e=a.O(e),e},(()=>{var e=[];a.O=(t,r,s,o)=>{if(!r){var n=1/0;for(d=0;d<e.length;d++){for(var[r,s,o]=e[d],i=!0,c=0;c<r.length;c++)(!1&o||n>=o)&&Object.keys(a.O).every((e=>a.O[e](r[c])))?r.splice(c--,1):(i=!1,o<n&&(n=o));if(i){e.splice(d--,1);var l=s();void 0!==l&&(t=l)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[r,s,o]}})(),(()=>{a.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return a.d(t,{a:t}),t}})(),(()=>{a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}})(),(()=>{a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,r)=>(a.f[r](e,t),t)),[]))})(),(()=>{a.u=e=>"js/vendor.436108e3.js"})(),(()=>{a.miniCssF=e=>"css/vendor.66f51cb2.css"})(),(()=>{a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{a.j=110})(),(()=>{a.p="/"})(),(()=>{var e={110:1},t=t=>{var[r,o,n]=t;for(var i in o)a.o(o,i)&&(a.m[i]=o[i]);n&&n(a);while(r.length)e[r.pop()]=1;s(t)};a.f.i=(t,r)=>{e[t]||importScripts(a.p+a.u(t))};var r=globalThis["webpackChunkflipper_xtre_me"]=globalThis["webpackChunkflipper_xtre_me"]||[],s=r.push.bind(r);r.push=t})(),(()=>{var e=a.x;a.x=()=>a.e(736).then(e)})();a.x()})();