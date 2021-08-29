const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
//import './style.scss';
/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

const singlePost = registerBlockType('sp-blocks/sp-single-post', {
	// Block title
	title: __('SP Single Post', 'hooker'),
	// Block description
	description: __('Block description Tab slider', 'hooker'),
	// Block icon (https://developer.wordpress.org/resource/dashicons/)
	icon: 'smiley',
	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed
	category: 'sp',
	attributes: {
		selectedPostType: {
			type: 'text',
			default: 'post'
		},
		selectedPost: {
			type: 'object',
			default: ''
		},
		imageAppearance: {
			type: 'text',
			default: 'image'
		},
		anchorAppearance: {
			type: 'text',
			default: 'full'
		},
		dateFormat: {
			type: 'string',
			default: 'd-m-Y'
		},
		displayOrder: {
			type: 'array',
			default: [{value:"title",label:"Title"}]
		},
		popupDisplayOrder: {
			type: 'array',
			default: [{value:"title",label:"Title"}]
		},
		titleTag: {
			type: 'string',
			default: 'h5'
		},
		singlePostClass: {
			type: "string",
			default: "",
		},
		singlePostClassNames: {
			type: "array",
			default: [{value: "bs-single-post---default", label: "Default"}],
		},
	},
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},
	// Function callback of edit property (to render block and block controls in Gutenberg editor)
	edit: Edit,
	// Function callback of save property (to save block content in post_content)
	save: save
});

export {singlePost};