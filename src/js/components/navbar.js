/** navbar.js - Scroll glass effect, mobile menu, active link. */
export class Navbar {
  constructor() {
    this.navbar = document.querySelector('[data-navbar]');
    this.toggle = document.querySelector('[data-navbar-toggle]');
    this.drawer = document.querySelector('[data-navbar-drawer]');
    this.links  = document.querySelectorAll('[data-navbar-link]');
    this._init();
  }
  _init() {
    window.addEventListener('scroll', () => this._onScroll(), { passive: true });
    this.toggle?.addEventListener('click', () => this._toggleDrawer());
    this._setActiveLink();
    this._onScroll();
  }
  _onScroll() { this.navbar?.classList.toggle('scrolled', window.scrollY > 20); }
  _toggleDrawer() {
    const open = this.drawer?.classList.toggle('open');
    this.toggle?.classList.toggle('open', open);
  }
  _setActiveLink() {
    const path = location.pathname.split('/').pop() || 'index.html';
    this.links.forEach(a => {
      const href = a.getAttribute('href').split('/').pop();
      a.classList.toggle('active', href === path);
    });
  }
}
