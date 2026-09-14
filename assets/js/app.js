// The entire portfolio stays readable and navigable without JavaScript.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let cleanupMotion = () => {};
function configureMotion() {
  cleanupMotion();
  if (motionPreference.matches) return;

  const revealed = document.querySelectorAll(
    ".section-heading, .project, .about-intro, .experience-row, .logo-grid",
  );
  let observer;
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 },
    );
    revealed.forEach((element) => {
      // Do not hide elements already visible, including restored scroll positions.
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("reveal");
        observer.observe(element);
      }
    });
  }

  const hero = document.querySelector(".hero");
  let frame = 0;
  function updateHero() {
    frame = 0;
    const offset = Math.min(window.scrollY, hero.offsetHeight);
    hero.style.setProperty("--drift", `${offset * 0.18}px`);
  }
  function onScroll() {
    if (!frame) frame = requestAnimationFrame(updateHero);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  updateHero();

  const listeners = [];
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".project-art").forEach((art) => {
      function move(event) {
        const rect = art.getBoundingClientRect();
        art.style.setProperty(
          "--tilt-x",
          `${((event.clientX - rect.left - rect.width / 2) / rect.width) * 8}deg`,
        );
        art.style.setProperty(
          "--tilt-y",
          `${(-(event.clientY - rect.top - rect.height / 2) / rect.height) * 8}deg`,
        );
      }
      function reset() {
        art.style.setProperty("--tilt-x", "0deg");
        art.style.setProperty("--tilt-y", "0deg");
      }
      art.addEventListener("pointermove", move);
      art.addEventListener("pointerleave", reset);
      listeners.push(() => {
        art.removeEventListener("pointermove", move);
        art.removeEventListener("pointerleave", reset);
        reset();
      });
    });
  }
  cleanupMotion = () => {
    observer?.disconnect();
    revealed.forEach((element) =>
      element.classList.remove("reveal", "is-visible"),
    );
    window.removeEventListener("scroll", onScroll);
    cancelAnimationFrame(frame);
    hero.style.removeProperty("--drift");
    listeners.forEach((cleanup) => cleanup());
  };
}
configureMotion();
motionPreference.addEventListener("change", configureMotion);
