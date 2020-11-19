$(document).ready(function(){

const section = document.body.querySelector('#section-6');
var popup, mobilePopup, overflow, closeBtn, visible = false, contact = document.body.querySelectorAll('a.contact');

for ( var i = 0; i < contact.length; i++){
    contact[i].addEventListener('click', function(){ contactShow(); });
    }

function contactShow() {
    if ((visible == false)&&(document.body.clientWidth>=1351)) {
        popup = document.createElement('div');
        popup.classList.add('section','popup','dark');
        popup.innerHTML = document.querySelector('#section-6').innerHTML;
        popup.querySelector('.card p').innerHTML = document.querySelector('.main-menu').innerHTML;
        popup.querySelector('.card h2').innerHTML = 'Contact Us';

        closeBtn = document.createElement('a');
        closeBtn.classList.add('close');
        
        overflow = document.createElement('div');
        overflow.classList.add('overflow');

        document.body.appendChild(popup);
        popup.appendChild(closeBtn);
        popup.querySelector('.popup .card h2').parentNode.insertBefore(popup.querySelector('.popup .card h2'), popup.querySelector('.popup .phone-component'));
        popup.querySelector('.popup .card .burger').parentNode.removeChild(popup.querySelector('.popup .card .burger'));
        popup.querySelector('.card .email-component').parentNode.removeChild(popup.querySelector('.card .email-component'));
        popup.querySelector('.card .phone-component a').parentNode.removeChild(popup.querySelector('.card .phone-component a'));

        var a = popup.querySelector('.form');
        console.log('a= ');
        console.log(a);



        $('.popup .form').validate({
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

        $('.popup .form').on('submit', function(event){
            event.preventDefault();
            if($('.popup .form').valid() === true){
                $('.submit').val('successful');
                $('.submit').attr('disabled',true);
                setTimeout(function(){
                    $('.submit').val('send');
                    $('.submit').attr('disabled',false);
                }, 10000)
            }     
        });

        $('.popup .submit').on('click', function(e) {
            e.preventDefault(); 
            sendTheMail()
        });
                        
        var m = new mandrill.Mandrill('WsuxvVTHRLhoh3-Wd-bg6g'); 
        console.log('m', m);
        function sendTheMail(){
            console.log("$('.popup .name_').val()", $('.popup .name').val());
            console.log("$('.popup .email').val()", $('.popup .email').val());
            console.log("$('.popup .message').val()", $('.popup .message').val());
            m.messages.send({
                "message": {
                    "name": $('.popup .name').val(),
                    "from_email": $('.popup .email').val(),
                    "to":[{"email": "contact@qbex.io", "name": "qbex.io"}], // Array of recipients
                    "text": $('.popup .message').val()
                }
            });
        }



        closeBtn.addEventListener('click', function(){ contactHide() });

        document.body.appendChild(overflow);
        overflow.addEventListener('click', function(){ contactHide() });

        document.body.addEventListener('keydown', function(e) { 
            var keyCode = e.keyCode || e.which;
            switch (keyCode) {
            // escape
            case 27:
                contactHide();
                break;
            }
        });
        visible = true;
    }
    else {
        return;
    }
}

function contactHide() {
    if ((visible == true)&&(document.body.clientWidth>=1351)) {
        document.body.removeChild(popup);
        document.body.removeChild(overflow);
        visible = false;
    }
    else {
        return;
    }
}



});



