<!doctype html><!--[if lt IE 9]><html class="ie lt9 no-js" lang="en"><![endif]--><!--[if gte IE 9]><html class="ie ie9 no-js" lang="en"><![endif]--><!--[if !IE]><!--><html class="no-js" lang="en"><!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><?php wp_title(); ?></title>      
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <!-- Retrieve phone and fax numbers and format them -->
    <?php
      $phone = get_field('phone_number', 184);    
      $phone_formatted = preg_replace('/[^A-Za-z0-9]/', '', $phone);
    ?>
    <header class="navbar" role="banner">
        <div class="navbar-wrapper">
          <div class="navbar-heading">
            <a href="<?php echo site_url(); ?>">
              <div class="logo">
                <h1 class="alt">Family Medicine of South Bend, P.C.</h1>
                <h2 class="alt">www.individualcareforyou.com</h2>
              </div>            
            </a>
            <span class="address"><?php the_field('street_address', 184); ?> <?php the_field('suite', 184); ?> <span><?php the_field('city', 184); ?>, <?php the_field('state', 184); ?> <?php the_field('zip', 184); ?></span></span> <!-- Retrieve values from Contact Information page // ID 184 -->
          </div>
        <a href="#" class="navbar-menu-button" id="js-mobile-menu">MENU</a>
        <ul class="nav navbar-nav contact-list">
          <li role="listitem" class="icon icon-phone"><a href='tel:+1<?php echo $phone_formatted ?>'><?php echo $phone ?></a></li>
          <li role="listitem" class="icon icon-fax"><a>Fax: <?php the_field('fax_number', 184)?></a></li>
          <li role="listitem" class="icon icon-fb"><a href='<?php the_field('facebook_url', 184) ?>'>Facebook</a></li>
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
                      <p><strong>Address:</strong></p>
                      <p>6301 University Commons</p>
                      <p>Suite 210</p>
                      <p>South Bend, Indiana 46635</p>
                    </td>
                    <td>
                      <p><strong>Hours of operation:</strong></p>
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
