var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

// 1. Boot sequence
(function () {
  var boot = document.getElementById('boot'), pre = document.getElementById('bootText');
  var lines = ['[ OK ] initializing secure session...', '[ OK ] loading modules: network, linux, pentest', '[ OK ] firewall: FortiOS 7.6 ........ active', '[ OK ] threat scan: 0 issues found', '[ OK ] identity verified: Yahya M. Refaat', '> ACCESS GRANTED'], i = 0, ended = false;
  function end() { if (ended) return; ended = true; boot.classList.add('done'); decrypt(); }
  document.getElementById('skip').onclick = end;
  if (reduce) return end();
  (function next() { if (ended) return; if (i < lines.length) { pre.textContent += lines[i++] + '\n'; setTimeout(next, 330); } else setTimeout(end, 500); })();
})();

// 2. Decrypt effect on the name
function decrypt() {
  var h = document.getElementById('name'), t = h.dataset.text, chars = '01#$%&@ABCDEFXYZ<>/', f = 0;
  if (reduce) { h.classList.add('glitch'); return; }
  var id = setInterval(function () {
    h.textContent = t.split('').map(function (c, k) { return c === ' ' || k < f ? c : chars[Math.floor(Math.random() * chars.length)]; }).join('');
    f += .5; if (f > t.length) { clearInterval(id); h.textContent = t; h.classList.add('glitch'); }
  }, 40);
}

// 3. Matrix rain
(function () {
  var c = document.getElementById('rain'), x = c.getContext('2d'), cols, drops, W, H, s = 16, set = '01ABCDEF<>{}/$#';
  function size() { W = c.width = innerWidth; H = c.height = innerHeight; cols = Math.floor(W / s); drops = Array.from({ length: cols }, function () { return Math.random() * H / s; }); }
  function draw() {
    x.fillStyle = 'rgba(4,7,10,.08)'; x.fillRect(0, 0, W, H); x.fillStyle = '#00ff9c'; x.font = s + 'px monospace';
    drops.forEach(function (d, i) { x.fillText(set[Math.floor(Math.random() * set.length)], i * s, d * s); if (d * s > H && Math.random() > .975) drops[i] = 0; drops[i]++; });
  }
  size(); addEventListener('resize', size); if (!reduce) setInterval(draw, 60);
})();

// Reveal, menu, year
var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
var btn = document.getElementById('menuBtn'), menu = document.getElementById('menu');
btn.onclick = function () { btn.setAttribute('aria-expanded', menu.classList.toggle('open')); };
menu.onclick = function (e) { if (e.target.tagName === 'A') menu.classList.remove('open'); };
document.getElementById('year').textContent = new Date().getFullYear();
console.log('%cCurious? I like that.', 'color:#00ff9c;font-size:18px;font-weight:bold');
