const {
	InnerBlocks
} = wp.editor;

const Save = (props) => {
	const {attributes} = props;
	const {
		autoHeight,
		fade,
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
		draggable: scrollbarDraggable
	};

	return (
		<div>
			<div
				class="slick-slider sp-slick-slider"
				data-slick={JSON.stringify(settings)}
			>
				<InnerBlocks.Content/>
			</div>
		</div>
	);
}

export default Save;