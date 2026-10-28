const $=s=>document.querySelector(s),L={ok:"Cumplida",par:"Parcial",ko:"Incumplida"};
function badge(id){const p=PARTIDOS[id],b=document.createElement("div");b.className="badge";b.style.background=p.c;b.textContent=p.n;
const i=new Image();i.alt="Logo "+p.n;i.onload=()=>{b.textContent="";b.append(i)};i.src="assets/logos/"+id.toLowerCase()+".svg";return b}
let cur=0,filt="all";
ELECCIONES.forEach((el,k)=>{const b=document.createElement("button");b.textContent=el.y;b.onclick=()=>{filt="all";show(k)};$("#line").append(b)});
function show(k){cur=k;document.querySelectorAll("#line button").forEach((b,i)=>b.setAttribute("aria-current",i==k));draw()}
function draw(){const el=ELECCIONES[cur],P=$("#panel");P.innerHTML="";
const h=document.createElement("div");h.className="head";h.append(badge(el.g));
h.insertAdjacentHTML("beforeend",`<div><h2>Elecciones de ${el.y}</h2><span class="mut">Gobernó ${el.gob||PARTIDOS[el.g].n}. ${el.nota||""}</span></div>`);P.append(h);
if(!el.p.length){P.insertAdjacentHTML("beforeend","<p class=mut>Investigación pendiente: aún no hay promesas contrastadas para esta convocatoria.</p>");return}
const c={ok:0,par:0,ko:0};el.p.forEach(x=>c[x.e]++);
P.insertAdjacentHTML("beforeend",`<div class="bar">${["ok","par","ko"].map(e=>`<i style="width:${c[e]/el.p.length*100}%;background:var(--${e})"></i>`).join("")}</div>`);
if(el.bal)P.insertAdjacentHTML("beforeend",`<div class="bal">${el.bal.map(b=>`<p>${b.t} <span class="src">Fuente: ${b.f}</span></p>`).join("")}</div>`);
const ch=document.createElement("div");ch.className="chips";
[["all","Todas"],["ok","Cumplidas"],["par","Parciales"],["ko","Incumplidas"]].forEach(([k,t])=>{const b=document.createElement("button");b.textContent=t;b.className=filt==k?"on":"";b.onclick=()=>{filt=k;draw()};ch.append(b)});
const r=document.createElement("button");r.textContent="Revelar todas";r.onclick=()=>document.querySelectorAll(".p").forEach(x=>{x.classList.add("open");x.querySelector(".stamp").textContent=L[x.dataset.e]});ch.append(r);P.append(ch);
el.p.filter(x=>filt=="all"||x.e==filt).forEach(x=>{const d=document.createElement("div");d.className="p";d.tabIndex=0;d.dataset.e=x.e;
d.innerHTML=`<h3>${x.t}</h3><div class="stamp s-${x.e}">?</div><p class="n">${x.n}<br><span class="src">Fuente: ${x.f}</span> ${x.v?"":'<span class="todo">· por contrastar</span>'}</p>`;
const t=()=>{d.classList.toggle("open");d.querySelector(".stamp").textContent=d.classList.contains("open")?L[x.e]:"?"};
d.onclick=t;d.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();t()}};P.append(d)});if(el.prog)full(P,el.prog)}
CANDIDATOS.forEach(x=>{const d=document.createElement("div");d.className="c";d.append(badge(x.p));d.insertAdjacentHTML("beforeend",`<h3>${x.n}</h3><p class=mut>${x.s}</p>`);$("#cands").append(d)});
const doc=ELECCIONES.filter(e=>e.p.length).length;$("#cob").textContent=`Cobertura actual: ${doc} de ${ELECCIONES.length} elecciones con promesas documentadas.`;
show(ELECCIONES.map(e=>e.p.length>0).lastIndexOf(true));

ELECCIONES.find(e=>e.y=="2023").prog=PROG2023;
function full(P,G){const w=document.createElement("section");w.className="full";
w.innerHTML=`<h3>Programa completo: ${G.items.length} puntos</h3><p class="mut">${G.fuente}. Todos pendientes de evaluar.</p>`;
const q=document.createElement("input");q.type="search";q.placeholder="Buscar en el programa (vivienda, pensiones, sanidad…)";q.setAttribute("aria-label","Buscar en el programa");
const sb=document.createElement("select");sb.setAttribute("aria-label","Bloque");sb.innerHTML='<option value="">Todos los bloques</option>'+Object.entries(G.bloques).map(([k,v])=>`<option value="${k}">Bloque ${k}. ${v}</option>`).join("");
const sk=document.createElement("select");sk.setAttribute("aria-label","Tipo");sk.innerHTML='<option value="">Medidas y párrafos</option><option value="m">Solo medidas</option><option value="p">Solo párrafos</option>';
const cnt=document.createElement("p");cnt.className="mut";const ul=document.createElement("div");const more=document.createElement("button");more.textContent="Mostrar más";
let lim=40,res=[];
function ren(){const s=q.value.trim().toLowerCase();res=G.items.filter(i=>(!sb.value||i.b==sb.value)&&(!sk.value||i.k==sk.value)&&(!s||i.t.toLowerCase().includes(s)||i.s.toLowerCase().includes(s)));
cnt.textContent=res.length+" puntos";ul.textContent="";
res.slice(0,lim).forEach(i=>{const d=document.createElement("div");d.className="it";const t=document.createElement("p");t.textContent=i.t;const m=document.createElement("span");m.className="src";m.textContent="Bloque "+i.b+(i.s?" · "+i.s:"")+" · p. "+i.p+(i.k=="p"?" · párrafo":"");const g=document.createElement("span");g.className="todo";g.textContent="Pendiente de evaluar";d.append(t,m,document.createElement("br"),g);ul.append(d)});
more.style.display=res.length>lim?"":"none"}
[q,sb,sk].forEach(x=>x.oninput=()=>{lim=40;ren()});more.onclick=()=>{lim+=60;ren()};
w.append(q,sb,sk,cnt,ul,more);P.append(w);ren()}
