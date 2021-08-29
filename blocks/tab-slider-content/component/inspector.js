const { __ } = wp.i18n;
const {
	InspectorControls
} = wp.editor;

const {
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl,
} = wp.components;

export default function Inspector({ attributes, setAttributes }) {
	const {
		effect,
		fade,
		focus,
		variableWidth,
		center,
		autoHeight,
		vertical,
		slideToScroll,
		slideToShow,
		speed,
		autoplay,
		dots,
		arrows,
		autoplayDelay,
		disableOnInteraction,
		loop,
		freeMode,
		grabCursor,
		navigation,
		pagination,
		bulletClickable,
		scrollbar,
		scrollbarHide,
		scrollbarDraggable,
	} = attributes;

	return (
		<InspectorControls key="controls">
			<PanelBody title={__("Settings")}>
				<ToggleControl
					label={__("Auto Height")}
					checked={autoHeight}
					onChange={() => setAttributes({ autoHeight: !autoHeight })}
				/>

				<RangeControl
					label={__("Slider To Scroll")}
					value={slideToScroll}
					min={1}
					max={10}
					onChange={(slideToScroll) => setAttributes({ slideToScroll })}
				/>

				<RangeControl
					label={__("Slider To Show")}
					value={slideToShow}
					min={1}
					max={10}
					onChange={(slideToShow) => setAttributes({ slideToShow })}
				/>

				<RangeControl
					label={__("Slider Speed")}
					value={speed}
					min={1}
					max={5000}
					onChange={(speed) => setAttributes({ speed })}
				/>

				<ToggleControl
					label={__("Autoplay")}
					checked={autoplay}
					onChange={() => setAttributes({ autoplay: !autoplay })}
				/>

				{autoplay && (
					<RangeControl
						label={__("Autoplay Delay")}
						value={autoplayDelay}
						min={1}
						max={5000}
						onChange={(autoplayDelay) => setAttributes({ autoplayDelay })}
					/>
				)}

				<ToggleControl
					label={__("Arrows")}
					checked={arrows}
					onChange={() => setAttributes({ arrows: !arrows })}
				/>

				<ToggleControl
					label={__("Dots")}
					checked={dots}
					onChange={() => setAttributes({ dots: !dots })}
				/>

				<ToggleControl
					label={__("Loop")}
					checked={loop}
					onChange={() => setAttributes({ loop: !loop })}
				/>

				<ToggleControl
					label={__("Fade")}
					checked={fade}
					onChange={() => setAttributes({ fade: !fade })}
				/>

				<ToggleControl
					label={__("Focus")}
					checked={focus}
					onChange={() => setAttributes({ focus: !focus })}
				/>

				<ToggleControl
					label={__("Variable Width")}
					checked={variableWidth}
					onChange={() => setAttributes({ variableWidth: !variableWidth })}
				/>

				<ToggleControl
					label={__("Adaptive Height")}
					checked={autoHeight}
					onChange={() => setAttributes({ autoHeight: !autoHeight })}
				/>

				<ToggleControl
					label={__("Center")}
					checked={center}
					onChange={() => setAttributes({ center: !center })}
				/>

				<ToggleControl
					label={__("Draggable")}
					help={__(
						"Make scrollbar draggable that allows you to control slider position"
					)}
					checked={scrollbarDraggable}
					onChange={() =>
						setAttributes({ scrollbarDraggable: !scrollbarDraggable })
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
