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
      
      if ( is_page() && $post->post_parent ) {
        // This is a subpage
        $parent_title = get_the_title( $post->post_parent );
          echo '<a href="' . esc_url( get_permalink( $post->post_parent ) ) . '" alt="' . esc_attr( $parent_title ) . '">' . $parent_title . '</a>';
      }      
      // Then go on to the current page link.
      echo '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . get_the_title() . '</a>';
    echo '</div>';
  ?>
  <div class="primary">
    <?php $args = array ('post_type' => 'staff', 'order' => 'ASC'); $staffquery = new WP_Query( $args );?>
    <article role="article">
    <?php if ($staffquery->have_posts()) : while($staffquery->have_posts()) : $staffquery->the_post(); ?>
    <?php
      $imgsrc = get_field( 'profile_picture' );
      $subtitle = get_field( 'subtitle' );
      $areas_of_expertise = get_field( 'areas_of_expertise' );
    ?>
      <a class="media-wrapper" href="<?php the_permalink();?>" alt="<?php the_title(); ?>">      
          <div class="media">
            <?php if ($imgsrc) {
              echo '<div class="media-left">            
                      <img class="media-object img-thumbnail" src="' . $imgsrc . '" />
                    </div>';
            } else {} ?>
            <div class="media-body">
              <h3><?php the_title(); ?></h3>
              <?php if ($subtitle) {
                echo '<h4>' . $subtitle . '</h4>';
              } else {} ?>
              <?php if( count( $areas_of_expertise) > 1) {
                  echo '<ul>';
                  foreach($areas_of_expertise as $i){
                   echo '<li>'.$i.'</li>';
                  }
                  echo '</ul>';
                } else {
                  foreach($areas_of_expertise as $i) {
                    echo '<h4>' . $i . '</h4>';
                  }
                } ?>
            </div>
          </div> 
        </a>     

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
