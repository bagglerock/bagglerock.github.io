import { wrapIndex } from "../core/math.js";

export function tabTarget(key, index, count) {
  if (key === "ArrowRight") return wrapIndex(index + 1, count);
  if (key === "ArrowLeft") return wrapIndex(index - 1, count);
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
}

/** Bind an existing ARIA tablist. The caller owns markup and node restoration. */
export function bindTabs(tabs, panels, on) {
  function select(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(index === i));
      tab.tabIndex = index === i ? 0 : -1;
      panels[i].hidden = index !== i;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    on(tab, "click", () => select(index));
    on(tab, "keydown", (event) => {
      const target = tabTarget(event.key, index, tabs.length);
      if (target !== undefined) {
        event.preventDefault();
        select(target, true);
      }
    });
  });
  select(0);
  return select;
}
