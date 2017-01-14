          </div>
        </div>
      </section>
    </div>
    <div class="push"></div>
      <footer class="footer" role="contentinfo">
        <div class="container">
          <ul>
            <li class="icon icon-map">
              <?php the_field('street_address', 184); ?> <?php the_field('suite', 184); ?> <span><?php the_field('city', 184); ?>, <?php the_field('state', 184); ?> <?php the_field('zip', 184); ?> <!-- Retrieve values from Contact Information page // ID 184 -->
            </li>
            <li class="icon icon-phone"><?php the_field('phone_number', 184); ?></li>
          </ul>
          <div class="footer-secondary-links">
            <ul>
              <li><a href="<?php echo get_page_link( get_page_by_title( Privacy )->ID ); ?>">Privacy Policy</a></li>
            </ul>
            <ul class="footer-social">
            </ul>
          </div>
        </div>
      </footer>
    </main>
    <?php wp_footer(); ?>    
  </body>
</html>