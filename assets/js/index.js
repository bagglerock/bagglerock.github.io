var websites = [{
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
        name: "Freight Systems NJ",
        imgName: "freight-sys.jpg",
        link: "https://bagglerock.github.io/freight-sys",
        github: "https://github.com/bagglerock/freight-sys",
        description: "site for food",
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
        description: "Multiplayer Rock, Paper, Scissors with chat",
        technologies: "Javascript, jQuery, Firebase, HTML, CSS"
    },
    {
        name: "Trivia Game",
        imgName: "trivia.jpg",
        link: "https://bagglerock.github.io/TriviaGame/",
        github: "https://github.com/bagglerock/TriviaGame",
        description: "Trivia Game where I couldn't think of any questions, so I just made odd questions and answers",
        technologies: "Javascript, jQuery, HTML, CSS, Bootstrap"
    }
];



var logos = [{
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

var imageLocationWebsite = "./assets/img/websites/";
var imageLocationLogos = "./assets/img/logos/";


$(document).ready(function() {

    $(window).scroll(function () {
        $(".info-section").css("opacity", 1 - $(window).scrollTop() / 250);
        $(".links-section").css("opacity", 1 - $(window).scrollTop() / 250);
        $(".headline").css("opacity", 1 - $(window).scrollTop() / 250);
      });

    for (var i = 0; i <  websites.length ; i++) {

        var name = websites[i].name;
        var imgName = websites[i].imgName;
        var link = websites[i].link;
        var github = websites[i].github;
        var description = websites[i].description;
        var technologies = websites[i].technologies;

        var mainDiv = $("<div>");

        var imgDiv = $("<div>");
        var imgTag = $("<img>");
        var imgATag = $("<a>");
        imgTag.attr("src", imageLocationWebsite + imgName);
        imgATag.attr("href", link).attr("target", "_blank");
        imgATag.append(imgTag);
        imgDiv.append(imgATag);

        var nameDiv = $("<div>");
        var nameHTag = $("<h3>");
        nameHTag.text(name);
        nameDiv.append(nameHTag).addClass("webapp-name");

        var linksDiv = $("<div>");
        var linkATag = $("<a>");
        linkATag.attr("href", link).text(link).attr("target", "_blank");
        linksDiv.append(linkATag).addClass("link-div");

        var gitDiv = $("<div>");
        var gitATag = $("<a>");
        gitATag.attr("href", github).text(github).attr("target", "_blank");
        gitDiv.append(gitATag).addClass("link-div");

        var descriptionDiv = $("<div>");
        var descPTag = $("<p>");
        descPTag.text(description);
        descriptionDiv.append(descPTag).addClass("description-div");

        var techDiv = $("<div>");
        var techPTag = $("<p>");
        techPTag.text(technologies);
        techDiv.append(techPTag).addClass("description-div");


        $(mainDiv).append(imgDiv, nameDiv, linksDiv, gitDiv, descriptionDiv, techDiv);
        $("#websites-area").append(mainDiv);

    }

    for(var i = 0; i < logos.length; i++) {

        var mainDiv = $("<div>");

        var name = logos[i].name;
        var imgName = logos[i].img;

        var imgDiv = $("<div>");
        var imgTag = $("<img>");
        var imgATag = $("<a>");
        imgTag.attr("src", imageLocationLogos + imgName);
        imgATag.attr("href", link).attr("target", "_blank");
        imgATag.append(imgTag);
        imgDiv.append(imgATag);

        var nameDiv = $("<div>");
        var nameHTag = $("<h4>");
        nameHTag.text(name);
        nameDiv.append(nameHTag).addClass("description-div");

        $(mainDiv).append(nameDiv, imgDiv);
        $("#logos-area").append(mainDiv);


    }




});