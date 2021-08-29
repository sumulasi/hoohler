const { __ } = wp.i18n;
const {
	InspectorControls,
    InnerBlocks,
    MediaUpload, 
    MediaUploadCheck
} = wp.editor;

const { 
    Panel,
    PanelBody,
	RadioControl,
    TextControl,
    Button
 } = wp.components;

const Edit = (props) => {
    const {attributes, setAttributes} = props;

    const {
        image_url,
        image,
        image_alt,
        mask_image_url,
        mask_image
    } = attributes;

    const onImageChange = (img) => {
		setAttributes({
			image_url: img.url,
			image: img.id,
		});
	};

    const onMaskImageChange = (img) => {
		setAttributes({
			mask_image_url: img.url,
			mask_image: img.id,
		});
	};

    const removeImage = () => {
		setAttributes({
			image_url: null,
			image: 0,
			image_alt: null,
			mask_image_url: null,
			mask_image: 0,
		});
	};

    const removeMaskImage = () => {
		setAttributes({
			mask_image_url: null,
			mask_image: 0,
		});
	};

    return [
        <InspectorControls>
            <Panel>
                <PanelBody title={__('Image', '')} initialOpen={true}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onImageChange}
                            allowedTypes={["image"]}
                            value={image}
                            render={({ open }) => (
                                <div>
                                    {image === 0 && (
                                        <Button
                                            className="image-add-button"
                                            onClick={open}
                                        >
                                            Choose the Image
                                        </Button>
                                    )}
                                    {image !== 0 && (
                                        <div>
                                            <Button onClick={open} isPrimary className="image-replace-button">
                                                {__("Replace image", "")}
                                            </Button>
                                            <Button
                                                onClick={removeImage}
                                                className="image-remove-button"
                                                isSecondary
                                                isDestructive
                                            >
                                                {__("Remove image", "")}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                    {image_url ? (
                        <div className="media-preview-image">
                            <img src={image_url} />
                        </div>
                    ) : null}
                    <TextControl
                        label={__("Image Alt Text", "")}
                        type="text"
                        value={image_alt}
                        onChange={(image_alt) => setAttributes({ image_alt })}
                    />
                </PanelBody>
                <PanelBody title={__('Mask Image', '')} initialOpen={true}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onMaskImageChange}
                            allowedTypes={["image"]}
                            value={mask_image}
                            render={({ open }) => (
                                <div>
                                    {mask_image === 0 && (
                                        <Button
                                            className="image-add-button"
                                            onClick={open}
                                        >
                                            Choose the Image
                                        </Button>
                                    )}
                                    {mask_image !== 0 && (
                                        <div>
                                            <Button onClick={open} isPrimary className="image-replace-button">
                                                {__("Replace Mask image", "")}
                                            </Button>
                                            <Button
                                                onClick={removeMaskImage}
                                                className="image-remove-button"
                                                isSecondary
                                                isDestructive
                                            >
                                                {__("Remove Mask image", "")}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                    {mask_image_url && (
                        <div className="media-preview-image">
                            <img src={mask_image_url} />
                        </div>
                    )}
                </PanelBody>
            </Panel>
        </InspectorControls>,
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
    ];
}

export default Edit;