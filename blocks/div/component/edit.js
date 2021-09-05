const { __ } = wp.i18n;
const {
	InspectorControls,
    InnerBlocks
} = wp.editor;

const { 
    Panel,
    PanelBody,
    ColorPalette,
	RadioControl,
    RangeControl,
    SelectControl
} = wp.components;
 
import Select from "react-select";

const Edit = (props) => {
    const {attributes, setAttributes} = props;

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

    const select_img = (img) => {
		setAttributes({
			divImgId: img.id,
			divImgUrl: img.url,
			divImgAlt: img.alt,
		});
	};

	const remove_img = () => {
		setAttributes({
			divImgId: null,
			divImgUrl: null,
			divImgAlt: null,
		});
	};

	const select_video = (val) => {
		setAttributes({
			backgroundVideoUrl: val.url,
			backgroundVideoName: val.filename,
		});
	};

	const remove_video = () => {
		setAttributes({
			backgroundVideoUrl: null,
			backgroundVideoName: null,
		});
	};

	const select_img_video = (img) => {
		setAttributes({
			divImgIdVideo: img.id,
			divImgVideoUrl: img.url,
		});
	};

	const remove_img_video = () => {
		setAttributes({
			divImgIdVideo: null,
			divImgVideoUrl: null,
		});
	};

	const colors = [
		{ name: "red", color: "#f00" },
		{ name: "white", color: "#fff" },
		{ name: "blue", color: "#00f" },
	];

    return [
        <InspectorControls>
            <Panel>
                <PanelBody title={__("Div Class", "")} initialOpen={false}>
					<Select
						defaultValue={divClassNames}
						isMulti
						name="divClassNames"
						options={divClassNames}
						className="basic-multi-select"
						classNamePrefix="select"
						onChange={(val) => {
							setAttributes({
								divClassNames: val,
							});
						}}
					/>
				</PanelBody>
          <PanelBody title={__("Background Type", "")} initialOpen={false}>
					<SelectControl
						label={__("Select Background Type", "")}
						value={backgroundTypeDiv}
						options={[
							{ value: "", label: "Select Background" },
							{ value: "background_image", label: "Background Image" },
							{ value: "background_color", label: "Background Color" },
							{ value: "background_video", label: "Background Video" },
							{ value: "gradient", label: "Gradient" },
						]}
						onChange={(val) => {
							setAttributes({ backgroundTypeDiv: val });
						}}
					/>
					{backgroundTypeDiv === "background_color" && (
						<ColorPalette
							label={__("Select Background Color", "")}
							colors={colors}
							value={backgroundColor}
							onChange={(val) => {
								setAttributes({ backgroundColor: val });
							}}
						/>
					)}
					{backgroundTypeDiv === "background_image" && (
						<MediaUploadCheck>
							<MediaUpload
								allowedType={["image"]}
								value={divImgId}
								onSelect={select_img}
								render={({ open }) => (
									<div className="media-upload image-upload">
										{divImgUrl ? (
											<Button
												className="media-button remove-button"
												onClick={remove_img}
											>
												{__("Remove Image", "berg")}
											</Button>
										) : (
											<Button
												className={"media-button upload-button"}
												onClick={open}
											>
												{__("Upload Image", "berg")}
											</Button>
										)}
										<div className="image-thumb-wrapper"
												 onClick={open}
										>
											{divImgUrl ? (
												<img
													className="image-thumb"
													src={divImgUrl !== undefined ? divImgUrl : ""}
												/>
											) : (
												""
											)}
										</div>
									</div>
								)}
							></MediaUpload>
						</MediaUploadCheck>
					)}
					{backgroundTypeDiv === "background_video" && (
						<div>
							<MediaUploadCheck>
								<MediaUpload
									allowedType={["video"]}
									value={backgroundVideoUrl}
									onSelect={select_video}
									render={({ open }) => (
										<div className="media-upload video-upload">
											{backgroundVideoUrl ? (
												<Button
													className="media-button remove-button"
													onClick={remove_video}
												>
													{__("Remove Video", "berg")}
												</Button>
											) : (
												<Button
													className="media-button upload-button"
													onClick={open}
												>
													{__("Upload Video", "berg")}
												</Button>
											)}

											<Dashicon icon="video-alt3" size="20" />
											<div className="video-file-name">
												<p>{backgroundVideoName}</p>
											</div>
										</div>
									)}
								></MediaUpload>
							</MediaUploadCheck>
							<MediaUploadCheck>
								<MediaUpload
									allowedType={["image"]}
									value={divImgIdVideo}
									onSelect={select_img_video}
									render={({ open }) => (
										<div className="media-upload image-upload">
											{divImgVideoUrl ? (
												<Button
													className="media-button remove-button"
													onClick={remove_img_video}
												>
													{__("Remove Image", "berg")}
												</Button>
											) : (
												<Button
													className={"media-button upload-button"}
													onClick={open}
												>
													{__("Upload Image", "berg")}
												</Button>
											)}
											<div className="image-thumb-wrapper"
													 onClick={open}
											>
												{divImgVideoUrl ? (
													<img
														className="image-thumb"
														src={
															divImgVideoUrl !== undefined ? divImgVideoUrl : ""
														}
													/>
												) : (
													""
												)}
											</div>
										</div>
									)}
								></MediaUpload>
							</MediaUploadCheck>
							<ToggleControl
								label="Show Controls"
								checked={backgroundVideoControls}
								onChange={(new_val) => {
									setAttributes({ backgroundVideoControls: new_val });
								}}
							/>
							<ToggleControl
								label="Auto Play"
								checked={backgroundVideoAutoPlay}
								onChange={(new_val) => {
									setAttributes({ backgroundVideoAutoPlay: new_val });
								}}
							/>
							<ToggleControl
								label="Loop"
								checked={backgroundVideoLoop}
								onChange={(new_val) => {
									setAttributes({ backgroundVideoLoop: new_val });
								}}
							/>
							<ToggleControl
								label="Mute"
								checked={backgroundVideoMute}
								onChange={(new_val) => {
									setAttributes({ backgroundVideoMute: new_val });
								}}
							/>
						</div>
					)}
					{backgroundTypeDiv === "gradient" && (
						<div>
							<ColorPalette
								label={__("Select Background Color #1", "berg")}
								colors={colors}
								value={gradientColorOne}
								onChange={(val) => {
									setAttributes({ gradientColorOne: val });
								}}
							/>

							<ColorPalette
								label={__("Select Background Color #1", "berg")}
								colors={colors}
								value={gradientColorTwo}
								onChange={(val) => {
									setAttributes({ gradientColorTwo: val });
								}}
							/>
							<RangeControl
								label={__("Gradient Direction (Degrees)", "berg")}
								min={1}
								max={360}
								value={gradientDirection}
								initialPosition={gradientDirection}
								allowReset={true}
								onChange={(new_val) => {
									setAttributes({ gradientDirection: new_val });
								}}
							/>
							<RangeControl
								label={__("Color 1 Location", "berg")}
								min={1}
								max={100}
								value={gradientColorOneLocation}
								allowReset={true}
								initialPosition={gradientColorOneLocation}
								onChange={(new_val) => {
									setAttributes({ gradientColorOneLocation: new_val });
								}}
							/>
							<RangeControl
								label={__("Color 2 Location", "berg")}
								min={1}
								max={100}
								value={gradientColorTwoLocation}
								initialPosition={gradientColorTwoLocation}
								allowReset={true}
								onChange={(new_val) => {
									setAttributes({ gradientColorTwoLocation: new_val });
								}}
							/>
						</div>
					)}
				</PanelBody>
                <PanelBody title={__("Text Color", "")} initialOpen={false}>
					<ColorPalette
						label={__("Select Text Color", "")}
						colors={colors}
						value={fontColor}
						onChange={(val) => {
							setAttributes({ fontColor: val });
						}}
					/>
				</PanelBody>
            </Panel>
        </InspectorControls>,
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
                <InnerBlocks />
            </div>
        </div>,
    ];
}

export default Edit;