import style from './styles/style.scss';
import editor from './styles/editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

import Edit from './component/edit'
import Save from './component/save'

export default registerBlockType( 'sp-blocks/slider', {
	// Block title
	title: __( 'SP Slider', 'hooker' ),
	// Block description
	description: __( 'Block description', 'hooker' ),
	// Block icon (https://developer.wordpress.org/resource/dashicons/)
	icon: 'smiley',
	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed
	category: 'sp',
	// To handle block toolbar controls.
	attributes: {
        fade: {
            type: "boolean",
            default: false,
        },
        slide: {
            type: "boolean",
            default: true,
        },
        slideToScroll: {
            type: "number",
            default: 1,
        },
        slideToShow: {
            type: "number",
            default: 1,
        },
        speed: {
            type: "number",
            default: 300,
        },
        autoplay: {
            type: "boolean",
            default: false,
        },
        arrows: {
            type: "boolean",
            default: false,
        },
        dots: {
            type: "boolean",
            default: false,
        },
        autoplayDelay: {
            type: "number",
            default: 3000,
        },
        loop: {
            type: "boolean",
            default: false,
        },
        scrollbarDraggable: {
            type: "boolean",
            default: true,
        },
        autoHeight: {
            type: "boolean",
            default: false,
        },
	},
	// Function callback of edit property (to render block and block controls in Gutenberg editor)
	edit: Edit,
	// Function callback of save property (to save block content in post_content)
	save: Save
} );
