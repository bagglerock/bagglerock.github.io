// Share/reload a chapter without creating a history entry for every scroll.
(() => {
  const projectIds = ['mastadon', 'photos-cleaner', 'stock-lab', 'workout-logger', 'nj-pacific-deals'];
  const allowed = new Set(['home', 'work', ...projectIds, 'earlier', 'creative', 'experience', 'contact']);
  const aliases = { home: 'home', work: 'work', about: 'experience', contact: 'contact', creative: 'creative', 'earlier-work': 'earlier', earlier: 'earlier' };
  let restoring = true;
  let frame = 0;
  let settle = 0;
  let release = 0;
  let generation = 0;
  function target(key) {
    let element;
    if (key === 'earlier') element = document.getElementById('earlier') || document.getElementById('earlier-work');
    else if (key === 'experience') element = document.getElementById('about');
    else element = document.getElementById(key);
    return element?.closest('.chapter-stop, .project-scene') || element;
  }
  function write(key, push = false) {
    const url = new URL(location.href);
    if (url.searchParams.get('section') === key && !url.hash) return;
    url.searchParams.set('section', key);
    url.hash = '';
    history[push ? 'pushState' : 'replaceState'](history.state, '', url);
  }
  function restore(key, push = false) {
    if (!allowed.has(key)) { restoring = false; return; }
    window.dispatchEvent(new CustomEvent('portfolio-section', { detail: key }));
    const node = target(key);
    if (!node) { restoring = false; return; }
    restoring = true;
    clearTimeout(release); clearTimeout(settle);
    const token = ++generation;
    if (key === 'earlier' && node.tagName === 'DETAILS') node.open = true;
    if (push) write(key, true);
    // Run after the responsive layout and its pin measurements have settled.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (token !== generation) return;
      node.scrollIntoView({ block: 'start', behavior: 'instant' });
      release = setTimeout(() => { restoring = false; }, 250);
    }));
  }
  function track() {
    frame = 0;
    if (restoring) return;
    const keys = ['home', 'work', ...projectIds, 'earlier', 'creative', 'experience'];
    if (!document.querySelector('.final-screen')) keys.push('contact');
    const chapters = keys.map(key => ({ key, node: target(key) }))
      .filter(item => item.node && item.node.getClientRects().length)
      .map(item => ({ key: item.key, top: item.node.getBoundingClientRect().top }))
      .sort((a, b) => a.top - b.top);
    const active = chapters.filter(item => item.top <= innerHeight * 0.45).at(-1);
    if (!active) return;
    let key = active.key;
    // Contact and Experience share the desktop finale; retain a contact link.
    if (key === 'experience' && document.querySelector('.final-screen') && new URL(location.href).searchParams.get('section') === 'contact') key = 'contact';
    clearTimeout(settle);
    settle = setTimeout(() => { if (!restoring) write(key); }, 180);
  }
  function onScroll() { if (!frame) frame = requestAnimationFrame(track); }
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    const id = anchor.getAttribute('href').slice(1);
    const key = aliases[id] || (projectIds.includes(id) ? id : null);
    if (!key) return; // In particular, preserve the keyboard skip link.
    event.preventDefault();
    restore(key, true);
  });
  window.addEventListener('popstate', () => restore(new URL(location.href).searchParams.get('section') || 'home'));
  function initial() {
    const requested = new URL(location.href).searchParams.get('section');
    if (allowed.has(requested)) restore(requested);
    else { restoring = false; }
  }
  if (document.readyState === 'complete') initial();
  else window.addEventListener('load', initial, { once: true });
  window.portfolioExperience?.addEventListener('change', () => restore(new URL(location.href).searchParams.get('section') || 'home'));
  window.addEventListener('pageshow', event => { if (event.persisted) initial(); });
})();
