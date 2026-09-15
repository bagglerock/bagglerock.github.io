// Screen-sized chapters are an enhancement for tablets and desktops only.
(() => {
  const phone = matchMedia('(max-width: 767px)');
  const mode = window.portfolioExperience;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let teardown = () => {};
  function configure() {
    teardown();
    if (!mode?.enabled) return;
    const restores = [];
    const events = new AbortController();
    const on = (node, type, listener) => node.addEventListener(type, listener, { signal: events.signal });
    const move = (node, destination) => {
      const marker = document.createComment('original position');
      node.before(marker);
      destination.append(node);
      restores.push(() => marker.replaceWith(node));
    };
    const main = document.querySelector('main');
    const design = document.querySelector('.design');
    const about = document.querySelector('.about');
    const contact = document.querySelector('.contact');
    const footer = document.querySelector('body > footer');
    const earlier = document.querySelector('.earlier-work');
    const archive = document.createElement('section');
    archive.className = 'chapter archive-screen';
    archive.id = 'earlier';
    archive.dataset.ghost = 'EARLY WORK';
    archive.setAttribute('aria-labelledby', 'earlier-title');
    archive.innerHTML = '<div class="chapter-inner"><div class="section-heading"><div><p class="eyebrow">02 / Earlier work</p><h2 id="earlier-title">Where it all started.</h2></div><p>Small experiments. Real lessons.<br>The projects that started the journey.</p></div></div>';
    document.querySelector('.work').after(archive);
    move(earlier.querySelector('.earlier-grid'), archive.firstElementChild);
    const oldEarlierHidden = earlier.hidden;
    earlier.hidden = true;
    restores.push(() => { earlier.hidden = oldEarlierHidden; });

    design.classList.add('chapter');
    design.dataset.ghost = 'DESIGN';
    // Put the visual sequence in the DOM too, so keyboard and reading order agree.
    const designMarker = document.createComment('design position');
    design.before(designMarker);
    archive.after(design);
    restores.push(() => designMarker.replaceWith(design));

    const finale = document.createElement('section');
    finale.className = 'chapter final-screen';
    finale.dataset.ghost = 'CONNECT';
    finale.setAttribute('aria-label', 'Experience and contact');
    finale.innerHTML = '<div class="final-grid"><div class="career-panel"><p class="eyebrow">04 / The person behind the projects</p><h2>Built on experience.<br>Ready for what’s next.</h2><div class="career-tabs" role="tablist" aria-label="Professional background"></div><div class="career-panels"></div></div></div>';
    main.append(finale);
    const career = finale.querySelector('.career-panels');
    const tablist = finale.querySelector('.career-tabs');
    const mobile = phone.matches;
    const groups = [
      ['Experience', [about.querySelector('.experience')]],
      ['Background', [about.querySelector('.about-intro')]],
      ['Skills & education', [about.querySelector('.capabilities'), about.querySelector('.education')]],
    ];
    if (mobile) groups.push(['Contact', [contact]]);
    const tabs = [];
    const panels = [];
    function select(index, focus = false) {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(index === i));
        tab.tabIndex = index === i ? 0 : -1;
        panels[i].hidden = index !== i;
      });
      if (focus) tabs[index].focus();
    }
    groups.forEach(([label, nodes], i) => {
      const tab = document.createElement('button');
      tab.type = 'button'; tab.id = `career-tab-${i}`;
      tab.textContent = label; tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `career-panel-${i}`);
      const panel = document.createElement('div');
      panel.id = `career-panel-${i}`; panel.className = 'career-tabpanel';
      panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;
      nodes.forEach(node => move(node, panel));
      tablist.append(tab); career.append(panel); tabs.push(tab); panels.push(panel);
      on(tab, 'click', () => select(i));
      on(tab, 'keydown', event => {
        let target;
        if (event.key === 'ArrowRight') target = (i + 1) % tabs.length;
        if (event.key === 'ArrowLeft') target = (i + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') target = 0;
        if (event.key === 'End') target = tabs.length - 1;
        if (target !== undefined) { event.preventDefault(); select(target, true); }
      });
    });
    select(0);
    // Preserve the existing #about anchor by keeping its original section.
    move(about, finale.querySelector('.career-panel'));
    about.classList.add('about-anchor');
    if (!mobile) move(contact, finale.querySelector('.final-grid'));
    move(footer, finale);
    const jumpAbout = () => {
      if (location.hash === '#about') select(0);
      if (mobile && location.hash === '#contact') select(3);
    };
    on(window, 'hashchange', jumpAbout);
    on(document.querySelector('nav a[href="#about"]'), 'click', () => select(0));
    on(document.querySelector('nav a[href="#contact"]'), 'click', () => { if (mobile) select(3); });
    on(window, 'portfolio-section', event => {
      if (event.detail === 'contact' && mobile) select(3);
      if (event.detail === 'experience') select(0);
    });

    const grid = design.querySelector('.logo-grid');
    const figures = [...grid.querySelectorAll('figure')];
    grid.classList.add('logo-carousel');
    grid.setAttribute('role', 'region'); grid.setAttribute('aria-roledescription', 'carousel');
    grid.setAttribute('aria-label', 'Logo designs');
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
    controls.innerHTML = '<button type="button" aria-label="Previous logo">←</button><button type="button" class="carousel-toggle">Pause</button><button type="button" aria-label="Next logo">→</button><span class="carousel-count"></span>';
    grid.after(controls);
    const [previous, toggle, next] = controls.querySelectorAll('button');
    // Keep the click target stable: rebuilding it on focus can cancel a click
    // that began on the icon or label before pointerup.
    toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path data-play d="m9 5 10 7-10 7Z" fill="currentColor"/><path data-pause d="M8 5v14M16 5v14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg><span>Pause</span>';
    const toggleLabel = toggle.querySelector('span');
    const playIcon = toggle.querySelector('[data-play]');
    const pauseIcon = toggle.querySelector('[data-pause]');
    previous.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6M8 12h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    next.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6M16 12H4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    let active = 0, hovered = false, visible = false, paused = reduced.matches;
    let timer;
    function paint() {
      figures.forEach((figure, index) => {
        let slot = (index - active + figures.length) % figures.length;
        if (slot > figures.length / 2) slot -= figures.length;
        const old = Number(figure.style.getPropertyValue('--slot'));
        if (Math.abs(old - slot) > 2) figure.classList.add('carousel-wrap');
        figure.style.setProperty('--slot', slot);
        figure.classList.toggle('carousel-selected', slot === 0);
        figure.classList.toggle('carousel-distant', Math.abs(slot) > 1);
        figure.querySelector('button').setAttribute('aria-pressed', String(slot === 0));
      });
      // Commit the invisible edge-to-edge reposition before allowing motion.
      // This avoids a wrapped card sweeping or flashing through the center.
      void grid.offsetWidth;
      figures.forEach(figure => figure.classList.remove('carousel-wrap'));
      controls.querySelector('.carousel-count').textContent = `${active + 1} / ${figures.length}`;
    }
    function schedule() {
      clearInterval(timer);
      const label = paused ? 'Play' : 'Pause';
      if (toggleLabel.textContent !== label) toggleLabel.textContent = label;
      playIcon.style.display = paused ? '' : 'none';
      pauseIcon.style.display = paused ? 'none' : '';
      toggle.setAttribute('aria-label', paused ? 'Play logo carousel' : 'Pause logo carousel');
      if (!paused && !hovered && visible && !document.hidden) {
        timer = setInterval(() => { active = (active + figures.length - 1) % figures.length; paint(); }, 3000);
      }
    }
    figures.forEach((figure, index) => {
      const image = figure.querySelector('img');
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'logo-select';
      button.setAttribute('aria-label', `Enlarge ${figure.querySelector('figcaption').textContent}`);
      image.before(button); button.append(image);
      on(button, 'click', () => { active = index; paused = true; paint(); schedule(); });
      on(button, 'focus', () => { active = index; paint(); });
      restores.push(() => button.replaceWith(image));
    });
    // Touch taps do not represent hover and must not leave playback suspended.
    on(grid, 'pointerenter', event => { if (event.pointerType !== 'touch') { hovered = true; schedule(); } });
    on(grid, 'pointerleave', event => { if (event.pointerType !== 'touch') { hovered = false; schedule(); } });
    // Inspecting a logo pauses until Play is chosen. Focusing the playback
    // controls themselves must not silently stop the timer.
    on(grid, 'focusin', () => { paused = true; schedule(); });
    on(document, 'visibilitychange', schedule);
    on(previous, 'click', () => { paused = true; active = (active + figures.length - 1) % figures.length; paint(); schedule(); });
    on(next, 'click', () => { paused = true; active = (active + 1) % figures.length; paint(); schedule(); });
    on(toggle, 'click', () => {
      paused = !paused;
      if (!paused) {
        hovered = false;
        active = (active + figures.length - 1) % figures.length;
        paint();
      }
      schedule();
    });
    on(reduced, 'change', () => { paused = reduced.matches; schedule(); });
    const visibility = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, { threshold: 0.2 });
    visibility.observe(grid);
    paint(); schedule();
    document.documentElement.classList.add('screen-mode');
    const arrivals = [archive.firstElementChild, finale.querySelector('.final-grid')];
    const arrivalObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('chapter-arrived');
          arrivalObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    arrivals.forEach(node => { node.classList.add('chapter-arrival'); arrivalObserver.observe(node); });
    const chapters = [archive, design, finale];
    const stops = chapters.map(chapter => {
      const stop = document.createElement('div');
      stop.className = 'chapter-stop';
      if (chapter === finale) stop.classList.add('final-stop');
      chapter.before(stop); stop.append(chapter);
      return stop;
    });
    const fit = () => chapters.forEach(chapter => chapter.classList.toggle('chapter-tall', chapter.scrollHeight > innerHeight - document.querySelector('.site-header').offsetHeight + 1));
    const sizing = new ResizeObserver(fit);
    chapters.forEach(chapter => sizing.observe(chapter));
    on(window, 'resize', fit); fit();
    teardown = () => {
      events.abort(); clearInterval(timer); visibility.disconnect(); sizing.disconnect(); arrivalObserver.disconnect();
      document.documentElement.classList.remove('screen-mode');
      about.classList.remove('about-anchor');
      figures.forEach(figure => {
        figure.classList.remove('carousel-selected', 'carousel-distant', 'carousel-wrap');
        figure.style.removeProperty('--slot');
      });
      grid.classList.remove('logo-carousel');
      ['role', 'aria-roledescription', 'aria-label'].forEach(attr => grid.removeAttribute(attr));
      design.classList.remove('chapter', 'chapter-tall');
      delete design.dataset.ghost;
      controls.remove();
      stops.forEach(stop => stop.replaceWith(stop.firstElementChild));
      restores.reverse().forEach(restore => restore());
      archive.remove(); finale.remove();
    };
  }
  if ('IntersectionObserver' in window && 'ResizeObserver' in window) {
    configure(); phone.addEventListener('change', configure);
    mode?.addEventListener('change', configure);
  }
})();
