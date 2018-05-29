var slideIndex = 1;
var website = "website";
var logo = "logo";
showSlides(slideIndex, website);
showSlides(slideIndex, logo);

// Next/previous controls
function plusSlides(n, type) {
  showSlides(slideIndex += n, type);
}

// Thumbnail image controls
function currentSlide(n, type) {
  showSlides(slideIndex = n, type);
}

function showSlides(n, type) {
  var i;
  var slides = document.getElementsByClassName(type + "-mySlides");
  var dots = document.getElementsByClassName(type + "-demo");
  var captionText = document.getElementById(type + "-caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}