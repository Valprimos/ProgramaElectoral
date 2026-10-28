// p: promesas. t=texto, e=ok|par|ko, n=nota, f=fuente, v=true cuando ya está contrastada con fuente primaria.
// Elecciones con p:[] aparecen como "investigación pendiente".
const PARTIDOS={UCD:{n:"UCD",c:"#2e8b57"},PSOE:{n:"PSOE",c:"#e30613"},PP:{n:"PP",c:"#0056a8"},VOX:{n:"Vox",c:"#63be21"}};
const ELECCIONES=[
{y:"1977",g:"UCD",p:[]},{y:"1979",g:"UCD",p:[]},
{y:"1982",g:"PSOE",p:[
{t:"Crear 800.000 puestos de trabajo",e:"ko",n:"El paro subió durante la legislatura.",f:"INE, EPA 1982-1986",v:false},
{t:"Referéndum sobre la permanencia en la OTAN",e:"par",n:"Se celebró en 1986, con el Gobierno pidiendo el sí.",f:"Referéndum de 12-03-1986",v:false}]},
{y:"1986",g:"PSOE",p:[]},{y:"1989",g:"PSOE",p:[]},{y:"1993",g:"PSOE",p:[]},
{y:"1996",g:"PP",p:[{t:"Acabar con el servicio militar obligatorio",e:"ok",n:"Suspendido en 2001.",f:"Real Decreto 247/2001",v:false}]},
{y:"2000",g:"PP",p:[]},
{y:"2004",g:"PSOE",p:[
{t:"Retirar las tropas españolas de Irak",e:"ok",n:"Retiradas en abril de 2004.",f:"Ministerio de Defensa",v:false},
{t:"Reconocer el matrimonio entre personas del mismo sexo",e:"ok",n:"Aprobado en 2005.",f:"Ley 13/2005",v:false}]},
{y:"2008",g:"PSOE",p:[
{t:"Deducción de 400 € en el IRPF",e:"ok",n:"Se aplicó en 2008 y se retiró en 2010.",f:"BOE",v:false},
{t:"Alcanzar el pleno empleo",e:"ko",n:"El paro superó el 20 %.",f:"INE, EPA",v:false}]},
{y:"2011",g:"PP",p:[
{t:"No subir los impuestos",e:"ko",n:"Subida del IRPF aprobada en diciembre de 2011.",f:"Real Decreto-ley 20/2011",v:false},
{t:"Reformar el mercado laboral",e:"ok",n:"Reforma de 2012.",f:"Ley 3/2012",v:false}]},
{y:"2015",g:"PP",p:[]},{y:"2016",g:"PP",p:[]},
{y:"2019 abril",g:"PSOE",p:[{t:"Derogar la reforma laboral",e:"par",n:"La reforma de 2021 retocó la de 2012 sin derogarla entera.",f:"Real Decreto-ley 32/2021",v:false}]},
{y:"2019 nov.",g:"PSOE",p:[]},
{y:"2023",g:"PP",p:[],nota:"Ganó en escaños el PP; gobernó el PSOE tras la investidura de Sánchez."}];
const CANDIDATOS=[
{p:"PSOE",n:"Pedro Sánchez",s:"Programa en elaboración. Incluirá compromisos nuevos y pendientes del de 2023."},
{p:"PP",n:"Alberto Núñez Feijóo",s:"Programa en elaboración, a cargo de Alma Ezcurra. Aún sin documento completo."},
{p:"VOX",n:"Santiago Abascal",s:"Sin programa nuevo presentado. Defiende mantener el ya conocido."}];
