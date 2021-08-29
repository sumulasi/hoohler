const {
    InnerBlocks
} = wp.editor;

const Save = (props) => {
    const {attributes} = props;

    const {
        justifyContentClass,
        directionClass
    } = attributes;

    return (
        <div className={`row ${justifyContentClass} ${directionClass}`}>
            <InnerBlocks.Content/>
        </div>
    )
}

export default Save;