const files = [
  {s:'1.jpg',t:'img'},{s:'2.jpg',t:'img'},{s:'3.jpg',t:'img'},{s:'4.jpg',t:'img'},{s:'5.jpg',t:'img'},
  {s:'6.jpg',t:'img'},{s:'7.jpg',t:'img'},{s:'8.jpg',t:'img'},{s:'9.jpg',t:'img'},{s:'10.jpg',t:'img'},
  {s:'11.jpg',t:'img'},{s:'12.jpg',t:'img'},{s:'13.jpg',t:'img'},{s:'14.jpg',t:'img'},{s:'15.jpg',t:'img'},
  {s:'16.jpg',t:'img'},{s:'17.jpg',t:'img'},{s:'18.jpg',t:'img'},{s:'19.jpg',t:'img'},{s:'20.jpg',t:'img'},
  {s:'21.jpg',t:'img'},{s:'21.2.jpg',t:'img'},{s:'23.jpg',t:'img'},{s:'23.3.jpg',t:'img'},{s:'23.4.jpg',t:'img'},
  {s:'video.mp4',t:'vid'}
];

const aud = document.getElementById('aud'), pBtn = document.getElementById('pBtn'), vn = document.getElementById('vn');
pBtn.onclick = () => {
  if (aud.paused) { aud.play(); pBtn.textContent = 'Пауза'; vn.classList.add('play'); }
  else { aud.pause(); pBtn.textContent = 'Слушать'; vn.classList.remove('play'); }
};

const stDate = new Date('2026-06-06T00:00:00');
setInterval(() => {
  const df = Math.abs(new Date() - stDate);
  document.getElementById('d').textContent = Math.floor(df / 86400000);
  document.getElementById('h').textContent = String(Math.floor((df / 3600000) % 24)).padStart(2,'0');
  document.getElementById('m').textContent = String(Math.floor((df / 60000) % 60)).padStart(2,'0');
  document.getElementById('s').textContent = String(Math.floor((df / 1000) % 60)).padStart(2,'0');
}, 1000);

const stg = document.getElementById('stg'), grd = document.getElementById('grd');
let z = 10, idx = 0, cur = 0;

function spawn() {
  const f = files[idx % files.length], i = idx % files.length; idx++;
  const el = document.createElement('div'); el.className = 'pop';
  el.style.left = Math.floor(Math.random() * Math.max(20, stg.clientWidth - 190)) + 'px';
  el.style.top = Math.floor(Math.random() * Math.max(20, stg.clientHeight - 200)) + 'px';
  el.style.setProperty('--r', (Math.random() * 24 - 12).toFixed(1) + 'deg');
  el.style.zIndex = z++;
  el.innerHTML = f.t === 'img' ? `<img src="${f.s}">` : `<video src="${f.s}" autoplay loop muted playsinline></video>`;
  el.onclick = () => { cur = i; openLb(f.s, f.t); };
  stg.appendChild(el);
  if (stg.children.length > 15) stg.removeChild(stg.firstChild);
}
setInterval(() => { if (!stg.classList.contains('hide')) spawn(); }, 1400);
function batch() { for (let i = 0; i < 6; i++) setTimeout(spawn, i * 160); }

files.forEach((f, i) => {
  const d = document.createElement('div'); d.className = 'g-item';
  d.innerHTML = f.t === 'img' ? `<img src="${f.s}" loading="lazy">` : `<video src="${f.s}" muted loop autoplay playsinline></video>`;
  d.onclick = () => { cur = i; openLb(f.s, f.t); };
  grd.appendChild(d);
});

document.getElementById('b1').onclick = () => { stg.classList.remove('hide'); grd.classList.remove('show'); document.getElementById('b1').classList.add('act'); document.getElementById('b2').classList.remove('act'); };
document.getElementById('b2').onclick = () => { stg.classList.add('hide'); grd.classList.add('show'); document.getElementById('b2').classList.add('act'); document.getElementById('b1').classList.remove('act'); };
document.getElementById('b3').onclick = batch;

function openLb(s, t) {
  document.getElementById('lb').classList.add('open');
  document.getElementById('lbC').innerHTML = t === 'img' ? `<img src="${s}">` : `<video src="${s}" controls autoplay></video>`;
}
document.querySelectorAll('[data-lb]').forEach(el => {
  el.onclick = () => { const s = el.getAttribute('data-lb'); cur = files.findIndex(x => x.s === s); openLb(s, 'img'); };
});
document.getElementById('clsB').onclick = () => { document.getElementById('lb').classList.remove('open'); document.getElementById('lbC').innerHTML = ''; };
document.getElementById('prevB').onclick = () => { cur = (cur - 1 + files.length) % files.length; openLb(files[cur].s, files[cur].t); };
document.getElementById('nextB').onclick = () => { cur = (cur + 1) % files.length; openLb(files[cur].s, files[cur].t); };

let stm = null;
const vid = document.getElementById('vid'), cnv = document.getElementById('cnv'), res = document.getElementById('res');
async function startCam() {
  try {
    stm = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
    vid.srcObject = stm; vid.style.display = 'block'; res.style.display = 'none';
    document.getElementById('ph').style.display = 'none'; document.getElementById('c1').style.display = 'block'; document.getElementById('c2').style.display = 'none';
  } catch (e) { alert('Разреши доступ к камере в браузере.'); }
}
document.getElementById('camBtn').onclick = startCam;
document.getElementById('reBtn').onclick = startCam;
document.getElementById('snapBtn').onclick = () => {
  cnv.width = 660; cnv.height = 760;
  const ctx = cnv.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 660, 760);
  const ms = Math.min(vid.videoWidth, vid.videoHeight);
  ctx.save(); ctx.translate(660, 0); ctx.scale(-1, 1);
  ctx.drawImage(vid, (vid.videoWidth - ms)/2, (vid.videoHeight - ms)/2, ms, ms, 30, 30, 600, 600); ctx.restore();
  ctx.fillStyle = '#1e1c1a'; ctx.font = 'bold 42px Caveat, cursive'; ctx.textAlign = 'center'; ctx.fillText('Полгода отношений', 330, 695);
  ctx.fillStyle = '#b85d6f'; ctx.font = '32px Cormorant Garamond, serif'; ctx.fillText('06.12.2026', 330, 738);
  res.src = cnv.toDataURL('image/png'); res.style.display = 'block'; vid.style.display = 'none';
  document.getElementById('c1').style.display = 'none'; document.getElementById('c2').style.display = 'block';
  if (stm) stm.getTracks().forEach(t => t.stop());
};
document.getElementById('dlBtn').onclick = () => { const a = document.createElement('a'); a.download = '06-12-2026.png'; a.href = cnv.toDataURL('image/png'); a.click(); };
batch();
