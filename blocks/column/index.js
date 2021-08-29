import style from './styles/style.scss';
import editor from './styles/editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

import Edit from './component/edit'
import Save from './component/save'

export default registerBlockType( 'sp-blocks/column', {
	// Block title
	title: __( 'SP Column', 'hooker' ),
	// Block description
	description: __( 'Block description', 'hooker' ),
	// Block icon (https://developer.wordpress.org/resource/dashicons/)
	icon: 'smiley',
	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed
	category: 'sp',
	// To handle block toolbar controls.
	attributes: {
		sizeXs: {
			type: 'number',
			default: 0
		},
		sizeSm: {
			type: 'number',
			default: 12
		},
		sizeMd: {
			type: 'number',
			default: 0
		},
		sizeLg: {
			type: 'number',
			default: 0
		},
		sizeXl: {
			type: 'number',
			default: 0
		},
		sizeXsClass: {
			type: 'string',
			default: ''
		},
		sizeSmClass: {
			type: 'string',
			default: 'col-sm-12'
		},
		sizeMdClass: {
			type: 'string',
			default: ''
		},
		sizeLgClass: {
			type: 'string',
			default: ''
		},
		sizeXlClass: {
			type: 'string',
			default: ''
		},
		xsFlexClassNames: {
			type: 'array',
			default: []
		},
		smFlexClassNames: {
			type: 'array',
			default: []
		},
		mdFlexClassNames: {
			type: 'array',
			default: []
		},
		lgFlexClassNames: {
			type: 'array',
			default: []
		},
		xlFlexClassNames: {
			type: 'array',
			default: []
		}
	},
	// Function callback of edit property (to render block and block controls in Gutenberg editor)
	edit: Edit,
	// Function callback of save property (to save block content in post_content)
	save: Save
} );
