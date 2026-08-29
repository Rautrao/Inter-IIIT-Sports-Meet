import { Navbar } from './components/navbar.js';
import { ScrollReveal, animateCounters } from './components/animations.js';
document.addEventListener('DOMContentLoaded', () => {
  new Navbar();
  new ScrollReveal();
  animateCounters();
});
