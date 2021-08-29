<?php
$_learn_more_type = get_post_meta( $_post_id, 'learn_more_type', true );
if ( $_learn_more_type == "po_link" && ! empty( $popup_display_order ) ) :
	$display_order = $popup_display_order;
	$bg_img       = '';
	$bg_img_class = '';
	$remove_field = '';
	if ( $image_appearance == 'background' ) {
		if ( in_array( 'image', array_column( $display_order, 'value' ) ) ) {
			$remove_field  = 'image';
			$bg_img_detail = get_background( $_post_id, 'background', 'image', true );;
			$bg_img_class = $bg_img_detail['bg_img_class'];
			$bg_img_class = $bg_img_detail['bg_img'];
		}
		if ( in_array( 'meta_featured_image', array_column( $display_order, 'value' ) ) ) {
			$remove_field  = 'meta_featured_image';
			$bg_img_detail = get_background( $_post_id, 'background', 'meta_featured_image', true );
			$bg_img_class  = $bg_img_detail['bg_img_class'];
			$bg_img        = $bg_img_detail['bg_img'];
		}
		$display_order = array_filter(
				$display_order,
				function ( $order_field ) use ( $remove_field ) {
					return $order_field['value'] != $remove_field;
				}
		);
	}
	$popup_display_order_arr = create_layout( array_diff( get_array_values( $display_order ), array( 'more' ) ), array(
			'image',
			'meta_featured_image'
	), 'bs-post__details' );
	?>
	<div <?php echo $bg_img; ?> class="bs-post__target bs-post__target--popup<?php echo $bg_img_class; ?>"
								id="bs-post__popup--<?php echo $_post_id; ?>"
								data-post-id="<?php echo $_post_id; ?>" style="display: none;">
		<div class="bs-post-<?php echo $_post_id; ?> <?php echo $posts_blocks_class; ?> bs-post ">
			<?php
			foreach ( $popup_display_order_arr as $order ) {
				foreach ( $order as $display => $type ) {
					if ( $type == 'print' ) {
						echo $display;
					} else {
						$_field_type = explode( '_', $display )[0];
						$_field_name = str_replace( $_field_type . '_', '', $display );
						if ( $_field_name == 'featured_image' ) {
							$_field_type = 'featured_image';
						}
						include "fields/$_field_type.php";
					}
				}
			}
			?>
		</div>
	</div>
<?php endif; ?>
