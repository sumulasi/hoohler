const {
    InnerBlocks
} = wp.editor;

const Save = (props) => {
    const {attributes} = props;

    const {
        image_url,
        image_alt,
        mask_image_url,
    } = attributes;

    return (
        <div className="media-image">
            <div className="image-inner">
                <figure>
                    <img alt={image_alt} src={image_url} />
                </figure>
            </div>
            {
                mask_image_url &&
                <div className="mask-image">
                    <figure>
                        <img alt="" src={mask_image_url} />
                    </figure>
                </div>
            }
        </div>
    )
}

export default Save;