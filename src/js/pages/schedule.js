import { Navbar } from '../components/navbar.js';
import { ScrollReveal } from '../components/animations.js';
import { getSchedule } from '../utils/api.js';
document.addEventListener('DOMContentLoaded', async () => {
  new Navbar();
  const schedule = await getSchedule();
  const tabsEl = document.getElementById('day-tabs');
  const panelsEl = document.getElementById('day-panels');
  if (!tabsEl || !panelsEl) return;
  tabsEl.innerHTML = schedule.map((day, i) => {
    const lbl = new Date(day.date).toLocaleDateString('en-IN', {month:'short', day:'numeric'});
    return '<button class="day-tab '+(i===0?'active ':'')+"'" + ' data-day="'+i+'">Day '+day.day+' - '+lbl+'</button>';
  }).join('');
  panelsEl.innerHTML = schedule.map((day, i) => {
    const evs = day.events.map(e =>
      '<div class="timeline-item reveal"><div class="timeline-dot"></div>' +
      '<div class="timeline-time">'+e.time+'</div>' +
      '<div class="timeline-card"><h4>'+e.sport+'</h4><p>'+e.teams+'</p>' +
      '<div class="timeline-meta"><span>'+e.venue+'</span>' +
      '<span class="badge badge-'+e.status+'">'+e.status+'</span></div></div></div>'
    ).join('');
    return '<div class="day-panel '+(i===0?'active ':'')+"'" + ' id="panel-'+i+'"><div class="timeline">'+evs+'</div></div>';
  }).join('');
  tabsEl.addEventListener('click', e => {
    const btn = e.target.closest('.day-tab'); if (!btn) return;
    const idx = +btn.dataset.day;
    document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.day-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-'+idx)?.classList.add('active');
  });
  new ScrollReveal();
});
