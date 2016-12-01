<?php

add_theme_support( 'menus' );

function register_theme_menus() {
	register_nav_menus (
		array(
			'primary-menu' => __( 'Primary Menu' )
		)
	);
}

add_action('init', 'register_theme_menus');

function wp_theme_styles() {
	wp_enqueue_style( 'style_css', get_template_directory_uri() . '/stylesheets/style.css' );	
    wp_enqueue_style( 'fonts', 'https://fonts.googleapis.com/css?family=Herr+Von+Muellerhoff|Open+Sans:400,700,800)' );
}

add_action('wp_enqueue_scripts', 'wp_theme_styles');

function wp_theme_js() {
	wp_enqueue_script('all_js', get_template_directory_uri() . '/js/app.js', array('jquery'), '', true );
}

add_action( 'wp_enqueue_scripts', 'wp_theme_js' );

function modify_read_more_link() {
  return '
    <div class="read-more-wrapper">
      <a href="' . get_permalink() . '" class="action-link read-more">Read More <span>&rarr;</span></a>
    </div> 
    ';
}
add_filter( 'the_content_more_link', 'modify_read_more_link' );


// Replaces the excerpt "Read More" text by a link
function new_excerpt_more($more) {
       global $post;
  return '...';
}
add_filter('excerpt_more', 'new_excerpt_more');

function wpdocs_custom_excerpt_length( $length ) {
    return 15;
}
add_filter( 'excerpt_length', 'wpdocs_custom_excerpt_length', 999 );

?>