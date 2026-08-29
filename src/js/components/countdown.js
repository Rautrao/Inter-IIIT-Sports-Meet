/** countdown.js */
export class Countdown {
  constructor(selector, targetDate) {
    this.el = document.querySelector(selector);
    this.target = new Date(targetDate).getTime();
    this._tick();
    this._interval = setInterval(() => this._tick(), 1000);
  }
  _tick() {
    const diff = this.target - Date.now();
    if (!this.el || diff <= 0) { this.destroy(); return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2, '0');
    const blk = (v, l) => {
      const n = document.createElement('span'); n.className = 'countdown-number'; n.textContent = pad(v);
      const lb = document.createElement('span'); lb.className = 'countdown-label'; lb.textContent = l;
      const d = document.createElement('div'); d.className = 'countdown-block';
      d.appendChild(n); d.appendChild(lb); return d.outerHTML;
    };
    const sep = '<span class="countdown-sep">:</span>';
    this.el.innerHTML = blk(d,'Days')+sep+blk(h,'Hours')+sep+blk(m,'Mins')+sep+blk(s,'Secs');
  }
  destroy() { clearInterval(this._interval); }
}
