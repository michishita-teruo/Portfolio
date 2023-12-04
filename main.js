// ----------------- sessionStorage -----------------
$(function () {
    var webStorage = function () {
        if (sessionStorage.getItem('access')) {

            //   2回目以降アクセス時の処理
            $('#preloader').css('display', 'none');


        } else {
            //   初回アクセス時の処理
            sessionStorage.setItem('access', 'true'); // sessionStorageにデータを保存

            $(window).on('load', function () {
                setTimeout(function () {
                    $('.revelal_layer1').removeClass('hide');
                }, 5000); // Wait for 5 seconds
                $('body').css('overflow', 'hidden');
            });

            $('#preloader').on('animationend', function (event) {
                if (event.originalEvent.animationName === 'textina') {
                    $(this).css('display', 'none');
                    $('body').css('overflow', 'auto');
                    $('.revelal_layer1').addClass('hide');
                }
            });

        }
    }
    webStorage();
});


// ----------------- nav_click -----------------
$(document).on('click', '.nav-link', function (event) {
    var href = $(this).attr('href');
    if (!href.startsWith('http://') && !href.startsWith('https://')) {
        event.preventDefault();
        $('.revelal_layer1').removeClass('hide');
        setTimeout(function () {
            $('.revelal_layer1').addClass('hide');
        }, 2000);
        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, 500);
    }
});
// nav_click end

//----------------- nav_header_fixd -----------------

// ヘッダーメニューを隠す、表示させる
$(function () {
    var lastScrollTop = 0;
    var delta = 10; // スクロールの感度を調整する閾値
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        if (Math.abs(lastScrollTop - scrollTop) <= delta) {
            // スクロールの変化量がdelta以下の場合は何もしない
            return;
        }
        if (scrollTop > lastScrollTop && scrollTop > $('#mygoal').height()) {
            // Down scroll and beyond #mygoal
            $('.navbar').addClass('fadeout');
        } else {
            // Up scroll
            $('.navbar').removeClass('fadeout');
        }
        lastScrollTop = scrollTop;
    });
});
// ----------------- nav hamburger reset -----------------
$(document).on('click', '.navbar-collapse.show', function (e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});


//----------------- Bootstrap reset -----------------
var carouselIds = ['#carouselExampleIndicators', '#carouselExampleIndicators2', '#carouselExampleIndicators3', '#carouselExampleIndicators4', '#carouselExampleIndicators5', '#carouselExampleIndicators6'];
carouselIds.forEach(function (id) {
    var myCarousel = document.querySelector(id);
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 2000,
        wrap: true
    });
});
//----------------- popover reset -----------------
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})
//----------------- navbar reset -----------------
var navbarToggler = document.querySelector('.navbar-toggler');
var navbarCollapse = document.querySelector('.navbar-collapse');
// reset end

//----------------- slider prev next -----------------
$(document).ready(function () {
    $('.carousel-control-prev, .carousel-control-next').click(function (e) {
        e.preventDefault();
    });
});
//slider prev next end

// ----------------- skill bar -----------------
$(document).ready(function () {
    let target = $('.bar-chart-001 dd');
    let targetPos = target.offset().top;
    let winHeight = $(window).height();
    $(window).scroll(function () {
        let winScrollTop = $(this).scrollTop();
        if (winScrollTop > targetPos - winHeight) {
            target.addClass('bar_animate');
            target[0].offsetWidth = target[0].offsetWidth;
        } else {
            target.removeClass('bar_animate');
        }
    });
});
// skill bar end

// ----------------- work_histry line -----------------
function ScrollTimelineAnime() {
    $('.work_box').each(function () {
        var elemPos = $(this).offset().top;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        var startPoint = 100;
        if (scroll >= elemPos - windowHeight - startPoint) {
            var H = $(this).outerHeight(true)
            var percent = (scroll + startPoint - elemPos) / (H / 2) * 100;
            if (percent > 100) {
                percent = 100;
            }
            $(this).children('.bar_animation').css({
                height: percent + "%",
            });
        }
    });
}
$(window).on('scroll', function () {
    ScrollTimelineAnime();
});
$(window).on('load', function () {
    ScrollTimelineAnime();
});
//work_histry line end



// works_histry 動画と画像の設定
$(function () {
    var responsiveImage = [
        {
            src: './img/about/about02.jpg',
            video: {
                src: [
                    './img/about/yousetu01.mp4',
                    './img/about/yousetu01.ogv',
                    './img/about/yousetu01.webm'
                ],
                loop: true,
                mute: true,
            }
        },
    ];


    var responsiveImage02 = [
        { src: './img/about/about02.jpg' },
        { src: './img/about/about03.jpg' },
        { src: './img/about/about04.jpg' },
        { src: './img/about/about05.jpg' },
        { src: './img/about/about06.jpg' },
    ];

    var responsiveImage03 = [
        { src: './img/about/about07.jpg' },
        // { src: './img/about/about08.jpg' },
        { src: './img/about/about09.jpg' },
    ];



    $('.vegas01').vegas({
        overlay: 'vegas/overlays/01.png',
        transition: 'fade2',
        transitionDuration: 6000,
        delay: 4000,
        animation: 'random',
        animationDuration: 5000,
        slides: responsiveImage,
    });
    $('.vegas02').vegas({
        overlay: 'vegas/overlays/01.png',
        transition: 'fade2',
        transitionDuration: 6000,
        delay: 4000,
        animation: 'random',
        animationDuration: 5000,
        slides: responsiveImage02,
        timer: false
    });

    $('.vegas03').vegas({
        overlay: 'vegas/overlays/01.png',
        transition: 'fade2',
        transitionDuration: 6000,
        delay: 4000,
        animation: 'random',
        animationDuration: 5000,
        slides: responsiveImage03,
        timer: false
    });
});

$(window).on('scroll', function () {
    var scrollPosition = $(window).scrollTop();
    var windowHeight = $(window).height();
    var containers = $('.work_history');

    containers.each(function () {
        var container = $(this);
        var elementPosition = container.offset().top;
        var scaleFactor;

        if (scrollPosition + windowHeight / 2 < elementPosition || scrollPosition + windowHeight / 2 > elementPosition + windowHeight) {
            scaleFactor = 0.4;
        } else {
            scaleFactor = 0.7;
        }

        container.css('transform', 'scale(' + scaleFactor + ')');
    });
});
// work_histry 動画と画像の設定 end

// section_underline 
$(window).scroll(function () {
    $('.display-4').each(function () {
        var hT = $(this).offset().top,
            hH = $(this).outerHeight(),
            wH = $(window).height(),
            wS = $(window).scrollTop();
        if (wS > (hT + hH)) {
            $(this).removeClass('underline-animation');
        } else if (wS > (hT - wH)) {
            $(this).addClass('underline-animation');
        }
    });
});
// section_underline end