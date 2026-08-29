import { Navbar } from '../components/navbar.js';
import { Countdown } from '../components/countdown.js';
import { ScrollReveal, animateCounters } from '../components/animations.js';
import { getSports, getInstitutes, getSchedule, getMedalTally } from '../utils/api.js';
document.addEventListener('DOMContentLoaded', async () => {
  new Navbar(); new ScrollReveal(); animateCounters();
  new Countdown('#countdown', '2025-10-01T09:00:00');
  const [sports, institutes, schedule, tally] = await Promise.all([
    getSports(), getInstitutes(), getSchedule(), getMedalTally()
  ]);
  const sg = document.getElementById('sports-grid');
  if (sg) { sg.innerHTML = sports.map(s =>
    '<div class="card sport-card reveal"><div class="sport-card-body">' +
    '<div class="sport-card-icon">'+s.icon+'</div><h3>'+s.name+'</h3>' +
    '<p>'+s.teams+' teams participating</p>' +
    '<span class="sport-card-tag">'+s.category+'</span></div></div>'
  ).join(''); new ScrollReveal('.reveal'); }
  const ig = document.getElementById('institutes-grid');
  if (ig) ig.innerHTML = institutes.map(i =>
    '<div class="card institute-card reveal"><div class="institute-avatar">'+i.abbr.slice(0,2)+'</div>' +
    '<h4>'+i.abbr+'</h4><p>'+i.city+(i.isHost?' &bull; Host':'')+'</p></div>'
  ).join('');
  const sp = document.getElementById('schedule-preview');
  if (sp && schedule[0]) sp.innerHTML = schedule[0].events.slice(0,4).map(e =>
    '<div class="schedule-row"><span class="schedule-time">'+e.time+'</span>' +
    '<span class="schedule-sport">'+e.sport+'</span>' +
    '<span class="badge badge-'+e.status+'">'+e.status+'</span></div>'
  ).join('');
  const mp = document.getElementById('medal-preview');
  if (mp) mp.innerHTML = tally.slice(0,5).map(t =>
    '<div class="schedule-row"><span class="schedule-time">#'+t.rank+'</span>' +
    '<span class="schedule-sport">'+t.abbr+'</span>' +
    '<span style="font-size:.75rem;color:#fbbf24">G:'+t.gold+'</span>' +
    '<span style="font-size:.75rem;color:#94a3b8">S:'+t.silver+'</span>' +
    '<span style="font-size:.75rem;color:#b45309">B:'+t.bronze+'</span></div>'
  ).join('');
});
