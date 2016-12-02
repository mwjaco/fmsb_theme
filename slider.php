       <section class="secondary-wrapper">
        <div id="about-tabs" class="welcome">
          <div class="container">
            <div class="about-panels tab-widget">
              <ul class="accordion-tabs">
                <?php $args = array ('post_type' => 'slide', 'order' => 'ASC'); $slidequery = new WP_Query( $args );?>
                <?php if ($slidequery->have_posts()) : while($slidequery->have_posts()) : $slidequery->the_post(); ?>
                <?php global $post;
                  $post_slug=$post->post_name;
                  $destination = get_field( 'destination' );
                  $photo_url = get_field( 'photo' );
                ?>
                  <li class="tab-header-and-content">
                    <a class="tab-link" data-bg="<?php echo $post_slug?>"><?php the_title();?></a>
                    <div class="tab-content">
                      <div class="block-wrapper">
                        <div class="block">
                          <div class="block-headline">
                            <h1><?php the_title();?></h1>
                            <hr class="light" />                            
                          </div>
                          <div class="block-content">
                            <?php the_content(); ?>
                          </div>  
                        </div>
                        <?php if ($destination) {
                          echo '<div class="block block-aside btn-wrapper"><a class="btn btn-about" href="'. $destination . '">Learn More</a></div>';
                          } else {}
                        ?>
                        <?php if ($photo_url) {
                            echo '<div class="block block-aside">
                              <div class="img-wrapper">
                                <img src="'. $photo_url .'" />
                              </div>
                            </div>';
                          } else {}
                        ?>                        
                      </div>
                    </div>
                  </li>
                <?php endwhile; endif; wp_reset_postdata(); ?>          
              </ul>
          </div>
        </div>
      </div>
    </section>
