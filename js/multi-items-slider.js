// *** init slider
$(document).ready(function () {
    if(!$('.carousel-center').length) {
        $('.slick-slider.carousel-multi .carousel-inner').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            nextArrow: $('.slick-slider .carousel-control-next'),
            prevArrow: $('.slick-slider .carousel-control-prev'),
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
    else {
        $('.carousel-center .carousel-inner').slick({
            centerMode: true,
            centerPadding: 0,
            focusOnSelect: true,
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            nextArrow: $('.slick-slider .carousel-control-next'),
            prevArrow: $('.slick-slider .carousel-control-prev'),
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        centerMode: false,
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        centerMode: true,
                        centerPadding: 0,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
});