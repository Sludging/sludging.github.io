// JavaScript Document
$(function() {
    var $filterSelect = $('#filterSelect'),
        $container = $('#Container');
    $container.mixItUp({
        load: {
            filter: '.ui'
        }
    });
    $filterSelect.on('change', function() {
        $container.mixItUp('filter', this.value);
    });
    $(".testimonials").responsiveSlides({
        auto: true,
        fade: 500,
        timeout: 8000
    });
    $(".macscreen").responsiveSlides({
        auto: false,
        pagination: true,
        nav: true,
        fade: 500,
        maxwidth: 800
    });
});

$(window).bind('load', function() {
    $("#preloader").remove();
    var str = $('.typewriter').html(),
        i = 0,
        isTag, 
        text;
        //console.log(str);        
        (function type() {
            text = str.slice(0, ++i);
            if (text === str) return;
            $('.typewriter').html(text);
            var char = text.slice(-1);
            if (char === '<') isTag = true;
            if (char === '>') isTag = false;
            if (isTag) return type();
            setTimeout(type, 80);
        }());
});

$(document).ready(function() {
    //piechart					   
    $('.ms .percentage').easyPieChart({
        barColor: '#4c5b69',
        trackColor: '#5f707d',
        animate: 5000
    });
    $('.ps .percentage').easyPieChart({
        barColor: '#0745ab',
        trackColor: '#427cdc',
        animate: 5000
    });
    $('.ai .percentage, .fw .percentage').easyPieChart({
        barColor: '#f8a638',
        trackColor: '#f8c076',
        animate: 5000
    });
    $('.id .percentage').easyPieChart({
        barColor: '#ad2a52',
        trackColor: '#d0406c',
        animate: 5000
    });
    $('.bs .percentage').easyPieChart({
        barColor: '#c83c2f',
        trackColor: '#c8645a',
        animate: 5000
    });
    $('.prevframe').on('click', function() {
        if ($(this).parents('.overlaySec').prev().length === 0) {
            $(this).addClass('opacity');
        } else {
            $(this).parents('#overlay').removeAttr('class');
            b = $(this).parents('.overlaySec').prev().attr('id');
            $(this).parents('#overlay').addClass('active ' + b);
            $(this).removeClass('opacity');
            //console.log('prev')
        }
    });
    $('.nextframe').on('click', function() {
        if ($(this).parents('.overlaySec').next().length === 0) {
            $(this).addClass('opacity');
        } else {
            $(this).parents('#overlay').removeAttr('class');
            a = $(this).parents('.overlaySec').next().attr('id');
            $(this).parents('#overlay').addClass('active ' + a);
            $(this).removeClass('opacity');
            //console.log('next')
        }
    });
    $('#Container a').on('click', function(e) {
        e.preventDefault();
        sec = $(this).data('class');
        $('#overlay').addClass(sec + ' active');
        $('body').addClass('hideScroll');
		$(window).trigger('resize'); 
    });
});

var navigation = responsiveNav("#nav", {
    customToggle: "#toggle"
});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}

$('#submit').on('click', function() {
    var name = $.trim($('#name').val());
    var email = $.trim($('#email').val());
    var message = $.trim($('#message').val());
    var error = "";
    if (name === "") {
        $("#name").addClass('error');
        error = 1;
    } else {
        $("#name").removeClass('error');
    }
    if (!isValidEmailAddress(email)) {
        $("#email").addClass('error');
        error = 1;
    } else {
        $("#email").removeClass('error');
    }
    if (message === "") {
        $("#message").addClass('error');
        error = 1;
    } else {
        $("#message").removeClass('error');
    }
    if (error == 1) {
        $('#contactform').addClass('error');
    } else {
        $('#contactform').removeClass('error');
        $.ajax({
            url: "form.php",
            type: "POST",
            data: {
                name: name,
                email: email,
                message: message
            },
            success: function(mge) {
                    $('.msg').html('Mail send successfully').show();
            }
        });
    }
});

$(function() {
    'use strict';
    var module = {
        ratio: 0.9,
        init: function(selector) {
            var me = this;
            this.collection = $(selector);
            this.plugins();
            $(window).on('resize', function(e) {
                me.collection.each(function() {
                    var size = me.resize(this);
                    $(this).turn('size', size.width, size.height);
                });
            }).resize();
        },
        resize: function(el) { // reset the width and height to the css defaults           
            el.style.width = '';
            el.style.height = '';
            var width = Math.round(el.clientWidth),
                height = Math.round(width * 1.32); // set the width and height matching the aspect ratio            
            el.style.width = width + 'px';
            el.style.height = height + 'px';
            return {
                width: width,
                height: height
            };
        },
        plugins: function() { // run the plugin            
            this.collection.each(function() {
                $(this).turn({
                    gradients: true,
                    acceleration: true,
                    display: 'single'
                });
            }); // hide the body overflow        
        }
    };
    module.init('.book');
}());

$('.logo a').on('click', function() {
    $('body').removeClass('hideScroll');
});

$('#nav a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var target = this.hash,
        $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 1000, function() {
        window.location.hash = target;
    });
    $('#overlay').removeAttr('class');
    $('body').removeClass('hideScroll');
});

$(window).on('hashchange', function() {
    $('body').removeClass('hideScroll');
    $('#overlay').removeAttr('class');
});

function scrollnav() {
    var aChildren = $("nav li").children(); // find the a children of the list items    
    var aArray = []; // create the empty aArray    
    for (var i = 0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    }
    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page    
    for (var i = 0; i < aArray.length; i++) {
        var theID = aArray[i];
        var divPos = $(theID).offset().top; // get the offset of the div from the top of page       
        var pos = $("a[href='" + theID + "']").parent();
        if (windowPos >= divPos) {
            $("nav li").removeClass("active");
            $(pos).addClass("active");
            $('body > section').removeClass('active');
            $(theID).addClass('active');
        }
    }
}

$(window).scroll(function() {
    scrollnav();
});