const {
    InnerBlocks
} = wp.editor;

const Save = (props) => {
    const {attributes} = props;

    const {
        sizeXsClass,
        sizeSmClass,
        sizeMdClass,
        sizeLgClass,
        sizeXlClass
    } = attributes;

    return (
        <div className={`column ${sizeXsClass} ${sizeSmClass} ${sizeMdClass} ${sizeLgClass} ${sizeXlClass}`}>
            <InnerBlocks.Content/>
        </div>
    )
}

export default Save;