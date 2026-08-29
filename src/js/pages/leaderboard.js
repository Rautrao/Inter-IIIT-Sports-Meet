import { Navbar } from '../components/navbar.js';
import { ScrollReveal } from '../components/animations.js';
import { getMedalTally } from '../utils/api.js';
let tally = [], sortKey = 'gold';
document.addEventListener('DOMContentLoaded', async () => {
  new Navbar(); tally = await getMedalTally();
  renderPodium(tally.slice(0,3)); renderTable(tally);
  document.querySelectorAll('[data-sort]').forEach(btn => {
    btn.addEventListener('click', () => {
      sortKey = btn.dataset.sort;
      document.querySelectorAll('[data-sort]').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline'); });
      btn.classList.remove('btn-outline'); btn.classList.add('btn-primary');
      renderTable([...tally].sort((a,b) => b[sortKey]-a[sortKey]));
    });
  });
  new ScrollReveal();
});
function renderPodium(top) {
  const podium = document.getElementById('podium');
  if (!podium || top.length < 3) return;
  const [first, second, third] = top;
  const place = (p, cls, h) =>
    '<div class="podium-place '+cls+'">' +
    '<div class="podium-avatar">'+p.abbr.slice(0,2)+'</div>' +
    '<p style="font-size:.875rem;font-weight:600">'+p.abbr+'</p>' +
    '<div class="podium-block" style="height:'+h+'px">'+(cls==='first'?1:cls==='second'?2:3)+'</div></div>';
  podium.innerHTML = place(second,'second',70)+place(first,'first',90)+place(third,'third',55);
}
function renderTable(data) {
  const tbody = document.getElementById('tally-body');
  if (!tbody) return;
  const cls = r => r===1?'gold':r===2?'silver':r===3?'bronze':'';
  tbody.innerHTML = data.map(t =>
    '<tr><td><span class="tbl-rank '+cls(t.rank)+'">'+t.rank+'</span></td>' +
    '<td><strong>'+t.institute+'</strong></td>' +
    '<td class="medal-cell" style="color:#fbbf24">'+t.gold+'</td>' +
    '<td class="medal-cell" style="color:#94a3b8">'+t.silver+'</td>' +
    '<td class="medal-cell" style="color:#b45309">'+t.bronze+'</td>' +
    '<td class="medal-cell"><strong>'+t.total+'</strong></td></tr>'
  ).join('');
}
