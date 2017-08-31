// *** init slider
$('#launchCircleCarousel .carousel-inner').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: $('.carousel-control-next'),
    prevArrow: $('.carousel-control-prev'),
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