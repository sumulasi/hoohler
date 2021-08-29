import style from './styles/style.scss';
import editor from './styles/editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

import Edit from './component/edit'
import Save from './component/save'

export default registerBlockType( 'sp-blocks/video', {
	// Block title
	title: __( 'SP Video', 'hooker' ),
	// Block description
	description: __( 'Block description', 'hooker' ),
	// Block icon (https://developer.wordpress.org/resource/dashicons/)
	icon: 'smiley',
	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed
	category: 'sp',
	// To handle block toolbar controls.
	attributes: {
		video_file_name: {
			type: "string",
			default: "",
		},
		video_source: {
			type: "string",
			default: "upload",
		},
		video: {
			type: "number",
			default: 0,
		},
		video_mobile_img: {
			type: "number",
			default: 0,
		},
		video_settings: {
			type: "array",
			default: [],
		},
		video_url: {
			type: "string",
			default: "",
		},
		autoplay: {
			type: "boolean",
			default: false,
		},
		loop: {
			type: "boolean",
			default: false,
		},
		muted: {
			type: "boolean",
			default: false,
		},
		controls: {
			type: "boolean",
			default: false,
		},
	},
	// Function callback of edit property (to render block and block controls in Gutenberg editor)
	edit: Edit,
	// Function callback of save property (to save block content in post_content)
	save: Save
} );
