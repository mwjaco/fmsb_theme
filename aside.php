<aside class="aside">
  <div class="aside-items-wrapper">
    <ul class="aside-items">
    <?php
      // set up or arguments for our custom query      
      $query_args = array(
        'post_type' => 'post',
        'posts_per_page' => 3
      );
      // create a new instance of WP_Query
      $the_query = new WP_Query( $query_args );
    ?>    
      <?php if ( $the_query->have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
      <?php $link = get_permalink ( $post->ID ); ?>
        <li class="aside-item block">
          <a href="<?php echo $link?>" alt="<?php the_title();?>">           
            <div class="aside-item-header block-headline">
              <h2><?php the_title(); ?></h2>
            </div>
            <div class="aside-item-copy block-content">
              <p class="date"><?php the_date('j M Y') ?></p>
              <?php the_excerpt(); ?>              
            </div>
          </a>            
        </li>
      <?php endwhile; else : ?>
      <?php endif; ?>
    </ul>
  </div>
</aside>
<div class="news">
  <a href="<?php echo get_page_link( get_page_by_title( News )->ID ); ?>" class="btn btn-more">More news</a>
</div>