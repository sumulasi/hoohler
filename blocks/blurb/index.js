import style from './styles/style.scss';
import editor from './styles/editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

import Edit from './component/edit'
import Save from './component/save'

export default registerBlockType( 'sp-blocks/blurb', {
	// Block title
	title: __( 'SP Blurb', 'hooker' ),
	// Block description
	description: __( 'Block description', 'hooker' ),
	// Block icon (https://developer.wordpress.org/resource/dashicons/)
	icon: 'smiley',
	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed
	category: 'sp',
	// To handle block toolbar controls.
	attributes: {
		blockID: {
			type: "string",
			default: "",
		},
		titleTag: {
			type: "string",
			default: "h2",
		},
		paragraphTag: {
			type: "string",
			default: "p",
		},
		title: {
			type: "string",
			default: "",
		},
		content: {
			type: "string",
			default: "",
		},

		imgURL: {
			type: "string",
			attribute: "src",
			selector: "img",
			default: "",
		},
		imgID: {
			type: "number",
		},
		imgAlt: {
			type: "string",
			source: "attribute",
			attribute: "src",
			selector: "alt",
		},
		hoverImgURL: {
			type: "string",
			attribute: "src",
			selector: "img",
			default: "",
		},
		hoverImgID: {
			type: "number",
		},
		linkType: {
			type: "string",
			default: "none",
		},
		linkAction: {
			type: "string",
			default: "none",
		},
		url: {
			type: "string",
			attribute: "href",
		},
		text: {
			type: "string",
		},
		linkOpenType: {
			type: "boolean",
			default: false,
		},
		imageBehavior: {
			type: "string",
			default: "none",
		},
		addClassName: {
			type: "string",
			default: "",
		},
		linkText: {
			type: "string",
			source: "html",
			selector: "a",
			attribute: "href",
		},
		bottomText: {
			type: "string",
			source: "html",
			selector: "span",
			default: "",
		},
		orderDiv: {
			type: "array",
			default: [
				{ label: "Image", value: "image" },
				{ label: "Title", value: "title" },
				{ label: "Description", value: "description" },
				{ label: "Bottom Text or Link", value: "bottom-text" },

			],
		},
		popupName: {
			type: "string",
			default: "",
		},
		popupSubName: {
			type: "string",
			default: "",
		},
		popupContent: {
			type: "string",
			default: "",
		},
		popupContentID: {
			type: "number",
		},
		popupImgURL: {
			type: "string",
			attribute: "src",
			selector: "img",
			default: "",
		},
		popupImgID: {
			type: "number",
		},
		popupImgALT: {
			type: "string",
			source: "attribute",
			attribute: "src",
			selector: "alt",
		},
		popupVideo: {
			type: "string",
			default: "none",
		},
		popupVideoURL: {
			"type": "string",
			"default": ""
		},
		popupVideoUploadID: {
			"type": "number",
			"default": 0
		},
		popupVideoUploadURL: {
			"type": "string",
			"default": ""
		},
		playIconURL: {
			type: "string",
			attribute: "src",
			selector: "img",
			default: "",
		},
		playIconID: {
			type: "number",
		},
		socialIconID: {
			type: "number",
		},
		socialIconURL: {
			type: "string",
			attribute: "src",
			selector: "img",
			default: "",
		},
		socialURL: {
			"type": "string",
			"default": ""
		},
	},
	supports: {
		customClassName: false,
	},
	// Function callback of edit property (to render block and block controls in Gutenberg editor)
	edit: Edit,
	// Function callback of save property (to save block content in post_content)
	save: Save
} );
