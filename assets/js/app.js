(function() {
  const navResponsive = () => {
    let heroNav = document.getElementById("hero-nav");
    if (heroNav.className === "hero-nav") {
      heroNav.className += " responsive";
    } else {
      heroNav.className = "hero-nav";
    }
  };

  const stickyNavResponsive = () => {
    let stickyNav = document.getElementById("sticky-nav");
    if (stickyNav.className === "sticky-nav") {
      stickyNav.className += " responsive";
    } else {
      stickyNav.className = "sticky-nav";
    }
  };

  // define all elements with className link
  const link = document.getElementsByClassName("link");

  // loop through all the link class and set an eventlistener that will close the nav bar when it is responsive after a button with className link is clicked
  for (let i = 0; i < link.length; i++) {
    link[i].addEventListener("click", e => {
      if (e.target.className === "link") {
        const sticky = document.getElementById("sticky-nav");
        const hero = document.getElementById("hero-nav");
        sticky.className = "sticky-nav";
        hero.className = "hero-nav";
      }
    });
  }

  document.getElementById("icon").addEventListener("click", () => {
    navResponsive();
  });

  document.getElementById("sticky-icon").addEventListener("click", () => {
    stickyNavResponsive();
  });

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    let windowHeight = window.innerHeight * 0.05;

    if (scrollPosition > windowHeight) {
      document.getElementById("sticky-nav").style.display = "block";
    } else {
      document.getElementById("sticky-nav").style.display = "none";
    }

    if (scrollPosition > 600) {
      document.getElementById("about").style.transform = "translateX(0)";
      document.getElementById("about").style.opacity = "1";
    }
  });
})();
