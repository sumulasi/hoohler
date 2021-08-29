<?php
/**
 * Gutenberg Custom Blocks Plugin
 *
 * @package Gutenberg Custom Blocks
 * @author  Loïc Blascos
 *
 * @wordpress-plugin
 * Plugin Name:  Hooker
 * Description:  Custom blocks for Gutenberg
 * Version:      1.1.0
 * Author:       Loïc Blascos
 * Text Domain:  hooker
 * Domain Path:  /languages
 * License:      GPL2+
 * License URI:  http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GCB_VERSION', '1.1.0' );
define( 'GCB_NAME', 'Gutenberg Custom Blocks' );
define( 'GCB_FILE', __FILE__ );
define( 'GCB_BASE', plugin_basename( __FILE__ ) );
define( 'GCB_PATH', plugin_dir_path( __FILE__ ) );
define( 'GCB_URL', plugin_dir_url( __FILE__ ) );

/**
 * Load plugin text domain for translations.
 *
 * @since 1.0.0
 */
function gutenberg_custom_blocks_textdomain() {

	load_plugin_textdomain(
		'hooker',
		false,
		basename( dirname( __FILE__ ) ) . '/languages'
	);

	// Translate Plugin Description.
	__( 'Custom blocks for Gutenberg', 'hooker' );

}
add_action( 'plugins_loaded', 'gutenberg_custom_blocks_textdomain' );

// Compatibility class.
$compat = require_once GCB_PATH . 'compatibility.php';

// If compatibility issue.
if ( ! $compat->check() ) {
	return;
}

// Initialize plugin.
require_once GCB_PATH . 'initialize.php';
