/** animations.js - Scroll reveal and counter animations. */
export class ScrollReveal {
  constructor(selector = '.reveal') {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(selector).forEach(el => obs.observe(el));
  }
}

export function animateCounters(selector = '[data-counter]') {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = +e.target.dataset.counter;
      const inc = target / (1800 / 16);
      let cur = 0;
      const timer = setInterval(() => {
        cur = Math.min(cur + inc, target);
        e.target.textContent = Math.floor(cur).toLocaleString();
        if (cur >= target) clearInterval(timer);
      }, 16);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(selector).forEach(el => obs.observe(el));
}
