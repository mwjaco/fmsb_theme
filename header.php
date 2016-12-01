<!doctype html><!--[if lt IE 9]><html class="ie lt9 no-js" lang="en"><![endif]--><!--[if gte IE 9]><html class="ie ie9 no-js" lang="en"><![endif]--><!--[if !IE]><!--><html class="no-js" lang="en"><!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><?php wp_title(); ?></title>      
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <header class="navbar" role="banner">
        <div class="navbar-wrapper">
          <div class="navbar-heading">
            <a href="<?php echo site_url(); ?>">
              <div class="logo">
                <h1 class="alt">Family Medicine of South Bend, P.C.</h1>
                <h2 class="alt">www.individualcareforyou.com</h2>
              </div>            
            </a>
            <span class="address">6301 University Commons Ste. 210 <span>South Bend, IN 46635</span></span>
          </div>
        <a href="#" class="navbar-menu-button" id="js-mobile-menu">MENU</a>
        <ul class="nav navbar-nav contact-list">
          <li role="listitem" class="icon icon-phone"><a href='tel:1-574-850-3678'>(574) 234-4016</a></li>
          <li role="listitem" class="icon icon-fax"><a>Fax: (574) 239-4607</a></li>
          <li role="listitem" class="icon icon-fb"><a href='https://www.facebook.com/Family-Medicine-of-South-Bend-PC-372850392819894/'>Facebook</a></li>
        </ul>
        <nav id="js-navbar-menu" class="show collapse navbar-collapse" role="navigation">
          <?php
            $defaults = array(
              'container' => false,
              'theme_location' => 'primary-menu',
              'menu_class' => 'nav navbar-nav navbar-right'              
            );
            wp_nav_menu( $defaults );
          ?>        
        </nav>
      </div>      
    </header>
    <!--[if lt IE 9]>
      <div class="browser-upgrade-message-wrapper">
      </div>
      <div class="browser-upgrade-message">
        <table>
          <tbody>
            <tr>
              <td><p class="browser-upgrade-emphasis">You are using an <strong>outdated</strong> browser.</p></td>
            </tr>
            <tr>
              <td><p>To use this website, please <a href="http://browsehappy.com/">click here to upgrade your browser</a>.</p></td>
            </tr>
            <tr>
              <td>For appointments, prescriptions, and more, call our office:</p></td>
            </tr>
            <tr>
            <tr><td><p class="browser-upgrade-emphasis">Phone: (574) 234-4016</p></td></tr>
            <tr>
              <td>
                <table>
                  <tr>
                    <td>
                      <p>6301 University Commons</p>
                      <p>Suite 210</p>
                      <p>South Bend, Indiana 46635</p>
                    </td>
                    <td>
                      <p>Mon.-Fri. 8 AM - 5 PM</p>
                      <p>Sat. 9 AM - 12 PM</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td><p class="emergency-message">If this is an emergency, call 911 immediately.</p></td>
            </tr>          
          </tbody>
        </table>
      </div>
    <![endif]-->
    <?php get_template_part('splash') ?>
    <div class="clearer"></div>
    <main role="main">
      <div class="sticky-wrapper">
      <?php
        if ( is_home() ) {
          get_template_part('slider');
        } else {}
      ?>       
      <section class="content-wrapper">
        <div class="container">
          <div class="content">
