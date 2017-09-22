// CUSTOM SCRIPTS

(function ($) {

    "use strict";

    var live = true;

    if(live) {
        $('.locale').hide();
    }

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

    $('.locale .custom-select').on('change', function (e) {
        if ($(this).val() === '0') {
            changeLang('en');
        }
        if ($(this).val() === '1') {
            changeLang('ge');
        }
    });

    //fix of scrolling on disabled button click
    $('.btn.disabled').on('click',function(e) {e.preventDefault();});

    //Tabs on faq-page
    $('a[data-toggle="pill"]').on('click',function (e) {
        e.preventDefault();
        var tab = $(this).attr('href');

        $('a[data-toggle="pill"], .tab-wrapper .tab-links li, .tab-wrapper .tab-pane').removeClass('active');

        $('a[data-toggle="pill"], .tab-wrapper .tab-pane').removeAttr('aria-expanded');

        $('.tab-wrapper ' + tab + '.tab-pane').tab('show');

        $('.tab-wrapper .tab-links a[href="' + tab + '"]').closest('li').addClass('active');

        $(this).addClass('active')
               .attr('aria-expanded','true');
    });

    //Accordion on faq-page
    $(document).ready(function () {
        changeAccordionIcon(true);

        $('.accordion').on('show.bs.collapse hide.bs.collapse', function (e) {
            changeAccordionIcon(false, e.target);
        });
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
            langExists = /[\-][a-z]{2}(\.html)?$/,
            lang = lang || undefined;

        currPage.setAttribute('href',window.location.href);

        if(!isInit && ifLangChanged() && lang === 'en') {

            var startsFrom = currPage.pathname.match(langExists).index,
                newPage = currPage.pathname.match(langExists).input.substring(0,startsFrom) || '/';

            window.location.href = newPage;
        }
        else if(!isInit) {
            window.location.href = changeHref($(currPage),lang);
        }
        else if(isInit && ifLangChanged()) {
            $('.locale .custom-select option').removeAttr('selected')
                .filter(function () { return $(this).text().toLowerCase() === ifLangChanged(); })
                .attr('selected','selected');
        }
    }

    function changeHref($el,lang) {
        var extension = '.html';

        if(lang !== "en") {
            if($el[0].pathname.indexOf(extension) !== -1)
                return $el[0].pathname = $el[0].pathname.replace(new RegExp(extension, 'g'), '-' + lang + extension);
            else if($el[0].pathname === '/')
                return $el[0].pathname += 'index-' + lang + extension;
            else
                return $el[0].pathname += '-' + lang;
        }
    }

    function ifLangChanged() {
        var currPage = window.location.pathname,
            langExists = /[\-][a-z]{2}(\.html)?$/;
        if(langExists.test(currPage)) {
            return currPage.match(langExists)[0].match(/[a-z]{2}/)[0];
        }
        else {
            return false;
        }
    }
    
    function changeAccordionIcon(isInit,el) {
        if(el  && !isInit) {
            $(el).closest('.card').toggleClass('active');
        }
        else if(isInit) {
            $('.accordion div[role="tabpanel"]').each(function () {
                if($(this).hasClass('show')) $(this).parent().addClass('active');
            });
        }
    }

    changeLang(undefined,true);

})(jQuery);









