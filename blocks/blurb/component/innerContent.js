const { __ } = wp.i18n;
const {
	MediaUpload,
	RichText,
} = wp.editor;

const { 
    Button
 } = wp.components;

const InnerEditContent = (props) => {
	const { attributes, setAttributes } = props;
	const { orderDiv } = attributes;
	const innerElements = [];

	//Title
	const setTitle = (titleVal) => {
		setAttributes({ title: titleVal });
	};

	//Paragraph
	const setParagraph = (paragraphVal) => {
		setAttributes({ content: paragraphVal });
	};

	//link text
	const setLinkText = (linkTextVal) => {
		setAttributes({ linkText: linkTextVal });
	};

	//bottom text
	const setBottomText = (bottomTextVal) => {
		setAttributes({ bottomText: bottomTextVal });
	};

	// File upload
	const onFileChange = (img) => {
		setAttributes({
			imgURL: img.url,
			imgID: img.id,
			imgAlt: img.imgAlt,
		});
	};

	// Remove file
	const removeImage = () => {
		setAttributes({
			imgURL: null,
			imgID: null,
			imgAlt: null,
		});
	};

	orderDiv
		? orderDiv.map((item) => {
			if (item.value == "title") {
				innerElements.push(
					<div className="blurb__title" key={item.value}>
						<RichText
							tagName={attributes.titleTag}
							placeholder="Title"
							value={attributes.title}
							onChange={setTitle}
						/>
					</div>
				);
			}

			if (item.value == "description") {
				innerElements.push(
					<div className="blurb__description" key={item.value}>
						<RichText
							tagName={attributes.paragraphTag}
							placeholder="Description"
							value={attributes.content}
							onChange={setParagraph}
						/>
					</div>
				);
			}

			if (item.value == "bottom-text") {
				innerElements.push(
					<div className="blurb__read-more" key={item.value}>
						{attributes.linkType === "innerLink" ? (
							<RichText
								tagName="a"
								placeholder="link text"
								value={attributes.linkText}
								onChange={setLinkText}
							/>
						) : (
								<RichText
									tagName="span"
									// placeholder="bottom text"
									placeholder="Bottom Text"
									className="blurb__read-more-text"
									value={attributes.bottomText}
									onChange={setBottomText}
								/>
							)}
					</div>
				);
			}
			if (item.value == "image") {
				innerElements.push(
					<div class="blurb__image">
						{attributes.imgURL ? (
							<div>
								<figure>
									<img
										className={attributes.imageBehavior}
										src={attributes.imgURL}
										alt={attributes.imgAlt}
									/>
								</figure>
								{attributes.playIconURL ? (
									<img
										className="video-play-icon"
										width="50"
										height="50"
										src={attributes.playIconURL}
									/>
								) : null}
							</div>
						) : (
								<MediaUpload
									onSelect={onFileChange}
									allowedTypes={["image"]}
									value={attributes.imgID}
									render={({ open }) => (
										<Button className="image image-upload" onClick={open}>
											Upload Image
										</Button>
									)}
								/>
							)}
						{attributes.imgURL ? (
							<Button className="image-remove btn-close" onClick={removeImage}>
								Remove Image
							</Button>

						) : null}
					</div>
				);
			}
		})
		: "";

	return <div>{innerElements}</div>;
};

const InnerSaveContent = (props) => {
	const { attributes } = props;
	const { url, linkText, linkOpenType, orderDiv, title, content } = attributes;
	const innerElements = [];

	orderDiv.map((item) => {
		if (item.value == "title") {
			innerElements.push(
				<div className="blurb__title" key={item.value}>
					<RichText.Content value={title} tagName={attributes.titleTag} />
				</div>
			);
		}

		if (item.value == "description") {
			innerElements.push(
				<div className="blurb__description" key={item.value}>
					<RichText.Content value={content} tagName={attributes.paragraphTag} />
				</div>
			);
		}

		if (item.value == "bottom-text") {
			innerElements.push(
				<div className="blurb__read-more" key={item.value}>
					{attributes.linkType === "innerLink" ? (
						attributes.linkAction === "imagePopup" ? (
							<div>
								<a data-fancybox
									data-arrows="false"
									data-infobar="false"
									data-touch="false"
									data-hash="false"
									data-src={"#" + attributes.blockID}
									href="void(0);"
									target={attributes.linkOpenType ? "_blank" : ""}
									rel={attributes.linkOpenType ? "noopener noreferrer" : "noopener noreferrer"}
								>
									{linkText}
								</a>
								<div style="display: none;" id={attributes.blockID}>
									{attributes.popupImgURL ? (
										<div className="fancybox-content--image">
											<img width="300" height="300" src={attributes.popupImgURL} />
										</div>
									) : null}
									{attributes.socialURL ? (
										<div className="fancybox-content--social">
											<a href={attributes.socialURL} target="_blank" aria-label="" rel="noopener noreferrer">
												<img width="40" height="40" src={attributes.socialIconURL ? attributes.socialIconURL : "#"} />
											</a>
										</div>
									) : null}
									<div className="fancybox-content--description">
										{attributes.popupName ? (
											<RichText.Content value={attributes.popupName} tagName="h3" />
										) : null}
										{attributes.popupSubName ? (
											<RichText.Content value={attributes.popupSubName} tagName="h4" />
										) : null}
										{attributes.popupContent ? (
											<RichText.Content value={attributes.popupContent} tagName="p" />
										) : null}
									</div>
								</div>
							</div>
						) : attributes.linkAction === "videoPopup" ?
								(
									<div>
										<a data-fancybox
											data-arrows="false"
											data-infobar="false"
											data-small-btn="true"
											data-touch="false"
											data-hash="false"
											href={attributes.popupVideo === "upload" ?
												attributes.popupVideoUploadURL : attributes.popupVideoURL
											}
											target={attributes.linkOpenType ? "_blank" : ""}
											rel={attributes.linkOpenType ? "noopener noreferrer" : "noopener noreferrer"}
										>
											{linkText}
										</a>
									</div>

								) : (
									<div>
										<a
											href={url}
											target={attributes.linkOpenType ? "_blank" : ""}
											rel={attributes.linkOpenType ? "noopener noreferrer" : "noopener noreferrer"}
										>
											{linkText}
										</a>
									</div>
								)
					) : (
							<RichText.Content value={attributes.bottomText} tagName="span" />
						)}
				</div>
			);
		}
		if (item.value == "image") {
			innerElements.push(
				attributes.hoverImgURL ? (
					<div className="blurb__image hover-option-enabled" key={item.value}>
						<figure>
							<img
								className={`${attributes.imageBehavior} img-fluid normal-image`}
								src={attributes.imgURL}
								alt={attributes.imgAlt}
							/>
							{attributes.hoverImgURL ? (
								<img className={`${attributes.imageBehavior} img-fluid hover-image`} src={attributes.hoverImgURL} />
							) : null}
						</figure>
						{attributes.playIconURL ? (
							<img className="video-play-icon" width="50" height="50" src={attributes.playIconURL} />
						) : null}
					</div>
				) : (
						<div className="blurb__image" key={item.value}>
							<figure>
								<img
									className={`${attributes.imageBehavior} img-fluid normal-image`}
									src={attributes.imgURL}
									alt={attributes.imgAlt}
								/>
							</figure>
							{attributes.playIconURL ? (
								<img className="video-play-icon" width="50" height="50" src={attributes.playIconURL} />
							) : null}
						</div>
					)
			);
		}
	});

	return (<div>{innerElements}</div>);
};

export {InnerEditContent, InnerSaveContent};