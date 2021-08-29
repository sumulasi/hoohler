<?php
require( 'helper.php' );
function register_single_post() {
	register_block_type( 'sp-blocks/sp-single-post', array(
		'render_callback' => 'single_post_render_callback',
		'attributes'      => array(
			'className'            => [
				'type'    => 'string',
				'default' => ''
			],
			'selectedPost'         => [
				'type'    => 'object',
				'default' => ''
			],
			'selectedPostType'     => [
				'type'    => 'string',
				'default' => ''
			],
			'imageAppearance'      => [
				'type'    => 'string',
				'default' => 'image'
			],
			'anchorAppearance'     => [
				'type'    => 'string',
				'default' => 'full'
			],
			'dateFormat'           => [
				'type'    => 'string',
				'default' => 'd-m-Y'
			],
			'displayOrder'         => [
				'type'    => 'array',
				'default' => [ [ 'value' => 'title', 'label' => 'Title' ] ]
			],
			'popupDisplayOrder'    => [
				'type'    => 'array',
				'default' =>  [ [ 'value' => 'title', 'label' => 'Title' ] ]
			],
			'titleTag'             => [
				'type'    => 'string',
				'default' => 'h5'
			],
			'singlePostClass'      => [
				'type'    => 'string',
				'default' => ''
			],
			'singlePostClassNames' => [
				'type'    => 'array',
				'default' => [ [ 'value' => 'bs-single-post---default', 'label' => 'Default' ] ]
			]
		)
	) );
}

add_action( 'init', 'register_single_post' );

function single_post_render_callback( $block_attributes ) {

	$_post_id                = ( isset( $block_attributes['selectedPost']['value'] ) ) ? $block_attributes['selectedPost']['value'] : '';
	$display_order           = $block_attributes['displayOrder'];
	$popup_display_order     = $block_attributes['popupDisplayOrder'];
	$single_post_classes_arr = $block_attributes['singlePostClassNames'];
	$post_type               = $block_attributes['selectedPostType'];
	$date_format             = $block_attributes['dateFormat'];
	$image_appearance        = $block_attributes['imageAppearance'];
	$anchor_appearance       = $block_attributes['anchorAppearance'];
	$title_tag               = $block_attributes['titleTag'];
	$show_custom_date        = get_post_meta( $_post_id, 'show_custom_date', true );
	$custom_date             = get_post_meta( $_post_id, 'custom_date', true );

	if ( $show_custom_date == 1 ) {
		$_date = date( $date_format, strtotime( $custom_date ) );
	} else {
		$_date = get_the_date( $date_format, $_post_id );
	}

	$read_more_text     = get_post_meta( $_post_id, 'learn_more_label', true );
	$read_more_text     = ( trim( $read_more_text ) ) ? $read_more_text : "Read More";
	$link_attributes    = get_post_link( $_post_id, $anchor_appearance, $read_more_text );
	$posts_blocks_class = uniqid( 'bs-post-' );

	if ( ! empty( $single_post_classes_arr ) ) {
		$posts_blocks_class .= ' ' . implode( ' ', array_column( $single_post_classes_arr, 'value' ) );
	}

	if ( ! empty( $_post_id ) && ! empty( $display_order ) ) {

		$args       = array(
			'post_type'   => 'any',
			'post_status' => array( 'publish' ),
			'p'           => $_post_id
		);
		$_the_query = new WP_Query( $args );

		ob_start();
		include "layouts/layout.php";
		include "layouts/layout-popup.php";
		$post_output = ob_get_contents();
		ob_end_clean();

		return $post_output;
	}
}
