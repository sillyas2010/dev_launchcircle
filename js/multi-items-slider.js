// *** init slider
$('.slick-slider.carousel-multi .carousel-inner').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
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