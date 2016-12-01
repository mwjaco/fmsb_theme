<?php get_header();
/**
 * Template Name: News
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
  <?php
    // set up or arguments for our custom query
    $paged = ( get_query_var('paged') ) ? get_query_var('paged') : 1;
    $query_args = array(
      'post_type' => 'post',
      'posts_per_page' => 5,
      'paged' => $paged
    );
    // create a new instance of WP_Query
    $the_query = new WP_Query( $query_args );
  ?>

  <div class="primary">
    <?php if ( $the_query->have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); // run the loop ?>      
      <article role="article">
        <div class="block">
          <div class="block-headline">
            <h2><a href="<?php the_permalink();?>" alt="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
          </div>
          <div class="block-content">
            <p class="date"><?php the_date('j M Y') ?></p>
            <?php the_excerpt(); ?>
            <div class="read-more-wrapper">
              <a href="<?php the_permalink(); ?>" class="action-link read-more">Read More <span>&rarr;</span></a>
            </div>             
          </div>
        </div>
      </article>
    <?php endwhile; else : ?>
      <article role="article">
        <div class="block">
          <div class="block-content">
            <p><?php _e( 'Sorry, no posts were found.' ); ?></p>
          </div>
        </div>
      </article>          
    <?php endif; ?>
  </div>
<?php get_footer(); ?>
