/*
 * genData v0.2
 * http://github.com/bemson/genData/
 *
 * Copyright 2011, Bemi Faison
 * Released under the MIT License
 */
function genData(a){var b=arguments,c=b.callee,d=0,e,f=[],g=[],h,i,j=c,k;if(!(this.hasOwnProperty&&this instanceof c)){b[1]&&(f=typeof b[1]=="function"?[b[1]]:b[1]);function l(a){var b=0,c=[a.name,a.value,a.parent,g.length],d,e;while(b<f.length&&e!==!1){d=f[b++].apply(a,c);if(e||e===undefined||d===!1)e=d}return e||e===undefined}function m(a,b,c){this.name=a,this.value=b,this.parent=c}b[2]&&(j=b[2]),m.prototype=j.prototype,m.prototype.constructor=j,h=[["",a]];while(h.length){i=h.pop(),k=new m(i[0],i[1],i[2]);if(l(k)){g.push(k);if(typeof k.value=="object")for(e in k.value)k.value.hasOwnProperty(e)&&h.unshift([e,k.value[e],k])}}return g}if(a!==c){b[1]instanceof Array&&(j=a,b=b[1]),f=f.concat([].slice.call(b));function m(a,b,d){if(!(this.hasOwnProperty&&this instanceof m))return c(a,f.concat(b||[]),d&&d.protoype?d:m);if(a!==c)return new c(m,f.concat([].slice.call(arguments)));return this}m.prototype=new j(c),m.prototype.constructor=m;return m}return this}