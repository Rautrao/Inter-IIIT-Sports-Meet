import { Navbar } from '../components/navbar.js';
import { ScrollReveal } from '../components/animations.js';
import { getInstitutes } from '../utils/api.js';
import { debounce } from '../utils/helpers.js';
let allInstitutes = [];
document.addEventListener('DOMContentLoaded', async () => {
  new Navbar(); allInstitutes = await getInstitutes(); renderGrid(allInstitutes);
  const input = document.getElementById('team-search');
  input?.addEventListener('input', debounce(() => {
    const q = input.value.toLowerCase();
    renderGrid(allInstitutes.filter(i => i.name.toLowerCase().includes(q) || i.city.toLowerCase().includes(q)));
  }));
});
function renderGrid(institutes) {
  const grid = document.getElementById('teams-grid');
  if (!grid) return;
  grid.innerHTML = institutes.map(i =>
    '<div class="card institute-card reveal">' +
    '<div class="institute-avatar">'+i.abbr.slice(0,2)+'</div>' +
    '<h4>'+i.abbr+'</h4><p>'+i.name+'</p>' +
    '<small>'+i.city+(i.isHost?' (Host)':'')+'</small></div>'
  ).join('');
  new ScrollReveal('.reveal');
}
