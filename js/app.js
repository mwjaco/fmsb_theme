(function($) {
equalheight = function(container){

var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
 $(container).each(function() {

   $el = $(this);
   $($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}

$(window).load(function() {
  equalheight('.aside-item, .staff-item');
});


$(window).resize(function(){
  equalheight('.aside-item, .staff-item');
});

function asideMobileLayout() {
  var asideMover = function(){
    if (window.innerWidth < 938 ) {
      $('aside').insertAfter('div.primary');
    } else if (window.innerWidth > 937) {
      $('aside').insertBefore('div.primary');
    }    
  }
  if ($('body.home').length < 1) {
    asideMover();

    $(window).resize(function(){
        asideMover();
      }
    );
  }
}

function breadcrumbsLayout() {
  if ($('.breadcrumb + .primary').length > 0) {
    $('.breadcrumb').css({
      'width': '100%',
      'marginLeft': '0'
    });
  }
}

var stickyFooter = function () {
  $(window).resize(function () {
    var footerHeight = $('footer').outerHeight();
    var stickFooterPush = $('.push').height(footerHeight);
    $('.sticky-wrapper').css({
      'marginBottom': '-' + footerHeight + 'px'
    });
  });
  $(window).resize();
} //end sticky footer
var addRemoveMobileClass = function (){
  if (window.innerWidth < 796 ) {
    $('body').removeClass('horizontal-bar');
  } else if (window.innerWidth > 795 ) {
    $('body').addClass('horizontal-bar');
  }
}
$('document').ready(function(){
  breadcrumbsLayout();
  asideMobileLayout();
  $('html').removeClass('no-js');
  stickyFooter();
	// add mobile class to body for managing mobile features
  addRemoveMobileClass();
	$(window).resize(function () {
	  addRemoveMobileClass();
	});    
});
/*!
 * headroom.js v0.9.3 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2016 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Headroom=b()}(this,function(){"use strict";function a(a){this.callback=a,this.ticking=!1}function b(a){return a&&"undefined"!=typeof window&&(a===window||a.nodeType)}function c(a){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var d,e,f=a||{};for(e=1;e<arguments.length;e++){var g=arguments[e]||{};for(d in g)"object"!=typeof f[d]||b(f[d])?f[d]=f[d]||g[d]:f[d]=c(f[d],g[d])}return f}function d(a){return a===Object(a)?a:{down:a,up:a}}function e(a,b){b=c(b,e.options),this.lastKnownScrollY=0,this.elem=a,this.tolerance=d(b.tolerance),this.classes=b.classes,this.offset=b.offset,this.scroller=b.scroller,this.initialised=!1,this.onPin=b.onPin,this.onUnpin=b.onUnpin,this.onTop=b.onTop,this.onNotTop=b.onNotTop,this.onBottom=b.onBottom,this.onNotBottom=b.onNotBottom}var f={bind:!!function(){}.bind,classList:"classList"in document.documentElement,rAF:!!(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame)};return window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,a.prototype={constructor:a,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},e.prototype={constructor:e,init:function(){return e.cutsTheMustard?(this.debouncer=new a(this.update.bind(this)),this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var a=this.classes;this.initialised=!1,this.elem.classList.remove(a.unpinned,a.pinned,a.top,a.notTop,a.initial),this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var a=this.elem.classList,b=this.classes;!a.contains(b.pinned)&&a.contains(b.unpinned)||(a.add(b.unpinned),a.remove(b.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var a=this.elem.classList,b=this.classes;a.contains(b.unpinned)&&(a.remove(b.unpinned),a.add(b.pinned),this.onPin&&this.onPin.call(this))},top:function(){var a=this.elem.classList,b=this.classes;a.contains(b.top)||(a.add(b.top),a.remove(b.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notTop)||(a.add(b.notTop),a.remove(b.top),this.onNotTop&&this.onNotTop.call(this))},bottom:function(){var a=this.elem.classList,b=this.classes;a.contains(b.bottom)||(a.add(b.bottom),a.remove(b.notBottom),this.onBottom&&this.onBottom.call(this))},notBottom:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notBottom)||(a.add(b.notBottom),a.remove(b.bottom),this.onNotBottom&&this.onNotBottom.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop},getViewportHeight:function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},getElementPhysicalHeight:function(a){return Math.max(a.offsetHeight,a.clientHeight)},getScrollerPhysicalHeight:function(){return this.scroller===window||this.scroller===document.body?this.getViewportHeight():this.getElementPhysicalHeight(this.scroller)},getDocumentHeight:function(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,b.scrollHeight,a.offsetHeight,b.offsetHeight,a.clientHeight,b.clientHeight)},getElementHeight:function(a){return Math.max(a.scrollHeight,a.offsetHeight,a.clientHeight)},getScrollerHeight:function(){return this.scroller===window||this.scroller===document.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(a){var b=0>a,c=a+this.getScrollerPhysicalHeight()>this.getScrollerHeight();return b||c},toleranceExceeded:function(a,b){return Math.abs(a-this.lastKnownScrollY)>=this.tolerance[b]},shouldUnpin:function(a,b){var c=a>this.lastKnownScrollY,d=a>=this.offset;return c&&d&&b},shouldPin:function(a,b){var c=a<this.lastKnownScrollY,d=a<=this.offset;return c&&b||d},update:function(){var a=this.getScrollY(),b=a>this.lastKnownScrollY?"down":"up",c=this.toleranceExceeded(a,b);this.isOutOfBounds(a)||(a<=this.offset?this.top():this.notTop(),a+this.getViewportHeight()>=this.getScrollerHeight()?this.bottom():this.notBottom(),this.shouldUnpin(a,c)?this.unpin():this.shouldPin(a,c)&&this.pin(),this.lastKnownScrollY=a)}},e.options={tolerance:{up:0,down:0},offset:0,scroller:window,classes:{pinned:"navbar-pinned",unpinned:"navbar-unpinned",top:"navbar-top",notTop:"navbar-not-top",bottom:"navbar-bottom",notBottom:"navbar-not-bottom",initial:"navbar"}},e.cutsTheMustard="undefined"!=typeof f&&f.rAF&&f.bind&&f.classList,e});

// Thanks to the Thoughtbot team for the navigation component (refills.bourbon.io)
// and to Gray Ghost for inspiring the key mapping feature (http://codepen.io/grayghostvisuals/pen/ltjDa)

var keyCodeMap = {
  48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
  65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
  77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
  96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9"
}  
  
$.fn.setup_navigation = function(settings) {

  settings = jQuery.extend({
    menuHoverClass: 'show-menu',
  }, settings);    

  // Add ARIA role to menubar and menu items
  $(this).attr('role', 'menubar').find('li').attr('role', 'menuitem');
  
  var top_level_links = $('#js-navbar-menu').find('> ul > li > a');

  // Set tabIndex to -1 so that top_level_links can't receive focus until menu is open
  $(top_level_links)    
    .nextAll('ul')
    .attr('data-test','true')     
    .attr({ 'aria-hidden': 'true', 'role': 'menu' })
    .find('a')
    .attr('tabindex', -1);

  // Adding aria-haspopup for list  items with a submenu
  $(top_level_links).each(function(){
    if($(this).nextAll('ul').length > 0)
      $(this).after('<span class="dropdown-trigger"></span>');
      $(this).parent('li').attr('aria-haspopup', 'true');
  });  

  $(top_level_links).hover(function(){
    $(this).closest('ul') 
      .attr('aria-hidden', 'false')
      .find('.'+settings.menuHoverClass)
      .attr('aria-hidden', 'true')
      .find('a')
      .attr('tabIndex',-1);
    $(this).nextAll('ul')
      .attr('aria-hidden', 'false')
      .find('a').attr('tabIndex',0);
  });  
  
  $(top_level_links).focus(function(){
    $(this).closest('ul')
      .find('.'+settings.menuHoverClass)
      .attr('aria-hidden', 'true')
      .removeClass(settings.menuHoverClass)
      .find('a')
      .attr('tabIndex',-1);

    $(this).nextAll('ul')
      .attr('aria-hidden', 'false')
      .addClass(settings.menuHoverClass)
      .find('a').attr('tabIndex',0);
  });
  
  $(top_level_links).keydown(function(e){
    if(e.keyCode == 37) {
      e.preventDefault();
      // This is the first item
      if($(this).parent('li').prev('li').length == 0) {
        $(this).parents('ul').find('> li').last().find('a').first().focus();
      } else {
        $(this).parent('li').prev('li').find('a').first().focus();
      }
    } else if(e.keyCode == 38) {
      e.preventDefault();
      if($(this).parent('li').find('ul').length > 0) {
        $(this).parent('li').find('ul')
          .attr('aria-hidden', 'false')
          .addClass(settings.menuHoverClass)
          .find('a').attr('tabIndex',0)
          .last().focus();
      }
    } else if(e.keyCode == 39) {
      e.preventDefault();
      // This is the last item
      if($(this).parent('li').next('li').length == 0) {
        $(this).parents('ul').find('> li').first().find('a').first().focus();
      } else {
        $(this).parent('li').next('li').find('a').first().focus();
      }
    } else if(e.keyCode == 40) {
      e.preventDefault();
      if($(this).parent('li').find('ul').length > 0) {
        $(this).parent('li').find('ul')
          .attr('aria-hidden', 'false')
          .addClass(settings.menuHoverClass)
          .find('a').attr('tabIndex',0)
          .first().focus();
      }
    } else if(e.keyCode == 32) {
      // If submenu is hidden, open it on spacebar
      e.preventDefault();
      $(this).parent('li').find('ul[aria-hidden=true]')
          .attr('aria-hidden', 'false')
          .addClass(settings.menuHoverClass)
          .find('a').attr('tabIndex',0)
          .first().focus();
    } else if(e.keyCode == 27) {
      e.preventDefault();
      $('.'+settings.menuHoverClass)
        .attr('aria-hidden', 'true')
        .removeClass(settings.menuHoverClass)
        .find('a')
        .attr('tabIndex',-1);
    } else {
      $(this).parent('li').find('ul[aria-hidden=false] a').each(function(){
        if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
          $(this).focus();
          return false;
        }
      });
    }
  });
  
  var links = $(top_level_links).parent('li').find('ul').find('a');
  $(links).keydown(function(e){
    if(e.keyCode == 38) {
      e.preventDefault();
      // This is the first item
      if($(this).parent('li').prev('li').length == 0) {
        $(this).parents('ul').parents('li').find('a').first().focus();
      } else {
        $(this).parent('li').prev('li').find('a').first().focus();
      }
    } else if(e.keyCode == 40) {
      e.preventDefault();
      if($(this).parent('li').next('li').length == 0) {
        $(this).parents('ul').parents('li').find('a').first().focus();
      } else {
        $(this).parent('li').next('li').find('a').first().focus();
      }
    } else if(e.keyCode == 27 || e.keyCode == 37) {
      e.preventDefault();
      $(this)
        .parents('ul').first()
          .prev('a').focus()
          .parents('ul').first().find('.'+settings.menuHoverClass)
          .attr('aria-hidden', 'true')
          .removeClass(settings.menuHoverClass)
          .find('a')
          .attr('tabIndex',-1);
    } else if(e.keyCode == 32) {
      e.preventDefault();
      window.location = $(this).attr('href');
    } else {
      var found = false;
      $(this).parent('li').nextAll('li').find('a').each(function(){
        if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
          $(this).focus();
          found = true;
          return false;
        }
      });
      
      if(!found) {
        $(this).parent('li').prevAll('li').find('a').each(function(){
          if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
            $(this).focus();
            return false;
          }
        });
      }
    }
  });

    
  // Hide menu if click or focus occurs outside of navigation
  $(this).find('a').last().keydown(function(e){ 
    if(e.keyCode == 9) {
      // If the user tabs out of the navigation hide all menus
      $('.'+settings.menuHoverClass)
        .attr('aria-hidden', 'true')
        .removeClass(settings.menuHoverClass)
        .find('a')
          .attr('tabIndex',-1);
    }
  });     
  
  $(document).click(function(){ $('.'+settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex',-1); });
  
  $(this).click(function(e){
    e.stopPropagation();
  });

}

function hideNavOnScroll() {
  //Navbar Scroll Event
  var lastScrollTop = 500;
  var navbar        = $('.navbar');
  $(window).scroll(function(event){
     var st = $(this).scrollTop();
     if (st > lastScrollTop && !($('#js-navbar-menu').attr('style'))){
         navbar.addClass('navbar-scroll-up');
     } else {
        navbar.removeClass('navbar-scroll-up');
     }
     lastScrollTop = st;
  });
}


function navAccordion() {
  if (!($('body.horizontal-bar').length)) {
    $('.dropdown-trigger').each(function(){
      $(this).unbind('click').click(function(){
        $(this).next('.sub-menu').slideToggle('fast');
      });
    });
  }
  $(window).resize(function(){
    if (window.innerWidth > 795 ) {
      $('.sub-menu').removeAttr('style');
    }
  });
}

function menuToggle() {
  var menuToggle = $("#js-mobile-menu").unbind();
  $("#js-navbar-menu").removeClass("show");
  menuToggle.on("click", function(e) {
    e.preventDefault();
    $("#js-navbar-menu").slideToggle('fast', function(){
      if($("#js-navbar-menu").is(":hidden")) {
        $("#js-navbar-menu").removeAttr("style");
      }
    });
  });
}

$('document').ready(function() {
// grab an element
  var myElement = document.querySelector(".navbar");
  // construct an instance of Headroom, passing the element
  var headroom  = new Headroom(myElement);
  // initialise
  if (window.innerWidth < 796 ) {
    headroom.init();
  }
  navAccordion();
  menuToggle();
  $('.navigation-menu').setup_navigation();
});

function handleTabs() {
  'use strict';

  var $tabWidget = $('.tab-widget');

  var section_bg = '';

  var setupTabs = function($tab, $allTabs, $tabPanels, $tabList, $tabListItems, i) {
    $tab
      .attr({
        'id': 'tab-link-' + i,
        'tabindex': '-1',
        'role': 'tab',
        'aria-selected': 'false',
        'aria-controls': 'tab-panel-' + i
      });

      if (i === 0) {
        $tab
          .attr({
            'tabindex': '0',
            'aria-selected': 'true',
            'aria-describedby': 'tab-widget-description'
          })
          .addClass('is-active');
      }    

      $tab.unbind('click').click(function(e) {
        e.preventDefault();
        tabClick($(this),  $allTabs, $tabPanels, $tabList, $tabListItems, i);
        console.log('1');       
      });

      $tab.on('keydown', function (e) {
          tabKeydown($(this), $allTabs, $tabPanels, $tabListItems, i, e);          
      });

  };

  var setupTabPanels = function(tabPanel, i) {
      tabPanel
        .attr({
          'id': 'tab-panel-' + i,
          'role': 'tabpanel',
          'aria-hidden': 'true',
          'aria-labelledby': 'tab-link-' + i
        })
        .hide();

      if (i === 0) {
        tabPanel
          .attr('aria-hidden', 'false')
          .addClass('is-open')
          .show();
      }
  };

  var tabClick = function($thisTab, $allTabs, $tabPanels, $tabList, $tabListItems, i) {
    $('.second-tab').removeClass('second-tab');
    section_bg = $($thisTab).attr('data-bg');
    $('#about-tabs').removeClass().addClass(section_bg);

    if ($thisTab.hasClass('is-active') && $('body.horizontal-bar').length < 1) {
        $thisTab.toggleClass('is-active');
        $thisTab.next().toggleClass('is-open').slideToggle();
    } else {
      $tabList
        .find('.is-active')
        .removeClass('is-active')
        .attr({
            'tabindex': -1,
            'aria-selected': 'false'
        })
        .removeAttr('aria-describedby')
        .next()
        .attr('aria-hidden', 'true');

      if ($('body.horizontal-bar').length) {
        /// big boy tab functionality        
        $tabList.find('.is-open').removeClass('is-open').hide();
      } else {
        $tabList.find('.is-open').removeClass('is-open').slideToggle();
      }

      $thisTab.addClass('is-active')
        .attr({
        'tabindex': 0,
        'aria-selected': 'true',
        'aria-describedby': 'tab-widget-description'
      });
      if ($('body.horizontal-bar').length) {
        $thisTab.next().toggleClass('is-open').fadeIn('slow');
      } else {
        $thisTab.next().toggleClass('is-open').slideToggle();
      }
    }
  };

  var tabKeydown = function($thisTab, $allTabs, $tabPanels, $tabListItems, i, e) {
      var keyCode = e.which,
          $nextTab = $thisTab.parent().next().is('li') ? $thisTab.parent().next().find('a') : false,
          $previousTab = $thisTab.parent().prev().is('li') ? $thisTab.parent().prev().find('a') : false,
          $firstTab = $thisTab.parent().parent().find('li:first').find('a'),
          $lastTab = $thisTab.parent().parent().find('li:last').find('a');

      switch(keyCode) {
          // Left/Up
          case 37:
          case 38:
              $thisTab.removeClass('is-active')
                .parents('#about-tabs').removeClass();
              $thisTab.next().removeClass('is-open').hide();

              e.preventDefault();
              e.stopPropagation();

              if (!$previousTab) {
                  $lastTab.focus().addClass('is-active').next().toggleClass('is-open').show();
                  section_bg = $($lastTab).attr('data-bg');
                  $($lastTab).parents('#about-tabs').addClass(section_bg);                  
              } else {
                  $previousTab.focus().addClass('is-active').next().toggleClass('is-open').show();
                  section_bg = $($previousTab).attr('data-bg');
                  $($previousTab).parents('#about-tabs').addClass(section_bg);                  
              }

              break;

          // Right/Down
          case 39:
          case 40:
              $thisTab.removeClass('is-active')
                .parents('#about-tabs').removeClass();
              $thisTab.next().removeClass('is-open').hide();

              e.preventDefault();
              e.stopPropagation();

              if (!$nextTab) {
                  $firstTab.focus().addClass('is-active').next().toggleClass('is-open').show();
                  section_bg = $($firstTab).attr('data-bg');
                  $($firstTab).parents('#about-tabs').addClass(section_bg);

              } else {
                  $nextTab.focus().addClass('is-active').next().toggleClass('is-open').show();
                  section_bg = $($nextTab).attr('data-bg');
                  $($nextTab).parents('#about-tabs').addClass(section_bg);                  
              }

              break;

          // Home
          case 36:
              e.preventDefault();
              e.stopPropagation();

              $firstTab.focus();

              break;

          // End
          case 35:
              e.preventDefault();
              e.stopPropagation();

              $lastTab.focus();

              break;

          // Enter/Space
          case 13:
          case 32:
              e.preventDefault();
              e.stopPropagation();

              break;
      }
  };

  $tabWidget.each(function () {
      var $this = $(this),
          $tabList = $this.find('> ul'),
          $tabListItems = $tabList.find('li'),
          $allTabs = $tabListItems.find('a'),
          $tabPanels = $this.find('.tab-content');

      $tabList.attr('role', 'tablist');

      var $secondTab = $tabList.find('li:nth-of-type(2) a');
      $secondTab.addClass('second-tab');

      $tabListItems.attr('role', 'presentation');

      $allTabs.each(function (i) {
          setupTabs($(this), $allTabs, $tabPanels, $tabList, $tabListItems, i);
      });

      $tabPanels.each(function (i) {
          setupTabPanels($(this), i);
      });
  });
}

$('document').ready(function () {
  handleTabs();
});
}(jQuery));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImEtaGVhZC5qcyIsIm1haW4uanMiLCJuYXZiYXIuanMiLCJ0YWJzLmpzIiwiei1mb290LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDblFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3TUE7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCkgeyIsImVxdWFsaGVpZ2h0ID0gZnVuY3Rpb24oY29udGFpbmVyKXtcblxudmFyIGN1cnJlbnRUYWxsZXN0ID0gMCxcbiAgICAgY3VycmVudFJvd1N0YXJ0ID0gMCxcbiAgICAgcm93RGl2cyA9IG5ldyBBcnJheSgpLFxuICAgICAkZWwsXG4gICAgIHRvcFBvc2l0aW9uID0gMDtcbiAkKGNvbnRhaW5lcikuZWFjaChmdW5jdGlvbigpIHtcblxuICAgJGVsID0gJCh0aGlzKTtcbiAgICQoJGVsKS5oZWlnaHQoJ2F1dG8nKVxuICAgdG9wUG9zdGlvbiA9ICRlbC5wb3NpdGlvbigpLnRvcDtcblxuICAgaWYgKGN1cnJlbnRSb3dTdGFydCAhPSB0b3BQb3N0aW9uKSB7XG4gICAgIGZvciAoY3VycmVudERpdiA9IDAgOyBjdXJyZW50RGl2IDwgcm93RGl2cy5sZW5ndGggOyBjdXJyZW50RGl2KyspIHtcbiAgICAgICByb3dEaXZzW2N1cnJlbnREaXZdLmhlaWdodChjdXJyZW50VGFsbGVzdCk7XG4gICAgIH1cbiAgICAgcm93RGl2cy5sZW5ndGggPSAwOyAvLyBlbXB0eSB0aGUgYXJyYXlcbiAgICAgY3VycmVudFJvd1N0YXJ0ID0gdG9wUG9zdGlvbjtcbiAgICAgY3VycmVudFRhbGxlc3QgPSAkZWwuaGVpZ2h0KCk7XG4gICAgIHJvd0RpdnMucHVzaCgkZWwpO1xuICAgfSBlbHNlIHtcbiAgICAgcm93RGl2cy5wdXNoKCRlbCk7XG4gICAgIGN1cnJlbnRUYWxsZXN0ID0gKGN1cnJlbnRUYWxsZXN0IDwgJGVsLmhlaWdodCgpKSA/ICgkZWwuaGVpZ2h0KCkpIDogKGN1cnJlbnRUYWxsZXN0KTtcbiAgfVxuICAgZm9yIChjdXJyZW50RGl2ID0gMCA7IGN1cnJlbnREaXYgPCByb3dEaXZzLmxlbmd0aCA7IGN1cnJlbnREaXYrKykge1xuICAgICByb3dEaXZzW2N1cnJlbnREaXZdLmhlaWdodChjdXJyZW50VGFsbGVzdCk7XG4gICB9XG4gfSk7XG59XG5cbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xuICBlcXVhbGhlaWdodCgnLmFzaWRlLWl0ZW0sIC5zdGFmZi1pdGVtJyk7XG59KTtcblxuXG4kKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gIGVxdWFsaGVpZ2h0KCcuYXNpZGUtaXRlbSwgLnN0YWZmLWl0ZW0nKTtcbn0pO1xuXG5mdW5jdGlvbiBhc2lkZU1vYmlsZUxheW91dCgpIHtcbiAgdmFyIGFzaWRlTW92ZXIgPSBmdW5jdGlvbigpe1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDkzOCApIHtcbiAgICAgICQoJ2FzaWRlJykuaW5zZXJ0QWZ0ZXIoJ2Rpdi5wcmltYXJ5Jyk7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDkzNykge1xuICAgICAgJCgnYXNpZGUnKS5pbnNlcnRCZWZvcmUoJ2Rpdi5wcmltYXJ5Jyk7XG4gICAgfSAgICBcbiAgfVxuICBpZiAoJCgnYm9keS5ob21lJykubGVuZ3RoIDwgMSkge1xuICAgIGFzaWRlTW92ZXIoKTtcblxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcbiAgICAgICAgYXNpZGVNb3ZlcigpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYnJlYWRjcnVtYnNMYXlvdXQoKSB7XG4gIGlmICgkKCcuYnJlYWRjcnVtYiArIC5wcmltYXJ5JykubGVuZ3RoID4gMCkge1xuICAgICQoJy5icmVhZGNydW1iJykuY3NzKHtcbiAgICAgICd3aWR0aCc6ICcxMDAlJyxcbiAgICAgICdtYXJnaW5MZWZ0JzogJzAnXG4gICAgfSk7XG4gIH1cbn1cblxudmFyIHN0aWNreUZvb3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZvb3RlckhlaWdodCA9ICQoJ2Zvb3RlcicpLm91dGVySGVpZ2h0KCk7XG4gICAgdmFyIHN0aWNrRm9vdGVyUHVzaCA9ICQoJy5wdXNoJykuaGVpZ2h0KGZvb3RlckhlaWdodCk7XG4gICAgJCgnLnN0aWNreS13cmFwcGVyJykuY3NzKHtcbiAgICAgICdtYXJnaW5Cb3R0b20nOiAnLScgKyBmb290ZXJIZWlnaHQgKyAncHgnXG4gICAgfSk7XG4gIH0pO1xuICAkKHdpbmRvdykucmVzaXplKCk7XG59IC8vZW5kIHN0aWNreSBmb290ZXJcbnZhciBhZGRSZW1vdmVNb2JpbGVDbGFzcyA9IGZ1bmN0aW9uICgpe1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3OTYgKSB7XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdob3Jpem9udGFsLWJhcicpO1xuICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzk1ICkge1xuICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaG9yaXpvbnRhbC1iYXInKTtcbiAgfVxufVxuJCgnZG9jdW1lbnQnKS5yZWFkeShmdW5jdGlvbigpe1xuICBicmVhZGNydW1ic0xheW91dCgpO1xuICBhc2lkZU1vYmlsZUxheW91dCgpO1xuICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ25vLWpzJyk7XG4gIHN0aWNreUZvb3RlcigpO1xuXHQvLyBhZGQgbW9iaWxlIGNsYXNzIHRvIGJvZHkgZm9yIG1hbmFnaW5nIG1vYmlsZSBmZWF0dXJlc1xuICBhZGRSZW1vdmVNb2JpbGVDbGFzcygpO1xuXHQkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcblx0ICBhZGRSZW1vdmVNb2JpbGVDbGFzcygpO1xuXHR9KTsgICAgXG59KTsiLCIvKiFcbiAqIGhlYWRyb29tLmpzIHYwLjkuMyAtIEdpdmUgeW91ciBwYWdlIHNvbWUgaGVhZHJvb20uIEhpZGUgeW91ciBoZWFkZXIgdW50aWwgeW91IG5lZWQgaXRcbiAqIENvcHlyaWdodCAoYykgMjAxNiBOaWNrIFdpbGxpYW1zIC0gaHR0cDovL3dpY2t5Lm5pbGxpYS5tcy9oZWFkcm9vbS5qc1xuICogTGljZW5zZTogTUlUXG4gKi9cblxuIWZ1bmN0aW9uKGEsYil7XCJ1c2Ugc3RyaWN0XCI7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSxiKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1iKCk6YS5IZWFkcm9vbT1iKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBhKGEpe3RoaXMuY2FsbGJhY2s9YSx0aGlzLnRpY2tpbmc9ITF9ZnVuY3Rpb24gYihhKXtyZXR1cm4gYSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKGE9PT13aW5kb3d8fGEubm9kZVR5cGUpfWZ1bmN0aW9uIGMoYSl7aWYoYXJndW1lbnRzLmxlbmd0aDw9MCl0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGFyZ3VtZW50cyBpbiBleHRlbmQgZnVuY3Rpb25cIik7dmFyIGQsZSxmPWF8fHt9O2ZvcihlPTE7ZTxhcmd1bWVudHMubGVuZ3RoO2UrKyl7dmFyIGc9YXJndW1lbnRzW2VdfHx7fTtmb3IoZCBpbiBnKVwib2JqZWN0XCIhPXR5cGVvZiBmW2RdfHxiKGZbZF0pP2ZbZF09ZltkXXx8Z1tkXTpmW2RdPWMoZltkXSxnW2RdKX1yZXR1cm4gZn1mdW5jdGlvbiBkKGEpe3JldHVybiBhPT09T2JqZWN0KGEpP2E6e2Rvd246YSx1cDphfX1mdW5jdGlvbiBlKGEsYil7Yj1jKGIsZS5vcHRpb25zKSx0aGlzLmxhc3RLbm93blNjcm9sbFk9MCx0aGlzLmVsZW09YSx0aGlzLnRvbGVyYW5jZT1kKGIudG9sZXJhbmNlKSx0aGlzLmNsYXNzZXM9Yi5jbGFzc2VzLHRoaXMub2Zmc2V0PWIub2Zmc2V0LHRoaXMuc2Nyb2xsZXI9Yi5zY3JvbGxlcix0aGlzLmluaXRpYWxpc2VkPSExLHRoaXMub25QaW49Yi5vblBpbix0aGlzLm9uVW5waW49Yi5vblVucGluLHRoaXMub25Ub3A9Yi5vblRvcCx0aGlzLm9uTm90VG9wPWIub25Ob3RUb3AsdGhpcy5vbkJvdHRvbT1iLm9uQm90dG9tLHRoaXMub25Ob3RCb3R0b209Yi5vbk5vdEJvdHRvbX12YXIgZj17YmluZDohIWZ1bmN0aW9uKCl7fS5iaW5kLGNsYXNzTGlzdDpcImNsYXNzTGlzdFwiaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LHJBRjohISh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lKX07cmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU9d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSxhLnByb3RvdHlwZT17Y29uc3RydWN0b3I6YSx1cGRhdGU6ZnVuY3Rpb24oKXt0aGlzLmNhbGxiYWNrJiZ0aGlzLmNhbGxiYWNrKCksdGhpcy50aWNraW5nPSExfSxyZXF1ZXN0VGljazpmdW5jdGlvbigpe3RoaXMudGlja2luZ3x8KHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJhZkNhbGxiYWNrfHwodGhpcy5yYWZDYWxsYmFjaz10aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKSksdGhpcy50aWNraW5nPSEwKX0saGFuZGxlRXZlbnQ6ZnVuY3Rpb24oKXt0aGlzLnJlcXVlc3RUaWNrKCl9fSxlLnByb3RvdHlwZT17Y29uc3RydWN0b3I6ZSxpbml0OmZ1bmN0aW9uKCl7cmV0dXJuIGUuY3V0c1RoZU11c3RhcmQ/KHRoaXMuZGVib3VuY2VyPW5ldyBhKHRoaXMudXBkYXRlLmJpbmQodGhpcykpLHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5pbml0aWFsKSxzZXRUaW1lb3V0KHRoaXMuYXR0YWNoRXZlbnQuYmluZCh0aGlzKSwxMDApLHRoaXMpOnZvaWQgMH0sZGVzdHJveTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuY2xhc3Nlczt0aGlzLmluaXRpYWxpc2VkPSExLHRoaXMuZWxlbS5jbGFzc0xpc3QucmVtb3ZlKGEudW5waW5uZWQsYS5waW5uZWQsYS50b3AsYS5ub3RUb3AsYS5pbml0aWFsKSx0aGlzLnNjcm9sbGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLmRlYm91bmNlciwhMSl9LGF0dGFjaEV2ZW50OmZ1bmN0aW9uKCl7dGhpcy5pbml0aWFsaXNlZHx8KHRoaXMubGFzdEtub3duU2Nyb2xsWT10aGlzLmdldFNjcm9sbFkoKSx0aGlzLmluaXRpYWxpc2VkPSEwLHRoaXMuc2Nyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMuZGVib3VuY2VyLCExKSx0aGlzLmRlYm91bmNlci5oYW5kbGVFdmVudCgpKX0sdW5waW46ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzOyFhLmNvbnRhaW5zKGIucGlubmVkKSYmYS5jb250YWlucyhiLnVucGlubmVkKXx8KGEuYWRkKGIudW5waW5uZWQpLGEucmVtb3ZlKGIucGlubmVkKSx0aGlzLm9uVW5waW4mJnRoaXMub25VbnBpbi5jYWxsKHRoaXMpKX0scGluOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5lbGVtLmNsYXNzTGlzdCxiPXRoaXMuY2xhc3NlczthLmNvbnRhaW5zKGIudW5waW5uZWQpJiYoYS5yZW1vdmUoYi51bnBpbm5lZCksYS5hZGQoYi5waW5uZWQpLHRoaXMub25QaW4mJnRoaXMub25QaW4uY2FsbCh0aGlzKSl9LHRvcDpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZWxlbS5jbGFzc0xpc3QsYj10aGlzLmNsYXNzZXM7YS5jb250YWlucyhiLnRvcCl8fChhLmFkZChiLnRvcCksYS5yZW1vdmUoYi5ub3RUb3ApLHRoaXMub25Ub3AmJnRoaXMub25Ub3AuY2FsbCh0aGlzKSl9LG5vdFRvcDpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZWxlbS5jbGFzc0xpc3QsYj10aGlzLmNsYXNzZXM7YS5jb250YWlucyhiLm5vdFRvcCl8fChhLmFkZChiLm5vdFRvcCksYS5yZW1vdmUoYi50b3ApLHRoaXMub25Ob3RUb3AmJnRoaXMub25Ob3RUb3AuY2FsbCh0aGlzKSl9LGJvdHRvbTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZWxlbS5jbGFzc0xpc3QsYj10aGlzLmNsYXNzZXM7YS5jb250YWlucyhiLmJvdHRvbSl8fChhLmFkZChiLmJvdHRvbSksYS5yZW1vdmUoYi5ub3RCb3R0b20pLHRoaXMub25Cb3R0b20mJnRoaXMub25Cb3R0b20uY2FsbCh0aGlzKSl9LG5vdEJvdHRvbTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZWxlbS5jbGFzc0xpc3QsYj10aGlzLmNsYXNzZXM7YS5jb250YWlucyhiLm5vdEJvdHRvbSl8fChhLmFkZChiLm5vdEJvdHRvbSksYS5yZW1vdmUoYi5ib3R0b20pLHRoaXMub25Ob3RCb3R0b20mJnRoaXMub25Ob3RCb3R0b20uY2FsbCh0aGlzKSl9LGdldFNjcm9sbFk6ZnVuY3Rpb24oKXtyZXR1cm4gdm9pZCAwIT09dGhpcy5zY3JvbGxlci5wYWdlWU9mZnNldD90aGlzLnNjcm9sbGVyLnBhZ2VZT2Zmc2V0OnZvaWQgMCE9PXRoaXMuc2Nyb2xsZXIuc2Nyb2xsVG9wP3RoaXMuc2Nyb2xsZXIuc2Nyb2xsVG9wOihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnR8fGRvY3VtZW50LmJvZHkucGFyZW50Tm9kZXx8ZG9jdW1lbnQuYm9keSkuc2Nyb2xsVG9wfSxnZXRWaWV3cG9ydEhlaWdodDpmdW5jdGlvbigpe3JldHVybiB3aW5kb3cuaW5uZXJIZWlnaHR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHR8fGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0fSxnZXRFbGVtZW50UGh5c2ljYWxIZWlnaHQ6ZnVuY3Rpb24oYSl7cmV0dXJuIE1hdGgubWF4KGEub2Zmc2V0SGVpZ2h0LGEuY2xpZW50SGVpZ2h0KX0sZ2V0U2Nyb2xsZXJQaHlzaWNhbEhlaWdodDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNjcm9sbGVyPT09d2luZG93fHx0aGlzLnNjcm9sbGVyPT09ZG9jdW1lbnQuYm9keT90aGlzLmdldFZpZXdwb3J0SGVpZ2h0KCk6dGhpcy5nZXRFbGVtZW50UGh5c2ljYWxIZWlnaHQodGhpcy5zY3JvbGxlcil9LGdldERvY3VtZW50SGVpZ2h0OmZ1bmN0aW9uKCl7dmFyIGE9ZG9jdW1lbnQuYm9keSxiPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtyZXR1cm4gTWF0aC5tYXgoYS5zY3JvbGxIZWlnaHQsYi5zY3JvbGxIZWlnaHQsYS5vZmZzZXRIZWlnaHQsYi5vZmZzZXRIZWlnaHQsYS5jbGllbnRIZWlnaHQsYi5jbGllbnRIZWlnaHQpfSxnZXRFbGVtZW50SGVpZ2h0OmZ1bmN0aW9uKGEpe3JldHVybiBNYXRoLm1heChhLnNjcm9sbEhlaWdodCxhLm9mZnNldEhlaWdodCxhLmNsaWVudEhlaWdodCl9LGdldFNjcm9sbGVySGVpZ2h0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2Nyb2xsZXI9PT13aW5kb3d8fHRoaXMuc2Nyb2xsZXI9PT1kb2N1bWVudC5ib2R5P3RoaXMuZ2V0RG9jdW1lbnRIZWlnaHQoKTp0aGlzLmdldEVsZW1lbnRIZWlnaHQodGhpcy5zY3JvbGxlcil9LGlzT3V0T2ZCb3VuZHM6ZnVuY3Rpb24oYSl7dmFyIGI9MD5hLGM9YSt0aGlzLmdldFNjcm9sbGVyUGh5c2ljYWxIZWlnaHQoKT50aGlzLmdldFNjcm9sbGVySGVpZ2h0KCk7cmV0dXJuIGJ8fGN9LHRvbGVyYW5jZUV4Y2VlZGVkOmZ1bmN0aW9uKGEsYil7cmV0dXJuIE1hdGguYWJzKGEtdGhpcy5sYXN0S25vd25TY3JvbGxZKT49dGhpcy50b2xlcmFuY2VbYl19LHNob3VsZFVucGluOmZ1bmN0aW9uKGEsYil7dmFyIGM9YT50aGlzLmxhc3RLbm93blNjcm9sbFksZD1hPj10aGlzLm9mZnNldDtyZXR1cm4gYyYmZCYmYn0sc2hvdWxkUGluOmZ1bmN0aW9uKGEsYil7dmFyIGM9YTx0aGlzLmxhc3RLbm93blNjcm9sbFksZD1hPD10aGlzLm9mZnNldDtyZXR1cm4gYyYmYnx8ZH0sdXBkYXRlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5nZXRTY3JvbGxZKCksYj1hPnRoaXMubGFzdEtub3duU2Nyb2xsWT9cImRvd25cIjpcInVwXCIsYz10aGlzLnRvbGVyYW5jZUV4Y2VlZGVkKGEsYik7dGhpcy5pc091dE9mQm91bmRzKGEpfHwoYTw9dGhpcy5vZmZzZXQ/dGhpcy50b3AoKTp0aGlzLm5vdFRvcCgpLGErdGhpcy5nZXRWaWV3cG9ydEhlaWdodCgpPj10aGlzLmdldFNjcm9sbGVySGVpZ2h0KCk/dGhpcy5ib3R0b20oKTp0aGlzLm5vdEJvdHRvbSgpLHRoaXMuc2hvdWxkVW5waW4oYSxjKT90aGlzLnVucGluKCk6dGhpcy5zaG91bGRQaW4oYSxjKSYmdGhpcy5waW4oKSx0aGlzLmxhc3RLbm93blNjcm9sbFk9YSl9fSxlLm9wdGlvbnM9e3RvbGVyYW5jZTp7dXA6MCxkb3duOjB9LG9mZnNldDowLHNjcm9sbGVyOndpbmRvdyxjbGFzc2VzOntwaW5uZWQ6XCJuYXZiYXItcGlubmVkXCIsdW5waW5uZWQ6XCJuYXZiYXItdW5waW5uZWRcIix0b3A6XCJuYXZiYXItdG9wXCIsbm90VG9wOlwibmF2YmFyLW5vdC10b3BcIixib3R0b206XCJuYXZiYXItYm90dG9tXCIsbm90Qm90dG9tOlwibmF2YmFyLW5vdC1ib3R0b21cIixpbml0aWFsOlwibmF2YmFyXCJ9fSxlLmN1dHNUaGVNdXN0YXJkPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBmJiZmLnJBRiYmZi5iaW5kJiZmLmNsYXNzTGlzdCxlfSk7XG5cbi8vIFRoYW5rcyB0byB0aGUgVGhvdWdodGJvdCB0ZWFtIGZvciB0aGUgbmF2aWdhdGlvbiBjb21wb25lbnQgKHJlZmlsbHMuYm91cmJvbi5pbylcbi8vIGFuZCB0byBHcmF5IEdob3N0IGZvciBpbnNwaXJpbmcgdGhlIGtleSBtYXBwaW5nIGZlYXR1cmUgKGh0dHA6Ly9jb2RlcGVuLmlvL2dyYXlnaG9zdHZpc3VhbHMvcGVuL2x0akRhKVxuXG52YXIga2V5Q29kZU1hcCA9IHtcbiAgNDg6XCIwXCIsIDQ5OlwiMVwiLCA1MDpcIjJcIiwgNTE6XCIzXCIsIDUyOlwiNFwiLCA1MzpcIjVcIiwgNTQ6XCI2XCIsIDU1OlwiN1wiLCA1NjpcIjhcIiwgNTc6XCI5XCIsIDU5OlwiO1wiLFxuICA2NTpcImFcIiwgNjY6XCJiXCIsIDY3OlwiY1wiLCA2ODpcImRcIiwgNjk6XCJlXCIsIDcwOlwiZlwiLCA3MTpcImdcIiwgNzI6XCJoXCIsIDczOlwiaVwiLCA3NDpcImpcIiwgNzU6XCJrXCIsIDc2OlwibFwiLFxuICA3NzpcIm1cIiwgNzg6XCJuXCIsIDc5Olwib1wiLCA4MDpcInBcIiwgODE6XCJxXCIsIDgyOlwiclwiLCA4MzpcInNcIiwgODQ6XCJ0XCIsIDg1OlwidVwiLCA4NjpcInZcIiwgODc6XCJ3XCIsIDg4OlwieFwiLCA4OTpcInlcIiwgOTA6XCJ6XCIsXG4gIDk2OlwiMFwiLCA5NzpcIjFcIiwgOTg6XCIyXCIsIDk5OlwiM1wiLCAxMDA6XCI0XCIsIDEwMTpcIjVcIiwgMTAyOlwiNlwiLCAxMDM6XCI3XCIsIDEwNDpcIjhcIiwgMTA1OlwiOVwiXG59ICBcbiAgXG4kLmZuLnNldHVwX25hdmlnYXRpb24gPSBmdW5jdGlvbihzZXR0aW5ncykge1xuXG4gIHNldHRpbmdzID0galF1ZXJ5LmV4dGVuZCh7XG4gICAgbWVudUhvdmVyQ2xhc3M6ICdzaG93LW1lbnUnLFxuICB9LCBzZXR0aW5ncyk7ICAgIFxuXG4gIC8vIEFkZCBBUklBIHJvbGUgdG8gbWVudWJhciBhbmQgbWVudSBpdGVtc1xuICAkKHRoaXMpLmF0dHIoJ3JvbGUnLCAnbWVudWJhcicpLmZpbmQoJ2xpJykuYXR0cigncm9sZScsICdtZW51aXRlbScpO1xuICBcbiAgdmFyIHRvcF9sZXZlbF9saW5rcyA9ICQoJyNqcy1uYXZiYXItbWVudScpLmZpbmQoJz4gdWwgPiBsaSA+IGEnKTtcblxuICAvLyBTZXQgdGFiSW5kZXggdG8gLTEgc28gdGhhdCB0b3BfbGV2ZWxfbGlua3MgY2FuJ3QgcmVjZWl2ZSBmb2N1cyB1bnRpbCBtZW51IGlzIG9wZW5cbiAgJCh0b3BfbGV2ZWxfbGlua3MpICAgIFxuICAgIC5uZXh0QWxsKCd1bCcpXG4gICAgLmF0dHIoJ2RhdGEtdGVzdCcsJ3RydWUnKSAgICAgXG4gICAgLmF0dHIoeyAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsICdyb2xlJzogJ21lbnUnIH0pXG4gICAgLmZpbmQoJ2EnKVxuICAgIC5hdHRyKCd0YWJpbmRleCcsIC0xKTtcblxuICAvLyBBZGRpbmcgYXJpYS1oYXNwb3B1cCBmb3IgbGlzdCAgaXRlbXMgd2l0aCBhIHN1Ym1lbnVcbiAgJCh0b3BfbGV2ZWxfbGlua3MpLmVhY2goZnVuY3Rpb24oKXtcbiAgICBpZigkKHRoaXMpLm5leHRBbGwoJ3VsJykubGVuZ3RoID4gMClcbiAgICAgICQodGhpcykuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiZHJvcGRvd24tdHJpZ2dlclwiPjwvc3Bhbj4nKTtcbiAgICAgICQodGhpcykucGFyZW50KCdsaScpLmF0dHIoJ2FyaWEtaGFzcG9wdXAnLCAndHJ1ZScpO1xuICB9KTsgIFxuXG4gICQodG9wX2xldmVsX2xpbmtzKS5ob3ZlcihmdW5jdGlvbigpe1xuICAgICQodGhpcykuY2xvc2VzdCgndWwnKSBcbiAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAuZmluZCgnLicrc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAuZmluZCgnYScpXG4gICAgICAuYXR0cigndGFiSW5kZXgnLC0xKTtcbiAgICAkKHRoaXMpLm5leHRBbGwoJ3VsJylcbiAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAuZmluZCgnYScpLmF0dHIoJ3RhYkluZGV4JywwKTtcbiAgfSk7ICBcbiAgXG4gICQodG9wX2xldmVsX2xpbmtzKS5mb2N1cyhmdW5jdGlvbigpe1xuICAgICQodGhpcykuY2xvc2VzdCgndWwnKVxuICAgICAgLmZpbmQoJy4nK3NldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICAgICAgLnJlbW92ZUNsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgLmZpbmQoJ2EnKVxuICAgICAgLmF0dHIoJ3RhYkluZGV4JywtMSk7XG5cbiAgICAkKHRoaXMpLm5leHRBbGwoJ3VsJylcbiAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAuYWRkQ2xhc3Moc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAuZmluZCgnYScpLmF0dHIoJ3RhYkluZGV4JywwKTtcbiAgfSk7XG4gIFxuICAkKHRvcF9sZXZlbF9saW5rcykua2V5ZG93bihmdW5jdGlvbihlKXtcbiAgICBpZihlLmtleUNvZGUgPT0gMzcpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIFRoaXMgaXMgdGhlIGZpcnN0IGl0ZW1cbiAgICAgIGlmKCQodGhpcykucGFyZW50KCdsaScpLnByZXYoJ2xpJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCd1bCcpLmZpbmQoJz4gbGknKS5sYXN0KCkuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCdsaScpLnByZXYoJ2xpJykuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDM4KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZigkKHRoaXMpLnBhcmVudCgnbGknKS5maW5kKCd1bCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykuZmluZCgndWwnKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAgICAgLmFkZENsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAgIC5maW5kKCdhJykuYXR0cigndGFiSW5kZXgnLDApXG4gICAgICAgICAgLmxhc3QoKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZihlLmtleUNvZGUgPT0gMzkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIFRoaXMgaXMgdGhlIGxhc3QgaXRlbVxuICAgICAgaWYoJCh0aGlzKS5wYXJlbnQoJ2xpJykubmV4dCgnbGknKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudHMoJ3VsJykuZmluZCgnPiBsaScpLmZpcnN0KCkuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCdsaScpLm5leHQoJ2xpJykuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDQwKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZigkKHRoaXMpLnBhcmVudCgnbGknKS5maW5kKCd1bCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykuZmluZCgndWwnKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAgICAgLmFkZENsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAgIC5maW5kKCdhJykuYXR0cigndGFiSW5kZXgnLDApXG4gICAgICAgICAgLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDMyKSB7XG4gICAgICAvLyBJZiBzdWJtZW51IGlzIGhpZGRlbiwgb3BlbiBpdCBvbiBzcGFjZWJhclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykuZmluZCgndWxbYXJpYS1oaWRkZW49dHJ1ZV0nKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAgICAgLmFkZENsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAgIC5maW5kKCdhJykuYXR0cigndGFiSW5kZXgnLDApXG4gICAgICAgICAgLmZpcnN0KCkuZm9jdXMoKTtcbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDI3KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKCcuJytzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICAgICAgICAucmVtb3ZlQ2xhc3Moc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAgIC5maW5kKCdhJylcbiAgICAgICAgLmF0dHIoJ3RhYkluZGV4JywtMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcykucGFyZW50KCdsaScpLmZpbmQoJ3VsW2FyaWEtaGlkZGVuPWZhbHNlXSBhJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICBpZigkKHRoaXMpLnRleHQoKS5zdWJzdHJpbmcoMCwxKS50b0xvd2VyQ2FzZSgpID09IGtleUNvZGVNYXBbZS5rZXlDb2RlXSkge1xuICAgICAgICAgICQodGhpcykuZm9jdXMoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIFxuICB2YXIgbGlua3MgPSAkKHRvcF9sZXZlbF9saW5rcykucGFyZW50KCdsaScpLmZpbmQoJ3VsJykuZmluZCgnYScpO1xuICAkKGxpbmtzKS5rZXlkb3duKGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUua2V5Q29kZSA9PSAzOCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gVGhpcyBpcyB0aGUgZmlyc3QgaXRlbVxuICAgICAgaWYoJCh0aGlzKS5wYXJlbnQoJ2xpJykucHJldignbGknKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudHMoJ3VsJykucGFyZW50cygnbGknKS5maW5kKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykucHJldignbGknKS5maW5kKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZihlLmtleUNvZGUgPT0gNDApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmKCQodGhpcykucGFyZW50KCdsaScpLm5leHQoJ2xpJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCd1bCcpLnBhcmVudHMoJ2xpJykuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCdsaScpLm5leHQoJ2xpJykuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDI3IHx8IGUua2V5Q29kZSA9PSAzNykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCh0aGlzKVxuICAgICAgICAucGFyZW50cygndWwnKS5maXJzdCgpXG4gICAgICAgICAgLnByZXYoJ2EnKS5mb2N1cygpXG4gICAgICAgICAgLnBhcmVudHMoJ3VsJykuZmlyc3QoKS5maW5kKCcuJytzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAgIC5maW5kKCdhJylcbiAgICAgICAgICAuYXR0cigndGFiSW5kZXgnLC0xKTtcbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDMyKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB3aW5kb3cubG9jYXRpb24gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS5uZXh0QWxsKCdsaScpLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKCQodGhpcykudGV4dCgpLnN1YnN0cmluZygwLDEpLnRvTG93ZXJDYXNlKCkgPT0ga2V5Q29kZU1hcFtlLmtleUNvZGVdKSB7XG4gICAgICAgICAgJCh0aGlzKS5mb2N1cygpO1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBpZighZm91bmQpIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykucHJldkFsbCgnbGknKS5maW5kKCdhJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgIGlmKCQodGhpcykudGV4dCgpLnN1YnN0cmluZygwLDEpLnRvTG93ZXJDYXNlKCkgPT0ga2V5Q29kZU1hcFtlLmtleUNvZGVdKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gICAgXG4gIC8vIEhpZGUgbWVudSBpZiBjbGljayBvciBmb2N1cyBvY2N1cnMgb3V0c2lkZSBvZiBuYXZpZ2F0aW9uXG4gICQodGhpcykuZmluZCgnYScpLmxhc3QoKS5rZXlkb3duKGZ1bmN0aW9uKGUpeyBcbiAgICBpZihlLmtleUNvZGUgPT0gOSkge1xuICAgICAgLy8gSWYgdGhlIHVzZXIgdGFicyBvdXQgb2YgdGhlIG5hdmlnYXRpb24gaGlkZSBhbGwgbWVudXNcbiAgICAgICQoJy4nK3NldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgICAgLmZpbmQoJ2EnKVxuICAgICAgICAgIC5hdHRyKCd0YWJJbmRleCcsLTEpO1xuICAgIH1cbiAgfSk7ICAgICBcbiAgXG4gICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKCl7ICQoJy4nK3NldHRpbmdzLm1lbnVIb3ZlckNsYXNzKS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJykucmVtb3ZlQ2xhc3Moc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpLmZpbmQoJ2EnKS5hdHRyKCd0YWJJbmRleCcsLTEpOyB9KTtcbiAgXG4gICQodGhpcykuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gaGlkZU5hdk9uU2Nyb2xsKCkge1xuICAvL05hdmJhciBTY3JvbGwgRXZlbnRcbiAgdmFyIGxhc3RTY3JvbGxUb3AgPSA1MDA7XG4gIHZhciBuYXZiYXIgICAgICAgID0gJCgnLm5hdmJhcicpO1xuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgdmFyIHN0ID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcbiAgICAgaWYgKHN0ID4gbGFzdFNjcm9sbFRvcCAmJiAhKCQoJyNqcy1uYXZiYXItbWVudScpLmF0dHIoJ3N0eWxlJykpKXtcbiAgICAgICAgIG5hdmJhci5hZGRDbGFzcygnbmF2YmFyLXNjcm9sbC11cCcpO1xuICAgICB9IGVsc2Uge1xuICAgICAgICBuYXZiYXIucmVtb3ZlQ2xhc3MoJ25hdmJhci1zY3JvbGwtdXAnKTtcbiAgICAgfVxuICAgICBsYXN0U2Nyb2xsVG9wID0gc3Q7XG4gIH0pO1xufVxuXG5cbmZ1bmN0aW9uIG5hdkFjY29yZGlvbigpIHtcbiAgaWYgKCEoJCgnYm9keS5ob3Jpem9udGFsLWJhcicpLmxlbmd0aCkpIHtcbiAgICAkKCcuZHJvcGRvd24tdHJpZ2dlcicpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykubmV4dCgnLnN1Yi1tZW51Jykuc2xpZGVUb2dnbGUoJ2Zhc3QnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3OTUgKSB7XG4gICAgICAkKCcuc3ViLW1lbnUnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1lbnVUb2dnbGUoKSB7XG4gIHZhciBtZW51VG9nZ2xlID0gJChcIiNqcy1tb2JpbGUtbWVudVwiKS51bmJpbmQoKTtcbiAgJChcIiNqcy1uYXZiYXItbWVudVwiKS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gIG1lbnVUb2dnbGUub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoXCIjanMtbmF2YmFyLW1lbnVcIikuc2xpZGVUb2dnbGUoJ2Zhc3QnLCBmdW5jdGlvbigpe1xuICAgICAgaWYoJChcIiNqcy1uYXZiYXItbWVudVwiKS5pcyhcIjpoaWRkZW5cIikpIHtcbiAgICAgICAgJChcIiNqcy1uYXZiYXItbWVudVwiKS5yZW1vdmVBdHRyKFwic3R5bGVcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG4kKCdkb2N1bWVudCcpLnJlYWR5KGZ1bmN0aW9uKCkge1xuLy8gZ3JhYiBhbiBlbGVtZW50XG4gIHZhciBteUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdmJhclwiKTtcbiAgLy8gY29uc3RydWN0IGFuIGluc3RhbmNlIG9mIEhlYWRyb29tLCBwYXNzaW5nIHRoZSBlbGVtZW50XG4gIHZhciBoZWFkcm9vbSAgPSBuZXcgSGVhZHJvb20obXlFbGVtZW50KTtcbiAgLy8gaW5pdGlhbGlzZVxuICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3OTYgKSB7XG4gICAgaGVhZHJvb20uaW5pdCgpO1xuICB9XG4gIG5hdkFjY29yZGlvbigpO1xuICBtZW51VG9nZ2xlKCk7XG4gICQoJy5uYXZpZ2F0aW9uLW1lbnUnKS5zZXR1cF9uYXZpZ2F0aW9uKCk7XG59KTtcbiIsImZ1bmN0aW9uIGhhbmRsZVRhYnMoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgJHRhYldpZGdldCA9ICQoJy50YWItd2lkZ2V0Jyk7XG5cbiAgdmFyIHNlY3Rpb25fYmcgPSAnJztcblxuICB2YXIgc2V0dXBUYWJzID0gZnVuY3Rpb24oJHRhYiwgJGFsbFRhYnMsICR0YWJQYW5lbHMsICR0YWJMaXN0LCAkdGFiTGlzdEl0ZW1zLCBpKSB7XG4gICAgJHRhYlxuICAgICAgLmF0dHIoe1xuICAgICAgICAnaWQnOiAndGFiLWxpbmstJyArIGksXG4gICAgICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgICAgICdyb2xlJzogJ3RhYicsXG4gICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ2ZhbHNlJyxcbiAgICAgICAgJ2FyaWEtY29udHJvbHMnOiAndGFiLXBhbmVsLScgKyBpXG4gICAgICB9KTtcblxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgJHRhYlxuICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICd0YWJpbmRleCc6ICcwJyxcbiAgICAgICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ3RydWUnLFxuICAgICAgICAgICAgJ2FyaWEtZGVzY3JpYmVkYnknOiAndGFiLXdpZGdldC1kZXNjcmlwdGlvbidcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICB9ICAgIFxuXG4gICAgICAkdGFiLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGFiQ2xpY2soJCh0aGlzKSwgICRhbGxUYWJzLCAkdGFiUGFuZWxzLCAkdGFiTGlzdCwgJHRhYkxpc3RJdGVtcywgaSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCcxJyk7ICAgICAgIFxuICAgICAgfSk7XG5cbiAgICAgICR0YWIub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHRhYktleWRvd24oJCh0aGlzKSwgJGFsbFRhYnMsICR0YWJQYW5lbHMsICR0YWJMaXN0SXRlbXMsIGksIGUpOyAgICAgICAgICBcbiAgICAgIH0pO1xuXG4gIH07XG5cbiAgdmFyIHNldHVwVGFiUGFuZWxzID0gZnVuY3Rpb24odGFiUGFuZWwsIGkpIHtcbiAgICAgIHRhYlBhbmVsXG4gICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAnaWQnOiAndGFiLXBhbmVsLScgKyBpLFxuICAgICAgICAgICdyb2xlJzogJ3RhYnBhbmVsJyxcbiAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgJ2FyaWEtbGFiZWxsZWRieSc6ICd0YWItbGluay0nICsgaVxuICAgICAgICB9KVxuICAgICAgICAuaGlkZSgpO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICB0YWJQYW5lbFxuICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAuc2hvdygpO1xuICAgICAgfVxuICB9O1xuXG4gIHZhciB0YWJDbGljayA9IGZ1bmN0aW9uKCR0aGlzVGFiLCAkYWxsVGFicywgJHRhYlBhbmVscywgJHRhYkxpc3QsICR0YWJMaXN0SXRlbXMsIGkpIHtcbiAgICAkKCcuc2Vjb25kLXRhYicpLnJlbW92ZUNsYXNzKCdzZWNvbmQtdGFiJyk7XG4gICAgc2VjdGlvbl9iZyA9ICQoJHRoaXNUYWIpLmF0dHIoJ2RhdGEtYmcnKTtcbiAgICAkKCcjYWJvdXQtdGFicycpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3Moc2VjdGlvbl9iZyk7XG5cbiAgICBpZiAoJHRoaXNUYWIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICQoJ2JvZHkuaG9yaXpvbnRhbC1iYXInKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICR0aGlzVGFiLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgJHRoaXNUYWIubmV4dCgpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJykuc2xpZGVUb2dnbGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJHRhYkxpc3RcbiAgICAgICAgLmZpbmQoJy5pcy1hY3RpdmUnKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXG4gICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICd0YWJpbmRleCc6IC0xLFxuICAgICAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiAnZmFsc2UnXG4gICAgICAgIH0pXG4gICAgICAgIC5yZW1vdmVBdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JylcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgICBpZiAoJCgnYm9keS5ob3Jpem9udGFsLWJhcicpLmxlbmd0aCkge1xuICAgICAgICAvLy8gYmlnIGJveSB0YWIgZnVuY3Rpb25hbGl0eSAgICAgICAgXG4gICAgICAgICR0YWJMaXN0LmZpbmQoJy5pcy1vcGVuJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkdGFiTGlzdC5maW5kKCcuaXMtb3BlbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykuc2xpZGVUb2dnbGUoKTtcbiAgICAgIH1cblxuICAgICAgJHRoaXNUYWIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpXG4gICAgICAgIC5hdHRyKHtcbiAgICAgICAgJ3RhYmluZGV4JzogMCxcbiAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiAndHJ1ZScsXG4gICAgICAgICdhcmlhLWRlc2NyaWJlZGJ5JzogJ3RhYi13aWRnZXQtZGVzY3JpcHRpb24nXG4gICAgICB9KTtcbiAgICAgIGlmICgkKCdib2R5Lmhvcml6b250YWwtYmFyJykubGVuZ3RoKSB7XG4gICAgICAgICR0aGlzVGFiLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLmZhZGVJbignc2xvdycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHRoaXNUYWIubmV4dCgpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJykuc2xpZGVUb2dnbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHRhYktleWRvd24gPSBmdW5jdGlvbigkdGhpc1RhYiwgJGFsbFRhYnMsICR0YWJQYW5lbHMsICR0YWJMaXN0SXRlbXMsIGksIGUpIHtcbiAgICAgIHZhciBrZXlDb2RlID0gZS53aGljaCxcbiAgICAgICAgICAkbmV4dFRhYiA9ICR0aGlzVGFiLnBhcmVudCgpLm5leHQoKS5pcygnbGknKSA/ICR0aGlzVGFiLnBhcmVudCgpLm5leHQoKS5maW5kKCdhJykgOiBmYWxzZSxcbiAgICAgICAgICAkcHJldmlvdXNUYWIgPSAkdGhpc1RhYi5wYXJlbnQoKS5wcmV2KCkuaXMoJ2xpJykgPyAkdGhpc1RhYi5wYXJlbnQoKS5wcmV2KCkuZmluZCgnYScpIDogZmFsc2UsXG4gICAgICAgICAgJGZpcnN0VGFiID0gJHRoaXNUYWIucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGk6Zmlyc3QnKS5maW5kKCdhJyksXG4gICAgICAgICAgJGxhc3RUYWIgPSAkdGhpc1RhYi5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdsaTpsYXN0JykuZmluZCgnYScpO1xuXG4gICAgICBzd2l0Y2goa2V5Q29kZSkge1xuICAgICAgICAgIC8vIExlZnQvVXBcbiAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICR0aGlzVGFiLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIC5wYXJlbnRzKCcjYWJvdXQtdGFicycpLnJlbW92ZUNsYXNzKCk7XG4gICAgICAgICAgICAgICR0aGlzVGFiLm5leHQoKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLmhpZGUoKTtcblxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgaWYgKCEkcHJldmlvdXNUYWIpIHtcbiAgICAgICAgICAgICAgICAgICRsYXN0VGFiLmZvY3VzKCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb25fYmcgPSAkKCRsYXN0VGFiKS5hdHRyKCdkYXRhLWJnJyk7XG4gICAgICAgICAgICAgICAgICAkKCRsYXN0VGFiKS5wYXJlbnRzKCcjYWJvdXQtdGFicycpLmFkZENsYXNzKHNlY3Rpb25fYmcpOyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJHByZXZpb3VzVGFiLmZvY3VzKCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb25fYmcgPSAkKCRwcmV2aW91c1RhYikuYXR0cignZGF0YS1iZycpO1xuICAgICAgICAgICAgICAgICAgJCgkcHJldmlvdXNUYWIpLnBhcmVudHMoJyNhYm91dC10YWJzJykuYWRkQ2xhc3Moc2VjdGlvbl9iZyk7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vIFJpZ2h0L0Rvd25cbiAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICR0aGlzVGFiLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIC5wYXJlbnRzKCcjYWJvdXQtdGFicycpLnJlbW92ZUNsYXNzKCk7XG4gICAgICAgICAgICAgICR0aGlzVGFiLm5leHQoKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLmhpZGUoKTtcblxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgaWYgKCEkbmV4dFRhYikge1xuICAgICAgICAgICAgICAgICAgJGZpcnN0VGFiLmZvY3VzKCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb25fYmcgPSAkKCRmaXJzdFRhYikuYXR0cignZGF0YS1iZycpO1xuICAgICAgICAgICAgICAgICAgJCgkZmlyc3RUYWIpLnBhcmVudHMoJyNhYm91dC10YWJzJykuYWRkQ2xhc3Moc2VjdGlvbl9iZyk7XG5cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICRuZXh0VGFiLmZvY3VzKCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb25fYmcgPSAkKCRuZXh0VGFiKS5hdHRyKCdkYXRhLWJnJyk7XG4gICAgICAgICAgICAgICAgICAkKCRuZXh0VGFiKS5wYXJlbnRzKCcjYWJvdXQtdGFicycpLmFkZENsYXNzKHNlY3Rpb25fYmcpOyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvLyBIb21lXG4gICAgICAgICAgY2FzZSAzNjpcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICRmaXJzdFRhYi5mb2N1cygpO1xuXG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy8gRW5kXG4gICAgICAgICAgY2FzZSAzNTpcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICRsYXN0VGFiLmZvY3VzKCk7XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvLyBFbnRlci9TcGFjZVxuICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICB9O1xuXG4gICR0YWJXaWRnZXQuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICR0YWJMaXN0ID0gJHRoaXMuZmluZCgnPiB1bCcpLFxuICAgICAgICAgICR0YWJMaXN0SXRlbXMgPSAkdGFiTGlzdC5maW5kKCdsaScpLFxuICAgICAgICAgICRhbGxUYWJzID0gJHRhYkxpc3RJdGVtcy5maW5kKCdhJyksXG4gICAgICAgICAgJHRhYlBhbmVscyA9ICR0aGlzLmZpbmQoJy50YWItY29udGVudCcpO1xuXG4gICAgICAkdGFiTGlzdC5hdHRyKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgICAgdmFyICRzZWNvbmRUYWIgPSAkdGFiTGlzdC5maW5kKCdsaTpudGgtb2YtdHlwZSgyKSBhJyk7XG4gICAgICAkc2Vjb25kVGFiLmFkZENsYXNzKCdzZWNvbmQtdGFiJyk7XG5cbiAgICAgICR0YWJMaXN0SXRlbXMuYXR0cigncm9sZScsICdwcmVzZW50YXRpb24nKTtcblxuICAgICAgJGFsbFRhYnMuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgIHNldHVwVGFicygkKHRoaXMpLCAkYWxsVGFicywgJHRhYlBhbmVscywgJHRhYkxpc3QsICR0YWJMaXN0SXRlbXMsIGkpO1xuICAgICAgfSk7XG5cbiAgICAgICR0YWJQYW5lbHMuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgIHNldHVwVGFiUGFuZWxzKCQodGhpcyksIGkpO1xuICAgICAgfSk7XG4gIH0pO1xufVxuXG4kKCdkb2N1bWVudCcpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgaGFuZGxlVGFicygpO1xufSk7IiwifShqUXVlcnkpKTtcbiJdfQ==
