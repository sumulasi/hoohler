const {
    InnerBlocks
} = wp.editor;

const Save = (props) => {
    const {attributes} = props;

    const {
        video_source,
        video_url,
        autoplay,
        loop,
        muted,
        controls
    } = attributes;

    return (
        <div className="media-video">
            <div className="video-inner">
                {
                    video_source === "url" ? 
                    <iframe width="420" height="315"
                        src={video_url}>
                    </iframe> : 
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
    )
}

export default Save;