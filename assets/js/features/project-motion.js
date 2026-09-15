import { projectProgress } from "../core/math.js";

export function initProjectMotion(mode) {
  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const projects = [
    ...document.querySelectorAll(".work > .project, .project-grid > .project"),
  ];
  const hero = document.querySelector(".hero");
  let cleanupMotion = () => {};

  function configureMotion() {
    cleanupMotion();
    cleanupMotion = () => {};
    if (motionPreference.matches || !mode?.enabled) return;

    const restorers = [];
    const scenes = projects.map((project) => {
      const scene = document.createElement("div");
      scene.className = "project-scene";
      scene.dataset.ghost = project.querySelector("h3").textContent.trim();
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
          char.style.setProperty(
            "--start",
            ((index++ / Math.max(1, text.length)) * 0.45).toFixed(3),
          );
          wordSpan.append(char);
        }
        visual.append(wordSpan);
      }
      title.replaceChildren(label, visual);
      restorers.push(() => {
        title.replaceChildren(...original);
        project.classList.remove("story-project");
        project.removeAttribute("data-pinned");
        ["--reveal", "--exit", "--pin-top"].forEach((name) =>
          project.style.removeProperty(name),
        );
        scene.replaceWith(project);
      });
      return { scene, project };
    });

    document.documentElement.classList.add("story-motion");
    document.documentElement.classList.add("story-desktop");
    const calm = [
      ...document.querySelectorAll(
        ".about-intro, .experience, .capabilities, .education, .contact > *, .design .section-heading, .logo-grid",
      ),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("calm-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 },
    );
    calm.forEach((element) => {
      if (element.classList.contains("logo-carousel")) return;
      if (element.getBoundingClientRect().top > window.innerHeight * 0.92) {
        element.classList.add("calm-reveal");
        observer.observe(element);
      }
    });

    let frame = 0;
    function measure() {
      const headerHeight = document.querySelector(".site-header").offsetHeight;
      for (const { scene, project } of scenes) {
        const height = project.offsetHeight;
        // Zoom, longer text, or short windows must never trap content in a pin.
        const pinned = height <= window.innerHeight - headerHeight - 48;
        project.toggleAttribute("data-pinned", pinned);
        scene.classList.toggle("is-pinned", pinned);
        project.style.setProperty(
          "--pin-top",
          `${Math.max(headerHeight + 20, (window.innerHeight + headerHeight - height) / 2)}px`,
        );
      }
      schedule();
    }
    function update() {
      frame = 0;
      const vh = window.innerHeight;
      for (const { scene, project } of scenes) {
        const rect = scene.getBoundingClientRect();
        const pinTop = parseFloat(project.style.getPropertyValue("--pin-top"));
        const { reveal, exit } = projectProgress({
          top: rect.top,
          bottom: rect.bottom,
          height: project.offsetHeight,
          viewport: vh,
          pinTop,
          pinned: scene.classList.contains("is-pinned"),
        });
        project.style.setProperty("--reveal", reveal.toFixed(4));
        project.style.setProperty("--exit", exit.toFixed(4));
      }
      if (hero)
        hero.style.setProperty(
          "--drift",
          `${Math.min(window.scrollY, hero.offsetHeight) * 0.12}px`,
        );
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
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
      document.documentElement.classList.remove(
        "story-motion",
        "story-desktop",
      );
      calm.forEach((element) =>
        element.classList.remove("calm-reveal", "calm-visible"),
      );
      hero?.style.removeProperty("--drift");
      restorers.forEach((restore) => restore());
    };
  }
  if ("IntersectionObserver" in window) {
    configureMotion();
    motionPreference.addEventListener("change", configureMotion);
    mode?.addEventListener("change", configureMotion);
    window
      .matchMedia("(max-width: 767px)")
      .addEventListener("change", configureMotion);
  }
}
