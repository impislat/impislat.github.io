const intro=document.getElementById('intro');
setTimeout(()=>intro.classList.add('done'),1900);

const cursor=document.querySelector('.cursor'),ring=document.querySelector('.cursor-ring');
if(cursor&&ring&&matchMedia('(pointer:fine)').matches){
  let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;cursor.style.left=x+'px';cursor.style.top=y+'px'});
  function loop(){rx+=(x-rx)*.14;ry+=(y-ry)*.14;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)} loop();
  document.querySelectorAll('a,button,.release-card,.track').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ring.style.width='60px';ring.style.height='60px'});
    el.addEventListener('mouseleave',()=>{ring.style.width='32px';ring.style.height='32px'});
  });
}

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(Math.min(i%5,4)*.06)+'s';io.observe(el)});

const hero=document.querySelector('.hero-media img');
addEventListener('scroll',()=>{if(hero&&scrollY<innerHeight)hero.style.transform=`scale(1.04) translateY(${scrollY*.045}px)`},{passive:true});

const tracks=[
['FUKPEPL','01:44'],['RICHEVIL','01:52'],['KILLER SHAWTY','02:06'],['BEAUTIFUL','01:42'],
['SHE WANT CHANEL','01:37'],['SHUTMEUP','01:19'],['CHANEL PRAYER','01:31'],['PRNHUB','01:13'],
['IM LAGERFELD','01:46'],['GIVE MY CUPS','02:16'],['CASKET','01:08'],['FRIED','01:51'],
['PSYCHO','01:50'],['I LOVE','02:15'],['SEE BEST BEE','01:05'],['KRAZYOKE','01:18'],['ROCKU','01:24']
];
const list=document.getElementById('tracklist');
tracks.forEach((t,i)=>{
  const row=document.createElement('div');row.className='track';
  row.innerHTML=`<span class="num">${String(i+1).padStart(2,'0')}</span><span class="name">${t[0]}</span><span class="dur">${t[1]}</span><button aria-label="Play ${t[0]}">▶</button>`;
  row.addEventListener('click',()=>startTrack(i));list.appendChild(row);
});

const audio=document.getElementById('audio'),playBtn=document.getElementById('playBtn'),player=document.getElementById('player');
const nowTitle=document.getElementById('nowTitle'),currentTime=document.getElementById('currentTime'),duration=document.getElementById('duration');
const wave=document.getElementById('wave');
for(let i=0;i<54;i++){const b=document.createElement('i');b.style.setProperty('--h',(4+Math.random()*20)+'px');wave.appendChild(b)}

let current=-1;
function startTrack(i){
  current=i;nowTitle.textContent=`CH4NEL — ${tracks[i][0]}`;
  player.classList.add('active');
  const local=`assets/audio/ch4nel-${String(i+1).padStart(2,'0')}.mp3`;
  audio.src=local; audio.play().catch(()=>{});
  playBtn.textContent='Ⅱ';
}
playBtn.addEventListener('click',()=>{if(!audio.src){startTrack(current<0?0:current);return} if(audio.paused){audio.play();playBtn.textContent='Ⅱ'}else{audio.pause();playBtn.textContent='▶'}});
audio.addEventListener('loadedmetadata',()=>duration.textContent=fmt(audio.duration));
audio.addEventListener('timeupdate',()=>currentTime.textContent=fmt(audio.currentTime));
audio.addEventListener('play',()=>{playBtn.textContent='Ⅱ';player.classList.add('active')});
audio.addEventListener('pause',()=>playBtn.textContent='▶');
audio.addEventListener('error',()=>{playBtn.textContent='▶'});
function fmt(s){if(!isFinite(s))return'00:00';return String(Math.floor(s/60)).padStart(2,'0')+':'+String(Math.floor(s%60)).padStart(2,'0')}

document.getElementById('playerExpand').addEventListener('click',()=>document.querySelector('.track-section').scrollIntoView({behavior:'smooth'}));

const albums={
 ch4nel:{year:'2025 / ALBUM',title:'CH4NEL',meta:'17 TRACKS / 27 MIN / 31 AUG 2025',img:'assets/portrait-01.png',link:'https://music.apple.com/us/album/ch4nel/1838449898',tracks:tracks.map(x=>x[0])},
 egocentrism:{year:'2023 / ALBUM',title:'EGOCENTRISM',meta:'14 TRACKS / 23 MIN / 08 DEC 2023',img:'assets/portrait-03.png',link:'https://music.apple.com/us/album/egocentrism/1721676147',tracks:['ALKO SPRITE','EGOCENTRISM','14 PIECES','ARCHIVE']},
 opium:{year:'2023 / ALBUM',title:'OPIUM VIBE',meta:'2023 / ALBUM',img:'assets/portrait-04.png',link:'https://music.apple.com/us/artist/young-imp18/1519594602',tracks:['OPIUM VIBE','ARCHIVE']},
 lovecheese:{year:'2022 / ALBUM',title:'LOVECHEESE',meta:'14 TRACKS / 28 MIN / 18 NOV 2022',img:'assets/portrait-02.png',link:'https://music.apple.com/us/album/lovecheese/1653071388',tracks:['ВСЕГО ЛИШЬ СОН','ГДЕ ТУТ ОШИБКИ','JERSEY LOVE','ЗАБРАТЬ ПРОСТО','ЗАЛИП НА ГЛАЗА','ДЕМОН','ПОКАЖИ ЛЮБОВЬ','ПОСТЕЛЬНАЯ РАБОТА','ИГРОК','ФУ','СВЕТ, ЦВЕТ','СЫРНОЕ УТРО','ЧУВСТВА','ТОЛЬКО С НЕЙ']},
 airroom:{year:'2022 / ALBUM',title:'AIR ROOM',meta:'10 TRACKS / 19 MIN / 10 JUN 2022',img:'assets/portrait-04.png',link:'https://music.apple.com/ru/album/air-room/1628982448',tracks:['ПРОСТОТА','АБЬЮЗ','ВЕТЕР МОСКВЫ','AIR ROOM','УСТАВШИЕ','ПОДРЯДКИ','IMPI ON DARK','ПИАНИСТ']},
 bestcheese:{year:'2022 / EP',title:'BEST CHEESE',meta:'4 TRACKS / 7 MIN',img:'assets/portrait-01.png',link:'https://music.apple.com/us/artist/young-imp18/1519594602',tracks:['BEST CHEESE','ARCHIVE','2022','IMP18']},
 summer:{year:'2024 / EP',title:'SUMMER FLEX',meta:'2024 / EP',img:'assets/portrait-03.png',link:'https://music.apple.com/sk/album/summer-flex-ep/1760156075',tracks:['SUMMER FLEX','ARCHIVE']},
 singles:{year:'2024 / SINGLES',title:'NO LOVE / PHANTOM',meta:'2024',img:'assets/portrait-02.png',link:'https://music.apple.com/us/artist/young-imp18/1519594602',tracks:['NO LOVE','PHANTOM','BAEBAELOVEME']},
 singles25:{year:'2025 / SINGLE',title:'LIKE DEATH',meta:'2025',img:'assets/portrait-04.png',link:'https://music.apple.com/fr/album/like-death-single/1797025928',tracks:['LIKE DEATH']}
};
const modal=document.getElementById('albumModal');
function openAlbum(id){
 const a=albums[id]; if(!a)return;
 document.getElementById('modalYear').textContent=a.year;
 document.getElementById('modalTitle').textContent=a.title;
 document.getElementById('modalMeta').textContent=a.meta;
 document.getElementById('modalArt').src=a.img;
 document.getElementById('modalLink').href=a.link;
 document.getElementById('modalTracks').innerHTML=a.tracks.map((t,i)=>`<div><span>${String(i+1).padStart(2,'0')} &nbsp; ${t}</span><span>↗</span></div>`).join('');
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('lock');
}
document.querySelectorAll('[data-open]').forEach(el=>el.addEventListener('click',()=>openAlbum(el.dataset.open)));
document.querySelector('.modal-close').addEventListener('click',closeModal);
document.querySelector('.modal-backdrop').addEventListener('click',closeModal);
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('lock')}
addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();document.getElementById('secret').classList.remove('show');}});

let secretCount=0;document.querySelector('.brand').addEventListener('click',e=>{secretCount++;if(secretCount>=5){e.preventDefault();document.getElementById('secret').classList.add('show');secretCount=0}});
