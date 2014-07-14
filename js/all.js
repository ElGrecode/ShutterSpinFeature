$(function() {
    window.resettable = true;
    var resetLimit = function() {
        window.resettable = true
    };
    window.setInterval(resetLimit, 15000);

    $(window).load(function() {
        window.scrollTo(0, 1)
    });

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
    $(window).resize(function() {
        checkWidthAndPositionBoxes()
    })
}


var checkWidthAndPositionBoxes = function() {
    if ($(window).width() < 740) {
        $('#twitter').removeClass('right')
    } else {
        $('#twitter').addClass('right')
    }
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
