document.addEventListener("DOMContentLoaded", function () {
  let template = `
      <div class="project-container">
        <div>
            <h3>%%name%%</h3>
        </div>
        <div class="project-image">
            <img src="./assets/img/websites/%%image%%"/>
        </div>
        <div class="links">
          <div class="website">
              <a href="%%link%%" alt="%%name%%" target="_blank">Website</a>
          </div>
          <div class="git">
              <a href="%%github%%" alt="%%name%%" target="_blank">Github</a>
          </div>
        </div>
        <div>
            <p>%%description%%</p>
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
        <h3>%%name%%</h3>
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

const projects = [
  {
    name: "Trivia Game",
    imgName: "trivia.png",
    link: "https://bagglerock.github.io/Trivia-React/",
    github: "https://github.com/bagglerock/Trivia-React",
    description:
      "This is a trivia game written with React using typescript.  It calls upon the Open Trivia DB API for its questions.  It will randomize the questions and answers.  It is still a WIP at the moment but is playable.  More features to come with time.",
    technologies: "Node.js, React, Typescript, Bootstrap 4+, CSS with Sass",
  },
  {
    name: "Chef's Den",
    imgName: "chefsden.jpg",
    link: "https://immense-plateau-63304.herokuapp.com/",
    github: "https://github.com/bagglerock/Chefs-Den",
    description:
      "An application dedicated to your food needs.  This uses Yummly API to get the recipes and displays them using a combination of JQuery and Handlebars.  It uses MySQL to save your favorites and login information.",
    technologies:
      "Node.js, Express.js, Handlebars, bcrypt, MySQL, Sequelize, Javascript, jQuery, HTML, CSS",
  },
  {
    name: "Knockout Fitness",
    imgName: "knockout.jpg",
    link: "http://knockoutfitnessmuaythai.com",
    github: "https://github.com/bagglerock/knockout-fitness",
    description:
      "This is a website built for Knockout Fitness Muay Thai in Brick NJ.",
    technologies: "HTML, CSS, jQuery",
  },
  {
    name: "Hangman",
    imgName: "hangman.jpg",
    link: "https://bagglerock.github.io/Hangman-Game",
    github: "https://github.com/bagglerock/Hangman-Game",
    description:
      "Hangman game for the browser.  Musicians are the subject and spotify comes up on correct guess. Written using HTML, CSS and Javascript",
    technologies: "Javascript, HTML, CSS, Bootstrap",
  },
  {
    name: "Rock Paper Scissors",
    imgName: "rps.jpg",
    link: "https://bagglerock.github.io/RPS-Multiplayer",
    github: "https://github.com/bagglerock/RPS-Multiplayer",
    description:
      "Multiplayer Rock, Paper, Scissors with chat.  Written using HTML, CSS, Bootstrap, and the Firebase API",
    technologies: "Javascript, jQuery, Firebase, HTML, CSS",
  },
  {
    name: "PeachCo Lister 3.0",
    imgName: "peachco.gif",
    link: "https://limitless-reaches-23686.herokuapp.com",
    github: "https://github.com/bagglerock/peachco-react",
    description:
      "A browser based application that holds product information and lists products onto Ebay. At the moment the repo is private.  It was originally written using HTML, CSS, Javascript and PHP, but I wanted to make a Single Page version that would be optimized for the tablet.  This one uses React with a Node Backend.  Products are stored in a MySQL database, and sent to Ebay using the npm-package called ebay-api.  Images are sent to another server using the npm package jsftp.",
    technologies:
      "ReactJS, MySQL, NodeJS, Express, jsftp, node-ebay-api, multer",
  },
];

const logos = [
  {
    name: "Smokin 55 BBQ",
    img: "daves_logo_lighter.png",
  },
  {
    name: "Island Rides",
    img: "jam.png",
  },
  {
    name: "Material Memories",
    img: "Material Memories.jpg",
  },
  {
    name: "RHE Gen II",
    img: "rhe.png",
  },
  {
    name: "Yale Perinatal Associates",
    img: "kris-01.png",
  },
];
