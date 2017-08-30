$('.carousel-multi').on('slide.bs.carousel', function (e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $('.carousel-multi .carousel-item').length;

    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-multi .carousel-item').eq(i).appendTo('.carousel-multi .carousel-inner');
            }
            else {
                $('.carousel-multi .carousel-item').eq(0).appendTo('.carousel-multi .carousel-inner');
            }
        }
    }
});