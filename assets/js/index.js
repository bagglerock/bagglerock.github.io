const websites = [{
        name: "Chef's Den",
        imgName: "chefsden.jpg",
        link: "https://immense-plateau-63304.herokuapp.com/",
        github: "https://github.com/bagglerock/Chefs-Den",
        description: "Recipe Finder using the Yummly API.  Login sytem for saving favorites",
        technologies: "Node.js, Express.js, Handlebars, bcrypt, MySQL, Sequelize, Javascript, jQuery, HTML, CSS"
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
        description: "Application to scrape news article headers from google news and let you make comments about it (under-construction)",
        technologies: "Node.js, Express.js, Handlebars, MongoDB, Mongoose, Axios, Cheerio, Javascript, jQuery, HTML, CSS"
    },
    {
        name: "Freight Systems NJ",
        imgName: "freight-sys.jpg",
        link: "https://bagglerock.github.io/freight-sys",
        github: "https://github.com/bagglerock/freight-sys",
        description: "Website for Freight Systems of NJ.  A Logistics company for your shipping needs.",
        technologies: "HTML, CSS, jQuery"
    },
    {
        name: "Hangman",
        imgName: "hangman.jpg",
        link: "https://bagglerock.github.io/Hangman-Game",
        github: "https://github.com/bagglerock/Hangman-Game",
        description: "Hangman game for the browser.  Musicians are the subject and spotify comes up on correct guess.",
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
        description: "Trivia Game where I couldn't think of any questions, so I just made odd questions and answers",
        technologies: "Javascript, jQuery, HTML, CSS, Bootstrap"
    },
    {
        name: "Clicky Game",
        imgName: "clicky.jpg",
        link: "https://mysterious-stream-83031.herokuapp.com/",
        github: "https://github.com/bagglerock/clicky-game",
        description: "Clicky Game is a small little game much like memory.  Try not to click on the same picture twice and build up your score.",
        technologies: "MERN"
    },
    {
        name: "PeachCo Lister 3.0",
        imgName: "peachco.gif",
        link: "https://limitless-reaches-23686.herokuapp.com",
        github: "https://github.com/bagglerock/peachco-react",
        description: "PeachCo Lister is the listing program for PeachCo that integrates with Ebay's API to list products from a database",
        technologies: "ReactJS, MySQL, NodeJS, Express, jsftp, node-ebay-api, multer"
    }
];



const logos = [{
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
    },
];


const skills = ["Javascript", "ReactJs" ,"Node.js", "Express.js", "Firebase", "MongoDB", "Ajax", "RESTful", "API's", "PHP", "jQuery", "MySQL", "HTML", "CSS", "Bootstrap", "Adobe Illustrator", "Adobe Photoshop", "Vectornator", "Git"];

const imageLocationWebsite = "./assets/img/websites/";
const imageLocationLogos = "./assets/img/logos/";


$(document).ready(function() {

    $(window).scroll(function () {
        $(".info-section").css("opacity", 1 - $(window).scrollTop() / 250);
        $(".links-section").css("opacity", 1 - $(window).scrollTop() / 250);
        $(".headline").css("opacity", 1 - $(window).scrollTop() / 250);
      });

    for (let i = 0; i <  websites.length ; i++) {

        let name = websites[i].name;
        let imgName = websites[i].imgName;
        let link = websites[i].link;
        let github = websites[i].github;
        let description = websites[i].description;
        let technologies = websites[i].technologies;

        let mainDiv = $("<div>");

        let imgDiv = $("<div>");
        let imgTag = $("<img>");
        let imgATag = $("<a>");
        imgTag.attr("src", imageLocationWebsite + imgName);
        imgATag.attr("href", link).attr("target", "_blank");
        imgATag.append(imgTag);
        imgDiv.append(imgATag);

        let nameDiv = $("<div>");
        let nameHTag = $("<h3>");
        nameHTag.text(name);
        nameDiv.append(nameHTag).addClass("webapp-name");

        let linksDiv = $("<div>");
        let linkATag = $("<a>");
        linkATag.attr("href", link).text(link).attr("target", "_blank");
        linksDiv.append(linkATag).addClass("link-div");

        let gitDiv = $("<div>");
        let gitATag = $("<a>");
        gitATag.attr("href", github).text(github).attr("target", "_blank");
        gitDiv.append(gitATag).addClass("link-div");

        let descriptionDiv = $("<div>");
        let descPTag = $("<p>");
        descPTag.text(description);
        descriptionDiv.append(descPTag).addClass("description-div");

        let techDiv = $("<div>");
        let techPTag = $("<p>");
        techPTag.text(technologies);
        techDiv.append(techPTag).addClass("description-div");


        $(mainDiv).append(imgDiv, nameDiv, linksDiv, gitDiv, descriptionDiv, techDiv).addClass("style_prevu_kit");
        $("#websites-area").append(mainDiv);

    }

    for(let i = 0; i < logos.length; i++) {

        let mainDiv = $("<div>");

        let name = logos[i].name;
        let imgName = logos[i].img;

        let imgDiv = $("<div>");
        let imgTag = $("<img>");
        imgTag.attr("src", imageLocationLogos + imgName);
        imgDiv.append(imgTag);

        let nameDiv = $("<div>");
        let nameHTag = $("<h4>");
        nameHTag.text(name);
        nameDiv.append(nameHTag).addClass("description-div");

        $(mainDiv).append(nameDiv, imgDiv).addClass("style_prevu_kit");
        $("#logos-area").append(mainDiv);


    }

    for (let i = 0; i < skills.length; i++){
        let ulTag = $("<ul>");
        let liTag = $("<li>");
        liTag.text(skills[i]);
        ulTag.append(liTag);
        $("#skills-area").append(ulTag);
    }




});