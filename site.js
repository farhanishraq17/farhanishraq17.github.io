// Shared shell for every page: nav, footer, dark mode, back-to-top.
// Edit NAV / SOCIALS here once and every page picks it up.

const NAV = [
  ['index.html', 'Home'],
  ['publications.html', 'Publications'],
  ['projects.html', 'Projects'],
  ['blog.html', 'Blog'],
  ['cv.html', 'CV'],
];

const stroke = (d, size = 20) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const filled = (d) =>
  `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;

const ICON = {
  email: stroke('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>', 22),
  github: filled('M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'),
  linkedin: filled('M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'),
  moon: stroke('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'),
  sun: stroke('<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'),
  up: stroke('<polyline points="18 15 12 9 6 15"/>'),
};

const SOCIALS = [
  ['mailto:farhanishraq17@iut-dhaka.edu', 'Email', ICON.email],
  ['https://github.com/farhanishraq17', 'GitHub', ICON.github],
  ['https://www.linkedin.com/in/farhan-ishraq-04643928a/', 'LinkedIn', ICON.linkedin],
];

const page = location.pathname.split('/').pop() || 'index.html';

document.getElementById('site-nav').outerHTML = `
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <nav class="nav" aria-label="Main navigation">
    ${NAV.map(([href, label]) => `<a href="${href}"${href === page ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
    <button id="theme-toggle" class="theme-toggle" type="button"></button>
  </nav>`;

document.getElementById('site-footer').outerHTML = `
  <footer class="footer">
    <div class="socials">
      ${SOCIALS.map(([href, label, icon]) =>
        `<a href="${href}" aria-label="${label}"${href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${icon}</a>`).join('')}
    </div>
    <p class="copyright">&copy; ${new Date().getFullYear()} Md. Farhan Ishraq</p>
  </footer>
  <button id="back-to-top" class="back-to-top" type="button" aria-label="Back to top">${ICON.up}</button>`;

// Dark mode: saved choice, else system preference.
const toggle = document.getElementById('theme-toggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  toggle.innerHTML = theme === 'dark' ? ICON.sun : ICON.moon;
  toggle.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
  toggle.setAttribute('aria-label', toggle.title);
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
toggle.onclick = () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
};

// Back-to-top button.
const up = document.getElementById('back-to-top');
addEventListener('scroll', () => up.classList.toggle('visible', scrollY > 300), { passive: true });
up.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
