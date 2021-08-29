import style from './styles/style.scss';
import editor from './styles/editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

import Edit from './component/edit'
import Save from './component/save'

export default registerBlockType( 'sp-blocks/div', {
	// Block title
	title: __( 'SP Div', 'hooker' ),
	// Block description
	description: __( 'Block description', 'hooker' ),
	// Block icon (https://developer.wordpress.org/resource/dashicons/)
	icon: 'smiley',
	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed
	category: 'sp',
	// To handle block toolbar controls.
	attributes: {
		backgroundTypeDiv: {
			type: "string",
			default: "",
		},
		backgroundColor: {
			type: "string",
			default: "",
		},
		fontColor: {
			type: "string",
			default: "",
		},
		divImgId: {
			type: "number",
		},
		divImgUrl: {
			type: "string",
			default: "",
		},
		divImgIdVideo: {
			type: "number",
		},
		divImgVideoUrl: {
			type: "string",
			default: "",
		},
		divImgAlt: {
			type: "string",
			default: "",
		},
		gradientColorOne: {
			type: "string",
			default: "",
		},
		gradientColorTwo: {
			type: "string",
			default: "",
		},
		gradientDirection: {
			type: "number",
			default: "90",
		},
		gradientColorOneLocation: {
			type: "number",
			default: "0",
		},
		gradientColorTwoLocation: {
			type: "number",
			default: "100",
		},
		backgroundVideoUrl: {
			type: "string",
			default: "",
		},
		backgroundVideoName: {
			type: "string",
			default: "",
		},
		backgroundVideoControls: {
			type: "boolean",
			default: false,
		},
		backgroundVideoLoop: {
			type: "boolean",
			default: true,
		},
		backgroundVideoMute: {
			type: "boolean",
			default: true,
		},
		backgroundVideoAutoPlay: {
			type: "boolean",
			default: true,
		},
		divClassNames: {
			type:'array',
			default: []
		}
	},
	// Function callback of edit property (to render block and block controls in Gutenberg editor)
	edit: Edit,
	// Function callback of save property (to save block content in post_content)
	save: Save
} );
