var viewportSlider;

(function (window, document) {
    'use strict';

    // function extend(b, a) {
    //     var prop;
    //     if (b === undefined) {
    //         return a;
    //     }
    //     for (prop in a) {
    //         if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop) === false) {
    //             b[prop] = a[prop];
    //         }
    //     }
    //     return b;
    // }

    function isTouchDevice() {
        return window.ontouchstart !== undefined // works on most browsers
            || window.onmsgesturechange !== undefined; // works on ie10
    }

    viewportSlider = {
        defaults: {
            animationHalt: 500,
            paginator: true
        },

        init: function init() {
            document.body.style.overflowY = 'hidden';
            var root = document.getElementById('wrapper'), selector = '.section', options;
            this.options = this.defaults;
            this.slides = document.querySelectorAll(selector);
            this.root = root;
            this.root.classList.add('viewport');
            this.setUpSlides()
                .bindScroll()
                .bindLeaf()
                .bindKeyboard();
            if (this.options.paginator && this.slides.length > 1) {
                viewportSliderPaginator.init();
            }
            if (isTouchDevice()) {
                this.bindSwipe();
            }
            return this;
        },

        setUpSlides: function setUpSlides() {
            var i;
            this.lastScrolled = 0;
            this.currentSlide = 0;
            for (i = 0; i < this.slides.length; i += 1) {
                this.slides[i].classList.add('section');
            }
            return this;
        },

        bindScroll: function bindScroll() {
            var self = this,
                onMouseWheel = function (e) {
                    self.scroll(e);
                };

            window.addEventListener('mousewheel', onMouseWheel);
            window.addEventListener('DOMMouseScroll', onMouseWheel);
            return this;
        },

        bindKeyboard: function bindKeyboard() {
            var self = this;
            document.body.addEventListener('keydown', function (e) {
                var keyCode = e.keyCode || e.which;
                switch (keyCode) {
                // home
                case 36:
                    self.paginate(0);
                    break;
                // pgup, arrup
                case 33:
                case 38:
                    self.paginate(self.currentSlide - 1);
                    break;
                // pgdown, arrdown
                case 34:
                case 40:
                    self.paginate(self.currentSlide + 1);
                    break;
                // end
                case 35:
                    self.paginate(self.slides.length - 1);
                    break;
                }
            });
            return this;
        },
        
        /* arrows Up / Down */
        bindLeaf: function bindLeaf() {
            var self = this;
            var up = document.body.querySelectorAll(".up"), down = document.body.querySelectorAll(".down");
            for (var i = 0; i < up.length; i++) {
                up[i].onclick = function() {
                    self.paginate(self.currentSlide - 1);
                } 
            };
            for (var i = 0; i < down.length; i++) {
                down[i].onclick = function() {
                    self.paginate(self.currentSlide + 1);
                }
            };
            return this;
        },
        /**/

        bindSwipe: function bindSwipe() {
            if (Hammer === undefined) {
                return false;
            }
            var self = this;
            return new Hammer(this.root, {
                prevent_default: true
            }).on('swipedown', function () {
                self.paginate(self.currentSlide - 1);
            }).on('swipeup', function () {
                self.paginate(self.currentSlide + 1);
            });
        },

        getWheelDirection: function getWheelDirection(e) {
            if (!e) {
                e = window.event;
            }
            return (e.detail < 0 || e.wheelDelta > 0) ? 1 : -1;
        },

        scroll: function scroll(e) {
            var delta = 0;
            e.preventDefault();
            e.stopPropagation();
            delta = this.getWheelDirection(e);
            if (delta > 0) {
                this.paginate(this.currentSlide - 1);
            } else {
                this.paginate(this.currentSlide + 1);
            }
        },
        
        paginate: function paginate(index, callback) {
            if (index < 0 || index > (this.slides.length - 1) || index === this.currentSlide) {
                return;
            }
            
            /* skip slides */
            var onScreen = document.body.querySelector('#section-'+(this.currentSlide+1));
            var screen = '#section-'+(this.currentSlide+1);
            var onTargetScreen = document.body.querySelector('#section-'+(index+1));
            var target = '#section-'+(index+1);
            var sections = document.body.querySelectorAll('.section');

            if (this.currentSlide-index>=1) {
                onScreen.classList.remove('on-screen');
                onScreen.classList.add('scroll-to-bottom');  
                onTargetScreen.classList.add('on-screen');
                onTargetScreen.classList.remove('scroll-to-top');
                onTargetScreen.classList.remove('jump-to-top');

                for ( let i=this.currentSlide; i>=index; i--){
                    if ((i<this.currentSlide)&&(i>index)) {
                        let section = sections[i];
                        section.classList.add('jump-to-bottom');
                        section.classList.remove('jump-to-top');
                        section.classList.remove('scroll-to-top');
                    }
                }
            }
            
            if (this.currentSlide-index<=-1) {
                onScreen.classList.remove('on-screen');
                onScreen.classList.add('scroll-to-top');
                onTargetScreen.classList.add('on-screen');
                onTargetScreen.classList.remove('scroll-to-bottom');
                onTargetScreen.classList.remove('jump-to-bottom');

                for ( let i=this.currentSlide; i<=index; i++){
                    if ((i>this.currentSlide)&&(i<index)) {
                        let section = sections[i];
                        section.classList.add('jump-to-top');
                        section.classList.remove('jump-to-bottom');
                        section.classList.remove('scroll-to-bottom');
                    }
                }
            }
            
            /**/
            /* animation */
            var animateBefore = document.body.querySelectorAll('.animate');
            for ( var n = 0; n < animateBefore.length; n++){
                animateBefore[n].classList.add('before');
            }
            var animate = document.body.querySelectorAll('#section-' + (index + 1) + ' .animate');
            for ( let m = 0; m < animate.length; m++){
                setTimeout(function(){ animate[m].classList.remove('before')},500+m*200);
            }
            /**/

            var scrollTime = new Date().getTime(),
                self = this;
            if (scrollTime - this.lastScrolled < this.options.animationHalt) {
                return false;
            }
            
            this.lastScrolled = scrollTime;
            if (typeof callback === 'function') {
                callback();
            }
            if (this.options.paginator) {
                viewportSliderPaginator.activate(index);
            }
            setTimeout(function () {
                self.currentSlide = index;
            }, this.options.animationHalt - 1);
        },
    };

}(window, document));

var viewportSliderPaginator;

(function (window, document) {
    'use strict';

    viewportSliderPaginator = {

        init: function init() {
            this.createPaginator();
        },

        createPaginator: function createPaginator() {
            var pager = document.createElement('aside');
            pager.id = 'div';
            pager.className = 'relative';
            this.root = document.createElement('div');
            this.root.id = 'pager';
            this.root.className = 'pager';
            this.root.innerHTML = '<ul>' +
                                  this.renderBullets() +
                                  '</ul>';
            document.body.appendChild(pager);
            div.appendChild(this.root);
            this.root.style.marginTop = -(this.root.offsetHeight / 2) + 'px';
            this.bindPagination();
        },

        renderBullets: function renderBullets() {
            var i,
                html = '',
                label;
            for (i = 0; i < viewportSlider.slides.length; i += 1) {
                label = viewportSlider.slides[i].getAttribute('data-label');
                html += '<li><a href="#" data-index="' + i + '" class="' +
                        (i === 0 ? 'active ' : '') +
                        'default">' +
                        '<span class="bullet"></span>' +
                        (label ? '<span class="label">' + label + '</span>' : '') +
                        '</a></li>';
            }
            return html;
        },

        bindPagination: function bindPagination() {
            var i,
                paginateFn = function (e) {
                    e.preventDefault();
                    viewportSlider.paginate(parseInt(this.getAttribute('data-index'), 10));
                };
            this.bullets = this.root.querySelectorAll('a');
            for (i = 0; i < this.bullets.length; i += 1) {
                this.bullets[i].addEventListener('click', paginateFn);

            }
            document.body.querySelector('.scroll_click').addEventListener('click', paginateFn);

        },


        activate: function activate(index) {
            var i;
            for (i = 0; i < this.bullets.length; i += 1) {
                if (i === index) {
                    this.bullets[i].classList.add('active');
                } else {
                    this.bullets[i].classList.remove('active');
                }
            }
        }
    };

}(window, document));

function coopPhotoParallax() {
    var photo = document.querySelectorAll(".coop-photo");
    var icon = document.querySelectorAll(".coop-icon");
    document.addEventListener("mousemove", function (e) {
        move (e.clientX, e.clientY);
    });

    function move (x, y) {
        var wh = window.innerHeight / 2,
        ww = window.innerWidth / 2;
        for ( var i = 0; i < photo.length; i++ ) {
            photo[i].style.transform = 'translate3d(' + (x - ww) / -30  + 'px, ' + (y - wh) / -50  + 'px, 0)';
            icon[i].style.transform = 'translate3d(' + (x - ww) / 50  + 'px, ' + (y - wh) / 40  + 'px, 0)';
        }
    }
}

if (document.body.clientWidth>=1005) {
    coopPhotoParallax();
}

var animate = document.body.querySelectorAll('.animate');

function isVisible(element) {
    var coords = element.getBoundingClientRect();
    var windowHeight = document.documentElement.clientHeight;
    var topVisible = coords.top > 0 && coords.top < windowHeight;
    var bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    return bottomVisible;
}

function animateVisible() {
    for ( var i=0; i<animate.length; i++ ) {
        var element = animate[i];
        var visibleCount = 1;
        if (isVisible(element)) {
            visible = document.body.querySelectorAll('.animate-visible');
            visibleCount = visible.length;
            showVisible(element,visibleCount);
        }
        if (!isVisible(element)) {
            element.classList.add('before');
            element.classList.remove('animate-visible');
        }
    }
}

function showVisible(element,visibleCount) {
    element.classList.add('animate-visible');
    setTimeout(function(){ element.classList.remove('before'); },visibleCount*100);
}

function onScroll() {
    animateVisible();
}

if (document.body.clientWidth>=1352) {
    viewportSlider.init();
}
else {
    var x1 = document.body.querySelector('#section-1');
    x1.classList.remove('on-screen');
    var x2 = document.body.querySelectorAll('.jump-to-bottom');
    var x3 = document.body.querySelectorAll('.animate');
    var x4 = document.body.querySelectorAll('.before');
    for ( let i = 0; i < x2.length; i++ ) {
        x2[i].classList.remove('jump-to-bottom');
    }
    for ( let i = 0; i < x3.length; i++ ) {
        x3[i].classList.remove('animate');
    }
    for ( let i = 0; i < x4.length; i++ ) {
        x4[i].classList.remove('before');
    }
}