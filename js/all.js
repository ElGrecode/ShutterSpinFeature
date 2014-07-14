$(function() {
    document.ontouchmove = function(e) {
        e.preventDefault()
    };
    window.resettable = true;
    var resetLimit = function() {
        window.resettable = true
    };
    window.setInterval(resetLimit, 15000);
    document.ontouchend = function(e) {
        if (window.resettable == true) {
            rejuvenate()
        };
        return
    };
    document.ongesturechange = function(e) {
        window.pinched = true;
        if (e.scale < 0.7) {
            closeShutter()
        } else if (e.scale > 1.5) {
            openShutter()
        };
        return false
    };
    $(window).load(function() {
        window.scrollTo(0, 1)
    });
    window.onorientationchange = function() {
        rejuvenate();
        switch (window.orientation) {
            case 0:
            case 180:
                break;
            case -90:
            case 90:
                break
        }
    }
});


$(function() {
    tagBody();
    checkWidthAndPositionBoxes();
    $('body').removeClass('static');
    $(window).load(function() {
        pageLoadedFull()
    })
});

var socialButtons = function() {
    $('.facebook.button a,.twitter.button a').click(function() {
        var button = $(this).parents('.button');
        if (button.hasClass('facebook')) {
            var box = $('#facebook')
        } else {
            var box = $('#twitter')
        }; if (!button.hasClass('selected')) {
            openBox(box);
            button.addClass('selected')
        } else {
            closeBox(box);
            $('.black.covering').animate({
                'opacity': 0
            }, 200, function() {
                $(this).css('display', 'none')
            })
        };
        return false
    });
    $('.black.covering,.social.box .close').click(function() {
        closeOpenBox();
        $('.black.covering').animate({
            'opacity': 0
        }, 200, function() {
            $(this).css('display', 'none')
        })
    });
    $(window).resize(function() {
        checkWidthAndPositionBoxes()
    })
}

var facebook_mobile_url = 'fb://profile/1404190259242'
facebook_mobile_url = 'http://facebook.com/aprilzero'

var mobileSocialButtons = function() {
    $('.facebook.button a').attr('href', facebook_mobile_url);
    $('.twitter.button a').attr('href', 'twitter://user?screen_name=aprilzero')
};
var checkWidthAndPositionBoxes = function() {
    if ($(window).width() < 740) {
        $('#twitter').removeClass('right')
    } else {
        $('#twitter').addClass('right')
    }
};
var openBox = function(box) {
    var openbox = $('.box.opened');
    if (openbox.length > 0) {
        closeBox(openbox, box)
    } else {
        box.css('top', '50%').addClass('opened');
        if ($.browser.webkit) {
            window.onblur = function() {
                $('body').removeClass('focused')
            }
        };
        $('.black.covering').css('display', 'block').animate({
            'opacity': 0.42
        }, 200)
    }
};

var closeBox = function(box, nextbox) {
    if ($.browser.webkit) {
        box[0].addEventListener('webkitTransitionEnd', boxHasClosed, false);
        box.removeClass('opened')
    } else {
        box.removeClass('opened');
        boxHasClosed(box)
    }; if (typeof nextbox == "object") openBox(nextbox)
};
var closeOpenBox = function() {
    var box = $('.box.opened');
    if (box.length > 0) {
        closeBox(box)
    }
};

var boxHasClosed = function(e) {
    if ($.browser.webkit) {
        var box = $(e.target)
    } else {
        var box = e
    }
    box[0].removeEventListener('webkitTransitionEnd', boxHasClosed);
    box.css('top', '-5000px');
    var id = box.attr('id');
    var button = $('.button.' + id);
    button.removeClass('selected');
    if ($.browser.webkit) {
        if ($('.box.opened').length < 1) {
            window.onblur = function() {
                closing = setTimeout(closeShutter, 1800);
                $('body').removeClass('focused')
            }
        }
    }
};
var tweetPage = function() {
    $('.button.twitter a').click(function() {
        var url = $(this).attr('href');
        popupCenter(url, 'Share Charm/Seven', 550, 400);
        return false
    })
};

function popupCenter(pageURL, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    var targetWin = window.open(pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
};

var rejuvenate = function() {
    window.resettable = false;
    window.scrollTo(0, 1);
    var moving_parts = $('.moving.parts');
    var seconds_hand = $('.seconds.hand');
    var new_moving_parts = moving_parts.clone();
    var new_seconds_hand = seconds_hand.clone();
    moving_parts.after(new_moving_parts);
    moving_parts.remove();
    seconds_hand[0].after(new_seconds_hand);
    seconds_hand.remove()
};

var openShutter = function(onComplete) {
    var shutter = $('.shutter.layer');
    var leaves = $('.leaf span', shutter).stop();
    leaves[0].removeEventListener('webkitAnimationEnd', shutterIsClosed);
    leaves[0].addEventListener('webkitAnimationEnd', fadeShutterOut, false);
    leaves.removeClass('closing').css('-webkit-animation-name', 'leaf').css('-moz-animation-name', 'leaf');
    shutter.removeClass('closing');
    var darkness = $('.shutter .darkness').css('-webkit-animation-name', 'fade-out');
    window.onfocus = function() {
        clearTimeout(window.closing);
        $('body').addClass('focused')
    };
    clearTimeout(window.closing)
};

var closeShutter = function() {
    $('#clock').removeClass('open');
    var shutter = $('.shutter.layer').css('display', 'block').stop().css('opacity', 1);
    shutter.addClass('closing');
    var leaves = $('.shutter.layer .leaf span').stop();
    leaves[0].removeEventListener('webkitAnimationEnd', fadeShutterOut);
    leaves[0].addEventListener('webkitAnimationEnd', shutterIsClosed, false);
    leaves.addClass('closing').css('-webkit-animation-name', 'leaf-close').css('-moz-animation-name', 'leaf-close');
    var darkness = $('.shutter .darkness').css('-webkit-animation-name', 'fade-in');
    clearTimeout(window.closing)
};

var shutterIsClosed = function() {
    window.onfocus = function() {
        clearTimeout(window.closing);
        $('body').addClass('focused');
        openShutter()
    };
    if ($('body').hasClass('focused') && (!window.pinched)) {
        openShutter();
        window.onfocus = function() {
            $('body').addClass('focused')
        }
    }
};

var fadeShutterOut = function() {
    window.scrollTo(0, 1);
    var shutter = $('.shutter.layer');
    shutter.animate({
        opacity: 0
    }, 500, function() {
        shutter.css('display', 'none')
    });
    $('#clock').addClass('open')
};

var tagBody = function() {
    if ($.browser.safari && !/chrome/.test(navigator.userAgent.toLowerCase())) {
        $('body').addClass('safari')
    };
    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
        $('body').addClass('mobile')
    }
};

var pageLoadedFull = function() {
    window.scrollTo(0, 1);
    $('body').removeClass('loading');
    openShutter();
    window.closing = '';
    window.pinched = false;
    $('body').addClass('focused');
    window.onblur = function() {
        closing = setTimeout(closeShutter, 1800);
        $('body').removeClass('focused')
    };
    window.onfocus = function() {
        clearTimeout(window.closing);
        $('body').addClass('focused')
    }
};
