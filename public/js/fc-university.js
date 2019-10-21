


$(document).ready(function () {
    //initialize swiper when document ready
    var heroCarousel = new Swiper('.swiper-container', {
        autoplay: {
            delay: 3000,
        },
    })


    var testimonyCarousel = new Swiper('.testimony-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
    var teamCarousel = new Swiper('.team-container', {
        slidesPerView: 3,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })


    $( "#accordion" ).accordion({
        heightStyle: "content"
      });
});

