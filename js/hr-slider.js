var slider = document.body.querySelectorAll('.portfolio'), slides = document.body.querySelectorAll('.portfolio .slider ul');
var prev = document.body.querySelectorAll('.portfolio .leaf .leaf-prev'), next = document.body.querySelectorAll('.portfolio .leaf .leaf-next');
var width = document.body.querySelector('.portfolio .slider img').offsetWidth;
var position = [0,0,0,0], currentItem = [0,0,0,0], slideCount = [];
for ( var i = 0; i < slider.length; i++ ) {
    slideCount[i] = slider[i].querySelectorAll('img').length;
}
for ( var i = 0; i < slider.length; i++) {
    let index = i;
    prev[i].addEventListener('click', function(e){ slidePrev(index); });
    next[i].addEventListener('click', function(e){ slideNext(index); });
}

    function slidePrev(index) {
        // console.log("value", document.body.querySelectorAll('.portfolio .slider ul.important_none').length);
        // alert('1')
        currentItem[index] = currentItem[index] - 1;
        if (currentItem[index] > 0) {
            next[index].classList.remove('disabled');
            position[index] = -currentItem[index] * width;
            slides[index].style.marginLeft = position[index] + 'px';
        }
        if (currentItem[index] <= 0) {
            currentItem[index] = 0;
            position[index] = -currentItem[index] * width;
            slides[index].style.marginLeft = position[index] + 'px';
            prev[index].classList.add('disabled');
        }
    }

    function slideNext(index) {
        console.log("value", $('.portfolio .slider ul').not('.important_none').length);
        // alert('2')
        currentItem[index] = currentItem[index] + 1;
        if (currentItem[index] < slideCount[index]-1) {
            prev[index].classList.remove('disabled');
            position[index] = -currentItem[index] * width;
            slides[index].style.marginLeft = position[index] + 'px';
        }
        if (currentItem[index] >= slideCount[index]-1) {
            currentItem[index] = slideCount[index]-1;
            position[index] = -currentItem[index] * width;
            slides[index].style.marginLeft = position[index] + 'px';
            next[index].classList.add('disabled');
        }
    }

// var team = document.body.querySelectorAll('.team-slider');
// console.log(team);
// console.log('teamSlides='+document.body.querySelectorAll('.coop-name ul li').length);
// var teamPrev = document.body.querySelector('.team-leaf .leaf-prev'), teamNext = document.body.querySelector('.team-leaf .leaf-next');
// var coopHeaderWidth = document.body.querySelector('.team-slider .coop-header').offsetWidth, 
// coopNameWidth = document.body.querySelector('.team-slider .coop-name ul li').offsetWidth, 
// coopPostWidth = document.body.querySelector('.team-slider .coop-post ul li').offsetWidth, 
// socialWidth = document.body.querySelector('.team-slider .social ul li').offsetWidth, 
// coopPhotoWidth = document.body.querySelector('.team-slider .coop-photo img').offsetWidth, 
// coopIconWidth = document.body.querySelector('.team-slider .coop-icon ul li').offsetWidth;
// var coopHeader = document.body.querySelector('.team-slider .coop-header ul'),
// coopName = document.body.querySelector('.team-slider .coop-name ul'),
// coopPost = document.body.querySelector('.team-slider .coop-post ul'),
// social = document.body.querySelector('.team-slider .social ul'),
// coopPhoto = document.body.querySelector('.team-slider .coop-photo ul'),
// coopIcon = document.body.querySelector('.team-slider .coop-icon ul');
// var teamPosition = 0, teamCurrentItem = 0, teamSlideCount = document.body.querySelectorAll('.coop-name ul li').length;
// console.log('coopName');
// console.log(coopName);
// teamPrev.addEventListener('click', function(e){ slideTeamPrev(); });
// teamNext.addEventListener('click', function(e){ slideTeamNext(); });
// var coopPhotoBefore, coopPhotoAfter;
//     console.log('current item = '+teamCurrentItem);
//     function slideTeamPrev() {
//         teamCurrentItem -= 1;
//         if (teamCurrentItem < 0) { teamCurrentItem = 3; }
//         coopHeader.style.marginLeft = -(teamCurrentItem * coopHeaderWidth) + 'px';
//         coopName.style.marginLeft = -(teamCurrentItem * coopNameWidth) + 'px';
//         coopPost.style.marginLeft = -(teamCurrentItem * coopPostWidth) + 'px';
//         social.style.marginLeft = -(teamCurrentItem * socialWidth) + 'px';
//         coopPhoto.style.marginLeft = -(teamCurrentItem * coopPhotoWidth) + 'px';
//         coopIcon.style.marginLeft = -(teamCurrentItem * coopIconWidth) + 'px';

//         if (teamCurrentItem == 0) { console.log('if 1'); coopPhotoBefore = coopPhoto.querySelectorAll('li')[3].innerHTML; coopPhotoAfter = coopPhoto.querySelectorAll('li')[1].innerHTML; }
//         if (teamCurrentItem == 1) { console.log('if 2'); coopPhotoBefore = coopPhoto.querySelectorAll('li')[0].innerHTML; coopPhotoAfter = coopPhoto.querySelectorAll('li')[2].innerHTML; }
//         if (teamCurrentItem == 2) { console.log('if 3'); coopPhotoBefore = coopPhoto.querySelectorAll('li')[1].innerHTML; coopPhotoAfter = coopPhoto.querySelectorAll('li')[3].innerHTML; }
//         if (teamCurrentItem == 3) { console.log('if 4'); coopPhotoBefore = coopPhoto.querySelectorAll('li')[2].innerHTML; coopPhotoAfter = coopPhoto.querySelectorAll('li')[0].innerHTML; }
//         // else { console.log('if 3'); coopPhotoBefore = coopPhoto.querySelectorAll('li')[teamCurrentItem-1].innerHTML; coopPhotoAfter = coopPhoto.querySelectorAll('li')[teamCurrentItem+1].innerHTML; }
//         console.log('previous photo = ');
//         console.log(coopPhotoBefore);
//         console.log('next photo = ');
//         console.log(coopPhotoAfter);
//     }

//     function slideTeamNext() {
//         teamCurrentItem += 1;
//         if (teamCurrentItem > 3) { teamCurrentItem = 0; }
//         coopHeader.style.marginLeft = -(teamCurrentItem * coopHeaderWidth) + 'px';
//         coopName.style.marginLeft = -(teamCurrentItem * coopNameWidth) + 'px';
//         coopPost.style.marginLeft = -(teamCurrentItem * coopPostWidth) + 'px';
//         social.style.marginLeft = -(teamCurrentItem * socialWidth) + 'px';
//         coopPhoto.style.marginLeft = -(teamCurrentItem * coopPhotoWidth) + 'px';
//         coopIcon.style.marginLeft = -(teamCurrentItem * coopIconWidth) + 'px';

        
        
//         if (teamCurrentItem == 0) { console.log('if 1'); coopPhotoBefore = coopPhoto.querySelectorAll('li')[3].innerHTML; coopPhotoAfter = coopPhoto.querySelectorAll('li')[1].innerHTML; }
//         if (teamCurrentItem == 1) { console.log('if 2'); coopPhotoBefore = coopPhoto.querySelectorAll('li')[0].innerHTML; coopPhotoAfter = coopPhoto.querySelectorAll('li')[2].innerHTML; }
//         if (teamCurrentItem == 2) { console.log('if 3'); coopPhotoBefore = coopPhoto.querySelectorAll('li')[1].innerHTML; coopPhotoAfter = coopPhoto.querySelectorAll('li')[3].innerHTML; }
//         if (teamCurrentItem == 3) { console.log('if 4'); coopPhotoBefore = coopPhoto.querySelectorAll('li')[2].innerHTML; coopPhotoAfter = coopPhoto.querySelectorAll('li')[0].innerHTML; }
//         // else { console.log('if 3'); coopPhotoBefore = coopPhoto.querySelectorAll('li')[teamCurrentItem-1].innerHTML; coopPhotoAfter = coopPhoto.querySelectorAll('li')[teamCurrentItem+1].innerHTML; }
//         console.log('next photo = ');
//         console.log(coopPhotoAfter);
//         console.log('prev photo = ');
//         console.log(coopPhotoBefore);
//         coopPhoto[teamCurrentItem].style.marginLeft = coopHeaderWidth + 'px';
//     }