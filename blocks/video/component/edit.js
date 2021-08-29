const { __ } = wp.i18n;
const {
	InspectorControls,
    MediaUpload, 
    MediaUploadCheck
} = wp.editor;

const { 
    Panel,
    PanelBody,
    TextControl,
    Button,
    SelectControl,
    ToggleControl 
 } = wp.components;

const Edit = (props) => {
    const {attributes, setAttributes} = props;

    const {
        video_file_name,
		video_source,
		video,
        video_url,
        autoplay,
        loop,
        muted,
        controls
    } = attributes;

    return [
        <InspectorControls>
            <Panel>
                <PanelBody title={__('Image', '')} initialOpen={true}>
                    <SelectControl
                        label={__("Video Source", "")}
                        options={[
                            { value: "upload", label: "Upload (html5)" },
                            { value: "url", label: "URL (iframe)" },
                        ]}
                        value={video_source}
                        onChange={(video_source) => setAttributes({ video_source })}
                    />
                    {video_source === "upload" && (
                        <div>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) =>
                                        setAttributes({ video: media.id, video_url: media.url, video_file_name:media.filename })
                                    }
                                    allowedTypes={["video"]}
                                    value={video}
                                    render={({ open }) => (
                                        <div>
                                            {video && video != 0 ? (
                                                <p>{video_file_name}</p>
                                            ) : null}
                                            {video === 0 && (
                                                <Button
                                                    className="image-add-button"
                                                    onClick={open}
                                                >
                                                    Choose the Video
                                                </Button>
                                            )}
                                            {video !== 0 && (
                                                <div>
                                                    <Button onClick={open} isPrimary className="image-replace-button">
                                                        {__("Replace Video", "")}
                                                    </Button>
                                                    <Button
                                                        onClick={(media) => {
                                                            setAttributes({ video: 0 });
                                                        }}
                                                        className="image-remove-button"
                                                        isSecondary
                                                        isDestructive
                                                    >
                                                        {__("Remove Video", "")}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                            <div>
                                <ToggleControl
                                    label="Video Autoplay"
                                    checked={autoplay}
                                    onChange={ () =>
                                        setAttributes({autoplay: !autoplay})
                                    }
                                />
                                <ToggleControl
                                    label="Video Loop"
                                    checked={loop}
                                    onChange={ () =>
                                        setAttributes({loop: !loop})
                                    }
                                />
                                <ToggleControl
                                    label="Video Muted"
                                    checked={muted}
                                    onChange={ () =>
                                        setAttributes({muted: !muted})
                                    }
                                />
                                <ToggleControl
                                    label="Video Controls"
                                    checked={controls}
                                    onChange={ () =>
                                        setAttributes({controls: !controls})
                                    }
                                />
                            </div>
                        </div>
                    )}
                    {video_source === "url" && (
						<div>
                            <TextControl
                                label={__("Video URL", "")}
                                type="text"
                                value={video_url}
                                onChange={(video_url) => setAttributes({ video_url })}
                            />
                        </div>
                    )}
                </PanelBody>
            </Panel>
        </InspectorControls>,
        <div className="media-video">
            <div className="video-inner">
                {
                    video_source === "url" ? 
                    <div class="embed-responsive embed-responsive-1by1">
                        <iframe id="player" width="420" height="315" frameborder="0"
                            src={video_url+'?enablejsapi=1&origin=https://localhost/berg/home/&showinfo=0&iv_load_policy=3&modestbranding=1&theme=light&color=white&rel=0'}>
                        </iframe>
                    </div> : 
                    <video 
                        autoplay={autoplay && "autoplay"}
                        loop={loop && "loop"}
                        muted={muted && "muted"}
                        controls={controls && "controls"}>
                        <source type="video/mp4" src={video_url} />
                    </video>
                }
            </div>
        </div>
    ];
}

export default Edit;