// CUSTOM SCRIPTS

(function ($) {

    "use strict";

    $('#launchCircleToptalent').carousel({
        ride: "carousel",
        interval: 10000,
        pause: 'hover'
    });

    // *** init animation offset top = 0
    var onScrollInit = function (items, trigger) {
        items.each(function () {
            var osElement = $(this),
                osAnimationClass = osElement.attr('data-animation'),
                osAnimationDelay = osElement.attr('data-animation-delay'),
                osAnimationOffset = osElement.attr('data-animation-offset');

            var osTrigger = ( trigger ) ? trigger : osElement;

            osElement.css({
                '-webkit-animation-delay': osAnimationDelay,
                '-moz-animation-delay': osAnimationDelay,
                'animation-delay': osAnimationDelay
            });

            new Waypoint({
                element: osTrigger.get(0),
                handler: function (direction) {
                    if (direction === 'down') {
                        osElement.addClass('animated').addClass(osAnimationClass);
                    }
                    else {
                        osElement.removeClass('animated').removeClass(osAnimationClass);
                    }
                },
                triggerOnce: true,
                offset: osAnimationOffset ? osAnimationOffset : '110%'
            });

        });
    };

    onScrollInit($('.animate-on'));

    $('a.page-scroll').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - $('.navbar').outerHeight() - 60
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    $('.locale select').on('change', function (e) {
        debugger;
        if (this.value === 0) {
            changeLang('en');
        }
        if (this.value === 1) {
            changeLang('de');
        }
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

    $('form').validator().on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            e.preventDefault();//prevent from redirecting to gforms site

            var form = $(e.target),
                url = form.attr('action'),
                data = form.serializeObject();

            $.ajax({
                type: 'POST',
                url: url,
                dataType: "xml",
                data: data,
                complete: function (xhr) {
                    form[0].reset();
                    if (form.closest('.modal.fade'))
                        form.closest('.modal.fade').modal('toggle');
                    console.clear();

                    createNotify('Thank you for your submission, it has been received' +
                        ' and someone will be reaching out to you shortly.','succeed','fixed');
                }
            });
        }
    });

    $.fn.serializeObject = function()
    {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    function createNotify(message,type,position) {
        var offset = {x: 20, y: 100};

        if($('.navigation.stuck').length > 0) offset.y = 70;

        $.notify(
            {
                message: message
            },
            {
                position: position,
                type: type,
                offset: offset
            }
        );
    }

    function changeLang(lang,isInit) {
        var currPage = document.createElement('a'),
            lang = lang || getCookie('launchcircle-lang') || undefined;

        if(!isInit || isInit === undefined) {
            document.cookie = "name=launchcircle-lang; value=" + lang + " path=/; expires=3600";
            currPage.setAttribute('href',window.location.href);
            window.location.href = changeHref($(currPage),lang);
        }
        else if(lang && lang.length > 0) {
            $('a').each(function () {
                debugger;
                if(!$(this).hash) {
                    $(this).attr('href', changeHref($(this),lang));
                }
            });
        }
    }

    function changeHref(el,lang) {
        var extension = '.html',
            pageHasExtension= window.location.pathname.indexOf('.html') !== -1 ? window.location.pathname.indexOf('.html')
                                                                               : false;

        if(el.pathname.indexOf(extension) !== -1)
            return el.pathname = el.pathname.replace(new RegExp(extension, 'g'), '-' + lang + extension);
        else if(el.pathname === '/')
            return el.pathname += 'index-' + lang + extension;
        else
            return el.pathname += '-' + lang;
    }

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

})(jQuery);









