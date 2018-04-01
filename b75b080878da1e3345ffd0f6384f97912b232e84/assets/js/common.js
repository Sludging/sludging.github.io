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

var navigation = responsiveNav("#nav", {
    customToggle: "#toggle"
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
    var navHeight = $("nav").outerHeight();
    var aArray = []; // create the empty aArray    
    for (var i = 0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    }
    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page    
    for (var i = 0; i < aArray.length; i++) {
        var theID = aArray[i];
        var divPos = $(theID).offset().top - navHeight; // get the offset of the div from the top of page       
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