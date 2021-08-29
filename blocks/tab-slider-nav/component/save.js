const {
	InnerBlocks
} = wp.editor;

const Save = (props) => {
	const {attributes} = props;
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

	var settings = {
		adaptiveHeight: autoHeight,
		fade,
		arrows: arrows,
		dots: dots,
		infinite: loop,
		speed: speed,
		slidesToShow: slideToShow,
		slidesToScroll: slideToScroll,
		autoplay: autoplay,
		autoplaySpeed: autoplayDelay,
		draggable: scrollbarDraggable,
		focusOnSelect: focus,
		variableWidth,
		centerMode: center,
		centerPadding: '50px',
		cssEase: 'linear',
		initialSlide: 0
	};

	return (
		<div className="tab-slider-nav">
			<div
				class="slick-slider sp-slick-slider slick-nav"
				data-slick={JSON.stringify(settings)}
			>
				<InnerBlocks.Content/>
			</div>
		</div>
	);
}

export default Save;