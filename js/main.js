// CUSTOM SCRIPTS

(function ($) {

    "use strict";

    // *** init slider
    $('#launchCircleCarousel').carousel({
        interval: 10000000,
        pause: 'hover'
    })


    $('#launchCircleToptalent').carousel({
        interval: 10000900,
        pause: 'hover'
    })



    $('a.page-scroll').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - $('.navbar').outerHeight() - 60
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });




    //Scrollspy offset
    $(window).on('scroll', function(event) {
        var scrollValue = $(window).scrollTop();
        var nav = $("#thing"),  scroll = $(".page-scroll"), navBar = nav.find('.navbar');

        if(scrollValue > 70){
            nav.addClass('stuck');
            navBar.addClass('container');
        } else {
            nav.removeClass('stuck');
            navBar.removeClass('container');
        }
        scrollValue > 600 ? scroll.addClass('active') : scroll.removeClass('active');
    });

})(jQuery);









