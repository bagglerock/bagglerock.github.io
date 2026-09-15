// Progressive enhancement: the complete page works without JavaScript.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopPreference = window.matchMedia("(min-width: 1100px) and (min-height: 760px)");
const projects = [...document.querySelectorAll(".work > .project, .project-grid > .project")];
const hero = document.querySelector(".hero");
const clamp = (value) => Math.min(1, Math.max(0, value));
let cleanupMotion = () => {};

function configureMotion() {
  cleanupMotion();
  if (motionPreference.matches || !desktopPreference.matches) return;

  const desktop = desktopPreference.matches;
  const restorers = [];
  const scenes = projects.map((project) => {
    const scene = document.createElement("div");
    scene.className = "project-scene";
    project.before(scene);
    scene.append(project);
    project.classList.add("story-project");

    // Keep the original heading text available as one accessible name. Word
    // wrappers preserve natural wrapping; individual letters are visual only.
    const title = project.querySelector("h3");
    const original = [...title.childNodes];
    const text = title.textContent.trim();
    const label = document.createElement("span");
    label.className = "story-sr-only";
    label.textContent = text;
    const visual = document.createElement("span");
    visual.setAttribute("aria-hidden", "true");
    let index = 0;
    for (const [wordIndex, word] of text.split(/\s+/).entries()) {
      if (wordIndex) visual.append(" ");
      const wordSpan = document.createElement("span");
      wordSpan.className = "story-word";
      for (const letter of word) {
        const char = document.createElement("span");
        char.className = "story-letter";
        char.textContent = letter;
        char.style.setProperty("--start", (index++ / Math.max(1, text.length) * 0.45).toFixed(3));
        wordSpan.append(char);
      }
      visual.append(wordSpan);
    }
    title.replaceChildren(label, visual);
    restorers.push(() => {
      title.replaceChildren(...original);
      project.classList.remove("story-project");
      project.removeAttribute("data-pinned");
      ["--reveal", "--exit", "--pin-top"].forEach((name) => project.style.removeProperty(name));
      scene.replaceWith(project);
    });
    return { scene, project };
  });

  document.documentElement.classList.add("story-motion");
  document.documentElement.classList.toggle("story-desktop", desktop);
  const calm = [...document.querySelectorAll(".about-intro, .experience, .capabilities, .education, .contact > *, .design .section-heading, .logo-grid")];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("calm-visible");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  calm.forEach((element) => {
    if (element.getBoundingClientRect().top > window.innerHeight * 0.92) {
      element.classList.add("calm-reveal");
      observer.observe(element);
    }
  });

  let frame = 0;
  function measure() {
    for (const { scene, project } of scenes) {
      const height = project.offsetHeight;
      // Zoom, longer text, or short windows must never trap content in a pin.
      const pinned = desktop && height <= window.innerHeight - 128;
      project.toggleAttribute("data-pinned", pinned);
      scene.classList.toggle("is-pinned", pinned);
      project.style.setProperty("--pin-top", `${Math.max(100, (window.innerHeight + 80 - height) / 2)}px`);
    }
    schedule();
  }
  function update() {
    frame = 0;
    const vh = window.innerHeight;
    for (const { scene, project } of scenes) {
      const rect = scene.getBoundingClientRect();
      const pinTop = parseFloat(project.style.getPropertyValue("--pin-top"));
      const revealEnd = desktop ? pinTop : vh * 0.35;
      const reveal = clamp((vh * 0.94 - rect.top) / Math.max(1, vh * 0.94 - revealEnd));
      const exit = scene.classList.contains("is-pinned")
        ? clamp((pinTop + project.offsetHeight - rect.bottom) / (vh * 0.55))
        : 0;
      project.style.setProperty("--reveal", reveal.toFixed(4));
      project.style.setProperty("--exit", exit.toFixed(4));
    }
    if (hero) hero.style.setProperty("--drift", `${Math.min(window.scrollY, hero.offsetHeight) * 0.12}px`);
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", measure);
  window.addEventListener("pageshow", measure);
  const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
  projects.forEach((project) => resizeObserver?.observe(project));
  measure();
  update();

  cleanupMotion = () => {
    observer.disconnect();
    resizeObserver?.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", measure);
    window.removeEventListener("pageshow", measure);
    cancelAnimationFrame(frame);
    document.documentElement.classList.remove("story-motion", "story-desktop");
    calm.forEach((element) => element.classList.remove("calm-reveal", "calm-visible"));
    hero?.style.removeProperty("--drift");
    restorers.forEach((restore) => restore());
  };
}
if ("IntersectionObserver" in window) {
  configureMotion();
  motionPreference.addEventListener("change", configureMotion);
  desktopPreference.addEventListener("change", configureMotion);
}
