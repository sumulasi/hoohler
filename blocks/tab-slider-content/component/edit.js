const { __ } = wp.i18n;
const {
	BlockControls,
	MediaPlaceholder,
	MediaUpload,
	InnerBlocks
} = wp.editor;

/*
* External dependencies
*/
import Slider from "react-slick";

import Inspector from "./inspector";

const ALLOWED_BLOCK = ['sp-blocks/slick-slider']

const Edit = ({ isSelected, attributes, setAttributes }) => {
	const {
		autoHeight,
		fade,
		focus,
		variableWidth,
		center,
		slideToScroll,
		slideToShow,
		speed,
		autoplay,
		autoplayDelay,
		loop,
		arrows,
		dots,
		scrollbarDraggable,
	} = attributes;

	let settings = {
		adaptiveHeight: autoHeight,
		fade,
		arrows: arrows,
		dots: dots,
		infinite: loop,
		speed: speed,
		slidesToShow: slideToShow,
		slidesToScroll: slideToScroll,
		autoplay: autoplay,
		autoplayDelay: autoplayDelay,
		autoplaySpeed: autoplayDelay,
		draggable: scrollbarDraggable,
		focusOnSelect: focus,
		variableWidth,
		centerMode: center,
		centerPadding: '50px',
		cssEase: 'linear',
		initialSlide: 0
	};

	return [
		isSelected && (
			<Inspector attributes={attributes} setAttributes={setAttributes} />
		),

		<div className="tab-slider-content">
			{/* <Slider {...settings} className="sp-slick-slider"> */}
			<div
				class="slick-slider sp-slick-slider slick-content"
				data-slick={JSON.stringify(settings)}
			>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCK} />
			</div>
			{/* </Slider> */}
		</div>,
	];
}

export default Edit;