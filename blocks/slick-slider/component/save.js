const {
    InnerBlocks
} = wp.editor;

const Save = (props) => {
    const {className} = props;

    return (
        <div className={ className }>
            <div className="slider-wrapper">
                <InnerBlocks.Content />
            </div>
        </div>
    )
}

export default Save;