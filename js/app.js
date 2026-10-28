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
d.onclick=t;d.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();t()}};P.append(d)})}
CANDIDATOS.forEach(x=>{const d=document.createElement("div");d.className="c";d.append(badge(x.p));d.insertAdjacentHTML("beforeend",`<h3>${x.n}</h3><p class=mut>${x.s}</p>`);$("#cands").append(d)});
const doc=ELECCIONES.filter(e=>e.p.length).length;$("#cob").textContent=`Cobertura actual: ${doc} de ${ELECCIONES.length} elecciones con promesas documentadas.`;
show(ELECCIONES.map(e=>e.p.length>0).lastIndexOf(true));
