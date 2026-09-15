// Capability-based enhancement with an explicit, persistent escape hatch.
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const capable = 'IntersectionObserver' in window && 'ResizeObserver' in window &&
    'AbortController' in window && CSS.supports('position', 'sticky') && CSS.supports('height', '100svh') && CSS.supports('selector(:has(*))');
  const constrained = (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
  let choice = 'auto';
  try { choice = localStorage.getItem('portfolio-view') || 'auto'; } catch {}
  const mode = new EventTarget();
  mode.enabled = false;
  window.portfolioExperience = mode;
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'view-mode-toggle';
  button.hidden = !capable;
  document.querySelector('.site-header').append(button);
  function update() {
    mode.enabled = capable && (choice === 'enhanced' || (choice !== 'simple' && !constrained && !preference.matches));
    document.documentElement.classList.toggle('experience-enabled', mode.enabled);
    button.textContent = mode.enabled ? 'Simple view' : 'Enhanced view';
    button.setAttribute('aria-label', mode.enabled ? 'Switch to the simple page layout' : 'Switch to the enhanced page layout');
    mode.dispatchEvent(new Event('change'));
  }
  button.addEventListener('click', () => {
    choice = mode.enabled ? 'simple' : 'enhanced';
    try { localStorage.setItem('portfolio-view', choice); } catch {}
    update();
  });
  preference.addEventListener('change', update);
  update();
})();
