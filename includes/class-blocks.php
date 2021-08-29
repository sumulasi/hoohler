<?php
/**
 * Handle custom blocks
 *
 * @package  Gutenberg Custom Blocks
 * @author   Loïc Blascos
 */

namespace Gutenberg_Custom_Blocks\Includes;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handle Gutenberg Blocks
 *
 * @class Gutenberg_Custom_Blocks\Includes\Blocks
 * @since 1.0.0
 */
class Blocks {

	/**
	 * Holds block names and paths
	 *
	 * @since 1.0.0
	 * @access private
	 * @var array
	 */
	private $blocks = [];

	/**
	 * Initialization
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {

		add_action( 'init', [ $this, 'register_blocks' ] );
		add_action( 'init', [ $this, 'block_build' ] );
		add_action( 'init', [ $this, 'editor_build' ] );

	}

	/**
	 * Get all blocks (block names & paths)
	 *
	 * Glob is used to create an automated example.
	 * On production, use a whitelist to prevent any security issue.
	 * The whitelist must be an associative array:
	 * [
	 *   'block-name-1' => 'blocks-path/block-name-1/',
	 *   'block-name-2' => 'blocks-path/block-name-2/',
	 *   'block-name-3' => 'blocks-path/block-name-3/',
	 *   ...
	 * ]
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function get_blocks() {

		$glob = GCB_PATH . '/blocks/';
		$dirs = array_filter( glob( $glob . '*' ), 'is_dir' );

		foreach ( $dirs as $dir ) {
			$this->blocks[ basename( $dir ) ] = wp_normalize_path( $dir . '/' );
		}

	}

	/**
	 * Register blocks for Gutenberg
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function register_blocks() {

		// Make sure Gutenberg exists.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		$this->get_blocks();

		// Loop through each block.
		foreach ( $this->blocks as $block => $dir ) {

			$render_block = file_exists( $dir . 'render.php' );
			$attributes   = file_exists( $dir . 'attributes.php' );
			$attributes   = $attributes ? (array) include( $dir . 'attributes.php' ) : [];

			// Define block arguments.
			$args = [
				// Add block attributes.
				'attributes'    => $attributes,
				// Editor blocks script.
				'editor_script' => 'gcb-editor-js',
				// Editor stylesheet.
				'editor_style'  => 'gcb-editor-css',
				// Blocks stylesheet.
				'style'         => 'gcb-blocks-css',
			];

			// If block is dynamic.
			if ( $render_block ) {

				// Push render_callback to block arguments.
				$args['render_callback'] = function() use ( $block ) {
					// Pass block name as argument in the callback.
					return call_user_func_array(
						[ $this, 'render_block' ],
						array_merge( [ $block ], func_get_args() )
					);
				};

			}

			// Register block.
			register_block_type( 'gcb-blocks/' . $block, $args );

		}
	}

	/**
	 * Render dynamique block on frontend
	 *
	 * Render callback must return a string.
	 * In this plugin render templates are echoing and here we turn it on output buffering.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $block Block name.
	 * @param array  $attributes Holds block attributes.
	 */
	public function render_block( $block, $attributes ) {

		ob_start();
		include( $this->blocks[ $block ] . 'render.php' );
		$content = ob_get_clean();

		return $content;

	}

	/**
	 * Enqueue the blocks asset in the editor and on the frontend
	 *
	 * Definition:
	 * wp-blocks Includes block type registration and related functions.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function block_build() {

		// Register blocks stylesheet.
		wp_register_style(
			// Handle.
			'gcb-blocks-css',
			// Register the blocks stylesheet Built with Webpack.
			GCB_URL . 'build/style.build.css',
			// No Gutenberg dependency.
			[],
			// To prevent cache issue (can be the plugin version in production).
			filemtime( GCB_PATH . 'build/style.build.css' )
		);

	}

	/**
	 * Enqueue the block and editor build for the editor.
	 *
	 * Definitions:
	 * wp-blocks   Includes block type registration and related functions.
	 * wp-element  Includes the WordPress element abstraction for describing the structure of your blocks.
	 * wp-i18n     To internationalize blocks.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function editor_build() {

		// Register editor stylesheet.
		wp_register_style(
			// Handle.
			'gcb-editor-css',
			// Register the editor stylesheet Built with Webpack.
			GCB_URL . 'build/editor.build.css',
			// Gutenberg dependency, to include the CSS after it.
			[ 'wp-edit-blocks' ],
			// To prevent cache issue (can be the plugin version in production).
			filemtime( GCB_PATH . 'build/editor.build.css' )
		);

		// Register editor JavaScript.
		wp_register_script(
			// Handle.
			'gcb-editor-js',
			// Register the editor script Built with Webpack.
			GCB_URL . 'build/editor.build.js',
			// Gutenberg dependencies, to include the JS after it.
			[ 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-components', 'wp-editor', 'lodash'],
			// To prevent cache issue (can be the plugin version in production).
			filemtime( GCB_PATH . 'build/editor.build.js' )
		);

		$swiper_css = '../assets/css/swiper-bundle.min.css';
		wp_enqueue_style(
			'swiper-style',
			plugins_url($swiper_css, __FILE__),
			array()
		);

		$slick_css = '../assets/css/slick.css';
		wp_enqueue_style(
			'slick',
			plugins_url($slick_css, __FILE__),
			array()
		);

		$slick_theme_css = '../assets/css/slick-theme.css';
		wp_enqueue_style(
			'slick-theme',
			plugins_url($slick_theme_css, __FILE__),
			array()
		);

		$swiper_js = '../assets/js/swiper-bundle.min.js';
		wp_enqueue_script(
			'swiper-js',
			plugins_url($swiper_js, __FILE__),
			array("wp-editor"),
			true,
			true
		);

		// Add translations.
		$this->i18n_register();

	}

	/**
	 * Add the i18n script
	 *
	 * Internalization for Gutenberg is still in progress and it may change.
	 *
	 * @since 1.0.0
	 */
	public function i18n_register() {

		// Get translations.
		$locale  = wp_set_script_translations( 'hooker' );
		// Add translations to wp.i18n.setLocaleData.
		$content = 'wp.i18n.setLocaleData(' . json_encode( $locale ) . ', "hooker" );';

		// Add inline script before 'gcb-editor-js' script.
		wp_script_add_data( 'gcb-editor-js', 'data', $content );

	}

}
