!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){let n,r,o,c=!1;function i(){browser.browserAction.setIcon({path:c?{19:"icons/star-filled-19.png",38:"icons/star-filled-38.png"}:{19:"icons/star-empty-19.png",38:"icons/star-empty-38.png"}}),browser.browserAction.setTitle({title:c?"Acceptable":"Not Acceptable"})}function s(e){fetch("http://127.0.0.1:5000/").then(function(e){return e.json()}).then(function(e){r=e}),browser.tabs.query({active:!0,currentWindow:!0}).then(function(e){if(e[0]){let t=!1;n=e[0];for(let e in r){let o=r[e];new RegExp(o).exec(n.url)&&(t=!0,c=!0,i())}0==t&&(c=!1,i())}})}browser.bookmarks.onCreated.addListener(s),browser.bookmarks.onRemoved.addListener(s),browser.tabs.onUpdated.addListener(s),browser.tabs.onActivated.addListener(s),browser.windows.onFocusChanged.addListener(s),s(),document.addEventListener("click",e=>{(function(e="",t={}){return fetch(e,{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrer:"no-referrer",body:JSON.stringify(t)}).then(e=>e.json())})("http://127.0.0.1:5000/post",{url:n.url}).then(function(e){o||(document.getElementById("login-form").style.display="inline",console.log("You are not logged in"))}).catch(e=>console.error(e))}),document.getElementById("myForm").addEventListener("submit",e=>{e.preventDefault();let t=document.forms.myForm.username.value,n=document.forms.myForm.password.value;console.log(t),t&&n&&function(e="",t={}){return fetch(e,{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrer:"no-referrer",body:JSON.stringify(t)}).then(e=>e.json())}("http://127.0.0.1:5000/auth",{usr:t,pswd:n}).then(function(e){console.log(e[1])}).catch(e=>console.error(e))})}]);