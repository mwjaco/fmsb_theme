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
    
      <div class="block staff-member">
        <div class="block-headline">
          <h3><?php the_title(); ?></h3>
        </div>
        <div class="block-content">
          <?php the_content(); ?>
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
