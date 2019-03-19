
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items: 1,
        dots: true
    });
    $('.single-item').slick({
        arrows: false
    });
    ScrollReveal().reveal('.js-left', {
        duration: 1000,
        origin: 'left',
        distance: '40px'
    });
    ScrollReveal().reveal('.js-right', {
        duration: 1000,
        origin: 'right',
        distance: '40px'
    });
    ScrollReveal().reveal('.js-up', {
        duration: 1000,
        origin: 'bottom',
        distance: '40px'
    });
    ScrollReveal().reveal('.js-down', {
        duration: 1000,
        origin: 'top',
        distance: '40px'
    });

    var feed = new Instafeed({

        get: 'user',

		userId: '',

		accessToken: '',

		limit: '8',

		sortBy: 'most-recent',

		resolution: 'low_resolution',

    });

    feed.run();
    
  });