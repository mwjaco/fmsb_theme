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

$(document).ready(function() {
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
  $('.navigation-menu').setup_navigation();
  menuToggle();
  navAccordion();
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
          $nextTab = $thisTab.parent().next().is('li') ? $thisTab.parent().next().find('a.tab-link') : false,
          $previousTab = $thisTab.parent().prev().is('li') ? $thisTab.parent().prev().find('a.tab-link') : false,
          $firstTab = $thisTab.parent().parent().find('li:first').find('a.tab-link'),
          $lastTab = $thisTab.parent().parent().find('li:last').find('a.tab-link');
      switch(keyCode) {
          // Left/Up
          case 37:
          case 38:
              $allTabs.removeClass('is-active')
                .parents('#about-tabs').removeClass();
              $allTabs.next().removeClass('is-open').hide();

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
              $allTabs.removeClass('is-active')
                .parents('#about-tabs').removeClass();
              $allTabs.next().removeClass('is-open').hide();

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
          $allTabs = $tabListItems.children('a'),
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImEtaGVhZC5qcyIsIm1haW4uanMiLCJuYXZiYXIuanMiLCJ0YWJzLmpzIiwiei1mb290LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDblFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNU1BO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCQpIHsiLCJlcXVhbGhlaWdodCA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XG5cbnZhciBjdXJyZW50VGFsbGVzdCA9IDAsXG4gICAgIGN1cnJlbnRSb3dTdGFydCA9IDAsXG4gICAgIHJvd0RpdnMgPSBuZXcgQXJyYXkoKSxcbiAgICAgJGVsLFxuICAgICB0b3BQb3NpdGlvbiA9IDA7XG4gJChjb250YWluZXIpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICRlbCA9ICQodGhpcyk7XG4gICAkKCRlbCkuaGVpZ2h0KCdhdXRvJylcbiAgIHRvcFBvc3Rpb24gPSAkZWwucG9zaXRpb24oKS50b3A7XG5cbiAgIGlmIChjdXJyZW50Um93U3RhcnQgIT0gdG9wUG9zdGlvbikge1xuICAgICBmb3IgKGN1cnJlbnREaXYgPSAwIDsgY3VycmVudERpdiA8IHJvd0RpdnMubGVuZ3RoIDsgY3VycmVudERpdisrKSB7XG4gICAgICAgcm93RGl2c1tjdXJyZW50RGl2XS5oZWlnaHQoY3VycmVudFRhbGxlc3QpO1xuICAgICB9XG4gICAgIHJvd0RpdnMubGVuZ3RoID0gMDsgLy8gZW1wdHkgdGhlIGFycmF5XG4gICAgIGN1cnJlbnRSb3dTdGFydCA9IHRvcFBvc3Rpb247XG4gICAgIGN1cnJlbnRUYWxsZXN0ID0gJGVsLmhlaWdodCgpO1xuICAgICByb3dEaXZzLnB1c2goJGVsKTtcbiAgIH0gZWxzZSB7XG4gICAgIHJvd0RpdnMucHVzaCgkZWwpO1xuICAgICBjdXJyZW50VGFsbGVzdCA9IChjdXJyZW50VGFsbGVzdCA8ICRlbC5oZWlnaHQoKSkgPyAoJGVsLmhlaWdodCgpKSA6IChjdXJyZW50VGFsbGVzdCk7XG4gIH1cbiAgIGZvciAoY3VycmVudERpdiA9IDAgOyBjdXJyZW50RGl2IDwgcm93RGl2cy5sZW5ndGggOyBjdXJyZW50RGl2KyspIHtcbiAgICAgcm93RGl2c1tjdXJyZW50RGl2XS5oZWlnaHQoY3VycmVudFRhbGxlc3QpO1xuICAgfVxuIH0pO1xufVxuXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcbiAgZXF1YWxoZWlnaHQoJy5hc2lkZS1pdGVtLCAuc3RhZmYtaXRlbScpO1xufSk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICBlcXVhbGhlaWdodCgnLmFzaWRlLWl0ZW0sIC5zdGFmZi1pdGVtJyk7XG59KTtcblxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xuICBlcXVhbGhlaWdodCgnLmFzaWRlLWl0ZW0sIC5zdGFmZi1pdGVtJyk7XG59KTtcblxuZnVuY3Rpb24gYXNpZGVNb2JpbGVMYXlvdXQoKSB7XG4gIHZhciBhc2lkZU1vdmVyID0gZnVuY3Rpb24oKXtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA5MzggKSB7XG4gICAgICAkKCdhc2lkZScpLmluc2VydEFmdGVyKCdkaXYucHJpbWFyeScpO1xuICAgIH0gZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPiA5MzcpIHtcbiAgICAgICQoJ2FzaWRlJykuaW5zZXJ0QmVmb3JlKCdkaXYucHJpbWFyeScpO1xuICAgIH0gICAgXG4gIH1cbiAgaWYgKCQoJ2JvZHkuaG9tZScpLmxlbmd0aCA8IDEpIHtcbiAgICBhc2lkZU1vdmVyKCk7XG5cbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICAgIGFzaWRlTW92ZXIoKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGJyZWFkY3J1bWJzTGF5b3V0KCkge1xuICBpZiAoJCgnLmJyZWFkY3J1bWIgKyAucHJpbWFyeScpLmxlbmd0aCA+IDApIHtcbiAgICAkKCcuYnJlYWRjcnVtYicpLmNzcyh7XG4gICAgICAnd2lkdGgnOiAnMTAwJScsXG4gICAgICAnbWFyZ2luTGVmdCc6ICcwJ1xuICAgIH0pO1xuICB9XG59XG5cbnZhciBzdGlja3lGb290ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuICAgIHZhciBmb290ZXJIZWlnaHQgPSAkKCdmb290ZXInKS5vdXRlckhlaWdodCgpO1xuICAgIHZhciBzdGlja0Zvb3RlclB1c2ggPSAkKCcucHVzaCcpLmhlaWdodChmb290ZXJIZWlnaHQpO1xuICAgICQoJy5zdGlja3ktd3JhcHBlcicpLmNzcyh7XG4gICAgICAnbWFyZ2luQm90dG9tJzogJy0nICsgZm9vdGVySGVpZ2h0ICsgJ3B4J1xuICAgIH0pO1xuICB9KTtcbiAgJCh3aW5kb3cpLnJlc2l6ZSgpO1xufSAvL2VuZCBzdGlja3kgZm9vdGVyXG52YXIgYWRkUmVtb3ZlTW9iaWxlQ2xhc3MgPSBmdW5jdGlvbiAoKXtcbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzk2ICkge1xuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaG9yaXpvbnRhbC1iYXInKTtcbiAgfSBlbHNlIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc5NSApIHtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2hvcml6b250YWwtYmFyJyk7XG4gIH1cbn1cbiQoJ2RvY3VtZW50JykucmVhZHkoZnVuY3Rpb24oKXtcbiAgYnJlYWRjcnVtYnNMYXlvdXQoKTtcbiAgYXNpZGVNb2JpbGVMYXlvdXQoKTtcbiAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCduby1qcycpO1xuICBzdGlja3lGb290ZXIoKTtcblx0Ly8gYWRkIG1vYmlsZSBjbGFzcyB0byBib2R5IGZvciBtYW5hZ2luZyBtb2JpbGUgZmVhdHVyZXNcbiAgYWRkUmVtb3ZlTW9iaWxlQ2xhc3MoKTtcblx0JCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG5cdCAgYWRkUmVtb3ZlTW9iaWxlQ2xhc3MoKTtcblx0fSk7ICAgIFxufSk7IiwiLyohXG4gKiBoZWFkcm9vbS5qcyB2MC45LjMgLSBHaXZlIHlvdXIgcGFnZSBzb21lIGhlYWRyb29tLiBIaWRlIHlvdXIgaGVhZGVyIHVudGlsIHlvdSBuZWVkIGl0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgTmljayBXaWxsaWFtcyAtIGh0dHA6Ly93aWNreS5uaWxsaWEubXMvaGVhZHJvb20uanNcbiAqIExpY2Vuc2U6IE1JVFxuICovXG5cbiFmdW5jdGlvbihhLGIpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sYik6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9YigpOmEuSGVhZHJvb209YigpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYShhKXt0aGlzLmNhbGxiYWNrPWEsdGhpcy50aWNraW5nPSExfWZ1bmN0aW9uIGIoYSl7cmV0dXJuIGEmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJihhPT09d2luZG93fHxhLm5vZGVUeXBlKX1mdW5jdGlvbiBjKGEpe2lmKGFyZ3VtZW50cy5sZW5ndGg8PTApdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBhcmd1bWVudHMgaW4gZXh0ZW5kIGZ1bmN0aW9uXCIpO3ZhciBkLGUsZj1hfHx7fTtmb3IoZT0xO2U8YXJndW1lbnRzLmxlbmd0aDtlKyspe3ZhciBnPWFyZ3VtZW50c1tlXXx8e307Zm9yKGQgaW4gZylcIm9iamVjdFwiIT10eXBlb2YgZltkXXx8YihmW2RdKT9mW2RdPWZbZF18fGdbZF06ZltkXT1jKGZbZF0sZ1tkXSl9cmV0dXJuIGZ9ZnVuY3Rpb24gZChhKXtyZXR1cm4gYT09PU9iamVjdChhKT9hOntkb3duOmEsdXA6YX19ZnVuY3Rpb24gZShhLGIpe2I9YyhiLGUub3B0aW9ucyksdGhpcy5sYXN0S25vd25TY3JvbGxZPTAsdGhpcy5lbGVtPWEsdGhpcy50b2xlcmFuY2U9ZChiLnRvbGVyYW5jZSksdGhpcy5jbGFzc2VzPWIuY2xhc3Nlcyx0aGlzLm9mZnNldD1iLm9mZnNldCx0aGlzLnNjcm9sbGVyPWIuc2Nyb2xsZXIsdGhpcy5pbml0aWFsaXNlZD0hMSx0aGlzLm9uUGluPWIub25QaW4sdGhpcy5vblVucGluPWIub25VbnBpbix0aGlzLm9uVG9wPWIub25Ub3AsdGhpcy5vbk5vdFRvcD1iLm9uTm90VG9wLHRoaXMub25Cb3R0b209Yi5vbkJvdHRvbSx0aGlzLm9uTm90Qm90dG9tPWIub25Ob3RCb3R0b219dmFyIGY9e2JpbmQ6ISFmdW5jdGlvbigpe30uYmluZCxjbGFzc0xpc3Q6XCJjbGFzc0xpc3RcImluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxyQUY6ISEod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSl9O3JldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUsYS5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOmEsdXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy5jYWxsYmFjayYmdGhpcy5jYWxsYmFjaygpLHRoaXMudGlja2luZz0hMX0scmVxdWVzdFRpY2s6ZnVuY3Rpb24oKXt0aGlzLnRpY2tpbmd8fChyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yYWZDYWxsYmFja3x8KHRoaXMucmFmQ2FsbGJhY2s9dGhpcy51cGRhdGUuYmluZCh0aGlzKSkpLHRoaXMudGlja2luZz0hMCl9LGhhbmRsZUV2ZW50OmZ1bmN0aW9uKCl7dGhpcy5yZXF1ZXN0VGljaygpfX0sZS5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOmUsaW5pdDpmdW5jdGlvbigpe3JldHVybiBlLmN1dHNUaGVNdXN0YXJkPyh0aGlzLmRlYm91bmNlcj1uZXcgYSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKSx0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuaW5pdGlhbCksc2V0VGltZW91dCh0aGlzLmF0dGFjaEV2ZW50LmJpbmQodGhpcyksMTAwKSx0aGlzKTp2b2lkIDB9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmNsYXNzZXM7dGhpcy5pbml0aWFsaXNlZD0hMSx0aGlzLmVsZW0uY2xhc3NMaXN0LnJlbW92ZShhLnVucGlubmVkLGEucGlubmVkLGEudG9wLGEubm90VG9wLGEuaW5pdGlhbCksdGhpcy5zY3JvbGxlci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5kZWJvdW5jZXIsITEpfSxhdHRhY2hFdmVudDpmdW5jdGlvbigpe3RoaXMuaW5pdGlhbGlzZWR8fCh0aGlzLmxhc3RLbm93blNjcm9sbFk9dGhpcy5nZXRTY3JvbGxZKCksdGhpcy5pbml0aWFsaXNlZD0hMCx0aGlzLnNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLmRlYm91bmNlciwhMSksdGhpcy5kZWJvdW5jZXIuaGFuZGxlRXZlbnQoKSl9LHVucGluOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5lbGVtLmNsYXNzTGlzdCxiPXRoaXMuY2xhc3NlczshYS5jb250YWlucyhiLnBpbm5lZCkmJmEuY29udGFpbnMoYi51bnBpbm5lZCl8fChhLmFkZChiLnVucGlubmVkKSxhLnJlbW92ZShiLnBpbm5lZCksdGhpcy5vblVucGluJiZ0aGlzLm9uVW5waW4uY2FsbCh0aGlzKSl9LHBpbjpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZWxlbS5jbGFzc0xpc3QsYj10aGlzLmNsYXNzZXM7YS5jb250YWlucyhiLnVucGlubmVkKSYmKGEucmVtb3ZlKGIudW5waW5uZWQpLGEuYWRkKGIucGlubmVkKSx0aGlzLm9uUGluJiZ0aGlzLm9uUGluLmNhbGwodGhpcykpfSx0b3A6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi50b3ApfHwoYS5hZGQoYi50b3ApLGEucmVtb3ZlKGIubm90VG9wKSx0aGlzLm9uVG9wJiZ0aGlzLm9uVG9wLmNhbGwodGhpcykpfSxub3RUb3A6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi5ub3RUb3ApfHwoYS5hZGQoYi5ub3RUb3ApLGEucmVtb3ZlKGIudG9wKSx0aGlzLm9uTm90VG9wJiZ0aGlzLm9uTm90VG9wLmNhbGwodGhpcykpfSxib3R0b206ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi5ib3R0b20pfHwoYS5hZGQoYi5ib3R0b20pLGEucmVtb3ZlKGIubm90Qm90dG9tKSx0aGlzLm9uQm90dG9tJiZ0aGlzLm9uQm90dG9tLmNhbGwodGhpcykpfSxub3RCb3R0b206ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi5ub3RCb3R0b20pfHwoYS5hZGQoYi5ub3RCb3R0b20pLGEucmVtb3ZlKGIuYm90dG9tKSx0aGlzLm9uTm90Qm90dG9tJiZ0aGlzLm9uTm90Qm90dG9tLmNhbGwodGhpcykpfSxnZXRTY3JvbGxZOmZ1bmN0aW9uKCl7cmV0dXJuIHZvaWQgMCE9PXRoaXMuc2Nyb2xsZXIucGFnZVlPZmZzZXQ/dGhpcy5zY3JvbGxlci5wYWdlWU9mZnNldDp2b2lkIDAhPT10aGlzLnNjcm9sbGVyLnNjcm9sbFRvcD90aGlzLnNjcm9sbGVyLnNjcm9sbFRvcDooZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50fHxkb2N1bWVudC5ib2R5LnBhcmVudE5vZGV8fGRvY3VtZW50LmJvZHkpLnNjcm9sbFRvcH0sZ2V0Vmlld3BvcnRIZWlnaHQ6ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93LmlubmVySGVpZ2h0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0fHxkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodH0sZ2V0RWxlbWVudFBoeXNpY2FsSGVpZ2h0OmZ1bmN0aW9uKGEpe3JldHVybiBNYXRoLm1heChhLm9mZnNldEhlaWdodCxhLmNsaWVudEhlaWdodCl9LGdldFNjcm9sbGVyUGh5c2ljYWxIZWlnaHQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zY3JvbGxlcj09PXdpbmRvd3x8dGhpcy5zY3JvbGxlcj09PWRvY3VtZW50LmJvZHk/dGhpcy5nZXRWaWV3cG9ydEhlaWdodCgpOnRoaXMuZ2V0RWxlbWVudFBoeXNpY2FsSGVpZ2h0KHRoaXMuc2Nyb2xsZXIpfSxnZXREb2N1bWVudEhlaWdodDpmdW5jdGlvbigpe3ZhciBhPWRvY3VtZW50LmJvZHksYj1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7cmV0dXJuIE1hdGgubWF4KGEuc2Nyb2xsSGVpZ2h0LGIuc2Nyb2xsSGVpZ2h0LGEub2Zmc2V0SGVpZ2h0LGIub2Zmc2V0SGVpZ2h0LGEuY2xpZW50SGVpZ2h0LGIuY2xpZW50SGVpZ2h0KX0sZ2V0RWxlbWVudEhlaWdodDpmdW5jdGlvbihhKXtyZXR1cm4gTWF0aC5tYXgoYS5zY3JvbGxIZWlnaHQsYS5vZmZzZXRIZWlnaHQsYS5jbGllbnRIZWlnaHQpfSxnZXRTY3JvbGxlckhlaWdodDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNjcm9sbGVyPT09d2luZG93fHx0aGlzLnNjcm9sbGVyPT09ZG9jdW1lbnQuYm9keT90aGlzLmdldERvY3VtZW50SGVpZ2h0KCk6dGhpcy5nZXRFbGVtZW50SGVpZ2h0KHRoaXMuc2Nyb2xsZXIpfSxpc091dE9mQm91bmRzOmZ1bmN0aW9uKGEpe3ZhciBiPTA+YSxjPWErdGhpcy5nZXRTY3JvbGxlclBoeXNpY2FsSGVpZ2h0KCk+dGhpcy5nZXRTY3JvbGxlckhlaWdodCgpO3JldHVybiBifHxjfSx0b2xlcmFuY2VFeGNlZWRlZDpmdW5jdGlvbihhLGIpe3JldHVybiBNYXRoLmFicyhhLXRoaXMubGFzdEtub3duU2Nyb2xsWSk+PXRoaXMudG9sZXJhbmNlW2JdfSxzaG91bGRVbnBpbjpmdW5jdGlvbihhLGIpe3ZhciBjPWE+dGhpcy5sYXN0S25vd25TY3JvbGxZLGQ9YT49dGhpcy5vZmZzZXQ7cmV0dXJuIGMmJmQmJmJ9LHNob3VsZFBpbjpmdW5jdGlvbihhLGIpe3ZhciBjPWE8dGhpcy5sYXN0S25vd25TY3JvbGxZLGQ9YTw9dGhpcy5vZmZzZXQ7cmV0dXJuIGMmJmJ8fGR9LHVwZGF0ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2V0U2Nyb2xsWSgpLGI9YT50aGlzLmxhc3RLbm93blNjcm9sbFk/XCJkb3duXCI6XCJ1cFwiLGM9dGhpcy50b2xlcmFuY2VFeGNlZWRlZChhLGIpO3RoaXMuaXNPdXRPZkJvdW5kcyhhKXx8KGE8PXRoaXMub2Zmc2V0P3RoaXMudG9wKCk6dGhpcy5ub3RUb3AoKSxhK3RoaXMuZ2V0Vmlld3BvcnRIZWlnaHQoKT49dGhpcy5nZXRTY3JvbGxlckhlaWdodCgpP3RoaXMuYm90dG9tKCk6dGhpcy5ub3RCb3R0b20oKSx0aGlzLnNob3VsZFVucGluKGEsYyk/dGhpcy51bnBpbigpOnRoaXMuc2hvdWxkUGluKGEsYykmJnRoaXMucGluKCksdGhpcy5sYXN0S25vd25TY3JvbGxZPWEpfX0sZS5vcHRpb25zPXt0b2xlcmFuY2U6e3VwOjAsZG93bjowfSxvZmZzZXQ6MCxzY3JvbGxlcjp3aW5kb3csY2xhc3Nlczp7cGlubmVkOlwibmF2YmFyLXBpbm5lZFwiLHVucGlubmVkOlwibmF2YmFyLXVucGlubmVkXCIsdG9wOlwibmF2YmFyLXRvcFwiLG5vdFRvcDpcIm5hdmJhci1ub3QtdG9wXCIsYm90dG9tOlwibmF2YmFyLWJvdHRvbVwiLG5vdEJvdHRvbTpcIm5hdmJhci1ub3QtYm90dG9tXCIsaW5pdGlhbDpcIm5hdmJhclwifX0sZS5jdXRzVGhlTXVzdGFyZD1cInVuZGVmaW5lZFwiIT10eXBlb2YgZiYmZi5yQUYmJmYuYmluZCYmZi5jbGFzc0xpc3QsZX0pO1xuXG4vLyBUaGFua3MgdG8gdGhlIFRob3VnaHRib3QgdGVhbSBmb3IgdGhlIG5hdmlnYXRpb24gY29tcG9uZW50IChyZWZpbGxzLmJvdXJib24uaW8pXG4vLyBhbmQgdG8gR3JheSBHaG9zdCBmb3IgaW5zcGlyaW5nIHRoZSBrZXkgbWFwcGluZyBmZWF0dXJlIChodHRwOi8vY29kZXBlbi5pby9ncmF5Z2hvc3R2aXN1YWxzL3Blbi9sdGpEYSlcblxudmFyIGtleUNvZGVNYXAgPSB7XG4gIDQ4OlwiMFwiLCA0OTpcIjFcIiwgNTA6XCIyXCIsIDUxOlwiM1wiLCA1MjpcIjRcIiwgNTM6XCI1XCIsIDU0OlwiNlwiLCA1NTpcIjdcIiwgNTY6XCI4XCIsIDU3OlwiOVwiLCA1OTpcIjtcIixcbiAgNjU6XCJhXCIsIDY2OlwiYlwiLCA2NzpcImNcIiwgNjg6XCJkXCIsIDY5OlwiZVwiLCA3MDpcImZcIiwgNzE6XCJnXCIsIDcyOlwiaFwiLCA3MzpcImlcIiwgNzQ6XCJqXCIsIDc1Olwia1wiLCA3NjpcImxcIixcbiAgNzc6XCJtXCIsIDc4OlwiblwiLCA3OTpcIm9cIiwgODA6XCJwXCIsIDgxOlwicVwiLCA4MjpcInJcIiwgODM6XCJzXCIsIDg0OlwidFwiLCA4NTpcInVcIiwgODY6XCJ2XCIsIDg3Olwid1wiLCA4ODpcInhcIiwgODk6XCJ5XCIsIDkwOlwielwiLFxuICA5NjpcIjBcIiwgOTc6XCIxXCIsIDk4OlwiMlwiLCA5OTpcIjNcIiwgMTAwOlwiNFwiLCAxMDE6XCI1XCIsIDEwMjpcIjZcIiwgMTAzOlwiN1wiLCAxMDQ6XCI4XCIsIDEwNTpcIjlcIlxufSAgXG4gIFxuJC5mbi5zZXR1cF9uYXZpZ2F0aW9uID0gZnVuY3Rpb24oc2V0dGluZ3MpIHtcblxuICBzZXR0aW5ncyA9IGpRdWVyeS5leHRlbmQoe1xuICAgIG1lbnVIb3ZlckNsYXNzOiAnc2hvdy1tZW51JyxcbiAgfSwgc2V0dGluZ3MpOyAgICBcblxuICAvLyBBZGQgQVJJQSByb2xlIHRvIG1lbnViYXIgYW5kIG1lbnUgaXRlbXNcbiAgJCh0aGlzKS5hdHRyKCdyb2xlJywgJ21lbnViYXInKS5maW5kKCdsaScpLmF0dHIoJ3JvbGUnLCAnbWVudWl0ZW0nKTtcbiAgXG4gIHZhciB0b3BfbGV2ZWxfbGlua3MgPSAkKCcjanMtbmF2YmFyLW1lbnUnKS5maW5kKCc+IHVsID4gbGkgPiBhJyk7XG5cbiAgLy8gU2V0IHRhYkluZGV4IHRvIC0xIHNvIHRoYXQgdG9wX2xldmVsX2xpbmtzIGNhbid0IHJlY2VpdmUgZm9jdXMgdW50aWwgbWVudSBpcyBvcGVuXG4gICQodG9wX2xldmVsX2xpbmtzKSAgICBcbiAgICAubmV4dEFsbCgndWwnKVxuICAgIC5hdHRyKCdkYXRhLXRlc3QnLCd0cnVlJykgICAgIFxuICAgIC5hdHRyKHsgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLCAncm9sZSc6ICdtZW51JyB9KVxuICAgIC5maW5kKCdhJylcbiAgICAuYXR0cigndGFiaW5kZXgnLCAtMSk7XG5cbiAgLy8gQWRkaW5nIGFyaWEtaGFzcG9wdXAgZm9yIGxpc3QgIGl0ZW1zIHdpdGggYSBzdWJtZW51XG4gICQodG9wX2xldmVsX2xpbmtzKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgaWYoJCh0aGlzKS5uZXh0QWxsKCd1bCcpLmxlbmd0aCA+IDApXG4gICAgICAkKHRoaXMpLmFmdGVyKCc8c3BhbiBjbGFzcz1cImRyb3Bkb3duLXRyaWdnZXJcIj48L3NwYW4+Jyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS5hdHRyKCdhcmlhLWhhc3BvcHVwJywgJ3RydWUnKTtcbiAgfSk7ICBcblxuICAkKHRvcF9sZXZlbF9saW5rcykuaG92ZXIoZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJ3VsJykgXG4gICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKVxuICAgICAgLmZpbmQoJy4nK3NldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICAgICAgLmZpbmQoJ2EnKVxuICAgICAgLmF0dHIoJ3RhYkluZGV4JywtMSk7XG4gICAgJCh0aGlzKS5uZXh0QWxsKCd1bCcpXG4gICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKVxuICAgICAgLmZpbmQoJ2EnKS5hdHRyKCd0YWJJbmRleCcsMCk7XG4gIH0pOyAgXG4gIFxuICAkKHRvcF9sZXZlbF9saW5rcykuZm9jdXMoZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJ3VsJylcbiAgICAgIC5maW5kKCcuJytzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgIC5yZW1vdmVDbGFzcyhzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgIC5maW5kKCdhJylcbiAgICAgIC5hdHRyKCd0YWJJbmRleCcsLTEpO1xuXG4gICAgJCh0aGlzKS5uZXh0QWxsKCd1bCcpXG4gICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKVxuICAgICAgLmFkZENsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgLmZpbmQoJ2EnKS5hdHRyKCd0YWJJbmRleCcsMCk7XG4gIH0pO1xuICBcbiAgJCh0b3BfbGV2ZWxfbGlua3MpLmtleWRvd24oZnVuY3Rpb24oZSl7XG4gICAgaWYoZS5rZXlDb2RlID09IDM3KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBUaGlzIGlzIHRoZSBmaXJzdCBpdGVtXG4gICAgICBpZigkKHRoaXMpLnBhcmVudCgnbGknKS5wcmV2KCdsaScpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICQodGhpcykucGFyZW50cygndWwnKS5maW5kKCc+IGxpJykubGFzdCgpLmZpbmQoJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS5wcmV2KCdsaScpLmZpbmQoJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PSAzOCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYoJCh0aGlzKS5wYXJlbnQoJ2xpJykuZmluZCgndWwnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCdsaScpLmZpbmQoJ3VsJylcbiAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKVxuICAgICAgICAgIC5hZGRDbGFzcyhzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgICAgICAuZmluZCgnYScpLmF0dHIoJ3RhYkluZGV4JywwKVxuICAgICAgICAgIC5sYXN0KCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDM5KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBUaGlzIGlzIHRoZSBsYXN0IGl0ZW1cbiAgICAgIGlmKCQodGhpcykucGFyZW50KCdsaScpLm5leHQoJ2xpJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCd1bCcpLmZpbmQoJz4gbGknKS5maXJzdCgpLmZpbmQoJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS5uZXh0KCdsaScpLmZpbmQoJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PSA0MCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYoJCh0aGlzKS5wYXJlbnQoJ2xpJykuZmluZCgndWwnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCdsaScpLmZpbmQoJ3VsJylcbiAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKVxuICAgICAgICAgIC5hZGRDbGFzcyhzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgICAgICAuZmluZCgnYScpLmF0dHIoJ3RhYkluZGV4JywwKVxuICAgICAgICAgIC5maXJzdCgpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PSAzMikge1xuICAgICAgLy8gSWYgc3VibWVudSBpcyBoaWRkZW4sIG9wZW4gaXQgb24gc3BhY2ViYXJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQodGhpcykucGFyZW50KCdsaScpLmZpbmQoJ3VsW2FyaWEtaGlkZGVuPXRydWVdJylcbiAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKVxuICAgICAgICAgIC5hZGRDbGFzcyhzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgICAgICAuZmluZCgnYScpLmF0dHIoJ3RhYkluZGV4JywwKVxuICAgICAgICAgIC5maXJzdCgpLmZvY3VzKCk7XG4gICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PSAyNykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCgnLicrc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgICAgLnJlbW92ZUNsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAuZmluZCgnYScpXG4gICAgICAgIC5hdHRyKCd0YWJJbmRleCcsLTEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS5maW5kKCd1bFthcmlhLWhpZGRlbj1mYWxzZV0gYScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoJCh0aGlzKS50ZXh0KCkuc3Vic3RyaW5nKDAsMSkudG9Mb3dlckNhc2UoKSA9PSBrZXlDb2RlTWFwW2Uua2V5Q29kZV0pIHtcbiAgICAgICAgICAkKHRoaXMpLmZvY3VzKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICBcbiAgdmFyIGxpbmtzID0gJCh0b3BfbGV2ZWxfbGlua3MpLnBhcmVudCgnbGknKS5maW5kKCd1bCcpLmZpbmQoJ2EnKTtcbiAgJChsaW5rcykua2V5ZG93bihmdW5jdGlvbihlKXtcbiAgICBpZihlLmtleUNvZGUgPT0gMzgpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIFRoaXMgaXMgdGhlIGZpcnN0IGl0ZW1cbiAgICAgIGlmKCQodGhpcykucGFyZW50KCdsaScpLnByZXYoJ2xpJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCd1bCcpLnBhcmVudHMoJ2xpJykuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCdsaScpLnByZXYoJ2xpJykuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDQwKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZigkKHRoaXMpLnBhcmVudCgnbGknKS5uZXh0KCdsaScpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICQodGhpcykucGFyZW50cygndWwnKS5wYXJlbnRzKCdsaScpLmZpbmQoJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS5uZXh0KCdsaScpLmZpbmQoJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PSAyNyB8fCBlLmtleUNvZGUgPT0gMzcpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQodGhpcylcbiAgICAgICAgLnBhcmVudHMoJ3VsJykuZmlyc3QoKVxuICAgICAgICAgIC5wcmV2KCdhJykuZm9jdXMoKVxuICAgICAgICAgIC5wYXJlbnRzKCd1bCcpLmZpcnN0KCkuZmluZCgnLicrc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgICAgICAuZmluZCgnYScpXG4gICAgICAgICAgLmF0dHIoJ3RhYkluZGV4JywtMSk7XG4gICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PSAzMikge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykubmV4dEFsbCgnbGknKS5maW5kKCdhJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICBpZigkKHRoaXMpLnRleHQoKS5zdWJzdHJpbmcoMCwxKS50b0xvd2VyQ2FzZSgpID09IGtleUNvZGVNYXBbZS5rZXlDb2RlXSkge1xuICAgICAgICAgICQodGhpcykuZm9jdXMoKTtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYoIWZvdW5kKSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCdsaScpLnByZXZBbGwoJ2xpJykuZmluZCgnYScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICBpZigkKHRoaXMpLnRleHQoKS5zdWJzdHJpbmcoMCwxKS50b0xvd2VyQ2FzZSgpID09IGtleUNvZGVNYXBbZS5rZXlDb2RlXSkge1xuICAgICAgICAgICAgJCh0aGlzKS5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAgIFxuICAvLyBIaWRlIG1lbnUgaWYgY2xpY2sgb3IgZm9jdXMgb2NjdXJzIG91dHNpZGUgb2YgbmF2aWdhdGlvblxuICAkKHRoaXMpLmZpbmQoJ2EnKS5sYXN0KCkua2V5ZG93bihmdW5jdGlvbihlKXsgXG4gICAgaWYoZS5rZXlDb2RlID09IDkpIHtcbiAgICAgIC8vIElmIHRoZSB1c2VyIHRhYnMgb3V0IG9mIHRoZSBuYXZpZ2F0aW9uIGhpZGUgYWxsIG1lbnVzXG4gICAgICAkKCcuJytzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICAgICAgICAucmVtb3ZlQ2xhc3Moc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAgIC5maW5kKCdhJylcbiAgICAgICAgICAuYXR0cigndGFiSW5kZXgnLC0xKTtcbiAgICB9XG4gIH0pOyAgICAgXG4gIFxuICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbigpeyAkKCcuJytzZXR0aW5ncy5tZW51SG92ZXJDbGFzcykuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpLnJlbW92ZUNsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKS5maW5kKCdhJykuYXR0cigndGFiSW5kZXgnLC0xKTsgfSk7XG4gIFxuICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG59XG5cbmZ1bmN0aW9uIGhpZGVOYXZPblNjcm9sbCgpIHtcbiAgLy9OYXZiYXIgU2Nyb2xsIEV2ZW50XG4gIHZhciBsYXN0U2Nyb2xsVG9wID0gNTAwO1xuICB2YXIgbmF2YmFyICAgICAgICA9ICQoJy5uYXZiYXInKTtcbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbihldmVudCl7XG4gICAgIHZhciBzdCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XG4gICAgIGlmIChzdCA+IGxhc3RTY3JvbGxUb3AgJiYgISgkKCcjanMtbmF2YmFyLW1lbnUnKS5hdHRyKCdzdHlsZScpKSl7XG4gICAgICAgICBuYXZiYXIuYWRkQ2xhc3MoJ25hdmJhci1zY3JvbGwtdXAnKTtcbiAgICAgfSBlbHNlIHtcbiAgICAgICAgbmF2YmFyLnJlbW92ZUNsYXNzKCduYXZiYXItc2Nyb2xsLXVwJyk7XG4gICAgIH1cbiAgICAgbGFzdFNjcm9sbFRvcCA9IHN0O1xuICB9KTtcbn1cblxuXG5mdW5jdGlvbiBuYXZBY2NvcmRpb24oKSB7XG4gIGlmICghKCQoJ2JvZHkuaG9yaXpvbnRhbC1iYXInKS5sZW5ndGgpKSB7XG4gICAgJCgnLmRyb3Bkb3duLXRyaWdnZXInKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLm5leHQoJy5zdWItbWVudScpLnNsaWRlVG9nZ2xlKCdmYXN0Jyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzk1ICkge1xuICAgICAgJCgnLnN1Yi1tZW51JykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtZW51VG9nZ2xlKCkge1xuICB2YXIgbWVudVRvZ2dsZSA9ICQoXCIjanMtbW9iaWxlLW1lbnVcIikudW5iaW5kKCk7XG4gICQoXCIjanMtbmF2YmFyLW1lbnVcIikucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICBtZW51VG9nZ2xlLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKFwiI2pzLW5hdmJhci1tZW51XCIpLnNsaWRlVG9nZ2xlKCdmYXN0JywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCQoXCIjanMtbmF2YmFyLW1lbnVcIikuaXMoXCI6aGlkZGVuXCIpKSB7XG4gICAgICAgICQoXCIjanMtbmF2YmFyLW1lbnVcIikucmVtb3ZlQXR0cihcInN0eWxlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuJCgnZG9jdW1lbnQnKS5yZWFkeShmdW5jdGlvbigpIHtcbi8vIGdyYWIgYW4gZWxlbWVudFxuICB2YXIgbXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZiYXJcIik7XG4gIC8vIGNvbnN0cnVjdCBhbiBpbnN0YW5jZSBvZiBIZWFkcm9vbSwgcGFzc2luZyB0aGUgZWxlbWVudFxuICB2YXIgaGVhZHJvb20gID0gbmV3IEhlYWRyb29tKG15RWxlbWVudCk7XG4gIC8vIGluaXRpYWxpc2VcbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzk2ICkge1xuICAgIGhlYWRyb29tLmluaXQoKTtcbiAgfSAgXG4gICQoJy5uYXZpZ2F0aW9uLW1lbnUnKS5zZXR1cF9uYXZpZ2F0aW9uKCk7XG4gIG1lbnVUb2dnbGUoKTtcbiAgbmF2QWNjb3JkaW9uKCk7XG59KTtcbiIsImZ1bmN0aW9uIGhhbmRsZVRhYnMoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgJHRhYldpZGdldCA9ICQoJy50YWItd2lkZ2V0Jyk7XG5cbiAgdmFyIHNlY3Rpb25fYmcgPSAnJztcblxuICB2YXIgc2V0dXBUYWJzID0gZnVuY3Rpb24oJHRhYiwgJGFsbFRhYnMsICR0YWJQYW5lbHMsICR0YWJMaXN0LCAkdGFiTGlzdEl0ZW1zLCBpKSB7XG4gICAgJHRhYlxuICAgICAgLmF0dHIoe1xuICAgICAgICAnaWQnOiAndGFiLWxpbmstJyArIGksXG4gICAgICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgICAgICdyb2xlJzogJ3RhYicsXG4gICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ2ZhbHNlJyxcbiAgICAgICAgJ2FyaWEtY29udHJvbHMnOiAndGFiLXBhbmVsLScgKyBpXG4gICAgICB9KTtcblxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgJHRhYlxuICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICd0YWJpbmRleCc6ICcwJyxcbiAgICAgICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ3RydWUnLFxuICAgICAgICAgICAgJ2FyaWEtZGVzY3JpYmVkYnknOiAndGFiLXdpZGdldC1kZXNjcmlwdGlvbidcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICB9ICAgIFxuXG4gICAgICAkdGFiLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGFiQ2xpY2soJCh0aGlzKSwgICRhbGxUYWJzLCAkdGFiUGFuZWxzLCAkdGFiTGlzdCwgJHRhYkxpc3RJdGVtcywgaSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCcxJyk7ICAgICAgIFxuICAgICAgfSk7XG5cbiAgICAgICR0YWIub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHRhYktleWRvd24oJCh0aGlzKSwgJGFsbFRhYnMsICR0YWJQYW5lbHMsICR0YWJMaXN0SXRlbXMsIGksIGUpOyAgICAgICAgICBcbiAgICAgIH0pO1xuXG4gIH07XG5cbiAgdmFyIHNldHVwVGFiUGFuZWxzID0gZnVuY3Rpb24odGFiUGFuZWwsIGkpIHtcbiAgICAgIHRhYlBhbmVsXG4gICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAnaWQnOiAndGFiLXBhbmVsLScgKyBpLFxuICAgICAgICAgICdyb2xlJzogJ3RhYnBhbmVsJyxcbiAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgJ2FyaWEtbGFiZWxsZWRieSc6ICd0YWItbGluay0nICsgaVxuICAgICAgICB9KVxuICAgICAgICAuaGlkZSgpO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICB0YWJQYW5lbFxuICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAuc2hvdygpO1xuICAgICAgfVxuICB9O1xuXG4gIHZhciB0YWJDbGljayA9IGZ1bmN0aW9uKCR0aGlzVGFiLCAkYWxsVGFicywgJHRhYlBhbmVscywgJHRhYkxpc3QsICR0YWJMaXN0SXRlbXMsIGkpIHtcbiAgICAkKCcuc2Vjb25kLXRhYicpLnJlbW92ZUNsYXNzKCdzZWNvbmQtdGFiJyk7XG4gICAgc2VjdGlvbl9iZyA9ICQoJHRoaXNUYWIpLmF0dHIoJ2RhdGEtYmcnKTtcbiAgICAkKCcjYWJvdXQtdGFicycpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3Moc2VjdGlvbl9iZyk7XG5cbiAgICBpZiAoJHRoaXNUYWIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICQoJ2JvZHkuaG9yaXpvbnRhbC1iYXInKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICR0aGlzVGFiLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgJHRoaXNUYWIubmV4dCgpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJykuc2xpZGVUb2dnbGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJHRhYkxpc3RcbiAgICAgICAgLmZpbmQoJy5pcy1hY3RpdmUnKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXG4gICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICd0YWJpbmRleCc6IC0xLFxuICAgICAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiAnZmFsc2UnXG4gICAgICAgIH0pXG4gICAgICAgIC5yZW1vdmVBdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JylcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgICBpZiAoJCgnYm9keS5ob3Jpem9udGFsLWJhcicpLmxlbmd0aCkge1xuICAgICAgICAvLy8gYmlnIGJveSB0YWIgZnVuY3Rpb25hbGl0eSAgICAgICAgXG4gICAgICAgICR0YWJMaXN0LmZpbmQoJy5pcy1vcGVuJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkdGFiTGlzdC5maW5kKCcuaXMtb3BlbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykuc2xpZGVUb2dnbGUoKTtcbiAgICAgIH1cblxuICAgICAgJHRoaXNUYWIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpXG4gICAgICAgIC5hdHRyKHtcbiAgICAgICAgJ3RhYmluZGV4JzogMCxcbiAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiAndHJ1ZScsXG4gICAgICAgICdhcmlhLWRlc2NyaWJlZGJ5JzogJ3RhYi13aWRnZXQtZGVzY3JpcHRpb24nXG4gICAgICB9KTtcbiAgICAgIGlmICgkKCdib2R5Lmhvcml6b250YWwtYmFyJykubGVuZ3RoKSB7XG4gICAgICAgICR0aGlzVGFiLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLmZhZGVJbignc2xvdycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHRoaXNUYWIubmV4dCgpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJykuc2xpZGVUb2dnbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHRhYktleWRvd24gPSBmdW5jdGlvbigkdGhpc1RhYiwgJGFsbFRhYnMsICR0YWJQYW5lbHMsICR0YWJMaXN0SXRlbXMsIGksIGUpIHtcbiAgICAgIHZhciBrZXlDb2RlID0gZS53aGljaCxcbiAgICAgICAgICAkbmV4dFRhYiA9ICR0aGlzVGFiLnBhcmVudCgpLm5leHQoKS5pcygnbGknKSA/ICR0aGlzVGFiLnBhcmVudCgpLm5leHQoKS5maW5kKCdhLnRhYi1saW5rJykgOiBmYWxzZSxcbiAgICAgICAgICAkcHJldmlvdXNUYWIgPSAkdGhpc1RhYi5wYXJlbnQoKS5wcmV2KCkuaXMoJ2xpJykgPyAkdGhpc1RhYi5wYXJlbnQoKS5wcmV2KCkuZmluZCgnYS50YWItbGluaycpIDogZmFsc2UsXG4gICAgICAgICAgJGZpcnN0VGFiID0gJHRoaXNUYWIucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGk6Zmlyc3QnKS5maW5kKCdhLnRhYi1saW5rJyksXG4gICAgICAgICAgJGxhc3RUYWIgPSAkdGhpc1RhYi5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdsaTpsYXN0JykuZmluZCgnYS50YWItbGluaycpO1xuICAgICAgc3dpdGNoKGtleUNvZGUpIHtcbiAgICAgICAgICAvLyBMZWZ0L1VwXG4gICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAkYWxsVGFicy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAucGFyZW50cygnI2Fib3V0LXRhYnMnKS5yZW1vdmVDbGFzcygpO1xuICAgICAgICAgICAgICAkYWxsVGFicy5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgIGlmICghJHByZXZpb3VzVGFiKSB7XG4gICAgICAgICAgICAgICAgICAkbGFzdFRhYi5mb2N1cygpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICBzZWN0aW9uX2JnID0gJCgkbGFzdFRhYikuYXR0cignZGF0YS1iZycpO1xuICAgICAgICAgICAgICAgICAgJCgkbGFzdFRhYikucGFyZW50cygnI2Fib3V0LXRhYnMnKS5hZGRDbGFzcyhzZWN0aW9uX2JnKTsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICRwcmV2aW91c1RhYi5mb2N1cygpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICBzZWN0aW9uX2JnID0gJCgkcHJldmlvdXNUYWIpLmF0dHIoJ2RhdGEtYmcnKTtcbiAgICAgICAgICAgICAgICAgICQoJHByZXZpb3VzVGFiKS5wYXJlbnRzKCcjYWJvdXQtdGFicycpLmFkZENsYXNzKHNlY3Rpb25fYmcpOyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvLyBSaWdodC9Eb3duXG4gICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAkYWxsVGFicy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAucGFyZW50cygnI2Fib3V0LXRhYnMnKS5yZW1vdmVDbGFzcygpO1xuICAgICAgICAgICAgICAkYWxsVGFicy5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgIGlmICghJG5leHRUYWIpIHtcbiAgICAgICAgICAgICAgICAgICRmaXJzdFRhYi5mb2N1cygpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICBzZWN0aW9uX2JnID0gJCgkZmlyc3RUYWIpLmF0dHIoJ2RhdGEtYmcnKTtcbiAgICAgICAgICAgICAgICAgICQoJGZpcnN0VGFiKS5wYXJlbnRzKCcjYWJvdXQtdGFicycpLmFkZENsYXNzKHNlY3Rpb25fYmcpO1xuXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkbmV4dFRhYi5mb2N1cygpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICBzZWN0aW9uX2JnID0gJCgkbmV4dFRhYikuYXR0cignZGF0YS1iZycpO1xuICAgICAgICAgICAgICAgICAgJCgkbmV4dFRhYikucGFyZW50cygnI2Fib3V0LXRhYnMnKS5hZGRDbGFzcyhzZWN0aW9uX2JnKTsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy8gSG9tZVxuICAgICAgICAgIGNhc2UgMzY6XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAkZmlyc3RUYWIuZm9jdXMoKTtcblxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vIEVuZFxuICAgICAgICAgIGNhc2UgMzU6XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAkbGFzdFRhYi5mb2N1cygpO1xuXG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy8gRW50ZXIvU3BhY2VcbiAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfTtcblxuICAkdGFiV2lkZ2V0LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAkdGFiTGlzdCA9ICR0aGlzLmZpbmQoJz4gdWwnKSxcbiAgICAgICAgICAkdGFiTGlzdEl0ZW1zID0gJHRhYkxpc3QuZmluZCgnbGknKSxcbiAgICAgICAgICAkYWxsVGFicyA9ICR0YWJMaXN0SXRlbXMuY2hpbGRyZW4oJ2EnKSxcbiAgICAgICAgICAkdGFiUGFuZWxzID0gJHRoaXMuZmluZCgnLnRhYi1jb250ZW50Jyk7XG5cbiAgICAgICR0YWJMaXN0LmF0dHIoJ3JvbGUnLCAndGFibGlzdCcpO1xuXG4gICAgICB2YXIgJHNlY29uZFRhYiA9ICR0YWJMaXN0LmZpbmQoJ2xpOm50aC1vZi10eXBlKDIpIGEnKTtcbiAgICAgICRzZWNvbmRUYWIuYWRkQ2xhc3MoJ3NlY29uZC10YWInKTtcblxuICAgICAgJHRhYkxpc3RJdGVtcy5hdHRyKCdyb2xlJywgJ3ByZXNlbnRhdGlvbicpO1xuXG4gICAgICAkYWxsVGFicy5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgc2V0dXBUYWJzKCQodGhpcyksICRhbGxUYWJzLCAkdGFiUGFuZWxzLCAkdGFiTGlzdCwgJHRhYkxpc3RJdGVtcywgaSk7XG4gICAgICB9KTtcblxuICAgICAgJHRhYlBhbmVscy5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgc2V0dXBUYWJQYW5lbHMoJCh0aGlzKSwgaSk7XG4gICAgICB9KTtcbiAgfSk7XG59XG5cbiQoJ2RvY3VtZW50JykucmVhZHkoZnVuY3Rpb24gKCkge1xuICBoYW5kbGVUYWJzKCk7XG59KTsiLCJ9KGpRdWVyeSkpO1xuIl19
