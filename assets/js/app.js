(function () {

	const scroll = (classname, direction) => {
		console.log("hello");
	}

	const navResponsive = () => {
		let heroNav = document.getElementById("hero-nav");
		if(heroNav.className === "hero-nav"){
			heroNav.className += " responsive";
		} else {
			heroNav.className = "hero-nav";
		}
	}

	const stickyNavResponsive = () => {
		let stickyNav = document.getElementById("sticky-nav");
		if(stickyNav.className === "sticky-nav"){
			stickyNav.className += " responsive";
		} else {
			stickyNav.className = "sticky-nav";
		}
	}

	document.getElementById("icon").addEventListener("click", () => {
		navResponsive();
	})

	document.getElementById("sticky-icon").addEventListener("click", () => {
		stickyNavResponsive();
	})

	window.addEventListener("scroll", () => {
		// get the scroll position
		const scrolled = window.scrollY;
		// get the height of the window
		let wh = (window.innerHeight) * .05;
		//if the scrolled position matches the height of the window then do something
		if(scrolled > wh){
			document.getElementById("sticky-nav").style.display = "block"
		} else {
			document.getElementById("sticky-nav").style.display = "none"
		}
	
		if(scrolled > 600){
			//change this to be a function to scroll at different y positions
			document.getElementById("about").style.transform = "translateX(0)";
			document.getElementById("about").style.opacity = "1";
		}
	})


}())





  