$(window).scroll(function(){
    $(".hero-left").css("opacity", 1 - $(window).scrollTop() / 250);
    $(".right-content").css("opacity", 1 - $(window).scrollTop() / 700);
    $(".header").css("opacity", 0 + $(window).height() / 500);
    //$(".websites-header").css("opacity", 1 + $(window).scrollTop() / 1200);
  });