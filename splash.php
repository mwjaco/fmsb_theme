<section class="splash-wrapper">
  <div class="container">
    <div class="splash">      
        <?php
          if ( is_home() ) {
            echo '<div class="splash-hero"><div class="splash-banner"><h1>Serving Michiana<span class="accented">for Over 30 Years</span></h1></div></div>';
          } else {
            echo '<div class="splash-hero"></div>';
          }
        ?>         
      <div class="splash-content">
        <?php
          // Set links for patient portal
          $new_patient = 'https://individualcareforyou.followmyhealth.com/Login/Home/Index?authproviders=0&returnArea=PatientAccess#/createNew';
          $returning_patient = 'https://individualcareforyou.followmyhealth.com/Login/Home/Index?authproviders=0&returnArea=PatientAccess#/default';
          $forgotten_password = $returning_patient;
          $get_help = '/patient-portal-help';
          if ( is_home() ) {
            echo '
              <div id="patient-portal" class="splash-box">
                <h4 class="section-head">Patient Portal</h4>
                <ul>
                  <li>Book appointments online</li>
                  <li>Manage your appointments and records</li>
                </ul>
                <div class="new-patients">
                  <div class="btn-wrapper">
                    <a href="' . $new_patient . '" class="btn btn-portal">Create an account</a>
                  </div>
                </div>
                <div class="returning-patients">
                  <div class="btn-wrapper">
                    <a href="' . $returning_patient . '" class="btn btn-portal">Log in</a>
                  </div>
                  <span><a href="' . $forgotten_password . '">Forgot my password</a> | <a href="' . site_url() . $get_help . '">Get help</a></span>
                </div>           
              </div>            
            ';
          }
          else if ( is_single() && !is_singular( 'staff' )) {
            echo '
              <div id="patient-portal" class="splash-box">
                <h1>News</h1>
                <p>Keep up with the latest from Family Medicine of South Bend</p>
              </div>            
            ';
          }
          else if (is_singular( 'staff' )) {
            $title = get_the_title();
            echo '
              <div class="splash-box">
                <h1>Our Team</h1>
                <p>Our staff is one of the most experienced in the South Bend/Granger/Mishawaka area. We\'ve cared for Michiana for over 30 years, and are ready to serve you next.</p>
              </div>              
            ';   
          } else {
            $title = get_the_title();
            $blurb = get_field( 'intro_blurb' );            
            echo '
              <div class="splash-box">
                <h1>' . $title . '</h1>
                <p>' . $blurb . '</p>            
              </div>
            ';
          }
          ?>
      </div>
    </div>
  </div>
</section>