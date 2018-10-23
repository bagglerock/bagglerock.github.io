const projects = [
  {
    name: "Weird Trivia Fun - Using React",
    imgName: "trivia-react.png",
    link: "https://glacial-bastion-18712.herokuapp.com",
    github: "https://github.com/bagglerock/Trivia-React",
    description:
      "A rewrite of the Trivia game using React.   Redux will be added to it soon.",
    technologies:
      "Node.js, Express.js, React, Bootstrap 4+, css modules set to true, Javascript, HTML, CSS"
  },
  {
    name: "Chef's Den",
    imgName: "chefsden.jpg",
    link: "https://immense-plateau-63304.herokuapp.com/",
    github: "https://github.com/bagglerock/Chefs-Den",
    description:
      "Recipe Finder using the Yummly API.  Login sytem for saving favorites",
    technologies:
      "Node.js, Express.js, Handlebars, bcrypt, MySQL, Sequelize, Javascript, jQuery, HTML, CSS"
  },
  {
    name: "Knockout Fitness",
    imgName: "knockout.jpg",
    link: "http://knockoutfitnessmuaythai.com",
    github: "https://github.com/bagglerock/knockout-fitness",
    description: "Website for Knockout Fitness Muay Thai in Brick NJ",
    technologies: "HTML, CSS, jQuery"
  },
  {
    name: "Scrapoogle",
    imgName: "scrapoogle.jpg",
    link: "https://agile-coast-42538.herokuapp.com/",
    github: "https://github.com/bagglerock/Scrappy-Scraper",
    description:
      "Application to scrape news article headers from google news and let you make comments about it (under-construction)",
    technologies:
      "Node.js, Express.js, Handlebars, MongoDB, Mongoose, Axios, Cheerio, Javascript, jQuery, HTML, CSS"
  },
  {
    name: "Freight Systems NJ",
    imgName: "freight-sys.jpg",
    link: "https://bagglerock.github.io/freight-sys",
    github: "https://github.com/bagglerock/freight-sys",
    description:
      "Website for Freight Systems of NJ.  A Logistics company for your shipping needs.",
    technologies: "HTML, CSS, jQuery"
  },
  {
    name: "Hangman",
    imgName: "hangman.jpg",
    link: "https://bagglerock.github.io/Hangman-Game",
    github: "https://github.com/bagglerock/Hangman-Game",
    description:
      "Hangman game for the browser.  Musicians are the subject and spotify comes up on correct guess.",
    technologies: "Javascript, HTML, CSS, Bootstrap"
  },
  {
    name: "Rock Paper Scissors - Multiplayer",
    imgName: "rps.jpg",
    link: "https://bagglerock.github.io/RPS-Multiplayer",
    github: "https://github.com/bagglerock/RPS-Multiplayer",
    description: "Multiplayer Rock, Paper, Scissors with chat.",
    technologies: "Javascript, jQuery, Firebase, HTML, CSS"
  },
  {
    name: "Trivia Game",
    imgName: "trivia.jpg",
    link: "https://bagglerock.github.io/TriviaGame/",
    github: "https://github.com/bagglerock/TriviaGame",
    description:
      "Trivia Game where I couldn't think of any questions, so I just made odd questions and answers",
    technologies: "Javascript, jQuery, HTML, CSS, Bootstrap"
  },
  {
    name: "Clicky Game",
    imgName: "clicky.jpg",
    link: "https://mysterious-stream-83031.herokuapp.com/",
    github: "https://github.com/bagglerock/clicky-game",
    description:
      "Clicky Game is a small little game much like memory.  Try not to click on the same picture twice and build up your score.",
    technologies: "MERN"
  },
  {
    name: "PeachCo Lister 3.0",
    imgName: "peachco.gif",
    link: "https://limitless-reaches-23686.herokuapp.com",
    github: "https://github.com/bagglerock/peachco-react",
    description:
      "A browser based application that holds product information and lists products onto Ebay, which can also be used on tablets. At the moment the repo is private.",
    technologies:
      "ReactJS, MySQL, NodeJS, Express, jsftp, node-ebay-api, multer"
  }
];

const logos = [
  {
    name: "Smokin 55 BBQ",
    img: "daves_logo_lighter.png"
  },
  {
    name: "Island Rides",
    img: "jam.png"
  },
  {
    name: "Material Memories",
    img: "Material Memories.jpg"
  },
  {
    name: "RHE Gen II",
    img: "rhe.png"
  }
];

// templating engine using ES6 syntax
document.addEventListener("DOMContentLoaded", function() {
  //the template that will be used... the variables are denoted by "%%...%%"
  let template = `
      <div class="project-container">
        <div>
            <h4>%%name%%</h4>
        </div>
        <div class="project-image">
            <img src="./assets/img/websites/%%image%%"/>
        </div>
        <div>
            <a href="%%link%%" alt="%%name%%">Website Link</a>
        </div>
        <div>
            <a href="%%github%%" alt="%%name%%">Github Link</a>
        </div>
        <div>
            <p>%%description%%</p>
        </div>
        <div>
            <p>%%techs%%</p>
        </div>
      </div>
      `;
  let portfolio = "";
  for (let key in projects) {
    //little regex to replace the "%%...%%"

    portfolio += template
      .replace(/%%name%%/g, projects[key].name)
      .replace(/%%image%%/g, projects[key].imgName)
      .replace(/%%link%%/g, projects[key].link)
      .replace(/%%github%%/g, projects[key].github)
      .replace(/%%description%%/g, projects[key].description)
      .replace(/%%techs%%/g, projects[key].technologies);
  }

  document.getElementById("portfolio-template").innerHTML = portfolio;

  let logoTemplate = `
  <div class="logo-container">
    <div>
        <h4>%%name%%</h4>
    </div>
    <div class="logo-image">
        <img src="./assets/img/logos/%%image%%"/>
    </div>
  </div>
  `;
  let logoList = "";
  for (let key in logos) {
    //little regex to replace the "%%...%%"

    logoList += logoTemplate
      .replace(/%%name%%/g, logos[key].name)
      .replace(/%%image%%/g, logos[key].img);
  }

  document.getElementById("logos-template").innerHTML = logoList;
});
