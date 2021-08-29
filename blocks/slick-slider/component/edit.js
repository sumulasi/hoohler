const {
    InnerBlocks
} = wp.editor;

const Edit = (props) => {
    const {className} = props;

    return [
        <div className={ className }>
            <div className="slider-wrapper">
                <InnerBlocks/>
            </div>
        </div>
    ];
}

export default Edit;