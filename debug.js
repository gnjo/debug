
/*usage
let a={}
a=debug(a,'a')
a.b=100
a.c=300
*/
;(function(root){
 let fn={}
 fn.q=(s,doc=document)=>{return doc.querySelector(s)}
 fn.i3=(d)=>{
  if(typeof d !=='string') return d
  var el=document.createElement('table'); el.innerHTML=d.trim();
  var me=el.childNodes[0]
  el=void 0;
  return me
 }
 fn.a2=function(me,p){p.appendChild(me);return me}
 ;

 let is={}
 is.object = function(obj){var type = typeof obj;return type === 'function' || type === 'object' && !!obj}
 function sniff(o,caller){return new Proxy(o,{ set:(oo,k,v)=>{return caller(oo,k,v),oo[k]=v } }) }
 ;
 let buf=[]
 ;
 function debug(obj,symbol){
  let css=`color:#0f0;position:fixed;right:9px;top:9px;font-size:9px` 
  let el=fn.q('.debug');
  if(!el) el=fn.a2(fn.i3(`<pre class="debug" style="${css}"></pre>`),document.body)
  ;
  symbol=symbol||'$'
  let log=(ary)=>{
   el.textContent=ary.map(d=>d[0]+'>'+d[1]+'='+d[2]).reverse().join('\n')
  }
  let caller=(o,k,v)=>{buf.push([symbol,k,v]),log(buf.slice(-20)) }
  obj=is.object(obj)?sniff(obj,caller):obj
  return obj
 }
 root.debug=debug
})(this);
