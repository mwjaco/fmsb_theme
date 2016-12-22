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
  equalheight('.staff-item');
});


$(window).resize(function(){
  equalheight('.staff-item');
});
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
  equalheight('.aside-item');
});


$(window).resize(function(){
  equalheight('.aside-item');
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
      }).after('<span class="dropdown-trigger"></span>');

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImEtaGVhZC5qcyIsImVxdWFsaGVpZ2h0LmpzIiwibWFpbi5qcyIsIm5hdmJhci5qcyIsInRhYnMuanMiLCJ6LWZvb3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDblFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3TUE7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCkgeyIsImVxdWFsaGVpZ2h0ID0gZnVuY3Rpb24oY29udGFpbmVyKXtcblxudmFyIGN1cnJlbnRUYWxsZXN0ID0gMCxcbiAgICAgY3VycmVudFJvd1N0YXJ0ID0gMCxcbiAgICAgcm93RGl2cyA9IG5ldyBBcnJheSgpLFxuICAgICAkZWwsXG4gICAgIHRvcFBvc2l0aW9uID0gMDtcbiAkKGNvbnRhaW5lcikuZWFjaChmdW5jdGlvbigpIHtcblxuICAgJGVsID0gJCh0aGlzKTtcbiAgICQoJGVsKS5oZWlnaHQoJ2F1dG8nKVxuICAgdG9wUG9zdGlvbiA9ICRlbC5wb3NpdGlvbigpLnRvcDtcblxuICAgaWYgKGN1cnJlbnRSb3dTdGFydCAhPSB0b3BQb3N0aW9uKSB7XG4gICAgIGZvciAoY3VycmVudERpdiA9IDAgOyBjdXJyZW50RGl2IDwgcm93RGl2cy5sZW5ndGggOyBjdXJyZW50RGl2KyspIHtcbiAgICAgICByb3dEaXZzW2N1cnJlbnREaXZdLmhlaWdodChjdXJyZW50VGFsbGVzdCk7XG4gICAgIH1cbiAgICAgcm93RGl2cy5sZW5ndGggPSAwOyAvLyBlbXB0eSB0aGUgYXJyYXlcbiAgICAgY3VycmVudFJvd1N0YXJ0ID0gdG9wUG9zdGlvbjtcbiAgICAgY3VycmVudFRhbGxlc3QgPSAkZWwuaGVpZ2h0KCk7XG4gICAgIHJvd0RpdnMucHVzaCgkZWwpO1xuICAgfSBlbHNlIHtcbiAgICAgcm93RGl2cy5wdXNoKCRlbCk7XG4gICAgIGN1cnJlbnRUYWxsZXN0ID0gKGN1cnJlbnRUYWxsZXN0IDwgJGVsLmhlaWdodCgpKSA/ICgkZWwuaGVpZ2h0KCkpIDogKGN1cnJlbnRUYWxsZXN0KTtcbiAgfVxuICAgZm9yIChjdXJyZW50RGl2ID0gMCA7IGN1cnJlbnREaXYgPCByb3dEaXZzLmxlbmd0aCA7IGN1cnJlbnREaXYrKykge1xuICAgICByb3dEaXZzW2N1cnJlbnREaXZdLmhlaWdodChjdXJyZW50VGFsbGVzdCk7XG4gICB9XG4gfSk7XG59XG5cbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xuICBlcXVhbGhlaWdodCgnLnN0YWZmLWl0ZW0nKTtcbn0pO1xuXG5cbiQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcbiAgZXF1YWxoZWlnaHQoJy5zdGFmZi1pdGVtJyk7XG59KTsiLCJlcXVhbGhlaWdodCA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XG5cbnZhciBjdXJyZW50VGFsbGVzdCA9IDAsXG4gICAgIGN1cnJlbnRSb3dTdGFydCA9IDAsXG4gICAgIHJvd0RpdnMgPSBuZXcgQXJyYXkoKSxcbiAgICAgJGVsLFxuICAgICB0b3BQb3NpdGlvbiA9IDA7XG4gJChjb250YWluZXIpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICRlbCA9ICQodGhpcyk7XG4gICAkKCRlbCkuaGVpZ2h0KCdhdXRvJylcbiAgIHRvcFBvc3Rpb24gPSAkZWwucG9zaXRpb24oKS50b3A7XG5cbiAgIGlmIChjdXJyZW50Um93U3RhcnQgIT0gdG9wUG9zdGlvbikge1xuICAgICBmb3IgKGN1cnJlbnREaXYgPSAwIDsgY3VycmVudERpdiA8IHJvd0RpdnMubGVuZ3RoIDsgY3VycmVudERpdisrKSB7XG4gICAgICAgcm93RGl2c1tjdXJyZW50RGl2XS5oZWlnaHQoY3VycmVudFRhbGxlc3QpO1xuICAgICB9XG4gICAgIHJvd0RpdnMubGVuZ3RoID0gMDsgLy8gZW1wdHkgdGhlIGFycmF5XG4gICAgIGN1cnJlbnRSb3dTdGFydCA9IHRvcFBvc3Rpb247XG4gICAgIGN1cnJlbnRUYWxsZXN0ID0gJGVsLmhlaWdodCgpO1xuICAgICByb3dEaXZzLnB1c2goJGVsKTtcbiAgIH0gZWxzZSB7XG4gICAgIHJvd0RpdnMucHVzaCgkZWwpO1xuICAgICBjdXJyZW50VGFsbGVzdCA9IChjdXJyZW50VGFsbGVzdCA8ICRlbC5oZWlnaHQoKSkgPyAoJGVsLmhlaWdodCgpKSA6IChjdXJyZW50VGFsbGVzdCk7XG4gIH1cbiAgIGZvciAoY3VycmVudERpdiA9IDAgOyBjdXJyZW50RGl2IDwgcm93RGl2cy5sZW5ndGggOyBjdXJyZW50RGl2KyspIHtcbiAgICAgcm93RGl2c1tjdXJyZW50RGl2XS5oZWlnaHQoY3VycmVudFRhbGxlc3QpO1xuICAgfVxuIH0pO1xufVxuXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcbiAgZXF1YWxoZWlnaHQoJy5hc2lkZS1pdGVtJyk7XG59KTtcblxuXG4kKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gIGVxdWFsaGVpZ2h0KCcuYXNpZGUtaXRlbScpO1xufSk7XG5cbmZ1bmN0aW9uIGFzaWRlTW9iaWxlTGF5b3V0KCkge1xuICB2YXIgYXNpZGVNb3ZlciA9IGZ1bmN0aW9uKCl7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgOTM4ICkge1xuICAgICAgJCgnYXNpZGUnKS5pbnNlcnRBZnRlcignZGl2LnByaW1hcnknKTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gOTM3KSB7XG4gICAgICAkKCdhc2lkZScpLmluc2VydEJlZm9yZSgnZGl2LnByaW1hcnknKTtcbiAgICB9ICAgIFxuICB9XG4gIGlmICgkKCdib2R5LmhvbWUnKS5sZW5ndGggPCAxKSB7XG4gICAgYXNpZGVNb3ZlcigpO1xuXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xuICAgICAgICBhc2lkZU1vdmVyKCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBicmVhZGNydW1ic0xheW91dCgpIHtcbiAgaWYgKCQoJy5icmVhZGNydW1iICsgLnByaW1hcnknKS5sZW5ndGggPiAwKSB7XG4gICAgJCgnLmJyZWFkY3J1bWInKS5jc3Moe1xuICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgJ21hcmdpbkxlZnQnOiAnMCdcbiAgICB9KTtcbiAgfVxufVxuXG52YXIgc3RpY2t5Rm9vdGVyID0gZnVuY3Rpb24gKCkge1xuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZm9vdGVySGVpZ2h0ID0gJCgnZm9vdGVyJykub3V0ZXJIZWlnaHQoKTtcbiAgICB2YXIgc3RpY2tGb290ZXJQdXNoID0gJCgnLnB1c2gnKS5oZWlnaHQoZm9vdGVySGVpZ2h0KTtcbiAgICAkKCcuc3RpY2t5LXdyYXBwZXInKS5jc3Moe1xuICAgICAgJ21hcmdpbkJvdHRvbSc6ICctJyArIGZvb3RlckhlaWdodCArICdweCdcbiAgICB9KTtcbiAgfSk7XG4gICQod2luZG93KS5yZXNpemUoKTtcbn0gLy9lbmQgc3RpY2t5IGZvb3RlclxudmFyIGFkZFJlbW92ZU1vYmlsZUNsYXNzID0gZnVuY3Rpb24gKCl7XG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc5NiApIHtcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2hvcml6b250YWwtYmFyJyk7XG4gIH0gZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPiA3OTUgKSB7XG4gICAgJCgnYm9keScpLmFkZENsYXNzKCdob3Jpem9udGFsLWJhcicpO1xuICB9XG59XG4kKCdkb2N1bWVudCcpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gIGJyZWFkY3J1bWJzTGF5b3V0KCk7XG4gIGFzaWRlTW9iaWxlTGF5b3V0KCk7XG4gICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnbm8tanMnKTtcbiAgc3RpY2t5Rm9vdGVyKCk7XG5cdC8vIGFkZCBtb2JpbGUgY2xhc3MgdG8gYm9keSBmb3IgbWFuYWdpbmcgbW9iaWxlIGZlYXR1cmVzXG4gIGFkZFJlbW92ZU1vYmlsZUNsYXNzKCk7XG5cdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuXHQgIGFkZFJlbW92ZU1vYmlsZUNsYXNzKCk7XG5cdH0pOyAgICBcbn0pOyIsIi8qIVxuICogaGVhZHJvb20uanMgdjAuOS4zIC0gR2l2ZSB5b3VyIHBhZ2Ugc29tZSBoZWFkcm9vbS4gSGlkZSB5b3VyIGhlYWRlciB1bnRpbCB5b3UgbmVlZCBpdFxuICogQ29weXJpZ2h0IChjKSAyMDE2IE5pY2sgV2lsbGlhbXMgLSBodHRwOi8vd2lja3kubmlsbGlhLm1zL2hlYWRyb29tLmpzXG4gKiBMaWNlbnNlOiBNSVRcbiAqL1xuXG4hZnVuY3Rpb24oYSxiKXtcInVzZSBzdHJpY3RcIjtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLGIpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWIoKTphLkhlYWRyb29tPWIoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGEoYSl7dGhpcy5jYWxsYmFjaz1hLHRoaXMudGlja2luZz0hMX1mdW5jdGlvbiBiKGEpe3JldHVybiBhJiZcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiYoYT09PXdpbmRvd3x8YS5ub2RlVHlwZSl9ZnVuY3Rpb24gYyhhKXtpZihhcmd1bWVudHMubGVuZ3RoPD0wKXRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgYXJndW1lbnRzIGluIGV4dGVuZCBmdW5jdGlvblwiKTt2YXIgZCxlLGY9YXx8e307Zm9yKGU9MTtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKXt2YXIgZz1hcmd1bWVudHNbZV18fHt9O2ZvcihkIGluIGcpXCJvYmplY3RcIiE9dHlwZW9mIGZbZF18fGIoZltkXSk/ZltkXT1mW2RdfHxnW2RdOmZbZF09YyhmW2RdLGdbZF0pfXJldHVybiBmfWZ1bmN0aW9uIGQoYSl7cmV0dXJuIGE9PT1PYmplY3QoYSk/YTp7ZG93bjphLHVwOmF9fWZ1bmN0aW9uIGUoYSxiKXtiPWMoYixlLm9wdGlvbnMpLHRoaXMubGFzdEtub3duU2Nyb2xsWT0wLHRoaXMuZWxlbT1hLHRoaXMudG9sZXJhbmNlPWQoYi50b2xlcmFuY2UpLHRoaXMuY2xhc3Nlcz1iLmNsYXNzZXMsdGhpcy5vZmZzZXQ9Yi5vZmZzZXQsdGhpcy5zY3JvbGxlcj1iLnNjcm9sbGVyLHRoaXMuaW5pdGlhbGlzZWQ9ITEsdGhpcy5vblBpbj1iLm9uUGluLHRoaXMub25VbnBpbj1iLm9uVW5waW4sdGhpcy5vblRvcD1iLm9uVG9wLHRoaXMub25Ob3RUb3A9Yi5vbk5vdFRvcCx0aGlzLm9uQm90dG9tPWIub25Cb3R0b20sdGhpcy5vbk5vdEJvdHRvbT1iLm9uTm90Qm90dG9tfXZhciBmPXtiaW5kOiEhZnVuY3Rpb24oKXt9LmJpbmQsY2xhc3NMaXN0OlwiY2xhc3NMaXN0XCJpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsckFGOiEhKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpfTtyZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZT13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lLGEucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjphLHVwZGF0ZTpmdW5jdGlvbigpe3RoaXMuY2FsbGJhY2smJnRoaXMuY2FsbGJhY2soKSx0aGlzLnRpY2tpbmc9ITF9LHJlcXVlc3RUaWNrOmZ1bmN0aW9uKCl7dGhpcy50aWNraW5nfHwocmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmFmQ2FsbGJhY2t8fCh0aGlzLnJhZkNhbGxiYWNrPXRoaXMudXBkYXRlLmJpbmQodGhpcykpKSx0aGlzLnRpY2tpbmc9ITApfSxoYW5kbGVFdmVudDpmdW5jdGlvbigpe3RoaXMucmVxdWVzdFRpY2soKX19LGUucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjplLGluaXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZS5jdXRzVGhlTXVzdGFyZD8odGhpcy5kZWJvdW5jZXI9bmV3IGEodGhpcy51cGRhdGUuYmluZCh0aGlzKSksdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLmluaXRpYWwpLHNldFRpbWVvdXQodGhpcy5hdHRhY2hFdmVudC5iaW5kKHRoaXMpLDEwMCksdGhpcyk6dm9pZCAwfSxkZXN0cm95OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5jbGFzc2VzO3RoaXMuaW5pdGlhbGlzZWQ9ITEsdGhpcy5lbGVtLmNsYXNzTGlzdC5yZW1vdmUoYS51bnBpbm5lZCxhLnBpbm5lZCxhLnRvcCxhLm5vdFRvcCxhLmluaXRpYWwpLHRoaXMuc2Nyb2xsZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMuZGVib3VuY2VyLCExKX0sYXR0YWNoRXZlbnQ6ZnVuY3Rpb24oKXt0aGlzLmluaXRpYWxpc2VkfHwodGhpcy5sYXN0S25vd25TY3JvbGxZPXRoaXMuZ2V0U2Nyb2xsWSgpLHRoaXMuaW5pdGlhbGlzZWQ9ITAsdGhpcy5zY3JvbGxlci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5kZWJvdW5jZXIsITEpLHRoaXMuZGVib3VuY2VyLmhhbmRsZUV2ZW50KCkpfSx1bnBpbjpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZWxlbS5jbGFzc0xpc3QsYj10aGlzLmNsYXNzZXM7IWEuY29udGFpbnMoYi5waW5uZWQpJiZhLmNvbnRhaW5zKGIudW5waW5uZWQpfHwoYS5hZGQoYi51bnBpbm5lZCksYS5yZW1vdmUoYi5waW5uZWQpLHRoaXMub25VbnBpbiYmdGhpcy5vblVucGluLmNhbGwodGhpcykpfSxwaW46ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi51bnBpbm5lZCkmJihhLnJlbW92ZShiLnVucGlubmVkKSxhLmFkZChiLnBpbm5lZCksdGhpcy5vblBpbiYmdGhpcy5vblBpbi5jYWxsKHRoaXMpKX0sdG9wOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5lbGVtLmNsYXNzTGlzdCxiPXRoaXMuY2xhc3NlczthLmNvbnRhaW5zKGIudG9wKXx8KGEuYWRkKGIudG9wKSxhLnJlbW92ZShiLm5vdFRvcCksdGhpcy5vblRvcCYmdGhpcy5vblRvcC5jYWxsKHRoaXMpKX0sbm90VG9wOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5lbGVtLmNsYXNzTGlzdCxiPXRoaXMuY2xhc3NlczthLmNvbnRhaW5zKGIubm90VG9wKXx8KGEuYWRkKGIubm90VG9wKSxhLnJlbW92ZShiLnRvcCksdGhpcy5vbk5vdFRvcCYmdGhpcy5vbk5vdFRvcC5jYWxsKHRoaXMpKX0sYm90dG9tOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5lbGVtLmNsYXNzTGlzdCxiPXRoaXMuY2xhc3NlczthLmNvbnRhaW5zKGIuYm90dG9tKXx8KGEuYWRkKGIuYm90dG9tKSxhLnJlbW92ZShiLm5vdEJvdHRvbSksdGhpcy5vbkJvdHRvbSYmdGhpcy5vbkJvdHRvbS5jYWxsKHRoaXMpKX0sbm90Qm90dG9tOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5lbGVtLmNsYXNzTGlzdCxiPXRoaXMuY2xhc3NlczthLmNvbnRhaW5zKGIubm90Qm90dG9tKXx8KGEuYWRkKGIubm90Qm90dG9tKSxhLnJlbW92ZShiLmJvdHRvbSksdGhpcy5vbk5vdEJvdHRvbSYmdGhpcy5vbk5vdEJvdHRvbS5jYWxsKHRoaXMpKX0sZ2V0U2Nyb2xsWTpmdW5jdGlvbigpe3JldHVybiB2b2lkIDAhPT10aGlzLnNjcm9sbGVyLnBhZ2VZT2Zmc2V0P3RoaXMuc2Nyb2xsZXIucGFnZVlPZmZzZXQ6dm9pZCAwIT09dGhpcy5zY3JvbGxlci5zY3JvbGxUb3A/dGhpcy5zY3JvbGxlci5zY3JvbGxUb3A6KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudHx8ZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlfHxkb2N1bWVudC5ib2R5KS5zY3JvbGxUb3B9LGdldFZpZXdwb3J0SGVpZ2h0OmZ1bmN0aW9uKCl7cmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodHx8ZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHR9LGdldEVsZW1lbnRQaHlzaWNhbEhlaWdodDpmdW5jdGlvbihhKXtyZXR1cm4gTWF0aC5tYXgoYS5vZmZzZXRIZWlnaHQsYS5jbGllbnRIZWlnaHQpfSxnZXRTY3JvbGxlclBoeXNpY2FsSGVpZ2h0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2Nyb2xsZXI9PT13aW5kb3d8fHRoaXMuc2Nyb2xsZXI9PT1kb2N1bWVudC5ib2R5P3RoaXMuZ2V0Vmlld3BvcnRIZWlnaHQoKTp0aGlzLmdldEVsZW1lbnRQaHlzaWNhbEhlaWdodCh0aGlzLnNjcm9sbGVyKX0sZ2V0RG9jdW1lbnRIZWlnaHQ6ZnVuY3Rpb24oKXt2YXIgYT1kb2N1bWVudC5ib2R5LGI9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O3JldHVybiBNYXRoLm1heChhLnNjcm9sbEhlaWdodCxiLnNjcm9sbEhlaWdodCxhLm9mZnNldEhlaWdodCxiLm9mZnNldEhlaWdodCxhLmNsaWVudEhlaWdodCxiLmNsaWVudEhlaWdodCl9LGdldEVsZW1lbnRIZWlnaHQ6ZnVuY3Rpb24oYSl7cmV0dXJuIE1hdGgubWF4KGEuc2Nyb2xsSGVpZ2h0LGEub2Zmc2V0SGVpZ2h0LGEuY2xpZW50SGVpZ2h0KX0sZ2V0U2Nyb2xsZXJIZWlnaHQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zY3JvbGxlcj09PXdpbmRvd3x8dGhpcy5zY3JvbGxlcj09PWRvY3VtZW50LmJvZHk/dGhpcy5nZXREb2N1bWVudEhlaWdodCgpOnRoaXMuZ2V0RWxlbWVudEhlaWdodCh0aGlzLnNjcm9sbGVyKX0saXNPdXRPZkJvdW5kczpmdW5jdGlvbihhKXt2YXIgYj0wPmEsYz1hK3RoaXMuZ2V0U2Nyb2xsZXJQaHlzaWNhbEhlaWdodCgpPnRoaXMuZ2V0U2Nyb2xsZXJIZWlnaHQoKTtyZXR1cm4gYnx8Y30sdG9sZXJhbmNlRXhjZWVkZWQ6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gTWF0aC5hYnMoYS10aGlzLmxhc3RLbm93blNjcm9sbFkpPj10aGlzLnRvbGVyYW5jZVtiXX0sc2hvdWxkVW5waW46ZnVuY3Rpb24oYSxiKXt2YXIgYz1hPnRoaXMubGFzdEtub3duU2Nyb2xsWSxkPWE+PXRoaXMub2Zmc2V0O3JldHVybiBjJiZkJiZifSxzaG91bGRQaW46ZnVuY3Rpb24oYSxiKXt2YXIgYz1hPHRoaXMubGFzdEtub3duU2Nyb2xsWSxkPWE8PXRoaXMub2Zmc2V0O3JldHVybiBjJiZifHxkfSx1cGRhdGU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmdldFNjcm9sbFkoKSxiPWE+dGhpcy5sYXN0S25vd25TY3JvbGxZP1wiZG93blwiOlwidXBcIixjPXRoaXMudG9sZXJhbmNlRXhjZWVkZWQoYSxiKTt0aGlzLmlzT3V0T2ZCb3VuZHMoYSl8fChhPD10aGlzLm9mZnNldD90aGlzLnRvcCgpOnRoaXMubm90VG9wKCksYSt0aGlzLmdldFZpZXdwb3J0SGVpZ2h0KCk+PXRoaXMuZ2V0U2Nyb2xsZXJIZWlnaHQoKT90aGlzLmJvdHRvbSgpOnRoaXMubm90Qm90dG9tKCksdGhpcy5zaG91bGRVbnBpbihhLGMpP3RoaXMudW5waW4oKTp0aGlzLnNob3VsZFBpbihhLGMpJiZ0aGlzLnBpbigpLHRoaXMubGFzdEtub3duU2Nyb2xsWT1hKX19LGUub3B0aW9ucz17dG9sZXJhbmNlOnt1cDowLGRvd246MH0sb2Zmc2V0OjAsc2Nyb2xsZXI6d2luZG93LGNsYXNzZXM6e3Bpbm5lZDpcIm5hdmJhci1waW5uZWRcIix1bnBpbm5lZDpcIm5hdmJhci11bnBpbm5lZFwiLHRvcDpcIm5hdmJhci10b3BcIixub3RUb3A6XCJuYXZiYXItbm90LXRvcFwiLGJvdHRvbTpcIm5hdmJhci1ib3R0b21cIixub3RCb3R0b206XCJuYXZiYXItbm90LWJvdHRvbVwiLGluaXRpYWw6XCJuYXZiYXJcIn19LGUuY3V0c1RoZU11c3RhcmQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGYmJmYuckFGJiZmLmJpbmQmJmYuY2xhc3NMaXN0LGV9KTtcblxuLy8gVGhhbmtzIHRvIHRoZSBUaG91Z2h0Ym90IHRlYW0gZm9yIHRoZSBuYXZpZ2F0aW9uIGNvbXBvbmVudCAocmVmaWxscy5ib3VyYm9uLmlvKVxuLy8gYW5kIHRvIEdyYXkgR2hvc3QgZm9yIGluc3BpcmluZyB0aGUga2V5IG1hcHBpbmcgZmVhdHVyZSAoaHR0cDovL2NvZGVwZW4uaW8vZ3JheWdob3N0dmlzdWFscy9wZW4vbHRqRGEpXG5cbnZhciBrZXlDb2RlTWFwID0ge1xuICA0ODpcIjBcIiwgNDk6XCIxXCIsIDUwOlwiMlwiLCA1MTpcIjNcIiwgNTI6XCI0XCIsIDUzOlwiNVwiLCA1NDpcIjZcIiwgNTU6XCI3XCIsIDU2OlwiOFwiLCA1NzpcIjlcIiwgNTk6XCI7XCIsXG4gIDY1OlwiYVwiLCA2NjpcImJcIiwgNjc6XCJjXCIsIDY4OlwiZFwiLCA2OTpcImVcIiwgNzA6XCJmXCIsIDcxOlwiZ1wiLCA3MjpcImhcIiwgNzM6XCJpXCIsIDc0OlwialwiLCA3NTpcImtcIiwgNzY6XCJsXCIsXG4gIDc3OlwibVwiLCA3ODpcIm5cIiwgNzk6XCJvXCIsIDgwOlwicFwiLCA4MTpcInFcIiwgODI6XCJyXCIsIDgzOlwic1wiLCA4NDpcInRcIiwgODU6XCJ1XCIsIDg2OlwidlwiLCA4NzpcIndcIiwgODg6XCJ4XCIsIDg5OlwieVwiLCA5MDpcInpcIixcbiAgOTY6XCIwXCIsIDk3OlwiMVwiLCA5ODpcIjJcIiwgOTk6XCIzXCIsIDEwMDpcIjRcIiwgMTAxOlwiNVwiLCAxMDI6XCI2XCIsIDEwMzpcIjdcIiwgMTA0OlwiOFwiLCAxMDU6XCI5XCJcbn0gIFxuICBcbiQuZm4uc2V0dXBfbmF2aWdhdGlvbiA9IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG5cbiAgc2V0dGluZ3MgPSBqUXVlcnkuZXh0ZW5kKHtcbiAgICBtZW51SG92ZXJDbGFzczogJ3Nob3ctbWVudScsXG4gIH0sIHNldHRpbmdzKTsgICAgXG5cbiAgLy8gQWRkIEFSSUEgcm9sZSB0byBtZW51YmFyIGFuZCBtZW51IGl0ZW1zXG4gICQodGhpcykuYXR0cigncm9sZScsICdtZW51YmFyJykuZmluZCgnbGknKS5hdHRyKCdyb2xlJywgJ21lbnVpdGVtJyk7XG4gIFxuICB2YXIgdG9wX2xldmVsX2xpbmtzID0gJCgnI2pzLW5hdmJhci1tZW51JykuZmluZCgnPiB1bCA+IGxpID4gYScpO1xuXG4gIC8vIFNldCB0YWJJbmRleCB0byAtMSBzbyB0aGF0IHRvcF9sZXZlbF9saW5rcyBjYW4ndCByZWNlaXZlIGZvY3VzIHVudGlsIG1lbnUgaXMgb3BlblxuICAkKHRvcF9sZXZlbF9saW5rcykgICAgXG4gICAgLm5leHRBbGwoJ3VsJylcbiAgICAuYXR0cignZGF0YS10ZXN0JywndHJ1ZScpICAgICBcbiAgICAuYXR0cih7ICdhcmlhLWhpZGRlbic6ICd0cnVlJywgJ3JvbGUnOiAnbWVudScgfSlcbiAgICAuZmluZCgnYScpXG4gICAgLmF0dHIoJ3RhYmluZGV4JywgLTEpO1xuXG4gIC8vIEFkZGluZyBhcmlhLWhhc3BvcHVwIGZvciBsaXN0ICBpdGVtcyB3aXRoIGEgc3VibWVudVxuICAkKHRvcF9sZXZlbF9saW5rcykuZWFjaChmdW5jdGlvbigpe1xuICAgIGlmKCQodGhpcykubmV4dEFsbCgndWwnKS5sZW5ndGggPiAwKVxuICAgICAgJCh0aGlzKS5hZnRlcignPHNwYW4gY2xhc3M9XCJkcm9wZG93bi10cmlnZ2VyXCI+PC9zcGFuPicpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykuYXR0cignYXJpYS1oYXNwb3B1cCcsICd0cnVlJyk7XG4gIH0pOyAgXG5cbiAgJCh0b3BfbGV2ZWxfbGlua3MpLmhvdmVyKGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5jbG9zZXN0KCd1bCcpIFxuICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJylcbiAgICAgIC5maW5kKCcuJytzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgIC5maW5kKCdhJylcbiAgICAgIC5hdHRyKCd0YWJJbmRleCcsLTEpO1xuICAgICQodGhpcykubmV4dEFsbCgndWwnKVxuICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJylcbiAgICAgIC5maW5kKCdhJykuYXR0cigndGFiSW5kZXgnLDApO1xuICB9KTsgIFxuICBcbiAgJCh0b3BfbGV2ZWxfbGlua3MpLmZvY3VzKGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5jbG9zZXN0KCd1bCcpXG4gICAgICAuZmluZCgnLicrc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAucmVtb3ZlQ2xhc3Moc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAuZmluZCgnYScpXG4gICAgICAuYXR0cigndGFiSW5kZXgnLC0xKTtcblxuICAgICQodGhpcykubmV4dEFsbCgndWwnKVxuICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJylcbiAgICAgIC5hZGRDbGFzcyhzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgIC5maW5kKCdhJykuYXR0cigndGFiSW5kZXgnLDApO1xuICB9KTtcbiAgXG4gICQodG9wX2xldmVsX2xpbmtzKS5rZXlkb3duKGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUua2V5Q29kZSA9PSAzNykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gVGhpcyBpcyB0aGUgZmlyc3QgaXRlbVxuICAgICAgaWYoJCh0aGlzKS5wYXJlbnQoJ2xpJykucHJldignbGknKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudHMoJ3VsJykuZmluZCgnPiBsaScpLmxhc3QoKS5maW5kKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykucHJldignbGknKS5maW5kKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZihlLmtleUNvZGUgPT0gMzgpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmKCQodGhpcykucGFyZW50KCdsaScpLmZpbmQoJ3VsJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS5maW5kKCd1bCcpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJylcbiAgICAgICAgICAuYWRkQ2xhc3Moc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAgICAgLmZpbmQoJ2EnKS5hdHRyKCd0YWJJbmRleCcsMClcbiAgICAgICAgICAubGFzdCgpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PSAzOSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gVGhpcyBpcyB0aGUgbGFzdCBpdGVtXG4gICAgICBpZigkKHRoaXMpLnBhcmVudCgnbGknKS5uZXh0KCdsaScpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICQodGhpcykucGFyZW50cygndWwnKS5maW5kKCc+IGxpJykuZmlyc3QoKS5maW5kKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykubmV4dCgnbGknKS5maW5kKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZihlLmtleUNvZGUgPT0gNDApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmKCQodGhpcykucGFyZW50KCdsaScpLmZpbmQoJ3VsJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS5maW5kKCd1bCcpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJylcbiAgICAgICAgICAuYWRkQ2xhc3Moc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAgICAgLmZpbmQoJ2EnKS5hdHRyKCd0YWJJbmRleCcsMClcbiAgICAgICAgICAuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZihlLmtleUNvZGUgPT0gMzIpIHtcbiAgICAgIC8vIElmIHN1Ym1lbnUgaXMgaGlkZGVuLCBvcGVuIGl0IG9uIHNwYWNlYmFyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS5maW5kKCd1bFthcmlhLWhpZGRlbj10cnVlXScpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJylcbiAgICAgICAgICAuYWRkQ2xhc3Moc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAgICAgLmZpbmQoJ2EnKS5hdHRyKCd0YWJJbmRleCcsMClcbiAgICAgICAgICAuZmlyc3QoKS5mb2N1cygpO1xuICAgIH0gZWxzZSBpZihlLmtleUNvZGUgPT0gMjcpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJy4nK3NldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgICAgLmZpbmQoJ2EnKVxuICAgICAgICAuYXR0cigndGFiSW5kZXgnLC0xKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykuZmluZCgndWxbYXJpYS1oaWRkZW49ZmFsc2VdIGEnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKCQodGhpcykudGV4dCgpLnN1YnN0cmluZygwLDEpLnRvTG93ZXJDYXNlKCkgPT0ga2V5Q29kZU1hcFtlLmtleUNvZGVdKSB7XG4gICAgICAgICAgJCh0aGlzKS5mb2N1cygpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgXG4gIHZhciBsaW5rcyA9ICQodG9wX2xldmVsX2xpbmtzKS5wYXJlbnQoJ2xpJykuZmluZCgndWwnKS5maW5kKCdhJyk7XG4gICQobGlua3MpLmtleWRvd24oZnVuY3Rpb24oZSl7XG4gICAgaWYoZS5rZXlDb2RlID09IDM4KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBUaGlzIGlzIHRoZSBmaXJzdCBpdGVtXG4gICAgICBpZigkKHRoaXMpLnBhcmVudCgnbGknKS5wcmV2KCdsaScpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICQodGhpcykucGFyZW50cygndWwnKS5wYXJlbnRzKCdsaScpLmZpbmQoJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS5wcmV2KCdsaScpLmZpbmQoJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PSA0MCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYoJCh0aGlzKS5wYXJlbnQoJ2xpJykubmV4dCgnbGknKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudHMoJ3VsJykucGFyZW50cygnbGknKS5maW5kKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykubmV4dCgnbGknKS5maW5kKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZihlLmtleUNvZGUgPT0gMjcgfHwgZS5rZXlDb2RlID09IDM3KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKHRoaXMpXG4gICAgICAgIC5wYXJlbnRzKCd1bCcpLmZpcnN0KClcbiAgICAgICAgICAucHJldignYScpLmZvY3VzKClcbiAgICAgICAgICAucGFyZW50cygndWwnKS5maXJzdCgpLmZpbmQoJy4nK3NldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgICAgICAucmVtb3ZlQ2xhc3Moc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAgICAgLmZpbmQoJ2EnKVxuICAgICAgICAgIC5hdHRyKCd0YWJJbmRleCcsLTEpO1xuICAgIH0gZWxzZSBpZihlLmtleUNvZGUgPT0gMzIpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICQodGhpcykucGFyZW50KCdsaScpLm5leHRBbGwoJ2xpJykuZmluZCgnYScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoJCh0aGlzKS50ZXh0KCkuc3Vic3RyaW5nKDAsMSkudG9Mb3dlckNhc2UoKSA9PSBrZXlDb2RlTWFwW2Uua2V5Q29kZV0pIHtcbiAgICAgICAgICAkKHRoaXMpLmZvY3VzKCk7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGlmKCFmb3VuZCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS5wcmV2QWxsKCdsaScpLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgaWYoJCh0aGlzKS50ZXh0KCkuc3Vic3RyaW5nKDAsMSkudG9Mb3dlckNhc2UoKSA9PSBrZXlDb2RlTWFwW2Uua2V5Q29kZV0pIHtcbiAgICAgICAgICAgICQodGhpcykuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgICBcbiAgLy8gSGlkZSBtZW51IGlmIGNsaWNrIG9yIGZvY3VzIG9jY3VycyBvdXRzaWRlIG9mIG5hdmlnYXRpb25cbiAgJCh0aGlzKS5maW5kKCdhJykubGFzdCgpLmtleWRvd24oZnVuY3Rpb24oZSl7IFxuICAgIGlmKGUua2V5Q29kZSA9PSA5KSB7XG4gICAgICAvLyBJZiB0aGUgdXNlciB0YWJzIG91dCBvZiB0aGUgbmF2aWdhdGlvbiBoaWRlIGFsbCBtZW51c1xuICAgICAgJCgnLicrc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgICAgLnJlbW92ZUNsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAuZmluZCgnYScpXG4gICAgICAgICAgLmF0dHIoJ3RhYkluZGV4JywtMSk7XG4gICAgfVxuICB9KTsgICAgIFxuICBcbiAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oKXsgJCgnLicrc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKS5yZW1vdmVDbGFzcyhzZXR0aW5ncy5tZW51SG92ZXJDbGFzcykuZmluZCgnYScpLmF0dHIoJ3RhYkluZGV4JywtMSk7IH0pO1xuICBcbiAgJCh0aGlzKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxufVxuXG5mdW5jdGlvbiBoaWRlTmF2T25TY3JvbGwoKSB7XG4gIC8vTmF2YmFyIFNjcm9sbCBFdmVudFxuICB2YXIgbGFzdFNjcm9sbFRvcCA9IDUwMDtcbiAgdmFyIG5hdmJhciAgICAgICAgPSAkKCcubmF2YmFyJyk7XG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oZXZlbnQpe1xuICAgICB2YXIgc3QgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuICAgICBpZiAoc3QgPiBsYXN0U2Nyb2xsVG9wICYmICEoJCgnI2pzLW5hdmJhci1tZW51JykuYXR0cignc3R5bGUnKSkpe1xuICAgICAgICAgbmF2YmFyLmFkZENsYXNzKCduYXZiYXItc2Nyb2xsLXVwJyk7XG4gICAgIH0gZWxzZSB7XG4gICAgICAgIG5hdmJhci5yZW1vdmVDbGFzcygnbmF2YmFyLXNjcm9sbC11cCcpO1xuICAgICB9XG4gICAgIGxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgfSk7XG59XG5cblxuZnVuY3Rpb24gbmF2QWNjb3JkaW9uKCkge1xuICBpZiAoISgkKCdib2R5Lmhvcml6b250YWwtYmFyJykubGVuZ3RoKSkge1xuICAgICQoJy5kcm9wZG93bi10cmlnZ2VyJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5uZXh0KCcuc3ViLW1lbnUnKS5zbGlkZVRvZ2dsZSgnZmFzdCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc5NSApIHtcbiAgICAgICQoJy5zdWItbWVudScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gbWVudVRvZ2dsZSgpIHtcbiAgdmFyIG1lbnVUb2dnbGUgPSAkKFwiI2pzLW1vYmlsZS1tZW51XCIpLnVuYmluZCgpO1xuICAkKFwiI2pzLW5hdmJhci1tZW51XCIpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgbWVudVRvZ2dsZS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgJChcIiNqcy1uYXZiYXItbWVudVwiKS5zbGlkZVRvZ2dsZSgnZmFzdCcsIGZ1bmN0aW9uKCl7XG4gICAgICBpZigkKFwiI2pzLW5hdmJhci1tZW51XCIpLmlzKFwiOmhpZGRlblwiKSkge1xuICAgICAgICAkKFwiI2pzLW5hdmJhci1tZW51XCIpLnJlbW92ZUF0dHIoXCJzdHlsZVwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbiQoJ2RvY3VtZW50JykucmVhZHkoZnVuY3Rpb24oKSB7XG4vLyBncmFiIGFuIGVsZW1lbnRcbiAgdmFyIG15RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2YmFyXCIpO1xuICAvLyBjb25zdHJ1Y3QgYW4gaW5zdGFuY2Ugb2YgSGVhZHJvb20sIHBhc3NpbmcgdGhlIGVsZW1lbnRcbiAgdmFyIGhlYWRyb29tICA9IG5ldyBIZWFkcm9vbShteUVsZW1lbnQpO1xuICAvLyBpbml0aWFsaXNlXG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc5NiApIHtcbiAgICBoZWFkcm9vbS5pbml0KCk7XG4gIH1cbiAgbmF2QWNjb3JkaW9uKCk7XG4gIG1lbnVUb2dnbGUoKTtcbiAgJCgnLm5hdmlnYXRpb24tbWVudScpLnNldHVwX25hdmlnYXRpb24oKTtcbn0pO1xuIiwiZnVuY3Rpb24gaGFuZGxlVGFicygpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciAkdGFiV2lkZ2V0ID0gJCgnLnRhYi13aWRnZXQnKTtcblxuICB2YXIgc2VjdGlvbl9iZyA9ICcnO1xuXG4gIHZhciBzZXR1cFRhYnMgPSBmdW5jdGlvbigkdGFiLCAkYWxsVGFicywgJHRhYlBhbmVscywgJHRhYkxpc3QsICR0YWJMaXN0SXRlbXMsIGkpIHtcbiAgICAkdGFiXG4gICAgICAuYXR0cih7XG4gICAgICAgICdpZCc6ICd0YWItbGluay0nICsgaSxcbiAgICAgICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAgICAgJ3JvbGUnOiAndGFiJyxcbiAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1jb250cm9scyc6ICd0YWItcGFuZWwtJyArIGlcbiAgICAgIH0pLmFmdGVyKCc8c3BhbiBjbGFzcz1cImRyb3Bkb3duLXRyaWdnZXJcIj48L3NwYW4+Jyk7XG5cbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICR0YWJcbiAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAndGFiaW5kZXgnOiAnMCcsXG4gICAgICAgICAgICAnYXJpYS1zZWxlY3RlZCc6ICd0cnVlJyxcbiAgICAgICAgICAgICdhcmlhLWRlc2NyaWJlZGJ5JzogJ3RhYi13aWRnZXQtZGVzY3JpcHRpb24nXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgfSAgICBcblxuICAgICAgJHRhYi51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRhYkNsaWNrKCQodGhpcyksICAkYWxsVGFicywgJHRhYlBhbmVscywgJHRhYkxpc3QsICR0YWJMaXN0SXRlbXMsIGkpO1xuICAgICAgICBjb25zb2xlLmxvZygnMScpOyAgICAgICBcbiAgICAgIH0pO1xuXG4gICAgICAkdGFiLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB0YWJLZXlkb3duKCQodGhpcyksICRhbGxUYWJzLCAkdGFiUGFuZWxzLCAkdGFiTGlzdEl0ZW1zLCBpLCBlKTsgICAgICAgICAgXG4gICAgICB9KTtcblxuICB9O1xuXG4gIHZhciBzZXR1cFRhYlBhbmVscyA9IGZ1bmN0aW9uKHRhYlBhbmVsLCBpKSB7XG4gICAgICB0YWJQYW5lbFxuICAgICAgICAuYXR0cih7XG4gICAgICAgICAgJ2lkJzogJ3RhYi1wYW5lbC0nICsgaSxcbiAgICAgICAgICAncm9sZSc6ICd0YWJwYW5lbCcsXG4gICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAgICdhcmlhLWxhYmVsbGVkYnknOiAndGFiLWxpbmstJyArIGlcbiAgICAgICAgfSlcbiAgICAgICAgLmhpZGUoKTtcblxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgdGFiUGFuZWxcbiAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKVxuICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgLnNob3coKTtcbiAgICAgIH1cbiAgfTtcblxuICB2YXIgdGFiQ2xpY2sgPSBmdW5jdGlvbigkdGhpc1RhYiwgJGFsbFRhYnMsICR0YWJQYW5lbHMsICR0YWJMaXN0LCAkdGFiTGlzdEl0ZW1zLCBpKSB7XG4gICAgJCgnLnNlY29uZC10YWInKS5yZW1vdmVDbGFzcygnc2Vjb25kLXRhYicpO1xuICAgIHNlY3Rpb25fYmcgPSAkKCR0aGlzVGFiKS5hdHRyKCdkYXRhLWJnJyk7XG4gICAgJCgnI2Fib3V0LXRhYnMnKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKHNlY3Rpb25fYmcpO1xuXG4gICAgaWYgKCR0aGlzVGFiLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAkKCdib2R5Lmhvcml6b250YWwtYmFyJykubGVuZ3RoIDwgMSkge1xuICAgICAgICAkdGhpc1RhYi50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICR0aGlzVGFiLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLnNsaWRlVG9nZ2xlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICR0YWJMaXN0XG4gICAgICAgIC5maW5kKCcuaXMtYWN0aXZlJylcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKVxuICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAndGFiaW5kZXgnOiAtMSxcbiAgICAgICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ2ZhbHNlJ1xuICAgICAgICB9KVxuICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1kZXNjcmliZWRieScpXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgICAgaWYgKCQoJ2JvZHkuaG9yaXpvbnRhbC1iYXInKS5sZW5ndGgpIHtcbiAgICAgICAgLy8vIGJpZyBib3kgdGFiIGZ1bmN0aW9uYWxpdHkgICAgICAgIFxuICAgICAgICAkdGFiTGlzdC5maW5kKCcuaXMtb3BlbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHRhYkxpc3QuZmluZCgnLmlzLW9wZW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLnNsaWRlVG9nZ2xlKCk7XG4gICAgICB9XG5cbiAgICAgICR0aGlzVGFiLmFkZENsYXNzKCdpcy1hY3RpdmUnKVxuICAgICAgICAuYXR0cih7XG4gICAgICAgICd0YWJpbmRleCc6IDAsXG4gICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ3RydWUnLFxuICAgICAgICAnYXJpYS1kZXNjcmliZWRieSc6ICd0YWItd2lkZ2V0LWRlc2NyaXB0aW9uJ1xuICAgICAgfSk7XG4gICAgICBpZiAoJCgnYm9keS5ob3Jpem9udGFsLWJhcicpLmxlbmd0aCkge1xuICAgICAgICAkdGhpc1RhYi5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKS5mYWRlSW4oJ3Nsb3cnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICR0aGlzVGFiLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLnNsaWRlVG9nZ2xlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciB0YWJLZXlkb3duID0gZnVuY3Rpb24oJHRoaXNUYWIsICRhbGxUYWJzLCAkdGFiUGFuZWxzLCAkdGFiTGlzdEl0ZW1zLCBpLCBlKSB7XG4gICAgICB2YXIga2V5Q29kZSA9IGUud2hpY2gsXG4gICAgICAgICAgJG5leHRUYWIgPSAkdGhpc1RhYi5wYXJlbnQoKS5uZXh0KCkuaXMoJ2xpJykgPyAkdGhpc1RhYi5wYXJlbnQoKS5uZXh0KCkuZmluZCgnYScpIDogZmFsc2UsXG4gICAgICAgICAgJHByZXZpb3VzVGFiID0gJHRoaXNUYWIucGFyZW50KCkucHJldigpLmlzKCdsaScpID8gJHRoaXNUYWIucGFyZW50KCkucHJldigpLmZpbmQoJ2EnKSA6IGZhbHNlLFxuICAgICAgICAgICRmaXJzdFRhYiA9ICR0aGlzVGFiLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xpOmZpcnN0JykuZmluZCgnYScpLFxuICAgICAgICAgICRsYXN0VGFiID0gJHRoaXNUYWIucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGk6bGFzdCcpLmZpbmQoJ2EnKTtcblxuICAgICAgc3dpdGNoKGtleUNvZGUpIHtcbiAgICAgICAgICAvLyBMZWZ0L1VwXG4gICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAkdGhpc1RhYi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAucGFyZW50cygnI2Fib3V0LXRhYnMnKS5yZW1vdmVDbGFzcygpO1xuICAgICAgICAgICAgICAkdGhpc1RhYi5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgIGlmICghJHByZXZpb3VzVGFiKSB7XG4gICAgICAgICAgICAgICAgICAkbGFzdFRhYi5mb2N1cygpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICBzZWN0aW9uX2JnID0gJCgkbGFzdFRhYikuYXR0cignZGF0YS1iZycpO1xuICAgICAgICAgICAgICAgICAgJCgkbGFzdFRhYikucGFyZW50cygnI2Fib3V0LXRhYnMnKS5hZGRDbGFzcyhzZWN0aW9uX2JnKTsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICRwcmV2aW91c1RhYi5mb2N1cygpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICBzZWN0aW9uX2JnID0gJCgkcHJldmlvdXNUYWIpLmF0dHIoJ2RhdGEtYmcnKTtcbiAgICAgICAgICAgICAgICAgICQoJHByZXZpb3VzVGFiKS5wYXJlbnRzKCcjYWJvdXQtdGFicycpLmFkZENsYXNzKHNlY3Rpb25fYmcpOyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvLyBSaWdodC9Eb3duXG4gICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAkdGhpc1RhYi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAucGFyZW50cygnI2Fib3V0LXRhYnMnKS5yZW1vdmVDbGFzcygpO1xuICAgICAgICAgICAgICAkdGhpc1RhYi5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgIGlmICghJG5leHRUYWIpIHtcbiAgICAgICAgICAgICAgICAgICRmaXJzdFRhYi5mb2N1cygpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICBzZWN0aW9uX2JnID0gJCgkZmlyc3RUYWIpLmF0dHIoJ2RhdGEtYmcnKTtcbiAgICAgICAgICAgICAgICAgICQoJGZpcnN0VGFiKS5wYXJlbnRzKCcjYWJvdXQtdGFicycpLmFkZENsYXNzKHNlY3Rpb25fYmcpO1xuXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkbmV4dFRhYi5mb2N1cygpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICBzZWN0aW9uX2JnID0gJCgkbmV4dFRhYikuYXR0cignZGF0YS1iZycpO1xuICAgICAgICAgICAgICAgICAgJCgkbmV4dFRhYikucGFyZW50cygnI2Fib3V0LXRhYnMnKS5hZGRDbGFzcyhzZWN0aW9uX2JnKTsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy8gSG9tZVxuICAgICAgICAgIGNhc2UgMzY6XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAkZmlyc3RUYWIuZm9jdXMoKTtcblxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vIEVuZFxuICAgICAgICAgIGNhc2UgMzU6XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAkbGFzdFRhYi5mb2N1cygpO1xuXG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy8gRW50ZXIvU3BhY2VcbiAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfTtcblxuICAkdGFiV2lkZ2V0LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAkdGFiTGlzdCA9ICR0aGlzLmZpbmQoJz4gdWwnKSxcbiAgICAgICAgICAkdGFiTGlzdEl0ZW1zID0gJHRhYkxpc3QuZmluZCgnbGknKSxcbiAgICAgICAgICAkYWxsVGFicyA9ICR0YWJMaXN0SXRlbXMuZmluZCgnYScpLFxuICAgICAgICAgICR0YWJQYW5lbHMgPSAkdGhpcy5maW5kKCcudGFiLWNvbnRlbnQnKTtcblxuICAgICAgJHRhYkxpc3QuYXR0cigncm9sZScsICd0YWJsaXN0Jyk7XG5cbiAgICAgIHZhciAkc2Vjb25kVGFiID0gJHRhYkxpc3QuZmluZCgnbGk6bnRoLW9mLXR5cGUoMikgYScpO1xuICAgICAgJHNlY29uZFRhYi5hZGRDbGFzcygnc2Vjb25kLXRhYicpO1xuXG4gICAgICAkdGFiTGlzdEl0ZW1zLmF0dHIoJ3JvbGUnLCAncHJlc2VudGF0aW9uJyk7XG5cbiAgICAgICRhbGxUYWJzLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICBzZXR1cFRhYnMoJCh0aGlzKSwgJGFsbFRhYnMsICR0YWJQYW5lbHMsICR0YWJMaXN0LCAkdGFiTGlzdEl0ZW1zLCBpKTtcbiAgICAgIH0pO1xuXG4gICAgICAkdGFiUGFuZWxzLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICBzZXR1cFRhYlBhbmVscygkKHRoaXMpLCBpKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cblxuJCgnZG9jdW1lbnQnKS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIGhhbmRsZVRhYnMoKTtcbn0pOyIsIn0oalF1ZXJ5KSk7XG4iXX0=
