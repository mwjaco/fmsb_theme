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
	wp_enqueue_style( 'style_css', get_template_directory_uri() . '/stylesheets/app.css' );	
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

// Hides editor from desired pages
add_action( 'admin_init', 'hide_editor' );
function hide_editor() {
  // Get the Post ID.
  $post_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'] ;
  if( !isset( $post_id ) ) return;
  // Hide the editor on the page titled 'Homepage'
  $contactpage = get_the_title($post_id);
  if($contactpage == 'Contact Information'){ 
    remove_post_type_support('page', 'editor');
    remove_post_type_support('page', 'title');
    remove_post_type_support('page', 'page-attributes');
  }
  // Hide the editor on a page with a specific page template
  // Get the name of the Page Template file.
  $template_file = get_post_meta($post_id, '_wp_page_template', true);
  if($template_file == 'my-page-template.php'){ // the filename of the page template
    remove_post_type_support('page', 'editor');    
  }
}

// Add menu item for contact information
add_action('admin_menu', 'add_contact_information_editor_menu_item');
function add_contact_information_editor_menu_item() {
  // $page_title, $menu_title, $capability, $menu_slug, $callback_function
  add_menu_page('Contact Information', 'Contact Information', 'edit_pages', 'post.php?post=184&action=edit', '', '', 2);
}













?>