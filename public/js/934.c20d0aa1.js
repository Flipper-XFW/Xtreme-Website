(globalThis["webpackChunklab_flipper_net"]=globalThis["webpackChunklab_flipper_net"]||[]).push([[934],{216:(e,t,r)=>{"use strict";r.d(t,{E:()=>i});r(6822),r(4641),r(3269),r(9665);function s(e){if("function"!==typeof Promise)throw new Error("Promise implementation not available in this environment.");const t=[],r=[];function s(e){for(let r=0,s=t.length;r<s;++r)t[r](e);r.push(e)}const a=new Promise((function(t,r){e(t,r,s)}));a.progress=function(e){if("function"!==typeof e)throw new Error("cb is not a function.");for(let t=0,s=r.length;t<s;++t)e(r[t]);return t.push(e),a};const i=a.then;return a.then=function(e,t,r){return i.call(a,e,t),void 0!==r&&a.progress(r),a},a}const a=window||void 0;function i(e){if(!(e instanceof ArrayBuffer))throw new TypeError("arrayBuffer is not an instance of ArrayBuffer.");if(!a.Worker)throw new Error("Worker implementation is not available in this environment.");return new s((function(t,s,a){const i=new Worker(new URL(r.p+r.u(126),r.b)),n=[];i.onerror=function(e){s(e)},i.onmessage=function(e){let r;switch(e=e.data,e.type){case"log":console[e.data.level]("Worker: "+e.data.msg);break;case"extract":r=o(e.data),r.name.endsWith("\0")&&(r.name=r.name.slice(0,-1)),n.push(r),a(r);break;case"complete":i.terminate(),t(n);break;case"error":i.terminate(),s(new Error(e.data.message));break;default:i.terminate(),s(new Error("Unknown message from worker: "+e.type));break}},i.postMessage({type:"extract",buffer:e},[e])}))}const n={blob:{get:function(){return this._blob||(this._blob=new Blob([this.buffer]))}},getBlobUrl:{value:function(){return this._blobUrl||(this._blobUrl=URL.createObjectURL(this.blob))}},readAsString:{value:function(){const e=this.buffer,t=e.byteLength,r=1,s=new DataView(e),a=[];for(let i=0;i<t;++i){const e=s.getUint8(i*r,!0);a.push(e)}return this._string=String.fromCharCode.apply(null,a)}},readAsJSON:{value:function(){return JSON.parse(this.readAsString())}}};function o(e){return Object.defineProperties(e,n),e}},4934:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>le});r(3122);var s=r(9835),a=r(6970),i=r(1957),n=r(9759),o=r.n(n);const l={class:"flex-center column align-items-center"},c={class:"device-screen column"},p={class:"flex"},g={class:"info"},d=(0,s._)("span",null,"Firmware:",-1),f=(0,s._)("span",null,"SD card:",-1),m=(0,s._)("span",null,"Databases:",-1),h=(0,s._)("span",null,"Radio FW:",-1),u={class:"column items-center"},w={class:"flipper"},v=["width","height"],A={key:0,src:o()},b={key:0,class:"flex-center column q-my-xl"},S=(0,s._)("p",null,"Waiting for Flipper...",-1);function E(e,t,r,n,o,E){const k=(0,s.up)("Updater"),y=(0,s.up)("q-spinner"),C=(0,s.up)("q-page");return(0,s.wg)(),(0,s.j4)(C,{class:"flex-center column full-width"},{default:(0,s.w5)((()=>[(0,s._)("div",l,[(0,s.wy)((0,s._)("div",c,[(0,s._)("div",p,[(0,s._)("div",g,[(0,s._)("p",null,[d,(0,s._)("span",null,(0,a.zw)("unknown"!==e.info.firmware_version?e.info.firmware_version:e.info.firmware_commit)+" "+(0,a.zw)(e.info.firmware_build_date),1)]),(0,s._)("p",null,[f,(0,s._)("span",null,(0,a.zw)(e.sdCardUsage),1)]),(0,s._)("p",null,[m,(0,s._)("span",null,(0,a.zw)(e.info.storage_databases_present),1)]),(0,s._)("p",null,[h,(0,s._)("span",null,(0,a.zw)(!1!==e.info.radio_alive?e.info.radio_stack_major+"."+e.info.radio_stack_minor+"."+e.info.radio_stack_sub:"corrupt")+" "+(0,a.zw)(e.radioStackType),1)])]),(0,s._)("div",u,[(0,s._)("div",w,[(0,s.wy)((0,s._)("canvas",{width:128*e.screenScale,height:64*e.screenScale,style:{"image-rendering":"pixelated"},ref:"screenStreamCanvas"},null,8,v),[[i.F8,e.flags.screenStream]]),e.flags.updateInProgress?((0,s.wg)(),(0,s.iD)("img",A)):(0,s.kq)("",!0),(0,s._)("h5",null,(0,a.zw)(e.info.hardware_name),1)])])]),(0,s.Wm)(k,{flipper:e.flipper,rpcActive:e.rpcActive,info:e.info,onUpdate:e.onUpdateStage,onShowNotif:e.passNotif,onLog:e.passLog},null,8,["flipper","rpcActive","info","onUpdate","onShowNotif","onLog"])],512),[[i.F8,e.flags.updateInProgress||e.connected&&null!==e.info&&this.info.storage_databases_present&&e.flags.rpcActive&&e.info.hardware_name]]),e.flags.updateInProgress||e.connected&&null!=e.info&&e.flags.rpcActive&&!e.flags.rpcToggling?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("div",b,[(0,s.Wm)(y,{color:"primary",size:"3em",class:"q-mb-md"}),S]))])])),_:1})}r(6822),r(8727),r(2166);var k=r(499);const y={class:"updater column flex-center text-center"},C={key:0,class:"flex q-mt-sm"},x={key:0},D=(0,s._)("a",{href:"https://update.flipperzero.one"},"qFlipper desktop tool",-1),O={key:1},T=(0,s._)("div",{id:"changelog"},[(0,s._)("br"),(0,s.Uk)("Loading changelog...")],-1);function I(e,t,r,i,n,o){const l=(0,s.up)("q-item-label"),c=(0,s.up)("q-item-section"),p=(0,s.up)("q-item"),g=(0,s.up)("q-select"),d=(0,s.up)("q-btn"),f=(0,s.up)("ProgressBar");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",y,[e.flags.updateInProgress?((0,s.wg)(),(0,s.iD)(s.HY,{key:1},[(0,s._)("p",null,(0,a.zw)(e.updateStage),1),e.flags.updateError?((0,s.wg)(),(0,s.j4)(d,{key:0,flat:"",class:"q-mt-md main-btn",onClick:t[2]||(t[2]=t=>{e.flags.updateInProgress=!1,e.flags.updateError=!1})},{default:(0,s.w5)((()=>[(0,s.Uk)("Cancel")])),_:1})):(0,s.kq)("",!0),e.write.filename.length>0?((0,s.wg)(),(0,s.j4)(f,{key:1,title:e.write.filename,progress:e.write.progress},null,8,["title","progress"])):(0,s.kq)("",!0)],64)):((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[e.flags.ableToUpdate&&e.info.storage_sdcard_present?((0,s.wg)(),(0,s.iD)("div",C,[(0,s.Wm)(g,{modelValue:e.selected,"onUpdate:modelValue":t[0]||(t[0]=t=>e.selected=t),options:e.options,suffix:e.options.find((({label:t})=>t===e.selected.label))?e.options.find((({label:t})=>t===e.selected.label)).date:"",id:"fw-select",style:{width:"210px","border-radius":"14px 14px 14px 0px","border-width":"2px"},"popup-content-style":"width: 210px; height: auto; max-height: 320px; border-radius: 14px 14px 14px 0px; border: 2px solid white;","popup-content-class":"bg-black text-gray-3","options-selected-class":"bg-black text-white",behavior:"menu","menu-self":"center middle","menu-anchor":"center middle",borderless:"","options-dense":"",dark:""},{option:(0,s.w5)((e=>[(0,s.Wm)(p,(0,s.dG)(e.itemProps,{style:{padding:"12px"}}),{default:(0,s.w5)((()=>[(0,s.Wm)(c,{class:"items-start"},{default:(0,s.w5)((()=>[(0,s.Wm)(l,{textContent:(0,a.zw)(e.opt.label),class:"fw-option-label"},null,8,["textContent"])])),_:2},1024),(0,s.Wm)(c,{class:"items-end"},{default:(0,s.w5)((()=>[(0,s.Wm)(l,{textContent:(0,a.zw)(e.opt.date)},null,8,["textContent"])])),_:2},1024)])),_:2},1040)])),_:1},8,["modelValue","options","suffix"]),e.selected?((0,s.wg)(),(0,s.j4)(d,{key:0,onClick:t[1]||(t[1]=t=>e.update()),padding:"12px 30px",class:(0,a.C_)((e.$q.screen.xs?"q-mt-sm":"q-ml-lg")+" main-btn"),flat:""},{default:(0,s.w5)((()=>[(0,s.Uk)("Flash ⚡")])),_:1},8,["class"])):(0,s.kq)("",!0)])):((0,s.wg)(),(0,s.iD)(s.HY,{key:1},[e.info.storage_sdcard_present?((0,s.wg)(),(0,s.iD)("span",x,[(0,s.Uk)("Your firmware doesn't support self-update. Install latest release with "),D,(0,s.Uk)(".")])):((0,s.wg)(),(0,s.iD)("span",O,"Self-update is impossible without an SD card."))],64))],64))]),T],64)}r(8964),r(8170),r(5231),r(7725),r(9212),r(548),r(9359),r(6408);var M=r(216),B=r(8424);async function L(e){const t="https://cloud.cynthialabs.net",r="/public.php/webdav/",s=await fetch(`${t}${r}`,{method:"PROPFIND",headers:{Authorization:"Basic ZldRcEpwd2dLRmVIeHdkOg=="}});if(s.status>=400)throw new Error("Failed to fetch firmware versions ("+s.status+")");const a=await s.text(),i=(new DOMParser).parseFromString(a,"text/xml"),n={};for(const o of i.getElementsByTagName("d:response")){const s=o.getElementsByTagName("d:href")[0].textContent.trim();if(!s.startsWith(r)||!s.endsWith(".tgz"))continue;const a=s.slice(r.length,-".tgz".length),i=`${t}${r}${a}.tgz`,l=a.split("_")[1];n[a]={value:a,label:a.split("_")[0],date:`${l.slice(0,2)}-${l.slice(2,4)}-${l.slice(4)}`,url:i,changelog:null,changelogUrl:`${i.slice(0,-".tgz".length)}.md`,files:[{url:i,target:e,type:"update_tgz"}]}}return n}async function R(e){const t=await fetch(e,{headers:{Authorization:"Basic ZldRcEpwd2dLRmVIeHdkOg=="}}).then((async e=>{if(e.status>=400)throw new Error("Failed to fetch resources ("+e.status+")");const t=await e.arrayBuffer();return j(t)}));return t}function j(e){const t=B.ZP.ungzip(new Uint8Array(e));return(0,M.E)(t.buffer)}function z(e){const t=["Bytes","KiB","MiB","GiB","TiB"];if(0===e)return"n/a";const r=parseInt(Math.floor(Math.log(e)/Math.log(1024)),10);return 0===r?`${e} ${t[r]})`:`${(e/1024**r).toFixed(1)}${t[r]}`}const U={class:"absolute-full flex flex-center"};function F(e,t,r,a,i,n){const o=(0,s.up)("q-badge"),l=(0,s.up)("q-linear-progress");return(0,s.wg)(),(0,s.j4)(l,{rounded:"",size:"2.25rem",value:e.progress,"instant-feedback":!e.interpolated,color:"primary",class:"q-mt-sm q-mb-lg"},{default:(0,s.w5)((()=>[(0,s._)("div",U,[e.title.length>0?((0,s.wg)(),(0,s.j4)(o,{key:0,"text-color":"primary",style:{"background-color":"#222"},label:e.title},null,8,["label"])):(0,s.kq)("",!0)])])),_:1},8,["value","instant-feedback"])}const H=(0,s.aZ)({name:"ProgressBar",props:{title:{type:String,default:""},progress:{type:Number,required:!0},interpolated:{type:Boolean,default:!1}}});var _=r(1639),N=r(8289),P=r(990),W=r(9984),q=r.n(W);const Z=(0,_.Z)(H,[["render",F]]),Q=Z;q()(H,"components",{QLinearProgress:N.Z,QBadge:P.Z});var G=r(2721),V=r.n(G),J=r(5186);const Y=(0,s.aZ)({name:"Updater",components:{ProgressBar:Q},props:{flipper:Object,rpcActive:Boolean,info:Object},setup(){return{flags:(0,k.iH)({restarting:!1,rpcActive:!1,rpcToggling:!1,ableToUpdate:!0,updateInProgress:!1,updateError:!1}),versions:(0,k.iH)({}),selected:(0,k.iH)({label:"Loading...",value:"",version:""}),options:(0,k.iH)([{label:"Loading...",value:"",version:""}]),updateStage:(0,k.iH)(""),write:(0,k.iH)({filename:"",progress:0})}},watch:{async selected(e,t){const r=document.getElementById("changelog");if(!e.changelog){r.innerHTML="<br>Loading changelog...";const t=await fetch(e.changelogUrl,{headers:{Authorization:"Basic ZldRcEpwd2dLRmVIeHdkOg=="}});let s=await t.text();s=s.replaceAll(/^( *)[-*] (.*?)\n/gm,((e,t,r,s,a,i)=>`<li style="padding-left: ${10+(t?10*t.length:0)}px">${r}</li>`));for(let e=5;e>0;e--)s=s.replaceAll(RegExp(`^${"#".repeat(e)} (.*?)\n+`,"gm"),`<h${e}>$1</h${e}>`);s=s.replaceAll(/\[([^\]]+)\]\(([^\)]+)\)/g,'<a target="_blank" href="$2">$1</a>'),s=s.replaceAll(/\*\*(.*?)\*\*/g,"<b>$1</b>"),s=s.replaceAll(/`(.*?)`/g,"<code>$1</code>"),s=s.replaceAll(/^\s*\[\/\/\]:.*?\n+/gm,""),s=s.trimEnd().replaceAll("\n","\n<br>\n"),e.changelog=s}r.innerHTML=e.changelog}},methods:{async update(){this.flags.updateInProgress=!0,this.$emit("update","start"),this.$emit("log",{level:"info",message:"Updater: Update started"}),await this.loadFirmware().catch((e=>{throw this.flags.updateError=!0,this.updateStage=e,this.$emit("showNotif",{message:e.toString(),color:"negative"}),this.$emit("log",{level:"error",message:"Updater: "+e.toString()}),e})),this.flags.updateInProgress=!1},async loadFirmware(){if(this.updateStage="Loading firmware bundle...",this.versions[this.selected.value]&&this.versions[this.selected.value].url){const e=await R(this.versions[this.selected.value].url).catch((e=>{throw this.flags.updateError=!0,this.updateStage=e,this.$emit("showNotif",{message:"Failed to fetch firmware: "+e.toString(),color:"negative"}),this.$emit("log",{level:"error",message:"Updater: Failed to fetch firmware: "+e.toString()}),e})).finally((()=>{this.$emit("log",{level:"debug",message:"Updater: Downloaded firmware from "+this.versions[this.selected.value].url})}));this.updateStage="Loading firmware files",this.$emit("log",{level:"info",message:"Updater: Loading firmware files"});let t="/ext/update/";await this.flipper.commands.storage.stat("/ext/update").catch((async e=>{"ERROR_STORAGE_NOT_EXIST"!==e.toString()?this.rpcErrorHandler(e,"storage.stat"):await this.flipper.commands.storage.mkdir("/ext/update").catch((e=>this.rpcErrorHandler(e,"storage.mkdir"))).finally((()=>{this.$emit("log",{level:"debug",message:"Updater: storage.mkdir: /ext/update"})}))}));for(const r of e){if(0===r.size)t="/ext/update/"+r.name,r.name.endsWith("/")&&(t=t.slice(0,-1)),await this.flipper.commands.storage.mkdir(t).catch((e=>this.rpcErrorHandler(e,"storage.mkdir"))).finally((()=>{this.$emit("log",{level:"debug",message:"Updater: storage.mkdir: "+t})}));else{this.write.filename=r.name.slice(r.name.lastIndexOf("/")+1);const e=this.flipper.emitter.on("storageWriteRequest/progress",(e=>{this.write.progress=e.progress/e.total}));await this.flipper.commands.storage.write("/ext/update/"+r.name,r.buffer).catch((e=>this.rpcErrorHandler(e,"storage.write"))).finally((()=>{this.$emit("log",{level:"debug",message:"Updater: storage.write: /ext/update/"+r.name})})),e()}await(0,J.Z)(300)}this.write.filename="",this.write.progress=0,this.updateStage="Loading manifest...",this.$emit("log",{level:"info",message:"Updater: Loading update manifest"}),await this.flipper.commands.system.update(t+"/update.fuf").catch((e=>this.rpcErrorHandler(e,"system.update"))).finally((()=>{this.$emit("log",{level:"debug",message:"Updater: system.update: OK"})})),this.updateStage="Update in progress, pay attention to your Flipper",this.$emit("log",{level:"info",message:"Updater: Rebooting Flipper"}),await this.flipper.commands.system.reboot(2).catch((e=>this.rpcErrorHandler(e,"system.reboot")))}else this.flags.updateError=!0,this.updateStage="Failed to fetch firmware",this.$emit("showNotif",{message:"Unable to load firmware from the cloud server. Reload the page and try again.",color:"negative",reloadBtn:!0}),this.$emit("log",{level:"error",message:"Updater: Failed to fetch firmware"})},compareVersions(){V().lt(this.info.protobuf_version_major+"."+this.info.protobuf_version_minor+".0","0.6.0")&&(this.flags.ableToUpdate=!1)},rpcErrorHandler(e,t){e=e.toString(),this.$emit("showNotif",{message:`RPC error in command '${t}': ${e}`,color:"negative"}),this.$emit("log",{level:"error",message:`Updater: RPC error in command '${t}': ${e}`})}},async mounted(){this.versions=await L(this.info.hardware_target).catch((e=>{throw this.$emit("showNotif",{message:"Unable to load firmware versions from the cloud server. Reload the page and try again.",color:"negative",reloadBtn:!0}),this.$emit("log",{level:"error",message:"Updater: failed to fetch versions"}),e})),this.compareVersions(),this.options=Object.values(this.versions).sort(((e,t)=>e.value<t.value?1:-1)),this.selected=this.options[0]}});var K=r(7122),X=r(490),$=r(1233),ee=r(3115),te=r(9379);const re=(0,_.Z)(Y,[["render",I]]),se=re;q()(Y,"components",{QSelect:K.Z,QItem:X.Z,QItemSection:$.Z,QItemLabel:ee.Z,QBtn:te.Z});const ae=(0,s.aZ)({name:"PageDevice",props:{flipper:Object,connected:Boolean,rpcActive:Boolean,info:Object},components:{Updater:se},setup(){return{flags:(0,k.iH)({restarting:!1,rpcActive:!1,rpcToggling:!1,screenStream:!1,updateInProgress:!1}),screenScale:(0,k.iH)(1),versions:(0,k.iH)({})}},computed:{radioStackType(){switch(parseInt(this.info.radio_stack_type)){case 1:return"full";case 2:return"BLE_HCI";case 3:return"light";case 4:return"BLE_BEACON";case 5:return"BLE_BASIC";case 6:return"BLE_FULL_EXT_ADV";case 7:return"BLE_HCI_EXT_ADV";case 16:return"THREAD_FTD";case 17:return"THREAD_MTD";case 48:return"ZIGBEE_FFD";case 49:return"ZIGBEE_RFD";case 64:return"MAC";case 80:return"BLE_THREAD_FTD_STATIC";case 81:return"BLE_THREAD_FTD_DYAMIC";case 96:return"802154_LLD_TESTS";case 97:return"802154_PHY_VALID";case 98:return"BLE_PHY_VALID";case 99:return"BLE_LLD_TESTS";case 100:return"BLE_RLV";case 101:return"802154_RLV";case 112:return"BLE_ZIGBEE_FFD_STATIC";case 113:return"BLE_ZIGBEE_RFD_STATIC";case 120:return"BLE_ZIGBEE_FFD_DYNAMIC";case 121:return"BLE_ZIGBEE_RFD_DYNAMIC";case 128:return"RLV";case 144:return"BLE_MAC_STATIC";default:return this.info.radio_stack_type}},sdCardUsage(){return`${z(this.info.storage_sdcard_totalSpace-this.info.storage_sdcard_freeSpace)} / ${z(this.info.storage_sdcard_totalSpace)}`}},watch:{async info(e,t){null!==e&&e.storage_databases_present&&this.connected&&await this.start()}},methods:{async startRpc(){this.flags.rpcToggling=!0;const e=await this.flipper.commands.startRpcSession(this.flipper);if(!e.resolved||e.error)throw this.$emit("showNotif",{message:"Unable to start RPC session. Reload the page or reconnect Flipper manually.",color:"negative",reloadBtn:!0}),this.$emit("log",{level:"error",message:"Device: Couldn't start rpc session"}),new Error("Couldn't start rpc session");this.flags.rpcActive=!0,this.flags.rpcToggling=!1,this.$emit("setRpcStatus",!0),this.$emit("log",{level:"info",message:"Device: RPC started"})},async stopRpc(){this.flags.rpcToggling=!0,await this.flipper.commands.stopRpcSession(),this.flags.rpcActive=!1,this.flags.rpcToggling=!1,this.$emit("setRpcStatus",!1),this.$emit("log",{level:"info",message:"Device: RPC stopped"})},async restartRpc(e){if(this.connected&&this.flags.rpcActive&&!this.flags.restarting||e)return this.flags.restarting=!0,await this.flipper.closeReader(),await(0,J.Z)(300),await this.flipper.disconnect(),await(0,J.Z)(300),await this.flipper.connect(),await this.startRpc(),this.$emit("log",{level:"info",message:"Device: Restarted RPC"}),this.startScreenStream()},async startScreenStream(){await this.flipper.commands.gui.startScreenStreamRequest().catch((e=>this.rpcErrorHandler(e,"gui.startScreenStreamRequest"))).finally((()=>{this.$emit("log",{level:"debug",message:"Device: gui.startScreenStreamRequest: OK"})})),this.flags.screenStream=!0;const e=this.$refs.screenStreamCanvas.getContext("2d");e.lineWidth=1,e.lineCap="square",e.imageSmoothingEnabled=!1,e.fillStyle="#fe8a2b",e.fillRect(0,0,128*this.screenScale,64*this.screenScale),e.fillStyle="black";const t=this.flipper.emitter.on("screen frame",(r=>{for(let t=0;t<128;t++)for(let s=0;s<64;s++){const a=128*Math.floor(s/8)+t,i=7&s;r.at(a)&1<<i?(e.fillStyle="black",e.fillRect(t*this.screenScale,s*this.screenScale,1*this.screenScale,1*this.screenScale)):(e.fillStyle="#fe8a2b",e.fillRect(t*this.screenScale,s*this.screenScale,1*this.screenScale,1*this.screenScale))}const s=this.flipper.emitter.on("stop screen streaming",(()=>{this.flags.screenStream=!1,t(),s()}))}));this.unbindRestart=this.flipper.emitter.on("restart session",(()=>(this.flags.screenStream=!1,this.unbindRestart(),this.restartRpc())))},async stopScreenStream(){await this.flipper.commands.gui.stopScreenStreamRequest().catch((e=>this.rpcErrorHandler(e,"gui.stopScreenStreamRequest"))).finally((()=>{this.$emit("log",{level:"debug",message:"Device: gui.stopScreenStreamRequest: OK"})})),this.flags.screenStream=!1},onUpdateStage(e){this.$emit("update",e),"start"===e?(this.flags.updateInProgress=!0,this.stopScreenStream(),navigator.serial.addEventListener("connect",(()=>{this.$emit("update","end")}))):"end"===e&&this.$emit("update","end")},passNotif(e){this.$emit("showNotif",e)},passLog(e){this.$emit("log",e)},rpcErrorHandler(e,t){e=e.toString(),this.$emit("showNotif",{message:`RPC error in command '${t}': ${e}`,color:"negative"}),this.$emit("log",{level:"error",message:`Device: RPC error in command '${t}': ${e}`})},async start(){this.flags.rpcActive=this.rpcActive,this.rpcActive||(setTimeout((()=>{if(!this.rpcActive)return this.restartRpc(!0)}),1e3),await this.startRpc()),this.flags.screenStream||await this.startScreenStream()}},async mounted(){this.connected&&null!==this.info&&this.info.storage_databases_present&&await this.start(),navigator.serial.addEventListener("disconnect",(e=>{this.flags.rpcActive=!1,this.flags.rpcToggling=!1,this.$emit("setRpcStatus",!1),this.flags.screenStream=!1}))},async beforeUnmount(){this.unbindRestart(),await this.stopScreenStream(),await(0,J.Z)(3e3)}});var ie=r(9885),ne=r(3940);const oe=(0,_.Z)(ae,[["render",E]]),le=oe;q()(ae,"components",{QPage:ie.Z,QSpinner:ne.Z})},9759:e=>{e.exports="data:image/png;base64,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"}}]);