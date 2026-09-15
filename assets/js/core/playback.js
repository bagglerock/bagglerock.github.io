/** Timer policy without DOM dependencies. Hover/visibility suspend, pause persists. */
export function createPlayback({ advance, delay = 3000, clock = globalThis }) {
  let timer;
  let disposed = false;
  return {
    update({ paused, hovered, visible, hidden }) {
      clock.clearInterval(timer);
      timer = undefined;
      if (!disposed && !paused && !hovered && visible && !hidden) {
        timer = clock.setInterval(advance, delay);
      }
    },
    destroy() {
      disposed = true;
      clock.clearInterval(timer);
      timer = undefined;
    },
  };
}
