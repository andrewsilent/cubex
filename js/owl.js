$(document).ready(function(){

                // OWL CARUSEL

    jQuery.fn.exists = function(){return ($(this).length > 0);}
    if ($('.owl-carousel').exists()) { 
        $('.owl-carousel').owlCarousel({
            loop:true, 
            items:1,
            smartSpeed:1000,
            dots:false,
            margin:500,
            mouseDrag:false,
            touchDrag:true
          });
    }
        var owl = $('.owl-carousel');
        $(".owl-next").click(function(){
            owl.trigger("next.owl.carousel");
        });
        $(".owl-prev").click(function(){
            owl.trigger("prev.owl.carousel");
        });

                // MOBILE-MENU

    var visible = false;

    $('.MobileMenu-btnContainer').on('click', function() { menuToggle() });

    function menuToggle() {
        if(visible == false) {
            menuShow();
            console.log('toggle menu show');
            return
        } 
        if(visible == true) {
            menuHide();
            console.log('toggle menu hide');
            return
        }
    }
    
    function toggleCheck() {
        $('.off_canvas').toggleClass('right_null');
        $('#wrapper').toggleClass('menu_transform');
        $('.MobileMenu-btnContainer').toggleClass('transform_button');
    }

    function menuShow() {
        if(visible == false){
            toggleCheck();
            var overflow = document.createElement('div');
            $(overflow).addClass('overflow');
            $("body").append(overflow);
            $('.overflow').on('click', function() {
                menuHide(); 
                if($('#checkbox').is(':checked')) {
                    $("#checkbox").prop("checked", false);
                }
            });

            visible = true;
            return
        }

        else {
            menuHide();
            return
        }
    }

    function menuHide() {
        if(visible == true){
            toggleCheck();
            $(".overflow").remove();

             visible = false;
             return
        }
    }

            // SHOW HIDDEN PORTFOLIO IMAGES

    var images = $('.coop-card');
    $('.view').on('click', function() {
        hidden = $('.hidden');
        for(let i=0; i<4; i++){
            if(hidden[i]) {
                setTimeout(function(){
                    hidden[i].classList.remove('hidden')
                }, i*200);
            }
            else { }
        }
    });

      // scroll

    if($(window).width() < 1360) {
        $(".contact").attr("href", "#section-6");
        $(".work").attr("href", "#section-5");
    }

    $('a[href^="#"], *[data-href^="#"]').on('click', function(e){
        e.preventDefault();
        var t = 1000;
        var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
        $('html,body').stop().animate({ scrollTop: $(d).offset().top }, t);
    });

            // valid form

    $('.form').validate({
        rules: {
            name: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true
            },
            text: {
                required: true
            }
        }
    });

    $('.form').on('submit', function(event){
        event.preventDefault();
        if($('.form').valid() === true){
            $('.submit').val('successful');
            $('.submit').attr('disabled',true);
            setTimeout(function(){
                $('.submit').val('send');
                $('.submit').attr('disabled',false);
            }, 10000)
        }     
    });

                   // Mandrill

        $('.submit').on('click', function(e) {
            e.preventDefault(); 
            sendTheMail()
        });
                        
        var m = new mandrill.Mandrill('WsuxvVTHRLhoh3-Wd-bg6g'); 
        console.log('m', m);
        function sendTheMail(){
            console.log("$('.name_').val()", $('.name').val());
            console.log("$('.email').val()", $('.email').val());
            console.log("$('.message').val()", $('.message').val());
            m.messages.send({
                "message": {
                    "name": $('.name').val(),
                    "from_email": $('.email').val(),
                    "to":[{"email": "contact@qbex.io", "name": "qbex.io"}], // Array of recipients
                    "text": $('.message').val()
                }
            });
        }
});