const {
    InnerBlocks
} = wp.editor;

const Save = (props) => {
    const {attributes} = props;

    const {
        divClassNames,
		extraSmallFlexClassNames,
		smallFlexClassNames,
		mediumFlexClassNames,
		largeFlexClassNames,
		extraLargeFlexClassNames,
		backgroundTypeDiv,
		backgroundColor,
		gradientColorOne,
		gradientColorTwo,
		gradientDirection,
		gradientColorOneLocation,
		gradientColorTwoLocation,
		backgroundVideoUrl,
		backgroundVideoName,
		backgroundVideoControls,
		backgroundVideoLoop,
		backgroundVideoMute,
		backgroundVideoAutoPlay,
		fontColor,
		divImgUrl,
		divImgId,
		divImgIdVideo,
		divImgVideoUrl,
    } = attributes;

    return (
        <div
            className={`div
                ${fontColor !== "" ? "has-text-color" : ""}
            `}
        >
            {fontColor && (
                <style>
                    {`${`{ color: ${fontColor}; }`} `}
                </style>
            )}
            {backgroundTypeDiv === "background_color" && (
                <style>
                    {`${
                        backgroundTypeDiv === "background_color"
                            ? `{ background-color: ${backgroundColor}; }`
                            : ""
                    } `}
                </style>
            )}
            {backgroundTypeDiv === "background_image" && (
                <style>
                    {` ${
                        backgroundTypeDiv === "background_image"
                            ? `{ background-image: url(${
                                    divImgUrl !== undefined ? divImgUrl : ""
                            }); }`
                            : ""
                    } `}
                </style>
            )}
            {backgroundTypeDiv === "gradient" && (
                <style>
                    {`${
                        backgroundTypeDiv === "gradient"
                            ? `{ background-image: linear-gradient(${gradientDirection}deg, ${gradientColorOne} ${gradientColorOneLocation}%, ${gradientColorTwo} ${gradientColorTwoLocation}%) }`
                            : ""
                    } `}
                </style>
            )}
            {backgroundTypeDiv === "background_video" && (
                <div
                    className={`bs-div__video${
                        backgroundVideoControls === true ? " has-controls" : ""
                    }`}
                >
                    <video
                        loop={backgroundVideoLoop}
                        autoPlay={backgroundVideoAutoPlay}
                        muted={backgroundVideoMute}
                        {...(backgroundVideoControls ? { controls: "controls" } : {})}
                    >
                        <source src={backgroundVideoUrl + `#t=0.01`} type="video/mp4" />
                    </video>
                    {divImgVideoUrl && (
                        <span className={`video-poster d-md-none d-lg-none`}>
                            <img src={divImgVideoUrl} alt={`Video Poster`} />
                        </span>
                    )}
                </div>
            )}
            <div
                className={`div__inner`}
            >
                <InnerBlocks.Content/>
            </div>
        </div>
    )
}

export default Save;