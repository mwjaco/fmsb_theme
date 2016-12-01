<?php get_header();
/**
 * The template for displaying all pages.
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
    <article role="article">
      <div class="block">
        <div class="block-content">
        <?php if (have_posts()) : while (have_posts()) : the_post();?>
          <?php the_content(); ?>
        <?php endwhile; else : ?> 
          <p>Oops! Page not found.</p>
        <?php endif; ?>
        </div>
      </div>
    </article>
  </div>
<?php get_footer(); ?>