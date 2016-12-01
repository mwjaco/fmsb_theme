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
  }
  var addRemoveMobileClass = function (){
    if (window.innerWidth < 796 ) {
      $('body').removeClass('horizontal-bar');
    } else if (window.innerWidth > 795 ) {
      $('body').addClass('horizontal-bar');
    }
  }
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
        $(this).click(function(){
          console.log('boom');
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
            $allTabs = $tabListItems.find('a.tab-link'),
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
    var myElement = document.querySelector(".navbar");
    var headroom  = new Headroom(myElement);
    if (window.innerWidth < 796 ) {
      headroom.init();
    }
    menuToggle();
    $('.navigation-menu').setup_navigation();    
    navAccordion();    
    breadcrumbsLayout();
    asideMobileLayout();
    $('html').removeClass('no-js');
    stickyFooter();
    addRemoveMobileClass();
    $(window).resize(function () {
      addRemoveMobileClass();
    });    
    handleTabs();
  });
}(jQuery));