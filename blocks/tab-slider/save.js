 const { __ } = wp.i18n;
 const {
	RichText,
	InnerBlocks
 } = wp.editor;

const save = (props) => {
	return (
		<div className={`tab-slider`}>
			<InnerBlocks.Content />
		</div>
	);
};

export default save;
