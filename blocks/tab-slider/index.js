const { __ } = wp.i18n;
 

const {
	registerBlockType,
} = wp.blocks;

import Edit from "./edit";
import save from "./save";

const tabsSlider = registerBlockType('sp-blocks/sp-tab-slider', {
	// Block title
	title: __('SP Tab Slider', 'hooker'),
	// Block description
	description: __('Block description Tab slider', 'hooker'),
	// Block icon (https://developer.wordpress.org/resource/dashicons/)
	icon: 'smiley',
	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed
	category: 'sp',
	supports: {
		// Removes support for an HTML mode.
		customClassName: false,
	},
	// Function callback of edit property (to render block and block controls in Gutenberg editor)
	edit: Edit,
	// Function callback of save property (to save block content in post_content)
	save: save
});

export {tabsSlider};