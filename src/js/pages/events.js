import { Navbar } from '../components/navbar.js';
import { ScrollReveal } from '../components/animations.js';
import { getSports } from '../utils/api.js';
let allSports = [];
document.addEventListener('DOMContentLoaded', async () => {
  new Navbar(); allSports = await getSports(); renderGrid(allSports);
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.filter;
      renderGrid(cat === 'all' ? allSports : allSports.filter(s => s.category === cat));
    });
  });
});
function renderGrid(sports) {
  const grid = document.getElementById('events-grid');
  if (!grid) return;
  grid.innerHTML = sports.map(s =>
    '<div class="card sport-card reveal"><div class="sport-card-body">' +
    '<div class="sport-card-icon">'+s.icon+'</div><h3>'+s.name+'</h3>' +
    '<p>'+s.teams+' teams'+s.category+'</p>' +
    '<span class="badge badge-'+s.status+'" style="margin-top:1rem">'+s.status+'</span>' +
    '</div></div>'
  ).join('');
  new ScrollReveal('.reveal');
}
