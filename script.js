const GHATI_MINUTES = 24;        // minutes in 1 ghati
const PHALA_SECONDS = 24;        // seconds in 1 phala

function parseDateInput(dateStr, timeStr){
  if (!dateStr) return null;
  const [y,mo,d] = dateStr.split('-').map(Number);
  const parts = (timeStr||'00:00:00').split(':');
  return new Date(y, mo-1, d, Number(parts[0]||0), Number(parts[1]||0), Number(parts[2]||0));
}

function formatDateForZone(dateObj, zoneOption){
  if (!dateObj) return '';
  if (zoneOption==='local') return dateObj.toLocaleString();
  try{
    return new Intl.DateTimeFormat('en-GB', {
      year:'numeric',month:'short',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone:zoneOption
    }).format(dateObj)+` (${zoneOption})`;
  }catch(e){return dateObj.toLocaleString()+` (requested ${zoneOption})`;}
}

// Ghati-Phala ➜ Time
document.getElementById('calc1').addEventListener('click',()=>{
  const dateStr=dateEl.value;
  const sunriseStr=sunriseEl.value;
  const ghatis=Number(ghatisEl.value||0);
  const phalas=Number(phalasEl.value||0);
  const sunrise=parseDateInput(dateStr,sunriseStr);
  if(!sunrise||isNaN(sunrise.getTime())){summary1.textContent='Invalid date or sunrise';iso1.textContent='';return;}
  const result=new Date(sunrise.getTime());
  result.setMinutes(result.getMinutes()+ghatis*GHATI_MINUTES);
  result.setSeconds(result.getSeconds()+phalas*PHALA_SECONDS);
  const tz=tzEl.value;
  summary1.innerHTML=`<strong>Birth time:</strong> ${formatDateForZone(result,tz==='local'?'local':tz)}`;
  iso1.textContent=`Birth (ISO local): ${result.toString()}`;
});

// Time ➜ Ghati-Phala
document.getElementById('calc2').addEventListener('click',()=>{
  const dateStr=date2.value;
  const sunriseStr=sunrise2.value;
  const timeStr=timehhmm.value;
  const sunrise=parseDateInput(dateStr,sunriseStr);
  let given=parseDateInput(dateStr,timeStr);
  if(!sunrise||!given||isNaN(sunrise.getTime())||isNaN(given.getTime())){summary2.textContent='Invalid date/time';iso2.textContent='';return;}
  // If given time is before sunrise, treat it as next day
  if(given.getTime()<sunrise.getTime()){
    given.setDate(given.getDate()+1);
  }
  const diffMs=given.getTime()-sunrise.getTime();
  if(diffMs<0){summary2.textContent='Given time is before sunrise!';iso2.textContent='';return;}
  const totalSeconds=Math.floor(diffMs/1000);
  const ghatis=Math.floor(totalSeconds/(GHATI_MINUTES*60));
  const remainingSeconds=totalSeconds-(ghatis*GHATI_MINUTES*60);
  const phalas=Math.floor(remainingSeconds/PHALA_SECONDS);
  summary2.innerHTML=`<strong>${ghatis} ghatis, ${phalas} phalas</strong> after sunrise.`;
  iso2.textContent=`Difference: ${totalSeconds} seconds`;
});

// Tab switching
const tab1=document.getElementById('tab1');
const tab2=document.getElementById('tab2');
const section1=document.getElementById('section1');
const section2=document.getElementById('section2');
tab1.addEventListener('click',()=>{tab1.classList.add('active');tab2.classList.remove('active');section1.classList.add('active');section2.classList.remove('active');});
tab2.addEventListener('click',()=>{tab2.classList.add('active');tab1.classList.remove('active');section2.classList.add('active');section1.classList.remove('active');});

// element refs
const dateEl=document.getElementById('date');
const sunriseEl=document.getElementById('sunrise');
const ghatisEl=document.getElementById('ghatis');
const phalasEl=document.getElementById('phalas');
const tzEl=document.getElementById('timezone');
const summary1=document.getElementById('summary1');
const iso1=document.getElementById('iso1');
const summary2=document.getElementById('summary2');
const iso2=document.getElementById('iso2');

// copy buttons
document.getElementById('copy1').addEventListener('click',async()=>{
  const text=summary1.textContent+"\n"+iso1.textContent;
  try{await navigator.clipboard.writeText(text);alert('Copied');}catch(e){alert('Copy failed');}
});
document.getElementById('copy2').addEventListener('click',async()=>{
  const text=summary2.textContent+"\n"+iso2.textContent;
  try{await navigator.clipboard.writeText(text);alert('Copied');}catch(e){alert('Copy failed');}
});
