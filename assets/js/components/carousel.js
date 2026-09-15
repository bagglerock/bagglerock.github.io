import { carouselSlot, wrapIndex } from "../core/math.js";
import { createPlayback } from "../core/playback.js";

/** Enhance a figure grid; returned cleanup restores its static markup. */
export function mountCarousel(grid, reduced) {
  const restores = [];
  const events = new AbortController();
  const on = (node, type, listener) =>
    node.addEventListener(type, listener, { signal: events.signal });
  const figures = [...grid.querySelectorAll("figure")];
  grid.classList.add("logo-carousel");
  grid.setAttribute("role", "region");
  grid.setAttribute("aria-roledescription", "carousel");
  grid.setAttribute("aria-label", "Logo designs");
  const controls = document.createElement("div");
  controls.className = "carousel-controls";
  controls.innerHTML =
    '<button type="button" aria-label="Previous logo">←</button><button type="button" class="carousel-toggle">Pause</button><button type="button" aria-label="Next logo">→</button><span class="carousel-count"></span>';
  grid.after(controls);
  const [previous, toggle, next] = controls.querySelectorAll("button");
  // Keep the click target stable: rebuilding it on focus can cancel a click
  // that began on the icon or label before pointerup.
  toggle.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path data-play d="m9 5 10 7-10 7Z" fill="currentColor"/><path data-pause d="M8 5v14M16 5v14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg><span>Pause</span>';
  const toggleLabel = toggle.querySelector("span");
  const playIcon = toggle.querySelector("[data-play]");
  const pauseIcon = toggle.querySelector("[data-pause]");
  previous.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6M8 12h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  next.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6M16 12H4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  let active = 0,
    hovered = false,
    visible = false,
    paused = reduced.matches;
  const playback = createPlayback({
    advance: () => {
      active = wrapIndex(active - 1, figures.length);
      paint();
    },
  });
  function paint() {
    figures.forEach((figure, index) => {
      const slot = carouselSlot(index, active, figures.length);
      const old = Number(figure.style.getPropertyValue("--slot"));
      if (Math.abs(old - slot) > 2) figure.classList.add("carousel-wrap");
      figure.style.setProperty("--slot", slot);
      figure.classList.toggle("carousel-selected", slot === 0);
      figure.classList.toggle("carousel-distant", Math.abs(slot) > 1);
      figure
        .querySelector("button")
        .setAttribute("aria-pressed", String(slot === 0));
    });
    // Commit the invisible edge-to-edge reposition before allowing motion.
    // This avoids a wrapped card sweeping or flashing through the center.
    void grid.offsetWidth;
    figures.forEach((figure) => figure.classList.remove("carousel-wrap"));
    controls.querySelector(".carousel-count").textContent =
      `${active + 1} / ${figures.length}`;
  }
  function schedule() {
    const label = paused ? "Play" : "Pause";
    if (toggleLabel.textContent !== label) toggleLabel.textContent = label;
    playIcon.style.display = paused ? "" : "none";
    pauseIcon.style.display = paused ? "none" : "";
    toggle.setAttribute(
      "aria-label",
      paused ? "Play logo carousel" : "Pause logo carousel",
    );
    playback.update({ paused, hovered, visible, hidden: document.hidden });
  }
  figures.forEach((figure, index) => {
    const image = figure.querySelector("img");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "logo-select";
    button.setAttribute(
      "aria-label",
      `Enlarge ${figure.querySelector("figcaption").textContent}`,
    );
    image.before(button);
    button.append(image);
    on(button, "click", () => {
      active = index;
      paused = true;
      paint();
      schedule();
    });
    on(button, "focus", () => {
      active = index;
      paint();
    });
    restores.push(() => button.replaceWith(image));
  });
  // Touch taps do not represent hover and must not leave playback suspended.
  on(grid, "pointerenter", (event) => {
    if (event.pointerType !== "touch") {
      hovered = true;
      schedule();
    }
  });
  on(grid, "pointerleave", (event) => {
    if (event.pointerType !== "touch") {
      hovered = false;
      schedule();
    }
  });
  // Inspecting a logo pauses until Play is chosen. Focusing the playback
  // controls themselves must not silently stop the timer.
  on(grid, "focusin", () => {
    paused = true;
    schedule();
  });
  on(document, "visibilitychange", schedule);
  on(previous, "click", () => {
    paused = true;
    active = wrapIndex(active - 1, figures.length);
    paint();
    schedule();
  });
  on(next, "click", () => {
    paused = true;
    active = wrapIndex(active + 1, figures.length);
    paint();
    schedule();
  });
  on(toggle, "click", () => {
    paused = !paused;
    if (!paused) {
      hovered = false;
      active = wrapIndex(active - 1, figures.length);
      paint();
    }
    schedule();
  });
  on(reduced, "change", () => {
    paused = reduced.matches;
    schedule();
  });
  const visibility = new IntersectionObserver(
    (entries) => {
      // A deep-link jump can batch both exit and entry records. Use the latest.
      visible = entries.at(-1).isIntersecting;
      schedule();
    },
    { threshold: 0.2 },
  );
  visibility.observe(grid);
  paint();
  schedule();
  return () => {
    events.abort();
    playback.destroy();
    visibility.disconnect();
    figures.forEach((figure) => {
      figure.classList.remove(
        "carousel-selected",
        "carousel-distant",
        "carousel-wrap",
      );
      figure.style.removeProperty("--slot");
    });
    grid.classList.remove("logo-carousel");
    ["role", "aria-roledescription", "aria-label"].forEach((attr) =>
      grid.removeAttribute(attr),
    );
    controls.remove();
    restores.reverse().forEach((restore) => restore());
  };
}
