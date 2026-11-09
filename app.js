(function(){
'use strict';
var TITLE='Aabha Jewels';
var CATS=['Earrings','Necklaces','Bracelets','Rings','Anklets','Sets'];
var TAGS=['','New','Hot Selling','Best Seller','Limited'];
var S={settings:{name:'',tagline:'',announce:'',freeShip:0,shipFee:0,codFee:0,couponCode:'',couponPct:0},collections:[],products:[]};
var $=function(s,r){return (r||document).querySelector(s)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var inr=function(n){return '\u20B9'+Number(n).toLocaleString('en-IN')};
function lget(k,d){try{var v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}}
function lset(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}

var ui={cat:'all',col:'all',q:'',sort:'new',search:false,modal:null,pid:null,img:0,qty:1,
  cart:lget('aj-cart',[]),wish:lget('aj-wish',[]),coupon:lget('aj-coupon',false),pay:'upi',
  isAdmin:false,dirty:false,adm:{tab:'add',edit:null,photos:[],colPhoto:''},err:'',last:null};

/* ---------- icons ---------- */
var IC={
 bag:'<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
 heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.600-7 10-7 10z"/>',
 search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.500 4.500"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>',
 truck:'<path d="M2 6h11v10H2zM13 10h4l3 3v3h-7"/><circle cx="7" cy="17.500" r="1.800"/><circle cx="17" cy="17.500" r="1.800"/>',
 ret:'<path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="M8 5L4 9l4 4"/>',
 cod:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.500"/>',
 shield:'<path d="M12 3l7 3v5c0 4.500-3 8-7 10-4-2-7-5.500-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
 check:'<path d="M5 12.500l4.500 4.500L19 7"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.600 5.600l2.100 2.100M16.300 16.300l2.100 2.100M5.600 18.400l2.100-2.100M16.300 7.700l2.100-2.100"/>'
};
function ic(n,c){return '<svg class="ic '+(c||'')+'" viewBox="0 0 24 24" aria-hidden="true">'+IC[n]+'</svg>'}

/* ---------- generated jewellery illustrations (used until real photos are added) ---------- */
var gid=0;
var METAL={gold:['#f8e09c','#c4912a'],silver:['#f7f8fb','#9fa7b5'],rose:['#f9d3c4','#cf8870']};
var STONE={ruby:'#c2185b',emerald:'#1f8a5b',sapphire:'#2b5fb3',amethyst:'#7b4bb5',pearl:'#f6efe5',none:null};
var BG={ruby:['#ffe6ee','#f6b9cd'],emerald:['#e3f5ec','#b4dfc7'],sapphire:['#e5edfc','#b8cdf2'],amethyst:['#f0e7fb','#cfb9ec'],pearl:['#fcf2ea','#efd8c5'],none:['#fdeee8','#f1cfc2']};
function art(a){
 var id='g'+(++gid),m=METAL[a.metal]||METAL.gold,st=STONE[a.stone],bg=BG[a.stone]||BG.none,M='url(#'+id+'m)',G='url(#'+id+'s)';
 function gem(x,y,r){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(st?G:M)+'" stroke="'+M+'" stroke-width="2.500"/><circle cx="'+(x-r*.3)+'" cy="'+(y-r*.35)+'" r="'+(r*.22)+'" fill="#fff" opacity=".85"/>'}
 function ear(x,s){return '<g transform="translate('+x+' 0) scale('+s+')"><path d="M0 40V62" stroke="'+M+'" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="0" cy="68" r="6" fill="'+M+'"/><path d="M0 74V86" stroke="'+M+'" stroke-width="3"/><path d="M0 86C22 108 20 140 0 152C-20 140 -22 108 0 86Z" fill="'+M+'"/>'+gem(0,119,11)+'</g>'}
 function neck(y,s){return '<g transform="translate(0 '+y+') scale(1 '+s+')"><path d="M34 36Q100 232 166 36" fill="none" stroke="'+M+'" stroke-width="2.500"/><path d="M34 36Q100 232 166 36" fill="none" stroke="'+M+'" stroke-width="6" stroke-dasharray="1.500 6" stroke-linecap="round"/></g>'+'<g transform="translate(100 '+(y+133*s)+')"><circle r="21" fill="'+M+'"/>'+gem(0,0,13)+'<path d="M-6 -22l6-10 6 10z" fill="'+M+'"/></g>'}
 var body='';
 switch(a.cat){
  case 'Earrings': body=ear(66,1)+ear(134,1);break;
  case 'Necklaces': body=neck(0,1);break;
  case 'Bracelets':
   body='<ellipse cx="100" cy="124" rx="72" ry="46" fill="none" stroke="'+M+'" stroke-width="8"/><ellipse cx="100" cy="124" rx="72" ry="46" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="3 7"/>';
   for(var i=0;i<9;i++){var an=i/9*Math.PI*2;body+=gem((100+72*Math.cos(an)).toFixed(1),(124+46*Math.sin(an)).toFixed(1),6.500)}break;
  case 'Rings':
   body='<circle cx="100" cy="144" r="44" fill="none" stroke="'+M+'" stroke-width="10"/><circle cx="100" cy="144" r="44" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2" stroke-dasharray="2 9"/><path d="M82 104l18-24 18 24z" fill="'+M+'"/>'+gem(100,90,17);break;
  case 'Anklets':
   body='<path d="M12 112Q42 78 72 112T132 112T188 112" fill="none" stroke="'+M+'" stroke-width="3"/><path d="M12 112Q42 78 72 112T132 112T188 112" fill="none" stroke="'+M+'" stroke-width="7" stroke-dasharray="1.500 7" stroke-linecap="round"/>';
   [58,100,142].forEach(function(x,k){var y=112+(k===1?0:0);body+='<path d="M'+x+' '+(k===1?112:112)+'V'+(y+22)+'" stroke="'+M+'" stroke-width="2.500"/>'+gem(x,y+34,12)});break;
  case 'Sets':
   body=neck(-12,.62)+ear(62,.55).replace('translate(62 0)','translate(62 112)')+ear(138,.55).replace('translate(138 0)','translate(138 112)');break;
  default: body=gem(100,120,30);
 }
 var sp='';[[28,34,7],[172,60,5],[160,208,8],[36,196,5]].forEach(function(p){sp+='<path d="M'+p[0]+' '+(p[1]-p[2])+'Q'+p[0]+' '+p[1]+' '+(p[0]+p[2])+' '+p[1]+'Q'+p[0]+' '+p[1]+' '+p[0]+' '+(p[1]+p[2])+'Q'+p[0]+' '+p[1]+' '+(p[0]-p[2])+' '+p[1]+'Q'+p[0]+' '+p[1]+' '+p[0]+' '+(p[1]-p[2])+'Z" fill="#fff" opacity=".85"/>'});
 return '<svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label="'+esc(a.cat)+' illustration"><defs><linearGradient id="'+id+'m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+m[0]+'"/><stop offset="1" stop-color="'+m[1]+'"/></linearGradient><radialGradient id="'+id+'s" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".4" stop-color="'+(st||'#fff')+'"/><stop offset="1" stop-color="'+(st||m[1])+'"/></radialGradient><linearGradient id="'+id+'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+bg[0]+'"/><stop offset="1" stop-color="'+bg[1]+'"/></linearGradient></defs><rect width="200" height="240" fill="url(#'+id+'b)"/>'+sp+body+'</svg>';
}
function pic(p,i){i=i||0;if(p.photos&&p.photos.length){return '<img src="'+p.photos[Math.min(i,p.photos.length-1)]+'" alt="'+esc(p.name)+'" loading="lazy">'}return art(p)}
function colById(id){return S.collections.filter(function(c){return c.id===id})[0]}
function prodById(id){return S.products.filter(function(p){return p.id===id})[0]}
function newestCol(){return S.collections.slice().sort(function(a,b){return b.created.localeCompare(a.created)})[0]}
function isNew(p){return p.tag==='New'}
function pct(p){return p.mrp>p.price?Math.round((1-p.price/p.mrp)*100):0}

/* ---------- cart maths ---------- */
function cartLines(){return ui.cart.map(function(l){var p=prodById(l.id);return p?{p:p,q:l.q}:null}).filter(Boolean)}
function totals(){
 var st=S.settings,ls=cartLines(),sub=0,n=0;ls.forEach(function(l){sub+=l.p.price*l.q;n+=l.q});
 var disc=ui.coupon?Math.round(sub*st.couponPct/100):0, after=sub-disc;
 var ship=(n===0||after>=st.freeShip)?0:st.shipFee, cod=ui.pay==='cod'&&n?st.codFee:0;
 return {lines:ls,n:n,sub:sub,disc:disc,after:after,ship:ship,cod:cod,total:after+ship+cod};
}
function saveCart(){lset('aj-cart',ui.cart);lset('aj-wish',ui.wish);lset('aj-coupon',ui.coupon)}

/* ---------- page ---------- */
function visible(){
 var q=ui.q.trim().toLowerCase();
 var l=S.products.filter(function(p){return (ui.cat==='all'||p.cat===ui.cat)&&(ui.col==='all'||p.col===ui.col)&&(!q||(p.name+' '+p.cat+' '+p.mat).toLowerCase().indexOf(q)>-1)});
 var s=ui.sort;
 l.sort(function(a,b){return s==='low'?a.price-b.price:s==='high'?b.price-a.price:s==='off'?pct(b)-pct(a):b.created.localeCompare(a.created)||a.id.localeCompare(b.id)});
 return l;
}
function card(p){
 var o=p.stock<=0, w=ui.wish.indexOf(p.id)>-1, tag=o?'Sold out':p.tag;
 return '<article class="card"><div style="position:relative"><button class="pimg" data-act="open" data-id="'+p.id+'" aria-label="View '+esc(p.name)+'">'+pic(p,0)+(p.photos&&p.photos[1]?'<img src="'+p.photos[1]+'" alt="" loading="lazy">':'')+(tag?'<span class="tag'+(o?' sold':'')+'">'+esc(tag)+'</span>':'')+'</button><button class="heart'+(w?' on':'')+'" data-act="wish" data-id="'+p.id+'" aria-label="Save to wishlist" aria-pressed="'+w+'">'+ic('heart')+'</button></div><h3>'+esc(p.name)+'</h3><div class="price"><b>'+inr(p.price)+'</b>'+(pct(p)?'<s>'+inr(p.mrp)+'</s><em>'+pct(p)+'% off</em>':'')+'</div>'+(p.stock>0&&p.stock<=5?'<div class="low">Only '+p.stock+' left</div>':'')+'<button class="btn block" data-act="add" data-id="'+p.id+'"'+(o?' disabled':'')+'>'+(o?'Sold out':'Add to cart')+'</button></article>';
}
function gridHtml(){var l=visible();return l.length?l.map(card).join(''):'<div class="empty" style="grid-column:1/-1">Nothing matches that search. Try another category or clear the search.</div>'}
function header(){
 var st=S.settings,n=ui.cart.reduce(function(a,l){return a+l.q},0);
 var sale=st.announce?'<div class="sale"><span>'+esc(st.announce)+'</span><span class="cd" id="cd" aria-label="Sale countdown"></span></div>':'';
 var cols=S.collections.slice().sort(function(a,b){return b.created.localeCompare(a.created)}).slice(0,3);
 return sale+(ui.isAdmin?'<div class="adminbar"><span>'+(ui.dirty?'You have unpublished changes.':'Owner view. Changes you make here go live when you publish.')+'</span><button class="btn" data-act="admin">'+ic('gear')+' Manage store</button><button class="btn ghost" style="color:var(--bg);border-color:var(--bg)" data-act="logout">Sign out</button>'+(ui.dirty?'<button class="btn ghost" style="color:var(--bg);border-color:var(--bg)" data-act="publish">Publish changes</button>':'')+'</div>':'')+
 '<header class="top"><div class="hrow"><button class="logo" data-act="home" aria-label="Home">'+esc(st.name.split(' ')[0])+' <i>'+esc(st.name.split(' ').slice(1).join(' ')||'')+'</i></button><nav class="nav" aria-label="Shop">'+CATS.slice(0,4).map(function(c){return '<button data-act="cat" data-v="'+c+'">'+c+'</button>'}).join('')+cols.map(function(c){return '<button data-act="col" data-v="'+c.id+'">'+esc(c.name)+'</button>'}).slice(0,1).join('')+'</nav>'+
 '<button class="icon-btn" data-act="togsearch" aria-label="Search">'+ic('search')+'</button><button class="icon-btn" data-act="wishview" aria-label="Wishlist">'+ic('heart')+(ui.wish.length?'<span class="badge">'+ui.wish.length+'</span>':'')+'</button><button class="icon-btn" data-act="cart" aria-label="Cart">'+ic('bag')+(n?'<span class="badge">'+n+'</span>':'')+'</button></div><div class="searchbar'+(ui.search?' on':'')+'"><input id="q" type="search" placeholder="Search earrings, necklaces, gifts" value="'+esc(ui.q)+'" data-on="search" aria-label="Search products"></div></header>';
}
function hero(){
 var c=newestCol(),st=S.settings;
 if(!c)return '<div class="hero"><div><div class="eyebrow">Welcome</div><h1>'+esc(st.name)+'</h1><p>'+esc(st.tagline)+'</p><button class="btn" data-act="shop">Shop now</button></div></div>';
 var ps=S.products.filter(function(p){return p.col===c.id});var t=ps.slice(0,3);
 var days=Math.max(0,Math.round((Date.now()-new Date(c.created+'T00:00:00'))/864e5));
 return '<div class="hero"><div><div class="eyebrow">'+(days<=21?'Just arrived':'Latest collection')+' \u00B7 '+ps.length+' pieces</div><h1>'+esc(c.name)+'</h1><p>'+esc(c.blurb)+'</p><div class="row"><button class="btn" data-act="col" data-v="'+c.id+'">Shop the collection</button><button class="btn ghost" data-act="shop">See everything</button></div></div>'+(st.heroPhoto?'<div class="model"><img src="'+st.heroPhoto+'" alt="Model wearing gold temple jewellery"><span><em style="font-style:normal">'+esc(c.name)+'</em><b>'+ps.length+' pieces</b></span></div>':'<div class="stack" aria-hidden="true">'+t.map(function(p){return '<div class="tile">'+pic(p,0)+'</div>'}).join('')+'</div>')+'</div>';
}
function page(){
 var st=S.settings,cols=S.collections.slice().sort(function(a,b){return b.created.localeCompare(a.created)});
 var wa=st.whatsapp?'<span>WhatsApp: <b>+'+esc(st.whatsapp)+'</b></span>':'';
 return header()+'<main class="wrap">'+hero()+
 '<div class="trust"><div>'+ic('truck')+'<p style="margin:0">Free shipping<span>On orders above '+inr(st.freeShip)+'</span></p></div><div>'+ic('ret')+'<p style="margin:0">Easy returns<span>7 days, no questions</span></p></div><div>'+ic('cod')+'<p style="margin:0">Cash on delivery<span>Available for '+inr(st.codFee)+' extra</span></p></div><div>'+ic('shield')+'<p style="margin:0">Anti-tarnish<span>Skin-safe finish</span></p></div></div>'+
 (cols.length?'<section class="blk" id="collections"><div class="sh"><div><div class="eyebrow">Collections</div><h2>Shop by drop</h2></div></div><div class="cols">'+cols.map(function(c){var f=S.products.filter(function(p){return p.col===c.id})[0];var n=S.products.filter(function(p){return p.col===c.id}).length;return '<button class="col" data-act="col" data-v="'+c.id+'"><div class="cv">'+(c.photo?'<img src="'+c.photo+'" alt="">':f?pic(f,0):'')+'</div><div class="tx"><h3>'+esc(c.name)+'</h3><p>'+n+' pieces</p></div></button>'}).join('')+'</div></section>':'')+
 '<section class="blk" id="shop"><div class="sh"><div><div class="eyebrow">The shop</div><h2>'+(ui.col!=='all'&&colById(ui.col)?esc(colById(ui.col).name):'All jewellery')+'</h2></div></div>'+
 '<div class="chips" id="chips">'+chips()+'</div><div class="tools"><span id="count" style="color:var(--muted);font-size:13px"></span><select id="sort" class="field" data-on="sort" aria-label="Sort"><option value="new"'+(ui.sort==='new'?' selected':'')+'>Newest first</option><option value="low"'+(ui.sort==='low'?' selected':'')+'>Price: low to high</option><option value="high"'+(ui.sort==='high'?' selected':'')+'>Price: high to low</option><option value="off"'+(ui.sort==='off'?' selected':'')+'>Biggest discount</option></select></div><div class="grid" id="grid">'+gridHtml()+'</div></section></main>'+
 '<div class="promise"><div class="wrap"><div><div class="eyebrow">Our promise</div><h2>Made to be worn, gifted and loved</h2><p style="margin-top:10px">'+esc(st.tagline)+'.</p></div><div>'+
 [['How can I track my order?','Once your order ships you get a tracking link on WhatsApp or SMS. Orders usually leave in 1 to 2 working days.'],['Do you accept returns or exchanges?','Yes. Raise a request within 7 days of delivery with the item unworn and in its box.'],['Is the jewellery suitable for sensitive skin?','Pieces have an anti-tarnish coating and nickel-free posts. Keep them dry and away from perfume to make them last.'],['How do I pay?','Pay by UPI or choose cash on delivery. Your order is confirmed once we message you on WhatsApp.']].map(function(f){return '<details class="acc"><summary>'+f[0]+'</summary><div>'+f[1]+'</div></details>'}).join('')+'</div></div></div>'+
 '<footer class="wrap"><div><div class="logo" style="padding:0">'+esc(st.name)+'</div><p style="margin:8px 0 0">'+esc(st.tagline)+'.</p></div><div><h4>Shop</h4>'+CATS.map(function(c){return '<button class="lk" data-act="cat" data-v="'+c+'">'+c+'</button>'}).join('')+'</div><div><h4>Contact</h4>'+(wa||'<span>Add your contact details in Manage store.</span>')+(st.instagram?'<br><span>Instagram: @'+esc(st.instagram)+'</span>':'')+'<p style="margin:14px 0 0;font-size:12px">\u00A9 '+new Date().getFullYear()+' '+esc(st.name)+'</p><button class=\"lk\" data-act=\"login\" style=\"margin-top:6px;font-size:12px;opacity:.6\">Owner login</button></div></footer>';
}
function chips(){return '<button class="chip'+(ui.cat==='all'?' on':'')+'" data-act="cat" data-v="all">All</button>'+CATS.map(function(c){return '<button class="chip'+(ui.cat===c?' on':'')+'" data-act="cat" data-v="'+c+'">'+c+'</button>'}).join('')+(ui.col!=='all'?'<button class="chip on" data-act="col" data-v="all">'+esc((colById(ui.col)||{}).name||'')+' \u2715</button>':'')}
function renderPage(keepScroll){var y=window.scrollY;$('#root').innerHTML=page();updCount();tick();if(keepScroll)window.scrollTo(0,y)}
function updCount(){var c=$('#count');if(c)c.textContent=visible().length+' pieces'}
function refreshGrid(){$('#grid').innerHTML=gridHtml();$('#chips').innerHTML=chips();updCount()}

/* ---------- countdown ---------- */
function tick(){
 var el=$('#cd');if(!el)return;var end=new Date(S.settings.saleEnds).getTime(),d=end-Date.now();
 if(!end||isNaN(end)||d<=0){el.textContent='';return}
 var h=Math.floor(d/36e5),m=Math.floor(d%36e5/6e4),s=Math.floor(d%6e4/1e3),dd=Math.floor(h/24);h=h%24;var z=function(n){return String(n).padStart(2,'0')};
 el.innerHTML=(dd?'<b>'+dd+'d</b>':'')+'<b>'+z(h)+'h</b><b>'+z(m)+'m</b><b>'+z(s)+'s</b>';
}
setInterval(tick,1000);

/* ---------- overlays ---------- */
function toast(t){var e=$('#toast');e.textContent=t;e.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(function(){e.hidden=true},2600)}
function closeModal(){ui.modal=null;$('#overlay').innerHTML='';document.body.classList.remove('lock')}
function showOverlay(html){$('#overlay').innerHTML=html;document.body.classList.add('lock')}
function head(t){return '<div class="shead"><h2>'+t+'</h2><button class="icon-btn" data-act="close" aria-label="Close">'+ic('x')+'</button></div>'}

function productModal(){
 var p=prodById(ui.pid);if(!p)return closeModal();
 var o=p.stock<=0,imgs=(p.photos&&p.photos.length)?p.photos:[null];
 var main=imgs[ui.img]?'<img src="'+imgs[ui.img]+'" alt="'+esc(p.name)+'">':art(p);
 var rel=S.products.filter(function(x){return x.id!==p.id&&(x.cat===p.cat||x.col===p.col)}).slice(0,4);
 var c=colById(p.col);
 showOverlay('<div class="scrim" data-act="close"></div><section class="sheet modal" role="dialog" aria-modal="true" aria-label="'+esc(p.name)+'"><div style="text-align:right"><button class="icon-btn" style="margin-left:auto" data-act="close" aria-label="Close">'+ic('x')+'</button></div><div class="pd"><div class="gal"><div class="main">'+main+'</div>'+(imgs.length>1?'<div class="thumbs">'+imgs.map(function(s,i){return '<button class="'+(i===ui.img?'on':'')+'" data-act="img" data-v="'+i+'" aria-label="Photo '+(i+1)+'"><img src="'+s+'" alt=""></button>'}).join('')+'</div>':'')+'</div><div><div class="eyebrow">'+esc(p.cat)+(c?' \u00B7 '+esc(c.name):'')+'</div><h2>'+esc(p.name)+'</h2><div class="price"><b>'+inr(p.price)+'</b>'+(pct(p)?'<s>'+inr(p.mrp)+'</s><em>'+pct(p)+'% off</em>':'')+'</div><p style="color:var(--muted);margin:10px 0">'+esc(p.desc)+'</p>'+(p.stock>0&&p.stock<=5?'<div class="low">Only '+p.stock+' left</div>':'')+
 '<div class="actions" style="align-items:center"><div class="qty"><button data-act="mq" data-v="-1" aria-label="Less">\u2212</button><span id="mq">'+ui.qty+'</span><button data-act="mq" data-v="1" aria-label="More">+</button></div></div><div class="actions" style="margin-top:0"><button class="btn ghost" data-act="addq" data-id="'+p.id+'"'+(o?' disabled':'')+'>'+(o?'Sold out':'Add to cart')+'</button><button class="btn" data-act="buy" data-id="'+p.id+'"'+(o?' disabled':'')+'>Buy now</button></div>'+
 '<div class="perks"><div>'+ic('truck')+'Free shipping above '+inr(S.settings.freeShip)+'</div><div>'+ic('ret')+'7-day easy returns</div><div>'+ic('shield')+'Anti-tarnish, skin-safe finish</div></div>'+
 '<details class="acc" open><summary>Material and care</summary><div>'+esc(p.mat||'')+'. Keep dry, store in the box, and put jewellery on after perfume.</div></details><details class="acc"><summary>Product code</summary><div>'+esc(p.sku||'')+'</div></details></div></div>'+
 (rel.length?'<h3 style="font-size:26px;margin:22px 0 12px">You may also like</h3><div class="grid">'+rel.map(card).join('')+'</div>':'')+'</section>');
 ui.modal='product';
}
function cartDrawer(){
 var t=totals(),st=S.settings,left=Math.max(0,st.freeShip-t.after);
 var body=t.lines.length?t.lines.map(function(l){return '<div class="ci"><div class="th">'+pic(l.p,0)+'</div><div><h4>'+esc(l.p.name)+'</h4><div class="price"><b>'+inr(l.p.price)+'</b></div><button class="rm" data-act="rm" data-id="'+l.p.id+'">Remove</button></div><div class="qty"><button data-act="cq" data-id="'+l.p.id+'" data-v="-1" aria-label="Less">\u2212</button><span>'+l.q+'</span><button data-act="cq" data-id="'+l.p.id+'" data-v="1" aria-label="More">+</button></div></div>'}).join(''):'<div class="empty" style="margin-top:20px">Your cart is empty.<br><br><button class="btn" data-act="shop">Start shopping</button></div>';
 showOverlay('<div class="scrim" data-act="close"></div><aside class="sheet drawer" role="dialog" aria-modal="true" aria-label="Cart">'+head('Your cart')+(t.lines.length?'<div class="fship">'+(left>0?'Add '+inr(left)+' more for free shipping':'You have free shipping')+'<div class="bar"><i style="width:'+Math.min(100,Math.round(t.after/st.freeShip*100))+'%"></i></div></div>':'')+'<div>'+body+'</div>'+(t.lines.length?'<div class="cfoot"><div class="coupon"><input id="cp" class="field" placeholder="Coupon code" aria-label="Coupon code" value="'+(ui.coupon?esc(st.couponCode):'')+'"><button class="btn ghost" data-act="coupon">'+(ui.coupon?'Remove':'Apply')+'</button></div><div class="line"><span>Subtotal</span><span>'+inr(t.sub)+'</span></div>'+(t.disc?'<div class="line" style="color:var(--ok)"><span>Coupon '+esc(st.couponCode)+'</span><span>\u2212'+inr(t.disc)+'</span></div>':'')+'<div class="line"><span>Shipping</span><span>'+(t.ship?inr(t.ship):'Free')+'</span></div><div class="line t"><span>Total</span><span>'+inr(t.after+t.ship)+'</span></div><button class="btn block" style="margin-top:12px" data-act="checkout">Checkout</button></div>':'')+'</aside>');
 ui.modal='cart';
}
function checkoutModal(){
 var t=totals(),st=S.settings;
 showOverlay('<div class="scrim" data-act="close"></div><section class="sheet modal narrow" role="dialog" aria-modal="true" aria-label="Checkout">'+head('Checkout')+'<form class="form" id="co" novalidate><div class="f2"><label class="l">Full name<input class="field" id="co-name" autocomplete="name"></label><label class="l">Mobile number<input class="field" id="co-phone" inputmode="numeric" maxlength="10" autocomplete="tel-national" placeholder="10 digits"></label></div><label class="l">Address<textarea class="field" id="co-addr" autocomplete="street-address" placeholder="House no, street, landmark"></textarea></label><div class="f2"><label class="l">City<input class="field" id="co-city" autocomplete="address-level2"></label><label class="l">Pincode<input class="field" id="co-pin" inputmode="numeric" maxlength="6" autocomplete="postal-code"></label></div><div class="pay" role="radiogroup" aria-label="Payment"><label><input type="radio" name="pay" value="upi" data-on="pay"'+(ui.pay==='upi'?' checked':'')+'> <span>UPI (GPay, PhonePe, Paytm)<br><small style="color:var(--muted)">Pay after we confirm on WhatsApp</small></span></label><label><input type="radio" name="pay" value="cod" data-on="pay"'+(ui.pay==='cod'?' checked':'')+'> <span>Cash on delivery<br><small style="color:var(--muted)">'+inr(st.codFee)+' extra</small></span></label></div><div class="sum" id="cosum" style="white-space:normal">'+sumHtml(t)+'</div><div class="err" id="coerr" role="alert"></div><button class="btn block" type="submit">Place order</button></form></section>');
 ui.modal='checkout';
}
function sumHtml(t){return t.lines.map(function(l){return '<div class="line"><span>'+esc(l.p.name)+' \u00D7 '+l.q+'</span><span>'+inr(l.p.price*l.q)+'</span></div>'}).join('')+(t.disc?'<div class="line" style="color:var(--ok)"><span>Coupon</span><span>\u2212'+inr(t.disc)+'</span></div>':'')+'<div class="line"><span>Shipping</span><span>'+(t.ship?inr(t.ship):'Free')+'</span></div>'+(t.cod?'<div class="line"><span>Cash on delivery fee</span><span>'+inr(t.cod)+'</span></div>':'')+'<div class="line t"><span>Total</span><span>'+inr(t.total)+'</span></div>'}
function placeOrder(){
 var v=function(id){return ($('#'+id).value||'').trim()},e=$('#coerr'),t=totals(),st=S.settings;
 var o={name:v('co-name'),phone:v('co-phone'),addr:v('co-addr'),city:v('co-city'),pin:v('co-pin')};
 if(!o.name)return e.textContent='Enter your name.';
 if(!/^[6-9]\d{9}$/.test(o.phone))return e.textContent='Enter a valid 10-digit mobile number.';
 if(o.addr.length<8)return e.textContent='Enter your full address.';
 if(!o.city)return e.textContent='Enter your city.';
 if(!/^\d{6}$/.test(o.pin))return e.textContent='Enter a 6-digit pincode.';
 var id='AJ'+Date.now().toString(36).toUpperCase().slice(-6);
 var lines=t.lines.map(function(l){return '\u2022 '+l.p.name+' ('+l.p.sku+') \u00D7 '+l.q+' = '+inr(l.p.price*l.q)}).join('\n');
 var msg='New order '+id+'\n\n'+lines+'\n\n'+(t.disc?'Coupon '+st.couponCode+': -'+inr(t.disc)+'\n':'')+'Shipping: '+(t.ship?inr(t.ship):'Free')+'\n'+(t.cod?'COD fee: '+inr(t.cod)+'\n':'')+'Total: '+inr(t.total)+'\nPayment: '+(ui.pay==='cod'?'Cash on delivery':'UPI')+'\n\nName: '+o.name+'\nMobile: '+o.phone+'\nAddress: '+o.addr+', '+o.city+' - '+o.pin;
 ui.last={id:id,msg:msg,total:t.total};
 ui.cart=[];ui.coupon=false;saveCart();renderPage(true);
 var wa=st.whatsapp?'https://wa.me/'+st.whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent(msg):'';
 showOverlay('<div class="scrim" data-act="close"></div><section class="sheet modal narrow" role="dialog" aria-modal="true">'+head('')+'<div class="done"><div class="okc">'+ic('check')+'</div><h2>Order ready</h2><p style="color:var(--muted);margin:0">Order <b>'+id+'</b> for '+inr(t.total)+'. Send it to us on WhatsApp so we can confirm and ship it.</p><div class="sum">'+esc(msg)+'</div>'+(wa?'<a class="btn block" href="'+wa+'" target="_blank" rel="noopener">Send order on WhatsApp</a>':'<div class="note">The seller has not added a WhatsApp number yet. Copy the order and send it to them directly.</div>')+'<button class="btn ghost block" style="margin-top:10px" data-act="copyorder">Copy order details</button>'+(ui.pay==='upi'&&st.upi?'<p style="margin:14px 0 0">Pay by UPI to <b>'+esc(st.upi)+'</b> <button class="mini" data-act="copyupi">Copy</button></p>':'')+'</div></section>');
 ui.modal='done';
}

/* ---------- admin ---------- */
function adminModal(){
 var A=ui.adm,tabs=[['add',A.edit?'Edit piece':'Add piece'],['items','Your pieces'],['cols','Collections'],['set','Settings']];
 var c=A.tab==='add'?formAdd():A.tab==='items'?listItems():A.tab==='cols'?formCols():formSet();
 showOverlay('<div class="scrim" data-act="close"></div><section class="sheet modal" role="dialog" aria-modal="true" aria-label="Manage store">'+head('Manage store')+'<div class="tabs" role="tablist">'+tabs.map(function(t){return '<button role="tab" class="'+(A.tab===t[0]?'on':'')+'" data-act="atab" data-v="'+t[0]+'">'+t[1]+'</button>'}).join('')+'</div>'+c+(ui.dirty?'<div class="cfoot" style="margin-top:16px"><button class="btn block" data-act="publish">Publish changes to your store</button></div>':'')+'</section>');
 ui.modal='admin';
}
function opts(list,sel,blank){return (blank?'<option value="">'+blank+'</option>':'')+list.map(function(x){var v=x.id||x,n=x.name||x;return '<option value="'+esc(v)+'"'+(v===sel?' selected':'')+'>'+esc(n)+'</option>'}).join('')}
function prevHtml(ph){return ph.length?'<div class="prev">'+ph.map(function(s,i){return '<div><img src="'+s+'" alt=""><button type="button" data-act="delph" data-v="'+i+'" aria-label="Remove photo">\u00D7</button></div>'}).join('')+'</div>':''}
function formAdd(){
 var A=ui.adm,p=A.edit?prodById(A.edit):null;p=p||{name:'',col:(newestCol()||{}).id||'',cat:'Earrings',price:'',mrp:'',tag:'New',stock:10,mat:'',desc:'',metal:'gold',stone:'ruby',sku:''};
 return (S.collections.length?'':'<div class="note">Create a collection first (Collections tab), then add pieces to it.</div>')+'<div class="note">Photos: add up to 4 clear pictures, the first is the cover. With no photo, a drawn placeholder is shown.</div><form class="form" id="pf" novalidate><label class="l">Product name<input class="field" id="pf-name" value="'+esc(p.name)+'" placeholder="e.g. Kundan Pearl Choker"></label><div class="f2"><label class="l">Collection<select class="field" id="pf-col">'+opts(S.collections,p.col,'No collection')+'</select></label><label class="l">Category<select class="field" id="pf-cat">'+opts(CATS,p.cat)+'</select></label></div><div class="f2"><label class="l">Selling price (\u20B9)<input class="field" id="pf-price" inputmode="numeric" value="'+esc(p.price)+'"></label><label class="l">Original price / MRP (\u20B9)<input class="field" id="pf-mrp" inputmode="numeric" value="'+esc(p.mrp)+'" placeholder="Shown struck through"></label></div><div class="f2"><label class="l">Stock count<input class="field" id="pf-stock" inputmode="numeric" value="'+esc(p.stock)+'"></label><label class="l">Badge<select class="field" id="pf-tag">'+TAGS.map(function(t){return '<option value="'+t+'"'+(t===p.tag?' selected':'')+'>'+(t||'None')+'</option>'}).join('')+'</select></label></div><label class="l">Material and finish<input class="field" id="pf-mat" value="'+esc(p.mat)+'" placeholder="Gold-tone brass, anti-tarnish"></label><label class="l">Description<textarea class="field" id="pf-desc">'+esc(p.desc)+'</textarea></label><div><div class="l" style="display:block;margin-bottom:6px">Photos</div><label class="drop" for="pf-photos">Tap to choose photos<input id="pf-photos" type="file" accept="image/*" multiple hidden data-on="photos"></label><div id="pf-prev" style="margin-top:10px">'+prevHtml(A.photos)+'</div></div><div class="f2"><label class="l">Placeholder metal<select class="field" id="pf-metal">'+['gold','silver','rose'].map(function(m){return '<option'+(m===p.metal?' selected':'')+'>'+m+'</option>'}).join('')+'</select></label><label class="l">Placeholder stone<select class="field" id="pf-stone">'+['ruby','emerald','sapphire','amethyst','pearl','none'].map(function(m){return '<option'+(m===p.stone?' selected':'')+'>'+m+'</option>'}).join('')+'</select></label></div><div class="err" id="pferr" role="alert"></div><button class="btn block" type="submit">'+(A.edit?'Save changes':'Add to store')+'</button>'+(A.edit?'<button class="btn ghost block" type="button" data-act="canceledit">Cancel</button>':'')+'</form>';
}
function listItems(){
 if(!S.products.length)return '<div class="empty">No pieces yet. Add your first one.</div>';
 return S.products.slice().sort(function(a,b){return b.created.localeCompare(a.created)}).map(function(p){var c=colById(p.col);return '<div class="mrow"><div class="th">'+pic(p,0)+'</div><div><h4>'+esc(p.name)+'</h4><small>'+inr(p.price)+' \u00B7 '+p.stock+' in stock \u00B7 '+(c?esc(c.name):'No collection')+'</small></div><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:end"><button class="mini" data-act="edit" data-id="'+p.id+'">Edit</button><button class="mini danger" data-act="del" data-id="'+p.id+'">'+(ui.err===p.id?'Tap to confirm':'Delete')+'</button></div></div>'}).join('');
}
function formCols(){
 var list=S.collections.slice().sort(function(a,b){return b.created.localeCompare(a.created)}).map(function(c){var n=S.products.filter(function(p){return p.col===c.id}).length;return '<div class="mrow"><div class="th">'+(c.photo?'<img src="'+c.photo+'" alt="">':'')+'</div><div><h4>'+esc(c.name)+'</h4><small>'+n+' pieces \u00B7 added '+esc(c.created)+'</small></div><button class="mini danger" data-act="delcol" data-id="'+c.id+'">'+(ui.err===c.id?'Tap to confirm':'Delete')+'</button></div>'}).join('');
 return '<div class="note">New set arrived? Create the collection here, then add its pieces. The newest collection is featured at the top of your home page automatically.</div><form class="form" id="cf" novalidate><label class="l">Collection name<input class="field" id="cf-name" placeholder="e.g. Winter Wedding Edit"></label><label class="l">One-line description<input class="field" id="cf-blurb" placeholder="What makes this set special"></label><div><label class="drop" for="cf-photo">Optional cover photo<input id="cf-photo" type="file" accept="image/*" hidden data-on="colphoto"></label><div id="cf-prev" style="margin-top:10px">'+prevHtml(ui.adm.colPhoto?[ui.adm.colPhoto]:[])+'</div></div><div class="err" id="cferr" role="alert"></div><button class="btn block" type="submit">Create collection</button></form><h3 style="font-size:24px;margin:22px 0 4px">Your collections</h3>'+list;
}
function formSet(){
 var s=S.settings;var f=function(id,l,v,ph){return '<label class="l">'+l+'<input class="field" id="'+id+'" value="'+esc(v)+'" placeholder="'+esc(ph||'')+'"></label>'};
 return '<form class="form" id="sf" novalidate>'+f('sf-name','Store name',s.name)+f('sf-tag','Tagline',s.tagline)+'<div class="f2">'+f('sf-wa','WhatsApp number for orders (with country code)',s.whatsapp,'919876543210')+f('sf-upi','Your UPI ID',s.upi,'name@upi')+'</div>'+f('sf-ig','Instagram handle',s.instagram,'without @')+'<div class="f2">'+f('sf-ann','Sale banner text',s.announce)+f('sf-end','Sale ends (YYYY-MM-DDTHH:MM)',s.saleEnds)+'</div><div class="f2">'+f('sf-cc','Coupon code',s.couponCode)+f('sf-cp','Coupon discount %',s.couponPct)+'</div><div class="f2">'+f('sf-fs','Free shipping above (\u20B9)',s.freeShip)+f('sf-sf','Shipping fee (\u20B9)',s.shipFee)+'</div>'+f('sf-cod','Cash on delivery fee (\u20B9)',s.codFee)+'<div><div class="l" style="display:block;margin-bottom:6px">Home page photo</div><label class="drop" for="sf-hero">'+(s.heroPhoto?'Change home page photo':'Add a home page photo')+'<input id="sf-hero" type="file" accept="image/*" hidden data-on="hero"></label>'+(s.heroPhoto?'<div class="prev" style="margin-top:10px"><div><img src="'+s.heroPhoto+'" alt=""></div></div><button type="button" class="mini" style="margin-top:8px" data-act="rmhero">Remove photo</button>':'')+'</div><button class="btn block" type="submit">Save settings</button><button class="btn ghost block" type="button" data-act="download">Download a backup of store.json</button></form>';
}
function markDirty(){ui.dirty=true;renderPage(true)}
function resize(file,max){
 return new Promise(function(res,rej){var r=new FileReader();r.onerror=rej;r.onload=function(){var im=new Image();im.onerror=rej;im.onload=function(){var k=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.8))};im.src=r.result};r.readAsDataURL(file)});
}
function savePiece(){
 var v=function(id){return ($('#'+id).value||'').trim()},A=ui.adm,e=$('#pferr');
 var price=parseInt(v('pf-price'),10),mrp=parseInt(v('pf-mrp'),10)||price,stock=parseInt(v('pf-stock'),10);
 if(!v('pf-name'))return e.textContent='Enter the product name.';
 if(!(price>0))return e.textContent='Enter a selling price.';
 var d={name:v('pf-name'),col:v('pf-col'),cat:v('pf-cat'),price:price,mrp:Math.max(mrp,price),tag:v('pf-tag'),stock:isNaN(stock)?0:Math.max(0,stock),mat:v('pf-mat'),desc:v('pf-desc'),metal:v('pf-metal'),stone:v('pf-stone'),photos:A.photos.slice(0,4)};
 if(A.edit){var p=prodById(A.edit);Object.keys(d).forEach(function(k){p[k]=d[k]});toast('Piece updated')}
 else{var n=S.products.length+1;while(prodById('p'+n))n++;d.id='p'+n;d.sku='AJ-'+String(n).padStart(3,'0');d.created=new Date().toISOString().slice(0,10);S.products.push(d);toast('Added to your store')}
 A.edit=null;A.photos=[];A.tab='items';markDirty();adminModal();
}
var GH={get:function(){return lget('aj-gh',null)},set:function(v){if(v)lset('aj-gh',v);else{try{localStorage.removeItem('aj-gh')}catch(e){}}}};
function b64(str){var b=new TextEncoder().encode(str),s='',i=0;for(;i<b.length;i+=32768)s+=String.fromCharCode.apply(null,b.subarray(i,i+32768));return btoa(s)}
function loginModal(){
 var g=GH.get()||{repo:'',branch:'main'};
 showOverlay('<div class="scrim" data-act="close"></div><section class="sheet modal narrow" role="dialog" aria-modal="true" aria-label="Owner login">'+head('Owner login')+'<div class="note">Changes are saved by committing <b>store.json</b> to your GitHub repository. Vercel then redeploys the site. Your token is kept in this browser only.</div><form class="form" id="lf" novalidate><label class="l">GitHub repository<input class="field" id="lf-repo" placeholder="your-username/aabha-jewels" value="'+esc(g.repo)+'"></label><label class="l">Branch<input class="field" id="lf-branch" value="'+esc(g.branch)+'"></label><label class="l">GitHub token<input class="field" id="lf-token" type="password" autocomplete="off" placeholder="github_pat_..."></label><div class="err" id="lferr" role="alert"></div><button class="btn block" type="submit">Sign in</button></form></section>');
 ui.modal='login';
}
function saveLogin(){
 var repo=$('#lf-repo').value.trim(),br=$('#lf-branch').value.trim()||'main',tk=$('#lf-token').value.trim(),e=$('#lferr');
 if(!/^[\w.-]+\/[\w.-]+$/.test(repo))return e.textContent='Enter the repository as username/name.';
 if(!tk)return e.textContent='Paste your GitHub token.';
 e.textContent='Checking…';
 fetch('https://api.github.com/repos/'+repo,{headers:{Authorization:'Bearer '+tk,Accept:'application/vnd.github+json'}}).then(function(r){
  if(r.status===401)throw 'GitHub did not accept that token. Create a new one and paste it again.';
  if(r.status===404)throw 'Repository not found, or the token has no access to it.';
  if(!r.ok)throw 'GitHub returned an error ('+r.status+').';
  return r.json()}).then(function(j){
  if(j.permissions&&j.permissions.push===false)throw 'This token can only read. Give it Contents: Read and write.';
  GH.set({repo:repo,branch:br,token:tk});ui.isAdmin=true;closeModal();renderPage(true);toast('Signed in as owner')
 }).catch(function(m){e.textContent=typeof m==='string'?m:'Could not reach GitHub. Check your connection.'});
}
function publish(){
 var g=GH.get();if(!g)return loginModal();
 var url='https://api.github.com/repos/'+g.repo+'/contents/store.json',h={Authorization:'Bearer '+g.token,Accept:'application/vnd.github+json'};
 toast('Publishing…');
 fetch(url+'?ref='+encodeURIComponent(g.branch),{headers:h}).then(function(r){
  if(r.status===401)throw 'token';
  return r.ok?r.json().then(function(j){return j.sha}):undefined;
 }).then(function(sha){
  var body={message:'Update store from owner panel',content:b64(JSON.stringify(S)),branch:g.branch};if(sha)body.sha=sha;
  return fetch(url,{method:'PUT',headers:h,body:JSON.stringify(body)});
 }).then(function(r){
  if(r.status===401||r.status===403||r.status===404)throw 'token';
  if(r.status===409||r.status===422)throw 'conflict';
  if(!r.ok)throw 'fail';
  ui.dirty=false;renderPage(true);adminModal();toast('Saved. The live site updates in about a minute.');
 }).catch(function(m){toast(m==='token'?'GitHub refused the save. Sign in again with a token that can write to the repo.':m==='conflict'?'The file changed on GitHub. Try Publish again.':'Could not publish. Check your connection and try again.')});
}
function download(){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'}));a.download='store.json';a.click();setTimeout(function(){URL.revokeObjectURL(a.href)},2000)}

/* ---------- events ---------- */
var A={
 home:function(){window.scrollTo({top:0,behavior:'smooth'})},
 shop:function(){closeModal();ui.cat='all';ui.col='all';renderPage();var s=$('#shop');s&&s.scrollIntoView({behavior:'smooth'})},
 cat:function(t){closeModal();ui.cat=t.dataset.v;ui.col=ui.col;renderPage();$('#shop').scrollIntoView({behavior:'smooth'})},
 col:function(t){closeModal();ui.col=t.dataset.v;ui.cat='all';renderPage();$('#shop').scrollIntoView({behavior:'smooth'})},
 togsearch:function(){ui.search=!ui.search;$('.searchbar').classList.toggle('on',ui.search);if(ui.search)$('#q').focus()},
 open:function(t){ui.pid=t.dataset.id;ui.img=0;ui.qty=1;productModal()},
 close:function(){closeModal()},
 img:function(t){ui.img=+t.dataset.v;productModal()},
 mq:function(t){ui.qty=Math.max(1,Math.min(10,ui.qty+ +t.dataset.v));$('#mq').textContent=ui.qty},
 add:function(t){addCart(t.dataset.id,1);toast('Added to cart')},
 addq:function(t){addCart(t.dataset.id,ui.qty);closeModal();cartDrawer()},
 buy:function(t){addCart(t.dataset.id,ui.qty);checkoutModal()},
 wish:function(t){var i=ui.wish.indexOf(t.dataset.id);if(i>-1)ui.wish.splice(i,1);else ui.wish.push(t.dataset.id);saveCart();var on=ui.wish.indexOf(t.dataset.id)>-1;document.querySelectorAll('.heart[data-id="'+t.dataset.id+'"]').forEach(function(h){h.classList.toggle('on',on);h.setAttribute('aria-pressed',on)});var b=document.querySelector('[data-act=wishview] .badge');renderHeaderOnly();toast(on?'Saved to wishlist':'Removed from wishlist')},
 wishview:function(){if(!ui.wish.length)return toast('Tap the heart on any piece to save it');ui.q='';ui.cat='all';ui.col='all';var ids=ui.wish;showOverlay('<div class="scrim" data-act="close"></div><section class="sheet modal" role="dialog" aria-modal="true">'+head('Your wishlist')+'<div class="grid">'+ids.map(prodById).filter(Boolean).map(card).join('')+'</div></section>')},
 cart:function(){cartDrawer()},
 cq:function(t){var l=ui.cart.filter(function(x){return x.id===t.dataset.id})[0];if(!l)return;l.q+=+t.dataset.v;if(l.q<1)ui.cart=ui.cart.filter(function(x){return x!==l});if(l&&l.q>10)l.q=10;saveCart();cartDrawer();renderHeaderOnly()},
 rm:function(t){ui.cart=ui.cart.filter(function(x){return x.id!==t.dataset.id});saveCart();cartDrawer();renderHeaderOnly()},
 coupon:function(){var st=S.settings;if(ui.coupon){ui.coupon=false}else{var c=($('#cp').value||'').trim().toUpperCase();if(c!==String(st.couponCode).toUpperCase())return toast('That code is not valid');ui.coupon=true;toast('Coupon applied')}saveCart();cartDrawer()},
 checkout:function(){if(!ui.cart.length)return;checkoutModal()},
 copyorder:function(){copy(ui.last&&ui.last.msg)},
 copyupi:function(){copy(S.settings.upi)},
 admin:function(){adminModal()},
 atab:function(t){ui.adm.tab=t.dataset.v;ui.err='';if(t.dataset.v!=='add'){ui.adm.edit=null;ui.adm.photos=[]}adminModal()},
 edit:function(t){var p=prodById(t.dataset.id);ui.adm.edit=p.id;ui.adm.photos=(p.photos||[]).slice();ui.adm.tab='add';adminModal()},
 canceledit:function(){ui.adm.edit=null;ui.adm.photos=[];ui.adm.tab='items';adminModal()},
 del:function(t){if(ui.err!==t.dataset.id){ui.err=t.dataset.id;return adminModal()}S.products=S.products.filter(function(p){return p.id!==t.dataset.id});ui.cart=ui.cart.filter(function(l){return l.id!==t.dataset.id});ui.err='';markDirty();adminModal()},
 delcol:function(t){if(ui.err!==t.dataset.id){ui.err=t.dataset.id;return adminModal()}S.collections=S.collections.filter(function(c){return c.id!==t.dataset.id});S.products.forEach(function(p){if(p.col===t.dataset.id)p.col=''});if(ui.col===t.dataset.id)ui.col='all';ui.err='';markDirty();adminModal()},
 delph:function(t){var k=t.dataset.v|0;if($('#cf-photo')&&ui.adm.tab==='cols'){ui.adm.colPhoto='';$('#cf-prev').innerHTML=''}else{ui.adm.photos.splice(k,1);$('#pf-prev').innerHTML=prevHtml(ui.adm.photos)}},
 rmhero:function(){S.settings.heroPhoto='';markDirty();adminModal()},
 publish:function(){publish()},
 login:function(){loginModal()},
 download:function(){download()},
 logout:function(){GH.set(null);ui.isAdmin=false;ui.dirty=false;closeModal();renderPage(true);toast('Signed out')}
};
function addCart(id,q){var l=ui.cart.filter(function(x){return x.id===id})[0];if(l)l.q=Math.min(10,l.q+q);else ui.cart.push({id:id,q:q});saveCart();renderHeaderOnly()}
function renderHeaderOnly(){renderPage(true)}
function copy(t){if(!t)return;var ok=function(){toast('Copied')};try{navigator.clipboard.writeText(t).then(ok,function(){toast('Select the text and copy it')})}catch(e){toast('Select the text and copy it')}}

document.addEventListener('click',function(e){var t=e.target.closest('[data-act]');if(!t)return;var f=A[t.dataset.act];if(f){if(t.tagName==='A')return;f(t,e)}});
document.addEventListener('input',function(e){var t=e.target;if(t.dataset.on==='search'){ui.q=t.value;refreshGrid()}});
document.addEventListener('change',function(e){
 var t=e.target,k=t.dataset.on;
 if(k==='sort'){ui.sort=t.value;refreshGrid()}
 if(k==='pay'){ui.pay=t.value;$('#cosum').innerHTML=sumHtml(totals())}
 if(k==='photos'){var room=4-ui.adm.photos.length,fs=[].slice.call(t.files).slice(0,room);Promise.all(fs.map(function(f){return resize(f,900)})).then(function(r){ui.adm.photos=ui.adm.photos.concat(r);$('#pf-prev').innerHTML=prevHtml(ui.adm.photos)}).catch(function(){$('#pferr').textContent='Could not read that photo. Try a JPG or PNG.'});t.value=''}
 if(k==='hero'&&t.files[0]){resize(t.files[0],1000).then(function(r){S.settings.heroPhoto=r;markDirty();adminModal()});t.value=''}
 if(k==='colphoto'&&t.files[0]){resize(t.files[0],700).then(function(r){ui.adm.colPhoto=r;$('#cf-prev').innerHTML=prevHtml([r])});t.value=''}
});
document.addEventListener('submit',function(e){
 e.preventDefault();var id=e.target.id;
 if(id==='co')placeOrder();
 if(id==='lf')saveLogin();
 if(id==='pf')savePiece();
 if(id==='cf'){var n=($('#cf-name').value||'').trim();if(!n)return $('#cferr').textContent='Give the collection a name.';S.collections.push({id:'c-'+Date.now().toString(36),name:n,blurb:($('#cf-blurb').value||'').trim()||'Fresh pieces, just arrived.',created:new Date().toISOString().slice(0,10),photo:ui.adm.colPhoto});ui.adm.colPhoto='';ui.adm.tab='add';markDirty();toast('Collection created. Now add its pieces.');adminModal()}
 if(id==='sf'){var g=function(i){return ($('#'+i).value||'').trim()},s=S.settings,num=function(i,d){var x=parseInt(g(i),10);return isNaN(x)?d:x};
  s.name=g('sf-name')||s.name;s.tagline=g('sf-tag');s.whatsapp=g('sf-wa').replace(/\D/g,'');s.upi=g('sf-upi');s.instagram=g('sf-ig').replace('@','');s.announce=g('sf-ann');s.saleEnds=g('sf-end');s.couponCode=g('sf-cc');s.couponPct=num('sf-cp',s.couponPct);s.freeShip=num('sf-fs',s.freeShip);s.shipFee=num('sf-sf',s.shipFee);s.codFee=num('sf-cod',s.codFee);
  TITLE=s.name;document.title=s.name;ui.dirty=true;renderPage(true);toast('Settings saved. Publish to make them live.');adminModal()}
});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ui.modal)closeModal()});

/* ---------- boot ---------- */
$('#root').innerHTML='<div class="empty" style="margin:60px 16px">Loading the store…</div>';
fetch('store.json',{cache:'no-cache'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){
 S=d;TITLE=S.settings.name;document.title=TITLE;ui.isAdmin=!!GH.get();renderPage();
 if(location.hash==='#admin'&&!ui.isAdmin)loginModal();
}).catch(function(){$('#root').innerHTML='<div class="empty" style="margin:60px 16px">The store could not be loaded. If you opened index.html straight from your computer, deploy it to Vercel or run a local server so store.json can load.</div>'});
window.addEventListener('beforeunload',function(e){if(ui.dirty){e.preventDefault();e.returnValue=''}});
})();
