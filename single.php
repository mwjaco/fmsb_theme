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
      
      echo '<a href="'.site_url().'/news" alt="News">News</a>';
      // Then go on to the current page link.
      echo '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . get_the_title() . '</a>';
    echo '</div>';
  ?>
  <div class="primary">
    <article role="article">
      <div class="block">
        <?php if (have_posts()) : while (have_posts()) : the_post();?>
          <div class="block-headline">
            <h2><?php the_title(); ?></h2>
          </div>
          <div class="block-content">
            <p class="date"><?php the_date('j M Y') ?></p>
            <?php the_content(); ?> 
          </div>          
        <?php endwhile; else : ?>         
          <div class="block-content">
            <p>Oops! Page not found.</p>
          </div>
        <?php endif; ?>
      </div>
    </article>
  </div>
<?php get_footer(); ?>