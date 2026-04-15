(() => {
  'use strict';

  // ── DOM refs (queried once) ──────────────────────────────────────────────
  const root            = document.documentElement;
  const themeToggle     = document.getElementById('themeToggle');
  const fontToggle      = document.getElementById('fontToggle');
  const menuToggle      = document.getElementById('menuToggle');
  const closeMenuBtn    = document.getElementById('closeMenu');
  const menu            = document.getElementById('menu');
  const backdrop        = document.getElementById('backdrop');
  const filterWrap      = document.getElementById('project-filter-wrap'); // cached here, not inside listener

  // ── Theme ────────────────────────────────────────────────────────────────
  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  applyTheme(localStorage.getItem('theme') || getSystemTheme());

  themeToggle?.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // ── Font size ────────────────────────────────────────────────────────────
  function applyFont(px) {
    root.style.fontSize = px;
    localStorage.setItem('fontSize', px);
    if (fontToggle) fontToggle.textContent = px === '18px' ? 'A-' : 'A+';
  }

  applyFont(localStorage.getItem('fontSize') || '16px');

  fontToggle?.addEventListener('click', () => {
    applyFont(localStorage.getItem('fontSize') === '18px' ? '16px' : '18px');
  });

  // ── Mobile menu ─────────────────────────────────────────────────────────
  const isMobile = () => window.matchMedia('(max-width: 760px)').matches;

  function openMenu() {
    if (!isMobile()) return;
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    menuToggle?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    menu?.classList.add('hidden');
    backdrop?.classList.add('hidden');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  closeMenu(); // ensure closed on load

  menuToggle?.addEventListener('click', () => {
    menu.classList.contains('hidden') ? openMenu() : closeMenu();
  });
  closeMenuBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);
  menu?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (!isMobile()) closeMenu(); });

  // ── Scroll-reveal ────────────────────────────────────────────────────────
  const SELECTORS = [
    '#home', '#home .profile-pic', '#home .hero-title', '#home .hero-sub',
    '#home .cta-btn', '#about', '#projects', '.project', '#skills',
    '#contact', 'footer', '.github-title', '#timer',
    '#visitor-section'
  ];

  const targets = [];
  SELECTORS.forEach(sel =>
    document.querySelectorAll(sel).forEach(el => {
      if (!targets.includes(el)) targets.push(el);
    })
  );

  targets.forEach(el => el.classList.add('reveal'));

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('show'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('show');
          obs.unobserve(target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    targets.forEach(el => io.observe(el));
  }

  // ── Project filter & sort ────────────────────────────────────────────────
  const projects       = Array.from(document.querySelectorAll('.project'));
  const filterBtn      = document.getElementById('project-filter-btn');
  const filterMenu     = document.getElementById('project-filter-menu');
  const filterOptions  = Array.from(document.querySelectorAll('.custom-option'));
  const sortYearBtn    = document.getElementById('sort-year');
  const sortNameBtn    = document.getElementById('sort-name');
  const noProjectsMsg  = document.getElementById('no-projects-msg');
  const projectGrid    = document.getElementById('project-grid');

  let currentSort     = null;
  let selectedCategory = 'all';

  function filterProjects() {
    let visible = projects.filter(p =>
      selectedCategory === 'all' || p.dataset.category === selectedCategory
    );

    if (currentSort === 'year') {
      visible.sort((a, b) => Number(b.dataset.year) - Number(a.dataset.year));
    } else if (currentSort === 'name') {
      visible.sort((a, b) => (a.dataset.title || '').localeCompare(b.dataset.title || ''));
    }

    projects.forEach(p => p.style.display = 'none');
    visible.forEach(p => { p.style.display = ''; projectGrid?.appendChild(p); });
    if (noProjectsMsg) noProjectsMsg.hidden = visible.length > 0;
  }

  filterBtn?.addEventListener('click', () => {
    const open = !filterMenu.classList.contains('hidden');
    filterMenu.classList.toggle('hidden');
    filterBtn.setAttribute('aria-expanded', String(!open));
  });

  filterOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      selectedCategory = opt.dataset.value || 'all';
      filterBtn.textContent = opt.textContent.trim();
      filterOptions.forEach(o => { o.classList.remove('selected'); o.setAttribute('aria-selected', 'false'); });
      opt.classList.add('selected');
      opt.setAttribute('aria-selected', 'true');
      filterMenu.classList.add('hidden');
      filterBtn.setAttribute('aria-expanded', 'false');
      filterProjects();
    });
  });

  // Close filter dropdown on outside click
  document.addEventListener('click', e => {
    if (filterWrap && !filterWrap.contains(e.target)) {
      filterMenu?.classList.add('hidden');
      filterBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  function toggleSort(type, activeBtn, otherBtn) {
    currentSort = currentSort === type ? null : type;
    activeBtn.classList.toggle('active', currentSort === type);
    otherBtn.classList.remove('active');
    filterProjects();
  }

  sortYearBtn?.addEventListener('click', () => toggleSort('year', sortYearBtn, sortNameBtn));
  sortNameBtn?.addEventListener('click', () => toggleSort('name', sortNameBtn, sortYearBtn));

  filterProjects(); // initial render

  // ── Contact form ─────────────────────────────────────────────────────────
  const contactForm  = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const EMAIL_RE     = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function showFeedback(msg, type) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className   = `form-message show ${type}`;
  }

  contactForm?.addEventListener('submit', async e => {
    e.preventDefault();

    const name    = document.getElementById('name')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !subject || !message) {
      return showFeedback('Please fill in all fields before sending.', 'error');
    }
    if (!EMAIL_RE.test(email)) {
      return showFeedback('Please enter a valid email address.', 'error');
    }

    showFeedback('Sending…', 'success');

    try {
      await emailjs.send('service_tm9i09c', 'template_jho9g2r', {
        from_name: name, from_email: email, subject, message
      });
      showFeedback('Message sent successfully!', 'success');
      contactForm.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      showFeedback('Failed to send. Please try again.', 'error');
    }
  });

  // ── Visit timer (sessionStorage) ─────────────────────────────────────────
  const timerEl = document.getElementById('visit-timer');
  let seconds   = Number(sessionStorage.getItem('time')) || 0;

  function fmt(s) {
    if (s < 60) return `${s} second${s !== 1 ? 's' : ''}`;
    const m = Math.floor(s / 60), r = s % 60;
    return `${m} minute${m !== 1 ? 's' : ''} and ${r} second${r !== 1 ? 's' : ''}`;
  }

  if (timerEl) {
    timerEl.textContent = fmt(seconds);
    setInterval(() => {
      sessionStorage.setItem('time', ++seconds);
      timerEl.textContent = fmt(seconds);
    }, 1000);
  }

  // ── Visitor name (localStorage) ──────────────────────────────────────────
  const nameInput   = document.getElementById('visitor-name');
  const saveBtn     = document.getElementById('save-name');
  const clearBtn    = document.getElementById('clear-name');
  const nameDisplay = document.getElementById('name-display');

  let storedName = localStorage.getItem('visitorName') || '';

  function renderName() {
    if (nameDisplay) {
      nameDisplay.textContent = storedName.trim()
        ? `Welcome, ${storedName}!`
        : 'Welcome, guest!';
    }
  }

  renderName();

  saveBtn?.addEventListener('click', () => {
    const val = nameInput?.value.trim();
    if (val) {
      storedName = val;
      localStorage.setItem('visitorName', val);
      renderName();
      if (nameInput) nameInput.value = '';
    }
  });

  clearBtn?.addEventListener('click', () => {
    storedName = '';
    localStorage.removeItem('visitorName');
    renderName();
    if (nameInput) nameInput.value = '';
  });

    // ── Scroll Progress Bar ──────────────────────────────────────────────────
  const progressBar = document.getElementById('scroll-progress');
 
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrolled  = document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = maxScroll > 0
        ? `${(scrolled / maxScroll) * 100}%`
        : '0%';
    }, { passive: true });
  }

  // ── GitHub repos ─────────────────────────────────────────────────────────
  const reposContainer = document.getElementById('github-repos');
  const GH_USER        = 'RaneemAlshahrani';

  const LANG_COLORS = {
    JavaScript: '#f1e05a',
    HTML:       '#e34c26',
    CSS:        '#563d7c',
    Python:     '#3572A5',
    Java:       '#b07219'
  };

function relativeDate(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;
  if (diffMs < minute) return 'just now';
  const minutes = Math.ceil(diffMs / minute);
  if (diffMs < hour) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;}
  const hours = Math.ceil(diffMs / hour);
  if (diffMs < day) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;}
  const days = Math.ceil(diffMs / day);
  if (days === 1) return 'yesterday';
  if (diffMs < week) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;}
  const weeks = Math.ceil(diffMs / week);
  if (diffMs < month) {
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;}
  const months = Math.ceil(diffMs / month);
  if (diffMs < year) {
    return `${months} month${months !== 1 ? 's' : ''} ago`;}
  const years = Math.ceil(diffMs / year);
  return `${years} year${years !== 1 ? 's' : ''} ago`;}

  function repoCard(repo) {
    const color = LANG_COLORS[repo.language] || '#8b5cf6';
    const langHtml = repo.language
      ? `<span class="language-dot" style="background:${color}"></span>${repo.language}`
      : '';
    // Sanitise text to prevent XSS
    const safe = str => str
      ? str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
      : '';

    return `<article class="repo-card">
      <div class="repo-header">
        <h3><a href="${safe(repo.html_url)}" target="_blank" rel="noopener noreferrer">${safe(repo.name)}</a></h3>
        <span class="repo-badge public">Public</span>
      </div>
      <p class="repo-description">${safe(repo.description) || 'No description available.'}</p>
      <div class="repo-meta">
        <span class="repo-language">${langHtml}</span>
        <span class="repo-updated">Updated ${relativeDate(repo.updated_at)}</span>
      </div>
    </article>`;
  }

  // ── GitHub stats counter animation ──────────────────────────────────────
  function animateCounter(el, target, duration = 1200) {
    if (!el) return;
    const start     = performance.now();
    const startVal  = 0;
 
    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out curve
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(startVal + (target - startVal) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
 
  async function fetchRepos() {
    if (!reposContainer) return;
 
    try {
      // Fetch repos and user profile in parallel
      const [repoRes, userRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=100`),
        fetch(`https://api.github.com/users/${GH_USER}`)
      ]);
 
      if (!repoRes.ok) throw new Error(`Repos HTTP ${repoRes.status}`);
      if (!userRes.ok) throw new Error(`User HTTP ${userRes.status}`);
 
      const [allRepos, userData] = await Promise.all([repoRes.json(), userRes.json()]);
 
      // ── Stats ────────────────────────────────────────────────────────────
      const ownRepos   = allRepos.filter(r => !r.fork);
      const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
      const followers  = userData.followers ?? 0;
 
      // Animate each stat counter
      animateCounter(document.getElementById('stat-repos'),     ownRepos.length);
      animateCounter(document.getElementById('stat-stars'),     totalStars);
      animateCounter(document.getElementById('stat-followers'), followers);
 
      // ── Repo cards ───────────────────────────────────────────────────────
      const repos = ownRepos
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
 
      reposContainer.innerHTML = repos.length
        ? repos.map(repoCard).join('')
        : '<p class="empty-message">No repositories found.</p>';
 
      // Ensure dynamically-injected cards are never hidden by the reveal system
      reposContainer.classList.add('show');
      reposContainer.querySelectorAll('.repo-card').forEach(c => c.classList.add('show'));
 
    } catch (err) {
      console.error('GitHub fetch error:', err);
      reposContainer.innerHTML = '<p class="error-message">Unable to load repositories. Please try again later.</p>';
      // Show dashes in stats on failure
      ['stat-repos','stat-stars','stat-followers'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '—';
      });
    }
  }
 
  // Fetch repos when page fully loaded (avoids blocking initial render)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchRepos);
  } else {
    fetchRepos();
  }
 
})();