import { mountCarousel } from "../components/carousel.js";
import { bindTabs } from "../components/tabs.js";

// Portfolio-specific composition; components own their own behavior.
export function initChapters(mode) {
  const phone = matchMedia("(max-width: 767px)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let teardown = () => {};
  function configure() {
    teardown();
    teardown = () => {};
    if (!mode?.enabled) return;
    const restores = [];
    const events = new AbortController();
    const on = (node, type, listener) =>
      node.addEventListener(type, listener, { signal: events.signal });
    const move = (node, destination) => {
      const marker = document.createComment("original position");
      node.before(marker);
      destination.append(node);
      restores.push(() => marker.replaceWith(node));
    };
    const main = document.querySelector("main");
    const design = document.querySelector(".design");
    const about = document.querySelector(".about");
    const contact = document.querySelector(".contact");
    const footer = document.querySelector("body > footer");
    const earlier = document.querySelector(".earlier-work");
    const archive = document.createElement("section");
    archive.className = "chapter archive-screen";
    archive.id = "earlier";
    archive.dataset.ghost = "EARLY WORK";
    archive.setAttribute("aria-labelledby", "earlier-title");
    archive.innerHTML =
      '<div class="chapter-inner"><div class="section-heading"><div><p class="eyebrow">02 / Earlier work</p><h2 id="earlier-title">Where it all started.</h2></div><p>Small experiments. Real lessons.<br>The projects that started the journey.</p></div></div>';
    document.querySelector(".work").after(archive);
    move(earlier.querySelector(".earlier-grid"), archive.firstElementChild);
    const oldEarlierHidden = earlier.hidden;
    earlier.hidden = true;
    restores.push(() => {
      earlier.hidden = oldEarlierHidden;
    });

    design.classList.add("chapter");
    design.dataset.ghost = "DESIGN";
    // Put the visual sequence in the DOM too, so keyboard and reading order agree.
    const designMarker = document.createComment("design position");
    design.before(designMarker);
    archive.after(design);
    restores.push(() => designMarker.replaceWith(design));

    const finale = document.createElement("section");
    finale.className = "chapter final-screen";
    finale.dataset.ghost = "CONNECT";
    finale.setAttribute("aria-label", "Experience and contact");
    finale.innerHTML =
      '<div class="final-grid"><div class="career-panel"><p class="eyebrow">04 / The person behind the projects</p><h2>Built on experience.<br>Ready for what’s next.</h2><div class="career-tabs" role="tablist" aria-label="Professional background"></div><div class="career-panels"></div></div></div>';
    main.append(finale);
    const career = finale.querySelector(".career-panels");
    const tablist = finale.querySelector(".career-tabs");
    const mobile = phone.matches;
    const groups = [
      ["Experience", [about.querySelector(".experience")]],
      ["Background", [about.querySelector(".about-intro")]],
      [
        "Skills & education",
        [
          about.querySelector(".capabilities"),
          about.querySelector(".education"),
        ],
      ],
    ];
    if (mobile) groups.push(["Contact", [contact]]);
    const tabs = [];
    const panels = [];
    groups.forEach(([label, nodes], i) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.id = `career-tab-${i}`;
      tab.textContent = label;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", `career-panel-${i}`);
      const panel = document.createElement("div");
      panel.id = `career-panel-${i}`;
      panel.className = "career-tabpanel";
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      panel.tabIndex = 0;
      nodes.forEach((node) => move(node, panel));
      tablist.append(tab);
      career.append(panel);
      tabs.push(tab);
      panels.push(panel);
    });
    const select = bindTabs(tabs, panels, on);
    // Preserve the existing #about anchor by keeping its original section.
    move(about, finale.querySelector(".career-panel"));
    about.classList.add("about-anchor");
    if (!mobile) move(contact, finale.querySelector(".final-grid"));
    move(footer, finale);
    const jumpAbout = () => {
      if (location.hash === "#about") select(0);
      if (mobile && location.hash === "#contact") select(3);
    };
    on(window, "hashchange", jumpAbout);
    on(document.querySelector('nav a[href="#about"]'), "click", () =>
      select(0),
    );
    on(document.querySelector('nav a[href="#contact"]'), "click", () => {
      if (mobile) select(3);
    });
    on(window, "portfolio-section", (event) => {
      if (event.detail === "contact" && mobile) select(3);
      if (event.detail === "experience") select(0);
    });

    const destroyCarousel = mountCarousel(
      design.querySelector(".logo-grid"),
      reduced,
    );
    document.documentElement.classList.add("screen-mode");
    const arrivals = [
      archive.firstElementChild,
      finale.querySelector(".final-grid"),
    ];
    const arrivalObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("chapter-arrived");
            arrivalObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    arrivals.forEach((node) => {
      node.classList.add("chapter-arrival");
      arrivalObserver.observe(node);
    });
    const chapters = [archive, design, finale];
    const stops = chapters.map((chapter) => {
      const stop = document.createElement("div");
      stop.className = "chapter-stop";
      if (chapter === finale) stop.classList.add("final-stop");
      chapter.before(stop);
      stop.append(chapter);
      return stop;
    });
    const fit = () =>
      chapters.forEach((chapter) =>
        chapter.classList.toggle(
          "chapter-tall",
          chapter.scrollHeight >
            innerHeight -
              document.querySelector(".site-header").offsetHeight +
              1,
        ),
      );
    const sizing = new ResizeObserver(fit);
    chapters.forEach((chapter) => sizing.observe(chapter));
    on(window, "resize", fit);
    fit();
    teardown = () => {
      events.abort();
      destroyCarousel();
      sizing.disconnect();
      arrivalObserver.disconnect();
      document.documentElement.classList.remove("screen-mode");
      about.classList.remove("about-anchor");
      design.classList.remove("chapter", "chapter-tall");
      delete design.dataset.ghost;
      stops.forEach((stop) => stop.replaceWith(stop.firstElementChild));
      restores.reverse().forEach((restore) => restore());
      archive.remove();
      finale.remove();
    };
  }
  if ("IntersectionObserver" in window && "ResizeObserver" in window) {
    configure();
    phone.addEventListener("change", configure);
    mode?.addEventListener("change", configure);
  }
}
