// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

// Theme toggle with persistence
(function themeToggle() {
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
    if (toggle) toggle.textContent = 'Light';
  }
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    var isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggle.textContent = isDark ? 'Light' : 'Dark';
  });
})();

// Sticky nav active section highlighting
(function activeNav() {
  var links = Array.prototype.slice.call(document.querySelectorAll('header .nav-link[href^="#"]'));
  if (!('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.getAttribute('id');
      if (!id) return;
      var link = links.find(function (l) { return l.getAttribute('href') === '#' + id; });
      if (link) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.1, 0.5, 1] });
  document.querySelectorAll('section, div[id]').forEach(function (el) {
    var id = el.getAttribute('id');
    if (id && ['intro','about','skills','experience','education','portfolio','references','contact'].indexOf(id) !== -1) {
      observer.observe(el);
    }
  });
})();

// Scroll progress and back-to-top
(function scrollUI() {
  var bar = document.getElementById('scroll-progress-bar');
  var btn = document.getElementById('backToTop');
  var onScroll = function () {
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var height = doc.scrollHeight - doc.clientHeight;
    var progress = height > 0 ? (scrollTop / height) * 100 : 0;
    if (bar) bar.style.width = progress + '%';
    if (btn) btn.style.display = scrollTop > 400 ? 'inline-block' : 'none';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (btn) btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();

// Lightbox for project images
(function lightbox() {
  var overlay = document.getElementById('lightbox');
  var img = document.getElementById('lightboxImage');
  if (!overlay || !img) return;
  function open(src, alt) {
    img.src = src; img.alt = alt || 'Project image';
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
  }
  function close() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    img.src = '';
  }
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target.classList.contains('modal-close')) close();
  });
  document.querySelectorAll('.project-lightbox').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = btn.getAttribute('data-image');
      var imgEl = btn.previousElementSibling && btn.previousElementSibling.querySelector('img');
      open(src, imgEl ? imgEl.alt : 'Project image');
    });
  });
})();

// Contact form enhancements (honeypot + time-on-page + inline success)
(function contactForm() {
  var form = document.getElementById('contactForm');
  var startedAt = Date.now();
  var timeField = document.getElementById('formTime');
  var success = document.getElementById('formSuccess');
  if (!form) return;
  form.addEventListener('submit', function () {
    if (timeField) timeField.value = String(Math.round((Date.now() - startedAt) / 1000));
    var handler = function () {
      if (success) success.style.display = 'block';
      form.reset();
      window.setTimeout(function(){ if (success) success.style.display = 'none'; }, 6000);
      document.getElementById('formTarget').removeEventListener('load', handler);
    };
    document.getElementById('formTarget').addEventListener('load', handler);
  });
})();

// Copy-to-clipboard for contact info and vCard generation
(function contacts() {
  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (!text) return;
      navigator.clipboard && navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied';
        setTimeout(function(){ btn.textContent = 'Copy'; }, 1500);
      });
    });
  });
  // vCard link
  var v = document.getElementById('vcardLink');
  if (!v) return;
  var vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Mohammed;Junaid;;;',
    'FN:Junaid Mohammed',
    'EMAIL;TYPE=INTERNET,PREF:junaidmohammed723@gmail.com',
    'TEL;TYPE=CELL:+14046447985',
    'ADR;TYPE=HOME:;;Marietta;GA;;USA',
    'END:VCARD'
  ].join('\n');
  var blob = new Blob([vcard], { type: 'text/vcard' });
  v.href = URL.createObjectURL(blob);
})();
