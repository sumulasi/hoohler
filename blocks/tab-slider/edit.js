const { __ } = wp.i18n;
const {
	InspectorControls,
	InnerBlocks
} = wp.editor;
const {
	PanelBody,
} = wp.components;

const Edit = (props) => {

	//set class names for asNavFor options
	let slider_1_referenceClass = (Math.random() * 100) + '-slider-1';
	let slider_2_referenceClass = (Math.random() * 100) + '-slider-2';
	let slider_1_class = 'bs-slider-tabs';
	let slider_2_class = 'bs-slider-tab-content';

	const SLIDER_TEMPLATE = [
		['sp-blocks/tab-slider-nav', {
			asNavFor: slider_2_referenceClass,
			referenceClass: slider_1_referenceClass,
			tabSliderClass: slider_1_class,
			sliderDots: false,
			slidesToShow: 3
		}],
		['sp-blocks/tab-slider-content', {
			referenceClass: slider_2_referenceClass,
			tabSliderClass: slider_2_class,
			sliderDots: false
		}]
	];

	return [
		<div className={`tab-slider`} style={{border: "1px solid blue"}}>
			<InnerBlocks template={SLIDER_TEMPLATE}/>
		</div>
	];
};

export default Edit;
