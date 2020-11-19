'use strict';

$(document).ready(function () {

    // filter

    var sliders = [
        { slider: '#product-carousel1', leaf: '#product-carousel-leaf1' },
        { slider: '#product-carousel2', leaf: '#product-carousel-leaf2' },
        { slider: '#product-carousel3', leaf: '#product-carousel-leaf3' },
        { slider: '#product-carousel4', leaf: '#product-carousel-leaf4' }
    ];
    // console.log('$(window).width()', $(window).width());
    var SLIDES_PER_VIEW = $(window).width() > 1650 ? 2 : 1;
    var _sliders = [];

    function setButtons(slick, currentSlide, leaf) {
        console.log('currentSlide', currentSlide);
        var amount = slick.slideCount;
        console.log('amount', amount);
        console.log('amount', amount > 2);

        if (currentSlide === 0) {
            $(leaf + ' .leaf-prev').addClass('disabled')
            $(leaf + ' .leaf-next').removeClass('disabled');

        if (amount <= 2) {
            $(leaf + ' .leaf-prev').addClass('disabled');
            $(leaf + ' .leaf-next').addClass('disabled');
        }
        if(SLIDES_PER_VIEW == 1) {
            $(leaf + ' .leaf-prev').addClass('disabled');
            $(leaf + ' .leaf-next').removeClass('disabled');
        } 
        
        } 
        else if (currentSlide === amount - SLIDES_PER_VIEW) {
            $(leaf + ' .leaf-next').addClass('disabled');
            $(leaf + ' .leaf-prev').removeClass('disabled');
        } else {
            $(leaf + ' .leaf-prev').removeClass('disabled');
            $(leaf + ' .leaf-next').removeClass('disabled');
        }
    }

    sliders.forEach(function (_ref) {
        var slider = _ref.slider,
            leaf = _ref.leaf;

        $(slider).on('init', function (event, slick) {
            console.log('slider was initialized', slick.slideCount);
            setButtons(slick, 0, leaf);

        });
        var instance = $(slider).slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            infinite: false,
            slickFilter: function slickFilter(e) {
                console.log('slider11', e);
            },
            responsive: [{
                breakpoint: 1650,
                settings: {
                    slidesToShow: 1
                }
            }]
        }).on("afterChange", function (e, slick, currentSlide) {
            return setButtons(slick, currentSlide, leaf);
        });

        $(leaf + ' .leaf-prev').click(function (slickPrev) {

            $(slider).slick('slickPrev');
        });

        $(leaf + ' .leaf-next').click(function (slickNext) {

            $(slider).slick('slickNext');
        });
        _sliders.push(instance);
    });

    var filtered = false;

    $('.product-button').on('click', function () {
        // console.log('event', event);
        // console.log('slide', slide);
        var filtername = $(this).parent('li').attr('id');
        var currentclass = $(this).attr('class');
        if (filtered === false) {
            $('.product-carousel').slick('slickUnfilter');
            $('.product-carousel').slick('slickFilter', '.filter-' + filtername);
            $('.product-button').attr('class', 'btn btn-xs btn-default product-button');
            $(this).attr('class', 'btn btn-xs btn-primary product-button');
            // _sliders.forEach(function(e, index){
            $(_sliders[0]).slick('slickGoTo', 0, false);

            // console.log('asdasd', )
            _slick = $(_sliders[0]).slick('getSlick');
            setButtons(_slick, 0, sliders[0].leaf); //index
            // })

            // console.log("22", $(_sliders[0]).slideCount);
            // $('.product-carousel').slickGoTo(0);
        } else {
                // console.log("asd");
                // $('.product-carousel').slick('slickUnfilter');
                // $('.product-carousel').slick('slickFilter', '.filter-' + filtername);
                // $('.product-carousel').slickGoTo(0);
                // $('.product-button').attr('class', 'btn btn-xs btn-default product-button');
                // $(this).attr('class', 'btn btn-xs btn-primary product-button');
                // filtered = false;
            }
    });

    $('#All button, #Design button, #Development button, #App button, #Branding button').on('click', function () {
        $(this).addClass('active_link');
    });
});