// Measure each decorative label rather than guessing its width from vw units.
// Full names remain visible across resize, font loading and layout switches.
(() => {
  const context = document.createElement('canvas').getContext('2d');
  if (!context) return;
  let frame = 0;
  function fit() {
    frame = 0;
    document.querySelectorAll('[data-ghost]').forEach(element => {
      const project = element.classList.contains('project-scene');
      const style = getComputedStyle(element, project ? '::before' : '::after');
      if (style.content === 'none') return;
      const label = style.textTransform === 'uppercase'
        ? element.dataset.ghost.toUpperCase() : element.dataset.ghost;
      const available = element.getBoundingClientRect().width * (project ? 1 : 0.9);
      if (!available || !label) return;
      const size = parseFloat(style.fontSize) || 100;
      const tracking = (parseFloat(style.letterSpacing) || 0) / size;
      context.font = `${style.fontWeight} 100px ${style.fontFamily}`;
      const measured = context.measureText(label).width + tracking * 100 * Math.max(0, label.length - 1);
      // Small safety margin for platform font rasterization differences.
      const fitSize = available * 0.97 / measured * 100;
      const cap = project ? Math.min(innerWidth * 0.1, 192) : Math.min(innerWidth * 0.19, 240);
      element.style.setProperty('--ghost-fit', `${Math.min(fitSize, cap).toFixed(2)}px`);
    });
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(fit); }
  window.addEventListener('resize', schedule, { passive: true });
  window.portfolioExperience?.addEventListener('change', schedule);
  new MutationObserver(schedule).observe(document.querySelector('main'), { childList: true, subtree: true });
  document.fonts?.ready.then(schedule);
  schedule();
})();
