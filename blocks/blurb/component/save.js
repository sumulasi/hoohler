const {
    InnerBlocks
} = wp.editor;

import {InnerSaveContent} from "./innerContent";

const Save = (props) => {
    const { attributes, setAttributes } = props;

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
        popupImgURL,
        popupVideo,
        popupVideoURL,
        popupVideoUploadURL,
        playIconURL,
        playIconID,
        socialIconURL,
        socialURL,
    } = attributes;

    return (
        <div>
            {linkType === "outerLink" ? (
                linkAction === "imagePopup" ? (
                    <div className="blurb__container">
                        <a data-fancybox
                            data-arrows="false"
                            data-infobar="false"
                            data-touch="false"
                            data-hash="false"
                            data-src={"#" + blockID}
                            href="void(0);"
                            target={linkOpenType ? "_blank" : ""}
                            rel={linkOpenType ? "noopener noreferrer" : "noopener noreferrer"}
                        >
                            <InnerSaveContent
                                setAttributes={setAttributes}
                                attributes={attributes}
                            />
                        </a>
                        <div style="display: none;" id={blockID}>
                            {popupImgURL ? (
                                <div className="fancybox-content--image">
                                    <img width="300" height="300" src={popupImgURL} />
                                </div>
                            ) : null}
                            {socialURL ? (
                                <div className="fancybox-content--social">
                                    <a href={socialURL} target="_blank" aria-label="" rel="noopener noreferrer">
                                        <img width="40" height="40" src={socialIconURL ? socialIconURL : "#"} />
                                    </a>
                                </div>
                            ) : null}
                            <div className="fancybox-content--description">
                                {popupName ? (
                                    <h3>{popupName}</h3>
                                ) : null}
                                {popupSubName ? (
                                    <h4>{popupSubName}</h4>
                                ) : null}
                                {popupContent ? (
                                    <p dangerouslySetInnerHTML={{ __html: popupContent }}></p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ) : linkAction === "videoPopup" ?
                    (
                        <a data-fancybox
                            data-arrows="false"
                            data-infobar="false"
                            data-small-btn="true"
                            data-touch="false"
                            data-hash="false"

                            href={popupVideo === "upload" ?
                                popupVideoUploadURL : popupVideoURL
                            }
                            target={linkOpenType ? "_blank" : ""}
                            rel={linkOpenType ? "noopener noreferrer" : "noopener noreferrer"}
                        >
                            <div className="blurb__container">
                                <InnerSaveContent
                                    setAttributes={setAttributes}
                                    attributes={attributes}
                                />
                            </div>
                        </a>
                    ) : (
                        <a
                            href={url}
                            target={linkOpenType ? "_blank" : ""}
                            rel={linkOpenType ? "noopener noreferrer" : "noopener noreferrer"}
                        >
                            <div className="blurb__container">
                                <InnerSaveContent
                                    setAttributes={setAttributes}
                                    attributes={attributes}
                                />
                            </div>
                        </a>
                    )
            ) : (
                <div className="blurb__container">
                    <InnerSaveContent
                        setAttributes={setAttributes}
                        attributes={attributes}
                    />
                </div>
            )
            }
        </div>
    )
}

export default Save;