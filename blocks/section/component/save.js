const {
    InnerBlocks
} = wp.editor;

const Save = (props) => {
    const {attributes} = props;

    const {
        containerType,
        sectionClassNames
    } = attributes;

    return (
        <section className={sectionClassNames}>
            <div className={containerType}>
                <InnerBlocks.Content/>
            </div>
        </section>
    )
}

export default Save;