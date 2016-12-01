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
  $(top_level_links).nextAll('ul')
    .attr('data-test','true')     
    .attr({ 'aria-hidden': 'true', 'role': 'menu' })
    .find('a')
    .attr('tabindex', -1);

  // Adding aria-haspopup for list  items with a submenu
  $(top_level_links).each(function(){
    if($(this).nextAll('ul').length > 0)
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
  //handleTabClick();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJuYXZiYXIuanMiLCJ0YWJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYXNpZGVNb2JpbGVMYXlvdXQoKSB7XG4gIHZhciBhc2lkZU1vdmVyID0gZnVuY3Rpb24oKXtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA5MzggKSB7XG4gICAgICAkKCdhc2lkZScpLmluc2VydEFmdGVyKCdkaXYucHJpbWFyeScpO1xuICAgIH0gZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPiA5MzcpIHtcbiAgICAgICQoJ2FzaWRlJykuaW5zZXJ0QmVmb3JlKCdkaXYucHJpbWFyeScpO1xuICAgIH0gICAgXG4gIH1cbiAgaWYgKCQoJ2JvZHkuaG9tZScpLmxlbmd0aCA8IDEpIHtcbiAgICBhc2lkZU1vdmVyKCk7XG5cbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICAgIGFzaWRlTW92ZXIoKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGJyZWFkY3J1bWJzTGF5b3V0KCkge1xuICBpZiAoJCgnLmJyZWFkY3J1bWIgKyAucHJpbWFyeScpLmxlbmd0aCA+IDApIHtcbiAgICAkKCcuYnJlYWRjcnVtYicpLmNzcyh7XG4gICAgICAnd2lkdGgnOiAnMTAwJScsXG4gICAgICAnbWFyZ2luTGVmdCc6ICcwJ1xuICAgIH0pO1xuICB9XG59XG5cbnZhciBzdGlja3lGb290ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuICAgIHZhciBmb290ZXJIZWlnaHQgPSAkKCdmb290ZXInKS5vdXRlckhlaWdodCgpO1xuICAgIHZhciBzdGlja0Zvb3RlclB1c2ggPSAkKCcucHVzaCcpLmhlaWdodChmb290ZXJIZWlnaHQpO1xuICAgICQoJy5zdGlja3ktd3JhcHBlcicpLmNzcyh7XG4gICAgICAnbWFyZ2luQm90dG9tJzogJy0nICsgZm9vdGVySGVpZ2h0ICsgJ3B4J1xuICAgIH0pO1xuICB9KTtcbiAgJCh3aW5kb3cpLnJlc2l6ZSgpO1xufSAvL2VuZCBzdGlja3kgZm9vdGVyXG52YXIgYWRkUmVtb3ZlTW9iaWxlQ2xhc3MgPSBmdW5jdGlvbiAoKXtcbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzk2ICkge1xuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaG9yaXpvbnRhbC1iYXInKTtcbiAgfSBlbHNlIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc5NSApIHtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2hvcml6b250YWwtYmFyJyk7XG4gIH1cbn1cbiQoJ2RvY3VtZW50JykucmVhZHkoZnVuY3Rpb24oKXtcbiAgYnJlYWRjcnVtYnNMYXlvdXQoKTtcbiAgYXNpZGVNb2JpbGVMYXlvdXQoKTtcbiAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCduby1qcycpO1xuICBzdGlja3lGb290ZXIoKTtcblx0Ly8gYWRkIG1vYmlsZSBjbGFzcyB0byBib2R5IGZvciBtYW5hZ2luZyBtb2JpbGUgZmVhdHVyZXNcbiAgYWRkUmVtb3ZlTW9iaWxlQ2xhc3MoKTtcblx0JCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG5cdCAgYWRkUmVtb3ZlTW9iaWxlQ2xhc3MoKTtcblx0fSk7ICAgIFxufSk7IiwiLyohXG4gKiBoZWFkcm9vbS5qcyB2MC45LjMgLSBHaXZlIHlvdXIgcGFnZSBzb21lIGhlYWRyb29tLiBIaWRlIHlvdXIgaGVhZGVyIHVudGlsIHlvdSBuZWVkIGl0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgTmljayBXaWxsaWFtcyAtIGh0dHA6Ly93aWNreS5uaWxsaWEubXMvaGVhZHJvb20uanNcbiAqIExpY2Vuc2U6IE1JVFxuICovXG5cbiFmdW5jdGlvbihhLGIpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sYik6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9YigpOmEuSGVhZHJvb209YigpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYShhKXt0aGlzLmNhbGxiYWNrPWEsdGhpcy50aWNraW5nPSExfWZ1bmN0aW9uIGIoYSl7cmV0dXJuIGEmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJihhPT09d2luZG93fHxhLm5vZGVUeXBlKX1mdW5jdGlvbiBjKGEpe2lmKGFyZ3VtZW50cy5sZW5ndGg8PTApdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBhcmd1bWVudHMgaW4gZXh0ZW5kIGZ1bmN0aW9uXCIpO3ZhciBkLGUsZj1hfHx7fTtmb3IoZT0xO2U8YXJndW1lbnRzLmxlbmd0aDtlKyspe3ZhciBnPWFyZ3VtZW50c1tlXXx8e307Zm9yKGQgaW4gZylcIm9iamVjdFwiIT10eXBlb2YgZltkXXx8YihmW2RdKT9mW2RdPWZbZF18fGdbZF06ZltkXT1jKGZbZF0sZ1tkXSl9cmV0dXJuIGZ9ZnVuY3Rpb24gZChhKXtyZXR1cm4gYT09PU9iamVjdChhKT9hOntkb3duOmEsdXA6YX19ZnVuY3Rpb24gZShhLGIpe2I9YyhiLGUub3B0aW9ucyksdGhpcy5sYXN0S25vd25TY3JvbGxZPTAsdGhpcy5lbGVtPWEsdGhpcy50b2xlcmFuY2U9ZChiLnRvbGVyYW5jZSksdGhpcy5jbGFzc2VzPWIuY2xhc3Nlcyx0aGlzLm9mZnNldD1iLm9mZnNldCx0aGlzLnNjcm9sbGVyPWIuc2Nyb2xsZXIsdGhpcy5pbml0aWFsaXNlZD0hMSx0aGlzLm9uUGluPWIub25QaW4sdGhpcy5vblVucGluPWIub25VbnBpbix0aGlzLm9uVG9wPWIub25Ub3AsdGhpcy5vbk5vdFRvcD1iLm9uTm90VG9wLHRoaXMub25Cb3R0b209Yi5vbkJvdHRvbSx0aGlzLm9uTm90Qm90dG9tPWIub25Ob3RCb3R0b219dmFyIGY9e2JpbmQ6ISFmdW5jdGlvbigpe30uYmluZCxjbGFzc0xpc3Q6XCJjbGFzc0xpc3RcImluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxyQUY6ISEod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSl9O3JldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUsYS5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOmEsdXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy5jYWxsYmFjayYmdGhpcy5jYWxsYmFjaygpLHRoaXMudGlja2luZz0hMX0scmVxdWVzdFRpY2s6ZnVuY3Rpb24oKXt0aGlzLnRpY2tpbmd8fChyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yYWZDYWxsYmFja3x8KHRoaXMucmFmQ2FsbGJhY2s9dGhpcy51cGRhdGUuYmluZCh0aGlzKSkpLHRoaXMudGlja2luZz0hMCl9LGhhbmRsZUV2ZW50OmZ1bmN0aW9uKCl7dGhpcy5yZXF1ZXN0VGljaygpfX0sZS5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOmUsaW5pdDpmdW5jdGlvbigpe3JldHVybiBlLmN1dHNUaGVNdXN0YXJkPyh0aGlzLmRlYm91bmNlcj1uZXcgYSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKSx0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuaW5pdGlhbCksc2V0VGltZW91dCh0aGlzLmF0dGFjaEV2ZW50LmJpbmQodGhpcyksMTAwKSx0aGlzKTp2b2lkIDB9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmNsYXNzZXM7dGhpcy5pbml0aWFsaXNlZD0hMSx0aGlzLmVsZW0uY2xhc3NMaXN0LnJlbW92ZShhLnVucGlubmVkLGEucGlubmVkLGEudG9wLGEubm90VG9wLGEuaW5pdGlhbCksdGhpcy5zY3JvbGxlci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5kZWJvdW5jZXIsITEpfSxhdHRhY2hFdmVudDpmdW5jdGlvbigpe3RoaXMuaW5pdGlhbGlzZWR8fCh0aGlzLmxhc3RLbm93blNjcm9sbFk9dGhpcy5nZXRTY3JvbGxZKCksdGhpcy5pbml0aWFsaXNlZD0hMCx0aGlzLnNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLmRlYm91bmNlciwhMSksdGhpcy5kZWJvdW5jZXIuaGFuZGxlRXZlbnQoKSl9LHVucGluOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5lbGVtLmNsYXNzTGlzdCxiPXRoaXMuY2xhc3NlczshYS5jb250YWlucyhiLnBpbm5lZCkmJmEuY29udGFpbnMoYi51bnBpbm5lZCl8fChhLmFkZChiLnVucGlubmVkKSxhLnJlbW92ZShiLnBpbm5lZCksdGhpcy5vblVucGluJiZ0aGlzLm9uVW5waW4uY2FsbCh0aGlzKSl9LHBpbjpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZWxlbS5jbGFzc0xpc3QsYj10aGlzLmNsYXNzZXM7YS5jb250YWlucyhiLnVucGlubmVkKSYmKGEucmVtb3ZlKGIudW5waW5uZWQpLGEuYWRkKGIucGlubmVkKSx0aGlzLm9uUGluJiZ0aGlzLm9uUGluLmNhbGwodGhpcykpfSx0b3A6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi50b3ApfHwoYS5hZGQoYi50b3ApLGEucmVtb3ZlKGIubm90VG9wKSx0aGlzLm9uVG9wJiZ0aGlzLm9uVG9wLmNhbGwodGhpcykpfSxub3RUb3A6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi5ub3RUb3ApfHwoYS5hZGQoYi5ub3RUb3ApLGEucmVtb3ZlKGIudG9wKSx0aGlzLm9uTm90VG9wJiZ0aGlzLm9uTm90VG9wLmNhbGwodGhpcykpfSxib3R0b206ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi5ib3R0b20pfHwoYS5hZGQoYi5ib3R0b20pLGEucmVtb3ZlKGIubm90Qm90dG9tKSx0aGlzLm9uQm90dG9tJiZ0aGlzLm9uQm90dG9tLmNhbGwodGhpcykpfSxub3RCb3R0b206ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi5ub3RCb3R0b20pfHwoYS5hZGQoYi5ub3RCb3R0b20pLGEucmVtb3ZlKGIuYm90dG9tKSx0aGlzLm9uTm90Qm90dG9tJiZ0aGlzLm9uTm90Qm90dG9tLmNhbGwodGhpcykpfSxnZXRTY3JvbGxZOmZ1bmN0aW9uKCl7cmV0dXJuIHZvaWQgMCE9PXRoaXMuc2Nyb2xsZXIucGFnZVlPZmZzZXQ/dGhpcy5zY3JvbGxlci5wYWdlWU9mZnNldDp2b2lkIDAhPT10aGlzLnNjcm9sbGVyLnNjcm9sbFRvcD90aGlzLnNjcm9sbGVyLnNjcm9sbFRvcDooZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50fHxkb2N1bWVudC5ib2R5LnBhcmVudE5vZGV8fGRvY3VtZW50LmJvZHkpLnNjcm9sbFRvcH0sZ2V0Vmlld3BvcnRIZWlnaHQ6ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93LmlubmVySGVpZ2h0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0fHxkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodH0sZ2V0RWxlbWVudFBoeXNpY2FsSGVpZ2h0OmZ1bmN0aW9uKGEpe3JldHVybiBNYXRoLm1heChhLm9mZnNldEhlaWdodCxhLmNsaWVudEhlaWdodCl9LGdldFNjcm9sbGVyUGh5c2ljYWxIZWlnaHQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zY3JvbGxlcj09PXdpbmRvd3x8dGhpcy5zY3JvbGxlcj09PWRvY3VtZW50LmJvZHk/dGhpcy5nZXRWaWV3cG9ydEhlaWdodCgpOnRoaXMuZ2V0RWxlbWVudFBoeXNpY2FsSGVpZ2h0KHRoaXMuc2Nyb2xsZXIpfSxnZXREb2N1bWVudEhlaWdodDpmdW5jdGlvbigpe3ZhciBhPWRvY3VtZW50LmJvZHksYj1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7cmV0dXJuIE1hdGgubWF4KGEuc2Nyb2xsSGVpZ2h0LGIuc2Nyb2xsSGVpZ2h0LGEub2Zmc2V0SGVpZ2h0LGIub2Zmc2V0SGVpZ2h0LGEuY2xpZW50SGVpZ2h0LGIuY2xpZW50SGVpZ2h0KX0sZ2V0RWxlbWVudEhlaWdodDpmdW5jdGlvbihhKXtyZXR1cm4gTWF0aC5tYXgoYS5zY3JvbGxIZWlnaHQsYS5vZmZzZXRIZWlnaHQsYS5jbGllbnRIZWlnaHQpfSxnZXRTY3JvbGxlckhlaWdodDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNjcm9sbGVyPT09d2luZG93fHx0aGlzLnNjcm9sbGVyPT09ZG9jdW1lbnQuYm9keT90aGlzLmdldERvY3VtZW50SGVpZ2h0KCk6dGhpcy5nZXRFbGVtZW50SGVpZ2h0KHRoaXMuc2Nyb2xsZXIpfSxpc091dE9mQm91bmRzOmZ1bmN0aW9uKGEpe3ZhciBiPTA+YSxjPWErdGhpcy5nZXRTY3JvbGxlclBoeXNpY2FsSGVpZ2h0KCk+dGhpcy5nZXRTY3JvbGxlckhlaWdodCgpO3JldHVybiBifHxjfSx0b2xlcmFuY2VFeGNlZWRlZDpmdW5jdGlvbihhLGIpe3JldHVybiBNYXRoLmFicyhhLXRoaXMubGFzdEtub3duU2Nyb2xsWSk+PXRoaXMudG9sZXJhbmNlW2JdfSxzaG91bGRVbnBpbjpmdW5jdGlvbihhLGIpe3ZhciBjPWE+dGhpcy5sYXN0S25vd25TY3JvbGxZLGQ9YT49dGhpcy5vZmZzZXQ7cmV0dXJuIGMmJmQmJmJ9LHNob3VsZFBpbjpmdW5jdGlvbihhLGIpe3ZhciBjPWE8dGhpcy5sYXN0S25vd25TY3JvbGxZLGQ9YTw9dGhpcy5vZmZzZXQ7cmV0dXJuIGMmJmJ8fGR9LHVwZGF0ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2V0U2Nyb2xsWSgpLGI9YT50aGlzLmxhc3RLbm93blNjcm9sbFk/XCJkb3duXCI6XCJ1cFwiLGM9dGhpcy50b2xlcmFuY2VFeGNlZWRlZChhLGIpO3RoaXMuaXNPdXRPZkJvdW5kcyhhKXx8KGE8PXRoaXMub2Zmc2V0P3RoaXMudG9wKCk6dGhpcy5ub3RUb3AoKSxhK3RoaXMuZ2V0Vmlld3BvcnRIZWlnaHQoKT49dGhpcy5nZXRTY3JvbGxlckhlaWdodCgpP3RoaXMuYm90dG9tKCk6dGhpcy5ub3RCb3R0b20oKSx0aGlzLnNob3VsZFVucGluKGEsYyk/dGhpcy51bnBpbigpOnRoaXMuc2hvdWxkUGluKGEsYykmJnRoaXMucGluKCksdGhpcy5sYXN0S25vd25TY3JvbGxZPWEpfX0sZS5vcHRpb25zPXt0b2xlcmFuY2U6e3VwOjAsZG93bjowfSxvZmZzZXQ6MCxzY3JvbGxlcjp3aW5kb3csY2xhc3Nlczp7cGlubmVkOlwibmF2YmFyLXBpbm5lZFwiLHVucGlubmVkOlwibmF2YmFyLXVucGlubmVkXCIsdG9wOlwibmF2YmFyLXRvcFwiLG5vdFRvcDpcIm5hdmJhci1ub3QtdG9wXCIsYm90dG9tOlwibmF2YmFyLWJvdHRvbVwiLG5vdEJvdHRvbTpcIm5hdmJhci1ub3QtYm90dG9tXCIsaW5pdGlhbDpcIm5hdmJhclwifX0sZS5jdXRzVGhlTXVzdGFyZD1cInVuZGVmaW5lZFwiIT10eXBlb2YgZiYmZi5yQUYmJmYuYmluZCYmZi5jbGFzc0xpc3QsZX0pO1xuXG4vLyBUaGFua3MgdG8gdGhlIFRob3VnaHRib3QgdGVhbSBmb3IgdGhlIG5hdmlnYXRpb24gY29tcG9uZW50IChyZWZpbGxzLmJvdXJib24uaW8pXG4vLyBhbmQgdG8gR3JheSBHaG9zdCBmb3IgaW5zcGlyaW5nIHRoZSBrZXkgbWFwcGluZyBmZWF0dXJlIChodHRwOi8vY29kZXBlbi5pby9ncmF5Z2hvc3R2aXN1YWxzL3Blbi9sdGpEYSlcblxudmFyIGtleUNvZGVNYXAgPSB7XG4gIDQ4OlwiMFwiLCA0OTpcIjFcIiwgNTA6XCIyXCIsIDUxOlwiM1wiLCA1MjpcIjRcIiwgNTM6XCI1XCIsIDU0OlwiNlwiLCA1NTpcIjdcIiwgNTY6XCI4XCIsIDU3OlwiOVwiLCA1OTpcIjtcIixcbiAgNjU6XCJhXCIsIDY2OlwiYlwiLCA2NzpcImNcIiwgNjg6XCJkXCIsIDY5OlwiZVwiLCA3MDpcImZcIiwgNzE6XCJnXCIsIDcyOlwiaFwiLCA3MzpcImlcIiwgNzQ6XCJqXCIsIDc1Olwia1wiLCA3NjpcImxcIixcbiAgNzc6XCJtXCIsIDc4OlwiblwiLCA3OTpcIm9cIiwgODA6XCJwXCIsIDgxOlwicVwiLCA4MjpcInJcIiwgODM6XCJzXCIsIDg0OlwidFwiLCA4NTpcInVcIiwgODY6XCJ2XCIsIDg3Olwid1wiLCA4ODpcInhcIiwgODk6XCJ5XCIsIDkwOlwielwiLFxuICA5NjpcIjBcIiwgOTc6XCIxXCIsIDk4OlwiMlwiLCA5OTpcIjNcIiwgMTAwOlwiNFwiLCAxMDE6XCI1XCIsIDEwMjpcIjZcIiwgMTAzOlwiN1wiLCAxMDQ6XCI4XCIsIDEwNTpcIjlcIlxufSAgXG4gIFxuJC5mbi5zZXR1cF9uYXZpZ2F0aW9uID0gZnVuY3Rpb24oc2V0dGluZ3MpIHtcblxuICBzZXR0aW5ncyA9IGpRdWVyeS5leHRlbmQoe1xuICAgIG1lbnVIb3ZlckNsYXNzOiAnc2hvdy1tZW51JyxcbiAgfSwgc2V0dGluZ3MpOyAgICBcblxuICAvLyBBZGQgQVJJQSByb2xlIHRvIG1lbnViYXIgYW5kIG1lbnUgaXRlbXNcbiAgJCh0aGlzKS5hdHRyKCdyb2xlJywgJ21lbnViYXInKS5maW5kKCdsaScpLmF0dHIoJ3JvbGUnLCAnbWVudWl0ZW0nKTtcbiAgXG4gIHZhciB0b3BfbGV2ZWxfbGlua3MgPSAkKCcjanMtbmF2YmFyLW1lbnUnKS5maW5kKCc+IHVsID4gbGkgPiBhJyk7XG5cbiAgLy8gU2V0IHRhYkluZGV4IHRvIC0xIHNvIHRoYXQgdG9wX2xldmVsX2xpbmtzIGNhbid0IHJlY2VpdmUgZm9jdXMgdW50aWwgbWVudSBpcyBvcGVuXG4gICQodG9wX2xldmVsX2xpbmtzKS5uZXh0QWxsKCd1bCcpXG4gICAgLmF0dHIoJ2RhdGEtdGVzdCcsJ3RydWUnKSAgICAgXG4gICAgLmF0dHIoeyAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsICdyb2xlJzogJ21lbnUnIH0pXG4gICAgLmZpbmQoJ2EnKVxuICAgIC5hdHRyKCd0YWJpbmRleCcsIC0xKTtcblxuICAvLyBBZGRpbmcgYXJpYS1oYXNwb3B1cCBmb3IgbGlzdCAgaXRlbXMgd2l0aCBhIHN1Ym1lbnVcbiAgJCh0b3BfbGV2ZWxfbGlua3MpLmVhY2goZnVuY3Rpb24oKXtcbiAgICBpZigkKHRoaXMpLm5leHRBbGwoJ3VsJykubGVuZ3RoID4gMClcbiAgICAgICQodGhpcykucGFyZW50KCdsaScpLmF0dHIoJ2FyaWEtaGFzcG9wdXAnLCAndHJ1ZScpO1xuICB9KTsgIFxuXG4gICQodG9wX2xldmVsX2xpbmtzKS5ob3ZlcihmdW5jdGlvbigpe1xuICAgICQodGhpcykuY2xvc2VzdCgndWwnKSBcbiAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAuZmluZCgnLicrc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAuZmluZCgnYScpXG4gICAgICAuYXR0cigndGFiSW5kZXgnLC0xKTtcbiAgICAkKHRoaXMpLm5leHRBbGwoJ3VsJylcbiAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAuZmluZCgnYScpLmF0dHIoJ3RhYkluZGV4JywwKTtcbiAgfSk7ICBcbiAgXG4gICQodG9wX2xldmVsX2xpbmtzKS5mb2N1cyhmdW5jdGlvbigpe1xuICAgICQodGhpcykuY2xvc2VzdCgndWwnKVxuICAgICAgLmZpbmQoJy4nK3NldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICAgICAgLnJlbW92ZUNsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgLmZpbmQoJ2EnKVxuICAgICAgLmF0dHIoJ3RhYkluZGV4JywtMSk7XG5cbiAgICAkKHRoaXMpLm5leHRBbGwoJ3VsJylcbiAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAuYWRkQ2xhc3Moc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAuZmluZCgnYScpLmF0dHIoJ3RhYkluZGV4JywwKTtcbiAgfSk7XG4gIFxuICAkKHRvcF9sZXZlbF9saW5rcykua2V5ZG93bihmdW5jdGlvbihlKXtcbiAgICBpZihlLmtleUNvZGUgPT0gMzcpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIFRoaXMgaXMgdGhlIGZpcnN0IGl0ZW1cbiAgICAgIGlmKCQodGhpcykucGFyZW50KCdsaScpLnByZXYoJ2xpJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCd1bCcpLmZpbmQoJz4gbGknKS5sYXN0KCkuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCdsaScpLnByZXYoJ2xpJykuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDM4KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZigkKHRoaXMpLnBhcmVudCgnbGknKS5maW5kKCd1bCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykuZmluZCgndWwnKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAgICAgLmFkZENsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAgIC5maW5kKCdhJykuYXR0cigndGFiSW5kZXgnLDApXG4gICAgICAgICAgLmxhc3QoKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZihlLmtleUNvZGUgPT0gMzkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIFRoaXMgaXMgdGhlIGxhc3QgaXRlbVxuICAgICAgaWYoJCh0aGlzKS5wYXJlbnQoJ2xpJykubmV4dCgnbGknKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudHMoJ3VsJykuZmluZCgnPiBsaScpLmZpcnN0KCkuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCdsaScpLm5leHQoJ2xpJykuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDQwKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZigkKHRoaXMpLnBhcmVudCgnbGknKS5maW5kKCd1bCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykuZmluZCgndWwnKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAgICAgLmFkZENsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAgIC5maW5kKCdhJykuYXR0cigndGFiSW5kZXgnLDApXG4gICAgICAgICAgLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDMyKSB7XG4gICAgICAvLyBJZiBzdWJtZW51IGlzIGhpZGRlbiwgb3BlbiBpdCBvbiBzcGFjZWJhclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykuZmluZCgndWxbYXJpYS1oaWRkZW49dHJ1ZV0nKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAgICAgLmFkZENsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAgIC5maW5kKCdhJykuYXR0cigndGFiSW5kZXgnLDApXG4gICAgICAgICAgLmZpcnN0KCkuZm9jdXMoKTtcbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDI3KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKCcuJytzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICAgICAgICAucmVtb3ZlQ2xhc3Moc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpXG4gICAgICAgIC5maW5kKCdhJylcbiAgICAgICAgLmF0dHIoJ3RhYkluZGV4JywtMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcykucGFyZW50KCdsaScpLmZpbmQoJ3VsW2FyaWEtaGlkZGVuPWZhbHNlXSBhJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICBpZigkKHRoaXMpLnRleHQoKS5zdWJzdHJpbmcoMCwxKS50b0xvd2VyQ2FzZSgpID09IGtleUNvZGVNYXBbZS5rZXlDb2RlXSkge1xuICAgICAgICAgICQodGhpcykuZm9jdXMoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIFxuICB2YXIgbGlua3MgPSAkKHRvcF9sZXZlbF9saW5rcykucGFyZW50KCdsaScpLmZpbmQoJ3VsJykuZmluZCgnYScpO1xuICAkKGxpbmtzKS5rZXlkb3duKGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUua2V5Q29kZSA9PSAzOCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gVGhpcyBpcyB0aGUgZmlyc3QgaXRlbVxuICAgICAgaWYoJCh0aGlzKS5wYXJlbnQoJ2xpJykucHJldignbGknKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudHMoJ3VsJykucGFyZW50cygnbGknKS5maW5kKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykucHJldignbGknKS5maW5kKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZihlLmtleUNvZGUgPT0gNDApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmKCQodGhpcykucGFyZW50KCdsaScpLm5leHQoJ2xpJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCd1bCcpLnBhcmVudHMoJ2xpJykuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCdsaScpLm5leHQoJ2xpJykuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDI3IHx8IGUua2V5Q29kZSA9PSAzNykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCh0aGlzKVxuICAgICAgICAucGFyZW50cygndWwnKS5maXJzdCgpXG4gICAgICAgICAgLnByZXYoJ2EnKS5mb2N1cygpXG4gICAgICAgICAgLnBhcmVudHMoJ3VsJykuZmlyc3QoKS5maW5kKCcuJytzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKHNldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAgIC5maW5kKCdhJylcbiAgICAgICAgICAuYXR0cigndGFiSW5kZXgnLC0xKTtcbiAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDMyKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB3aW5kb3cubG9jYXRpb24gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS5uZXh0QWxsKCdsaScpLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKCQodGhpcykudGV4dCgpLnN1YnN0cmluZygwLDEpLnRvTG93ZXJDYXNlKCkgPT0ga2V5Q29kZU1hcFtlLmtleUNvZGVdKSB7XG4gICAgICAgICAgJCh0aGlzKS5mb2N1cygpO1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBpZighZm91bmQpIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykucHJldkFsbCgnbGknKS5maW5kKCdhJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgIGlmKCQodGhpcykudGV4dCgpLnN1YnN0cmluZygwLDEpLnRvTG93ZXJDYXNlKCkgPT0ga2V5Q29kZU1hcFtlLmtleUNvZGVdKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gICAgXG4gIC8vIEhpZGUgbWVudSBpZiBjbGljayBvciBmb2N1cyBvY2N1cnMgb3V0c2lkZSBvZiBuYXZpZ2F0aW9uXG4gICQodGhpcykuZmluZCgnYScpLmxhc3QoKS5rZXlkb3duKGZ1bmN0aW9uKGUpeyBcbiAgICBpZihlLmtleUNvZGUgPT0gOSkge1xuICAgICAgLy8gSWYgdGhlIHVzZXIgdGFicyBvdXQgb2YgdGhlIG5hdmlnYXRpb24gaGlkZSBhbGwgbWVudXNcbiAgICAgICQoJy4nK3NldHRpbmdzLm1lbnVIb3ZlckNsYXNzKVxuICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhzZXR0aW5ncy5tZW51SG92ZXJDbGFzcylcbiAgICAgICAgLmZpbmQoJ2EnKVxuICAgICAgICAgIC5hdHRyKCd0YWJJbmRleCcsLTEpO1xuICAgIH1cbiAgfSk7ICAgICBcbiAgXG4gICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKCl7ICQoJy4nK3NldHRpbmdzLm1lbnVIb3ZlckNsYXNzKS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJykucmVtb3ZlQ2xhc3Moc2V0dGluZ3MubWVudUhvdmVyQ2xhc3MpLmZpbmQoJ2EnKS5hdHRyKCd0YWJJbmRleCcsLTEpOyB9KTtcbiAgXG4gICQodGhpcykuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gaGlkZU5hdk9uU2Nyb2xsKCkge1xuICAvL05hdmJhciBTY3JvbGwgRXZlbnRcbiAgdmFyIGxhc3RTY3JvbGxUb3AgPSA1MDA7XG4gIHZhciBuYXZiYXIgICAgICAgID0gJCgnLm5hdmJhcicpO1xuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgdmFyIHN0ID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcbiAgICAgaWYgKHN0ID4gbGFzdFNjcm9sbFRvcCAmJiAhKCQoJyNqcy1uYXZiYXItbWVudScpLmF0dHIoJ3N0eWxlJykpKXtcbiAgICAgICAgIG5hdmJhci5hZGRDbGFzcygnbmF2YmFyLXNjcm9sbC11cCcpO1xuICAgICB9IGVsc2Uge1xuICAgICAgICBuYXZiYXIucmVtb3ZlQ2xhc3MoJ25hdmJhci1zY3JvbGwtdXAnKTtcbiAgICAgfVxuICAgICBsYXN0U2Nyb2xsVG9wID0gc3Q7XG4gIH0pO1xufVxuXG5cbmZ1bmN0aW9uIG5hdkFjY29yZGlvbigpIHtcbiAgaWYgKCEoJCgnYm9keS5ob3Jpem9udGFsLWJhcicpLmxlbmd0aCkpIHtcbiAgICAkKCcuZHJvcGRvd24tdHJpZ2dlcicpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykubmV4dCgnLnN1Yi1tZW51Jykuc2xpZGVUb2dnbGUoJ2Zhc3QnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3OTUgKSB7XG4gICAgICAkKCcuc3ViLW1lbnUnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1lbnVUb2dnbGUoKSB7XG4gIHZhciBtZW51VG9nZ2xlID0gJChcIiNqcy1tb2JpbGUtbWVudVwiKS51bmJpbmQoKTtcbiAgJChcIiNqcy1uYXZiYXItbWVudVwiKS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gIG1lbnVUb2dnbGUub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoXCIjanMtbmF2YmFyLW1lbnVcIikuc2xpZGVUb2dnbGUoJ2Zhc3QnLCBmdW5jdGlvbigpe1xuICAgICAgaWYoJChcIiNqcy1uYXZiYXItbWVudVwiKS5pcyhcIjpoaWRkZW5cIikpIHtcbiAgICAgICAgJChcIiNqcy1uYXZiYXItbWVudVwiKS5yZW1vdmVBdHRyKFwic3R5bGVcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG4kKCdkb2N1bWVudCcpLnJlYWR5KGZ1bmN0aW9uKCkge1xuLy8gZ3JhYiBhbiBlbGVtZW50XG4gIHZhciBteUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdmJhclwiKTtcbiAgLy8gY29uc3RydWN0IGFuIGluc3RhbmNlIG9mIEhlYWRyb29tLCBwYXNzaW5nIHRoZSBlbGVtZW50XG4gIHZhciBoZWFkcm9vbSAgPSBuZXcgSGVhZHJvb20obXlFbGVtZW50KTtcbiAgLy8gaW5pdGlhbGlzZVxuICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3OTYgKSB7XG4gICAgaGVhZHJvb20uaW5pdCgpO1xuICB9XG4gIG5hdkFjY29yZGlvbigpO1xuICBtZW51VG9nZ2xlKCk7XG4gICQoJy5uYXZpZ2F0aW9uLW1lbnUnKS5zZXR1cF9uYXZpZ2F0aW9uKCk7XG59KTtcbiIsImZ1bmN0aW9uIGhhbmRsZVRhYnMoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgJHRhYldpZGdldCA9ICQoJy50YWItd2lkZ2V0Jyk7XG5cbiAgdmFyIHNlY3Rpb25fYmcgPSAnJztcblxuICB2YXIgc2V0dXBUYWJzID0gZnVuY3Rpb24oJHRhYiwgJGFsbFRhYnMsICR0YWJQYW5lbHMsICR0YWJMaXN0LCAkdGFiTGlzdEl0ZW1zLCBpKSB7XG4gICAgICAkdGFiXG4gICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAnaWQnOiAndGFiLWxpbmstJyArIGksXG4gICAgICAgICAgICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgICAgICAgICAgICdyb2xlJzogJ3RhYicsXG4gICAgICAgICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ2ZhbHNlJyxcbiAgICAgICAgICAgICAgJ2FyaWEtY29udHJvbHMnOiAndGFiLXBhbmVsLScgKyBpXG4gICAgICAgICAgfSk7XG5cbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgJHRhYlxuICAgICAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAgICAgICAndGFiaW5kZXgnOiAnMCcsXG4gICAgICAgICAgICAgICAgICAnYXJpYS1zZWxlY3RlZCc6ICd0cnVlJyxcbiAgICAgICAgICAgICAgICAgICdhcmlhLWRlc2NyaWJlZGJ5JzogJ3RhYi13aWRnZXQtZGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICB9ICAgIFxuXG4gICAgICAkdGFiLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRhYkNsaWNrKCQodGhpcyksICAkYWxsVGFicywgJHRhYlBhbmVscywgJHRhYkxpc3QsICR0YWJMaXN0SXRlbXMsIGkpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCcxJyk7XG4gICAgICB9KTtcblxuICAgICAgJHRhYi5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdGFiS2V5ZG93bigkKHRoaXMpLCAkYWxsVGFicywgJHRhYlBhbmVscywgJHRhYkxpc3RJdGVtcywgaSwgZSk7ICAgICAgICAgIFxuICAgICAgfSk7XG4gIH07XG5cbiAgdmFyIHNldHVwVGFiUGFuZWxzID0gZnVuY3Rpb24odGFiUGFuZWwsIGkpIHtcbiAgICAgIHRhYlBhbmVsXG4gICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAnaWQnOiAndGFiLXBhbmVsLScgKyBpLFxuICAgICAgICAgICAgICAncm9sZSc6ICd0YWJwYW5lbCcsXG4gICAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICAgICAgJ2FyaWEtbGFiZWxsZWRieSc6ICd0YWItbGluay0nICsgaVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmhpZGUoKTtcblxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICB0YWJQYW5lbFxuICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKVxuICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAuc2hvdygpO1xuICAgICAgfVxuICB9O1xuXG4gIHZhciB0YWJDbGljayA9IGZ1bmN0aW9uKCR0aGlzVGFiLCAkYWxsVGFicywgJHRhYlBhbmVscywgJHRhYkxpc3QsICR0YWJMaXN0SXRlbXMsIGkpIHtcbiAgICAgICQoJy5zZWNvbmQtdGFiJykucmVtb3ZlQ2xhc3MoJ3NlY29uZC10YWInKTtcbiAgICAgIHNlY3Rpb25fYmcgPSAkKCR0aGlzVGFiKS5hdHRyKCdkYXRhLWJnJyk7XG4gICAgICAkKCcjYWJvdXQtdGFicycpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3Moc2VjdGlvbl9iZyk7XG5cbiAgICAgICR0YWJMaXN0XG4gICAgICAgICAgLmZpbmQoJy5pcy1hY3RpdmUnKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcbiAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAgICd0YWJpbmRleCc6IC0xLFxuICAgICAgICAgICAgICAnYXJpYS1zZWxlY3RlZCc6ICdmYWxzZSdcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5yZW1vdmVBdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JylcbiAgICAgICAgICAubmV4dCgpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgICAgaWYgKCQoJ2JvZHkuaG9yaXpvbnRhbC1iYXInKS5sZW5ndGgpIHtcbiAgICAgICAgLy8vIGJpZyBib3kgdGFiIGZ1bmN0aW9uYWxpdHkgICAgICAgIFxuICAgICAgICAkdGFiTGlzdC5maW5kKCcuaXMtb3BlbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHRhYkxpc3QuZmluZCgnLmlzLW9wZW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLnNsaWRlVG9nZ2xlKCk7ICAgICAgICAgIFxuICAgICAgfSAgICAgICAgICAgICAgICAgXG5cbiAgICAgICR0aGlzVGFiLmFkZENsYXNzKCdpcy1hY3RpdmUnKVxuICAgICAgICAuYXR0cih7XG4gICAgICAgICd0YWJpbmRleCc6IDAsXG4gICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ3RydWUnLFxuICAgICAgICAnYXJpYS1kZXNjcmliZWRieSc6ICd0YWItd2lkZ2V0LWRlc2NyaXB0aW9uJ1xuICAgICAgfSk7XG4gICAgICBpZiAoJCgnYm9keS5ob3Jpem9udGFsLWJhcicpLmxlbmd0aCkge1xuICAgICAgICAkdGhpc1RhYi5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKS5mYWRlSW4oJ3Nsb3cnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICR0aGlzVGFiLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLnNsaWRlVG9nZ2xlKCk7XG4gICAgICB9XG4gIH07XG5cbiAgdmFyIHRhYktleWRvd24gPSBmdW5jdGlvbigkdGhpc1RhYiwgJGFsbFRhYnMsICR0YWJQYW5lbHMsICR0YWJMaXN0SXRlbXMsIGksIGUpIHtcbiAgICAgIHZhciBrZXlDb2RlID0gZS53aGljaCxcbiAgICAgICAgICAkbmV4dFRhYiA9ICR0aGlzVGFiLnBhcmVudCgpLm5leHQoKS5pcygnbGknKSA/ICR0aGlzVGFiLnBhcmVudCgpLm5leHQoKS5maW5kKCdhJykgOiBmYWxzZSxcbiAgICAgICAgICAkcHJldmlvdXNUYWIgPSAkdGhpc1RhYi5wYXJlbnQoKS5wcmV2KCkuaXMoJ2xpJykgPyAkdGhpc1RhYi5wYXJlbnQoKS5wcmV2KCkuZmluZCgnYScpIDogZmFsc2UsXG4gICAgICAgICAgJGZpcnN0VGFiID0gJHRoaXNUYWIucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGk6Zmlyc3QnKS5maW5kKCdhJyksXG4gICAgICAgICAgJGxhc3RUYWIgPSAkdGhpc1RhYi5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdsaTpsYXN0JykuZmluZCgnYScpO1xuXG4gICAgICBzd2l0Y2goa2V5Q29kZSkge1xuICAgICAgICAgIC8vIExlZnQvVXBcbiAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICR0aGlzVGFiLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIC5wYXJlbnRzKCcjYWJvdXQtdGFicycpLnJlbW92ZUNsYXNzKCk7XG4gICAgICAgICAgICAgICR0aGlzVGFiLm5leHQoKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLmhpZGUoKTtcblxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgaWYgKCEkcHJldmlvdXNUYWIpIHtcbiAgICAgICAgICAgICAgICAgICRsYXN0VGFiLmZvY3VzKCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb25fYmcgPSAkKCRsYXN0VGFiKS5hdHRyKCdkYXRhLWJnJyk7XG4gICAgICAgICAgICAgICAgICAkKCRsYXN0VGFiKS5wYXJlbnRzKCcjYWJvdXQtdGFicycpLmFkZENsYXNzKHNlY3Rpb25fYmcpOyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJHByZXZpb3VzVGFiLmZvY3VzKCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb25fYmcgPSAkKCRwcmV2aW91c1RhYikuYXR0cignZGF0YS1iZycpO1xuICAgICAgICAgICAgICAgICAgJCgkcHJldmlvdXNUYWIpLnBhcmVudHMoJyNhYm91dC10YWJzJykuYWRkQ2xhc3Moc2VjdGlvbl9iZyk7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vIFJpZ2h0L0Rvd25cbiAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICR0aGlzVGFiLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIC5wYXJlbnRzKCcjYWJvdXQtdGFicycpLnJlbW92ZUNsYXNzKCk7XG4gICAgICAgICAgICAgICR0aGlzVGFiLm5leHQoKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLmhpZGUoKTtcblxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgaWYgKCEkbmV4dFRhYikge1xuICAgICAgICAgICAgICAgICAgJGZpcnN0VGFiLmZvY3VzKCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb25fYmcgPSAkKCRmaXJzdFRhYikuYXR0cignZGF0YS1iZycpO1xuICAgICAgICAgICAgICAgICAgJCgkZmlyc3RUYWIpLnBhcmVudHMoJyNhYm91dC10YWJzJykuYWRkQ2xhc3Moc2VjdGlvbl9iZyk7XG5cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICRuZXh0VGFiLmZvY3VzKCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb25fYmcgPSAkKCRuZXh0VGFiKS5hdHRyKCdkYXRhLWJnJyk7XG4gICAgICAgICAgICAgICAgICAkKCRuZXh0VGFiKS5wYXJlbnRzKCcjYWJvdXQtdGFicycpLmFkZENsYXNzKHNlY3Rpb25fYmcpOyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvLyBIb21lXG4gICAgICAgICAgY2FzZSAzNjpcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICRmaXJzdFRhYi5mb2N1cygpO1xuXG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy8gRW5kXG4gICAgICAgICAgY2FzZSAzNTpcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICRsYXN0VGFiLmZvY3VzKCk7XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvLyBFbnRlci9TcGFjZVxuICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICB9O1xuXG4gICR0YWJXaWRnZXQuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICR0YWJMaXN0ID0gJHRoaXMuZmluZCgnPiB1bCcpLFxuICAgICAgICAgICR0YWJMaXN0SXRlbXMgPSAkdGFiTGlzdC5maW5kKCdsaScpLFxuICAgICAgICAgICRhbGxUYWJzID0gJHRhYkxpc3RJdGVtcy5maW5kKCdhJyksXG4gICAgICAgICAgJHRhYlBhbmVscyA9ICR0aGlzLmZpbmQoJy50YWItY29udGVudCcpO1xuXG4gICAgICAkdGFiTGlzdC5hdHRyKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgICAgdmFyICRzZWNvbmRUYWIgPSAkdGFiTGlzdC5maW5kKCdsaTpudGgtb2YtdHlwZSgyKSBhJyk7XG4gICAgICAkc2Vjb25kVGFiLmFkZENsYXNzKCdzZWNvbmQtdGFiJyk7XG5cbiAgICAgICR0YWJMaXN0SXRlbXMuYXR0cigncm9sZScsICdwcmVzZW50YXRpb24nKTtcblxuICAgICAgJGFsbFRhYnMuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgIHNldHVwVGFicygkKHRoaXMpLCAkYWxsVGFicywgJHRhYlBhbmVscywgJHRhYkxpc3QsICR0YWJMaXN0SXRlbXMsIGkpO1xuICAgICAgfSk7XG5cbiAgICAgICR0YWJQYW5lbHMuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgIHNldHVwVGFiUGFuZWxzKCQodGhpcyksIGkpO1xuICAgICAgfSk7XG4gIH0pO1xufVxuXG4kKCdkb2N1bWVudCcpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgaGFuZGxlVGFicygpO1xuICAvL2hhbmRsZVRhYkNsaWNrKCk7XG59KTsiXX0=
