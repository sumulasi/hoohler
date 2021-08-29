<?php if ( $_the_query->have_posts() ): ?>
	<?php while ( $_the_query->have_posts() ) :
		$_the_query->the_post();
		?>
		<?php
		$post_container_class = ( get_post_thumbnail_id( $_post_id ) ) ? 'bs-post ' : 'bs-post bs-post__container bs-post__container--no-image ';
		$term_list            = wp_get_post_terms( $_post_id, 'resource-types', array( "fields" => "names" ) );
		if ( is_array( $term_list ) ) {
			$post_container_class .= strtolower( str_replace( ' ', '-', implode( ' ', $term_list ) ) );
		}
		$remove_field = '';
		$bg_img_class = '';
		$bg_img       = '';
		$displayOrder = $display_order;
		if ( $image_appearance == 'background' ) {
			if ( in_array( 'image', array_column( $display_order, 'value' ) ) ) {
				$remove_field  = 'image';
				$bg_img_detail = get_background( $_post_id, 'background', 'image' );
				$bg_img_class  = $bg_img_detail['bg_img_class'];
				$bg_img        = $bg_img_detail['bg_img'];
			}
			if ( in_array( 'meta_featured_image', array_column( $display_order, 'value' ) ) ) {
				$remove_field  = 'meta_featured_image';
				$bg_img_detail = get_background( $_post_id, 'background', 'meta_featured_image' );
				$bg_img_class  = $bg_img_detail['bg_img_class'];
				$bg_img        = $bg_img_detail['bg_img'];
			}
			$displayOrder = array_filter(
					$display_order,
					function ( $order_field ) use ( $remove_field ) {
						return $order_field['value'] != $remove_field;
					}
			);
		}
		$display_order_arr = create_layout( get_array_values( $displayOrder ), array(
				'image',
				'meta_featured_image'
		), 'bs-post__details' );

		?>
		<div class="<?php echo $post_container_class . $bg_img_class . $posts_blocks_class; ?>"<?php echo $bg_img; ?>>
			<?php if ( $anchor_appearance == 'full' ) {
				echo render_link( 'open', $link_attributes );
			} ?>
			<div class="bs-post__inner">
				<?php
				foreach ( $display_order_arr as $order ) {
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
			<?php if ( $anchor_appearance == 'full' ) {
				echo render_link( 'close', $link_attributes );
			} ?>
		</div>
	<?php endwhile; ?>
<?php endif; ?>
