const { __ } = wp.i18n;
const {
	MediaUpload,
	RichText,
	InspectorControls,
	URLInput,
	MediaUploadCheck,
} = wp.editor;

const { 
    Button,
	PanelBody,
	SelectControl,
	PanelRow,
	TextControl,
	ToggleControl,
	Panel,
	RadioControl,
	ColorPalette,
	Dashicon,
	RangeControl,
	TextareaControl,
 } = wp.components;

import { InnerEditContent } from "./innerContent";
 
import Select from "react-select";

const Edit = (props) => {
    const {attributes, setAttributes, instanceId} = props;

    const {
		blockID,
		titleTag,
		paragraphTag,
		title,
		content,
		imgURL,
		imgID,
		imgAlt,
		hoverImgURL,
		hoverImgID,
		linkType,
		linkAction,
		url,
		text,
		linkOpenType,
		imageBehavior,
		addClassName,
		linkText,
		bottomText,
		orderDiv,
		popupName,
		popupSubName,
		popupContent,
		popupContentID,
		popupImgURL,
		popupImgID,
		popupImgALT,
		popupVideo,
		popupVideoURL,
		popupVideoUploadID,
		popupVideoUploadURL,
		playIconURL,
		playIconID,
		socialIconID,
		socialIconURL,
		socialURL,
    } = attributes;

    setAttributes({
		blockID: `blurb-${instanceId}`,
	});

	const removeHoverImg = () => {
		setAttributes({
			hoverImgID: null,
			hoverImgURL: null,
			hoverImgALT: null,
		});
	};

	const removePopupImg = () => {
		setAttributes({
			popupImgID: null,
			popupImgURL: null,
			popupImgALT: null,
		});
	};

	const removeSocialIcon = () => {
		setAttributes({
			socialIconID: null,
			socialIconURL: null,
			socialIconALT: null,
		});
	};

	const setPopupVideoUpload = (popupVideoUploadVal) => {
		setAttributes({
			popupVideoUploadID: popupVideoUploadVal.id,
			popupVideoUploadURL: popupVideoUploadVal.url,
		});
	};

	const removePopupVideoUpload = () => {
		setAttributes({
			popupVideoUploadID: null,
			popupVideoUploadURL: null,
		});
	};

	const removePlayIcon = () => {
		setAttributes({
			playIconID: null,
			playIconURL: null,
		});
	};

	const setSocialIcon = (img) => {
		setAttributes({
			socialIconID: img.id,
			socialIconURL: img.url,
			socialIconALT: img.alt,
		});
	};

	const selectPlayIcon = (img) => {
		setAttributes({
			playIconID: img.id,
			playIconURL: img.url,
		});
	};

    return [
        <InspectorControls>
            <Panel>
				<PanelBody title={__("Blurb Class", "")} initialOpen={false}>
					<TextControl
                        label={__('Class Name', '')}
                        value={addClassName}
                        onChange={(classname) => setAttributes({addClassName: classname})}
                    />
				</PanelBody>
				<PanelBody title={__("Blurb Image and Content", "")} initialOpen={true}>
					<PanelRow>
						<SelectControl
							label="Image Behavior"
							value={imageBehavior}
							options={[
								{ label: "None", value: "object-fit-none" },
								{ label: "object fit contain ", value: "object-fit-contain" },
								{ label: "object fit cover ", value: "object-fit-cover" },
								{ label: "object fit fill ", value: "object-fit-fill" },
							]}
							onChange={(imageBehavior) => setAttributes({imageBehavior})}
						/>
					</PanelRow>
					<PanelRow className="hover-image">
						<MediaUploadCheck>
							<MediaUpload
								allowedType={["image"]}
								value={hoverImgID}
								onSelect={(hoverImgID) => setAttributes({hoverImgID})}
								render={({ open }) => (
									<div>
										<Button className={"button button-large"} onClick={open}>
											{__("Select Hover Image", "")}
										</Button>
										{hoverImgURL && (
											<div className="imageUploadWrapper">
												<img src={hoverImgURL} />
												<Button
													className="btn-remove"
													onClick={removeHoverImg}
												>
													<Dashicon icon="no" size="20" />
												</Button>
											</div>
										)}
									</div>
								)}
							></MediaUpload>
						</MediaUploadCheck>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label="Title Tag"
							value={titleTag}
							options={[
								{ label: "h1", value: "h1" },
								{ label: "h2", value: "h2" },
								{ label: "h3", value: "h3" },
								{ label: "h4", value: "h4" },
								{ label: "h5", value: "h5" },
								{ label: "h6", value: "h6" },
								{ label: "p", value: "p" },
							]}
							onChange={(titleTag) => setAttributes({titleTag})}
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label="Paragraph Tag"
							value={paragraphTag}
							options={[
								{ label: "h1", value: "h1" },
								{ label: "h2", value: "h2" },
								{ label: "h3", value: "h3" },
								{ label: "h4", value: "h4" },
								{ label: "h5", value: "h5" },
								{ label: "h6", value: "h6" },
								{ label: "p", value: "p" },
							]}
							onChange={(paragraphTag) => setAttributes({paragraphTag})}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__("Display Order", "")} initialOpen={false}>
					<Select
						name="display-order"
						value={orderDiv}
						options={[
							{ label: "Title", value: "title" },
							{ label: "Description", value: "description" },
							{ label: "Bottom Text or Link", value: "bottom-text" },
							{ label: "Image", value: "image" },
							]}
							isMulti
						onChange={(val) => {
							setAttributes({ orderDiv: val });
						}}
					/>
				</PanelBody>
				<PanelBody title={__("Blurb Options", "")} initialOpen={true}>
					<PanelRow>
						<SelectControl
							label="Link Type"
							value={linkType}
							options={[
								{ label: "Inner Link", value: "innerLink" },
								{ label: "Wrap All", value: "outerLink" },
								{ label: "None", value: "none" },
							]}
							onChange={(linkType) => setAttributes({linkType})}
						/>
					</PanelRow>

					{linkType === "outerLink" ||
						linkType === "innerLink" ? (
							<PanelRow>
								<SelectControl
									label="Link Action"
									value={linkAction}
									options={[
										{ label: "Select Action", value: "" },
										{ label: "Image + Content Popup", value: "imagePopup" },
										{ label: "Video Popup", value: "videoPopup" },
										{ label: "External or Internal", value: "externalInternal" },
									]}
									onChange={(linkAction) => setAttributes({linkAction})}
								/>
							</PanelRow>
						) : null}

					{linkType !== "none" &&
						linkAction === "externalInternal" ? (
							<PanelBody>
								<PanelRow>
									<URLInput
										label="Enter Url"
										value={url}
										onChange={(url, post) =>
											setAttributes({
												url,
												text: (post && post.title) || "Click here",
											})
										}
									/>
								</PanelRow>
								<PanelRow>
									<ToggleControl
										label="Open in New Tab"
										checked={linkOpenType}
										onChange={(linkOpenType) => setAttributes({linkOpenType})}
									/>
								</PanelRow>
							</PanelBody>
						) : null}
					{linkType !== "none" &&
						linkAction === "imagePopup" ? (
							<PanelBody className="image-popup">
								<PanelRow className="image-popup-image">
									<MediaUploadCheck>
										<MediaUpload
											allowedType={["image"]}
											value={popupImgID}
											onSelect={(popupImgID) => setAttributes({popupImgID})}
											render={({ open }) => (
												<div>
													<Button className={"button button-large"} onClick={open}>
														{__("Upload Image", "")}
													</Button>
													{popupImgURL ? (
														<div className="imageUploadWrapper">
															<img src={popupImgURL} />
															<Button
																className="btn-remove"
																onClick={removePopupImg}
															>
																<Dashicon icon="no" size="20" />
															</Button>
														</div>
													) : null}
												</div>
											)}
										></MediaUpload>
									</MediaUploadCheck>
								</PanelRow>
								<PanelRow>
									<TextControl
										label="Social Media URL"
										type="text"
										value={socialURL}
										onChange={setSocialIcon}
									/>
								</PanelRow>
								<PanelRow className="image-popup-social">
									<MediaUploadCheck>
										<MediaUpload
											allowedType={["image"]}
											value={socialIconID}
											onSelect={(socialIconID) => setAttributes({socialIconID})}
											render={({ open }) => (
												<div>
													<Button className={"button button-large"} onClick={open}>
														{__("Upload social Icon", "")}
													</Button>
													{socialIconURL ? (
														<div className="imageUploadWrapper">
															<img src={socialIconURL} />
															<Button
																className="btn-remove"
																onClick={removeSocialIcon}
															>
																<Dashicon icon="no" size="20" />
															</Button>
														</div>
													) : null}
												</div>
											)}
										></MediaUpload>
									</MediaUploadCheck>
								</PanelRow>
								<PanelRow>
									<TextControl
										label="Title"
										value={popupName}
										onChange={(popupName) => setAttributes({popupName})}
									/>
								</PanelRow>
								<PanelRow>
									<TextControl
										label="Sub Title"
										value={popupSubName}
										onChange={(popupSubName) => setAttributes({popupSubName})}
									/>
								</PanelRow>
								<PanelRow>
									<div className="popup-options">
										Popup Description
										<RichText
											className="bs-advance-blurb-popup-text"
											tagName="p"
											value={popupContent}
											onChange={(popupContent) => setAttributes({popupContent})}
										/>
									</div>
								</PanelRow>
							</PanelBody>
						) : null}
					{linkType !== "none" &&
						linkAction === "videoPopup" ? (
							<PanelBody className="video-popup">
								<PanelRow>
									<SelectControl
										label="Video Source"
										options={[
											{ value: "url", label: "URL" },
											{ value: "upload", label: "Upload" },
										]}
										value={popupVideo}
										onChange={(popupVideo) => setAttributes({popupVideo})}
									/>
								</PanelRow>
								{popupVideo === "upload" ? (
									<PanelRow className="video-popup-video">
										<MediaUploadCheck>
											<MediaUpload
												onSelect={setPopupVideoUpload}
												allowedTypes={["video"]}
												value={popupVideoUploadID}
												render={({ open }) => (
													<div>
														<Button
															className={"button button-large"}
															onClick={open}
														>
															{__("Upload Video", "")}
														</Button>
														{popupVideoUploadURL ? (
															<div className="videoUploadWrapper">
																<video width="200" height="200">
																	<source
																		src={popupVideoUploadURL}
																		type="video/mp4"
																	/>
																</video>
																<Button
																	className="btn-remove"
																	onClick={removePopupVideoUpload}
																>
																	<Dashicon icon="no" size="20" />
																</Button>
															</div>
														) : null}
													</div>
												)}
											/>
										</MediaUploadCheck>
									</PanelRow>
								) : (
										<PanelRow>
											<TextControl
												label="Video URL"
												type="text"
												value={popupVideoURL}
												onChange={(popupVideoURL) => setAttributes({popupVideoURL})}
											/>
										</PanelRow>
									)}
								<PanelRow className="video-popup-icon">
									<MediaUploadCheck>
										<MediaUpload
											allowedType={["image"]}
											value={playIconID}
											onSelect={selectPlayIcon}
											render={({ open }) => (
												<div>
													<Button className={"button button-large"} onClick={open}>
														{__("Upload Play Icon", "")}
													</Button>
													{playIconURL ? (
														<div className="imageUploadWrapper">
															<img src={playIconURL} />
															<Button
																className="btn-remove"
																onClick={removePlayIcon}
															>
																<Dashicon icon="no" size="20" />
															</Button>
														</div>
													) : null}
												</div>
											)}
										></MediaUpload>
									</MediaUploadCheck>
								</PanelRow>
							</PanelBody>
						) : null}
				</PanelBody>
            </Panel>
        </InspectorControls>,
        <div>
            {linkType === "outerLink" ? (
				<div className={`${addClassName}`}>
					<div className="blurb__container">
						<a
							rel={linkType !== "none" ? "noopener noreferrer" : ""}
							target={linkOpenType ? "_blank" : ""}
						>
							<InnerEditContent
								setAttributes={setAttributes}
								attributes={attributes}
							/>
						</a>
					</div>
				</div>
			) : (
					<div className={`blurb ${addClassName}`}>
						<div className="blurb__container">
							<InnerEditContent
								setAttributes={setAttributes}
								attributes={attributes}
							/>
						</div>
					</div>
				)}
        </div>,
    ];
}

export default Edit;