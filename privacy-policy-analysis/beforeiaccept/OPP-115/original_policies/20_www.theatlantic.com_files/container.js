(function(d,e){var h,m;h=function(d){d.a={A:"edge.simplereach.com",B:"d8rk54i4mohrb.cloudfront.net",Y:"/n",Ea:"/t",Ta:"/event",u:"/pixel?bad=true&error=",V:"/iframe.html",D:"/container.html",Ca:"000000000000000000000000",za:"SPR-ERROR: ",Sa:"100 - Missing url",pa:"__reach_config",s:"cache_buster",ua:"__srret",Ka:"__srui",i:"0",ea:"1",F:"img",M:"1px",width:"width",N:e.location.protocol,c:"undefined",error:"error",J:"off",info:"info",h:"SPR_DEBUG",O:"//",l:"string",referrer:"referrer",uid:"uid",v:"callback",$:"jsonp",url:"url",
title:"title",ja:"pid",va:"s",r:"r",t:"t",e:"e",x:"x",n:"n",W:"ignore_errors",ka:"preview",m:"authors",C:"channels",Ba:"tags",Fa:"date",X:"inframe",U:"iframe",Da:"custom_tracking",qa:"reach_tracking",ra:"ref_url",fa:"page_url",La:"user_id",da:"manual_scroll_depth",ya:"content_height",la:"rd",P:"fb",Ia:"de",aa:"li",Ga:"tw",ga:"pi",Aa:"csd",R:"api.facebook.com",Na:"feeds.delicious.com",Ha:"cdn.api.twitter.com",ba:"www.linkedin.com",ha:"partners-api.pinterest.com",ma:"www.reddit.com",T:"/restserver.php",
na:"/api/info.json",Ra:"/v2/json/urlinfo/data",Ja:"/1/urls/count.json",ca:"/countserv/count/share",ia:"/v1/urls/count.json",S:"links.getStats",Z:"["+this.error+"] Invalid amount please send scroll depths of only: 25, 50, 75 or 100",xa:"[info] sending scrollDepth of: ",wa:"[info] scroll depth not activated, not sending data"};return d}({});m=function(e,k){var g=e.a;k.a={C:function(){return Math.floor(8675309*Math.random())},I:function(a){return Array.isArray?Array.isArray(a):"[object Array]"===Object.prototype.toString.call(a)},
log:function(a){d.console&&console.log(a)},v:function(a){return"[object String]"===Object.prototype.toString.call(a)},D:function(a){var b={},f;for(f in a)a.hasOwnProperty(f)&&(b[f]=a[f]);return b},B:function(a,b){for(var f in b)b.hasOwnProperty(f)&&(a[f]=b[f]);return a},contains:function(a,b){return-1!==(a.join(",")+",").indexOf(b.toString()+",")},m:function(a){typeof a===g.l&&(a=a.split(","));if(this.I(a)){for(var b=0;b<a.length;b+=1)typeof a[b]===g.l&&(a[b]=a[b].replace(/^\s*/,"").replace(/\s*$/,
"").replace(/\|/,""));return a.join("|")}},g:function(){},s:function(){return d.location.protocol+"//"}};return k}(h,{});h=function(e,d){var g=e.a;d.a={fetchContainer:function(a){g.o("//edge.simplereach.com/x?"+a,"x")}};return d}(function(h,k,g){var a=h.a,b=k.a,b={c:"undefined",info:"info"};g.a={i:0,w:{x:0,y:0},H:!0,G:function(){function f(){l.H=e[g]?!1:!0}function a(){l.flush();d.removeEventListener("DOMContentLoaded",a,!1)}function c(){/loaded|interactive|complete/.test(e.readyState)&&(e.detachEvent("onreadystatechange",
c),k&&(k=!1,l.flush()))}var l=this,g,h;l.i=0;this.K(d,"mousemove",function(f){l.w={x:f.clientX,y:f.clientY}});typeof e.hidden!==b.c?(g="hidden",h="visibilitychange"):typeof e.mozHidden!==b.c?(g="mozHidden",h="mozvisibilitychange"):typeof e.msHidden!==b.c?(g="msHidden",h="msvisibilitychange"):typeof e.webkitHidden!==b.c&&(g="webkitHidden",h="webkitvisibilitychange");typeof e.addEventListener!==b.c&&typeof g!==b.c&&e.addEventListener(h,f,!1);var k=!0;d.addEventListener?d.addEventListener("DOMContentLoaded",
a,!1):e.attachEvent&&e.attachEvent("onreadystatechange",c)},o:function(f,n){var c=e.createElement("iframe"),d=e.body;c.setAttribute("name","spr");c.src=f;c.setAttribute("height","1");c.setAttribute("width","1");c.setAttribute("visible","false");c.setAttribute("id","spr-iframe-"+n);c.style.display="none";d||(d=this.b("BODY")[0]);d||(d=this.b("HEAD")[0]);a[b.info](f);d.appendChild(c);return c},sa:function(){for(var f=this.b("link"),a=this.b("meta"),c=0;c<f.length;c+=1)if("canonical"===f[c].rel)return f[c].href;
for(;c<a.length;c+=1)if("og:url"===a[c].getAttribute("property")||"twitter:url"===a[c].getAttribute("name"))return a[c].content;return!1},ta:function(f){for(var a=this.b("meta"),c=0;c<a.length;c+=1)if("og:title"===a[c].getAttribute("property")||"twitter:title"===a[c].getAttribute("name"))return a[c].content;return e.title||f||!1},Ma:function(a){var b=e.body,c=this.b("BODY")[0],d=this.b("HEAD")[0];b&&b.contains(a)?b.removeChild(a):c&&c.contains(a)?c.removeChild(a):d&&d.contains(a)&&d.removeChild(a)},
oa:function(f){var d=this,c=e.createElement("script");c.type="text/javascript";c.setAttribute("async",!0);c.setAttribute("name","spr");c.setAttribute("id","spr-script");c.src=f;a[b.info](f);this.L(function(){setTimeout(function(){d.b("HEAD")[0].appendChild(c)},1)});return c},f:[],ready:/loaded|interactive|complete/.test(e.readyState),flush:function(){var a=this.f.shift();for(this.ready=!0;a;)a(),a=this.f.shift()},L:function(a){this.ready?(this.f.push(a),this.flush()):e.documentElement.doScroll?d.self===
d.top?function(){if(!e.uniqueID&&e.expando)return this.f.push(a);try{e.documentElement.doScroll("left"),a()}catch(b){setTimeout(arguments.callee,0)}}():this.f.push(a):this.f.push(a)},K:function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c);return a},J:function(a,b,c){a.addEventListener?a.removeEventListener(b,c,!1):a.detachEvent("on"+b,c);return a},Oa:function(){var a=0,a=d.pageYOffset?d.pageYOffset:e.documentElement?e.documentElement.scrollTop:0;return a-this.i},b:function(a){var b=
[],c,d=0,g;if(!a)return[];if("string"!==typeof a)return[a];switch(a.charAt(0)){case "#":b.push(e.getElementById(a.substring(1)));break;case ".":c=e.getElementsByTagName("*");for(g=" "+a.substring(1)+" ";d<c.length;d+=1)a=(" "+c[d].className+" ").replace(/[\n\t\r]/g," "),-1<a.indexOf(g)&&b.push(c[d]);break;default:b=e.getElementsByTagName(a)}return b}};return g}(function(h,k,g){var a=h.a,b=k.a;g.a={j:!1,info:b.g,error:b.log,G:function(){d[a.h]&&(this.j=!0,d[a.h][a.info]&&(this[a.info]=d[a.h][a.info]),
d[a.h][a.error]&&(this[a.error]=d[a.h][a.error]))},reset:function(){this.j=!1;this[a.info]=b.g;this[a.info]=b.log},Pa:function(b){var d=e.createElement(a.F);d.src=a.N+a.O+a.A+a.u+b.message;d.setAttribute(a.width,a.M);e.body?e.body.appendChild(d):e.head.appendChild(d)},Qa:function(d){d===a.info?(this[a.info]=b.log,this[a.error]=b.log):d===a.error?(this[a.info]=b.g,this[a.error]=b.log):(this[a.info]=b.g,this[a.error]=b.g)}};return g}(h,m,{}),h,{}),{});d.SPR=h.a})(window,document);
