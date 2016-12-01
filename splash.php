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
                    <button type="button" class="btn btn-portal">Create an account</button>
                  </div>
                </div>
                <div class="returning-patients">
                  <div class="btn-wrapper">
                    <button type="button" class="btn btn-portal">Log in</button>
                  </div>
                  <span><a href="#">Forgot my password</a> | <a href="#">Get help</a></span>
                </div>           
              </div>            
            ';
          }
          else if ( is_single() ) {
            echo '
              <div id="patient-portal" class="splash-box">
                <h1>News</h1>
                <p>Keep up with the latest from Family Medicine of South Bend</p>
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