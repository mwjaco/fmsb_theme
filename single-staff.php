<?php get_header();
/**
 * Template Name: Team
 *
 *
 */
?>
  <?php
    echo '<div class="breadcrumb">';
      // If there is a parent, display the link.
      echo '<a href="'.site_url().'" alt="Home">Home</a>';
      
      echo '<a href="'. site_url() . '/' . get_page_uri( 16 ) .'" alt="Home">Our Team</a>';

      // Then go on to the current page link.
      echo '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . get_the_title() . '</a>';
    echo '</div>';
  ?>
  <div class="primary">    
    <article role="article">
    <?php if (have_posts()) : while (have_posts()) : the_post();?> 
      <?php
        $imgsrc = get_field( 'profile_picture' );
      ?>          
      <div class="block staff-member">
        <?php if ($imgsrc) {
          echo '<div class="block-thumbnail">            
                  <img alt="" class="block-thumbnail-img" src="' . $imgsrc . '" />
                </div>';
        } else {} ?>      
        <div class="block-content-wrapper">
          <div class="block-headline">
            <h3><?php the_title(); ?></h3>
          </div>
          <div class="block-content">
            <?php the_content(); ?>
            <?php
              $is_doctor = get_field('is_doctor');
              if ($is_doctor) {
                $in_practice_since = get_field('in_practice_since');
                $accepting_new_patients = get_field('accepting_new_patients');
                echo '<ul>
                  <li><strong>In practice since</strong>: ' . $in_practice_since . '</li>
                  <li><strong>Accepting new patients?</strong> ' . $accepting_new_patients . '</li>
                </ul>';
              } else {
                $joined_practice = get_field('joined_practice');
                echo '<p>Joined practice: ' . $joined_practice . '</p>';
              }
            ?>
          </div>
        </div>
      </div>
       <?php endwhile; else : ?>
        <div class="block">
          <div class="block-content">
            <p><?php _e( 'Sorry, no posts were found.' ); ?></p>
          </div>
        </div>
      <?php endif; ?>    
    </article>          
  </div>
<?php get_footer(); ?>
