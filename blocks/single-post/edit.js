/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

const { __ } = wp.i18n;
const {
	InspectorControls,
	InnerBlocks
} = wp.editor;
const {
	Disabled,
	PanelBody,
	RadioControl,
	SelectControl,
	TextControl,
} = wp.components;
const {
	withSelect,
} = wp.data;
const {
	compose,
	withState,
} = wp.compose;

import ServerSideRender from "@wordpress/server-side-render";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */

const Edit = (props) => {
	const { attributes, setAttributes, postTypes, postList, taxonomies } = props;
	const {
		selectedPostType,
		selectedPost,
		imageAppearance,
		anchorAppearance,
		dateFormat,
		displayOrder,
		titleTag,
		singlePostClass,
		singlePostClassNames,
		popupDisplayOrder,
	} = attributes;

	const unwantedPostTypes = ["Media", "Blocks", "Pages"];

	// filter post types and make post list array to use on post type dropdown
	const filteredPostTypes = _.filter(postTypes, (type) => {
		return !unwantedPostTypes.includes(type.name);
	}).map((type) => {
		return { value: type.slug, label: type.name };
	});

	// Make post list array to use on post dropdown
	const posts = _.map(postList, (post) => {
		return { value: post.id, label: post.title.rendered };
	});

	// create post type related taxonomies list
	const taxonomyList = _.map(taxonomies, (taxonomy) => {
		let taxonomyName = taxonomy.labels.singular_name;
		let taxonomySlug = taxonomy.slug;
		let postType = taxonomy.types[0].toString();
		return { postType: postType, value: taxonomySlug, label: taxonomyName };
	});

	// filter taxonomies according to the selected post type
	const filteredTaxonomyList = _.filter(taxonomyList, (taxonomy) => {
		return taxonomy.postType === selectedPostType;
	}).map((taxonomy) => {
		return { value: "taxonomy_" + taxonomy.value, label: taxonomy.label };
	});

	let defaultDisplayOrder = [
		{ value: "image", label: "Image" },
		{ value: "title", label: "Title" },
		{ value: "content", label: "Content" },
		{ value: "excerpt", label: "Excerpt" },
		{ value: "date", label: "Date" },
		{ value: "author", label: "Author Name" },
		{ value: "more", label: "Read more" },
		{ value: "featured_image", label: "Featured image" },
		{ value: "event_date", label: "Event Date [start date - End date]" },
		...filteredTaxonomyList,
	];

	let defaultPopupDisplayOrder = [
		{ value: "image", label: "Image" },
		{ value: "title", label: "Title" },
		{ value: "content", label: "Content" },
		{ value: "excerpt", label: "Excerpt" },
		{ value: "date", label: "Date" },
		{ value: "author", label: "Author Name" },
		{ value: "featured_image", label: "Featured image" },
		{ value: "event_date", label: "Event Date [start date - End date]" },
		...filteredTaxonomyList,
	];

	//Post type dropdown onchange function
	const onChangePostType = (newVal) => {
		setAttributes({selectedPostType: newVal});
		setAttributes({selectedPost: ''});
	};

	//Post dropdown onchange function
	const onChangePosts = (newVal) => {
		setAttributes({ selectedPost: newVal });
	};

	//Image Appearance radio button onselect function
	const onSelectImageAppearance = (newVal) => {
		setAttributes({ imageAppearance: newVal });
	};

	//Anchor Element Appearance radio button onselect function
	const onSelectAnchorAppearance = (newVal) => {
		setAttributes({ anchorAppearance: newVal });
	};

	//Date format on change function
	const onChangeDateFormat = (newVal) => {
		setAttributes({ dateFormat: newVal });
	};

	const onChangeTitleTag = (newVal) => {
		setAttributes({ titleTag: newVal });
	};

	const onChangeDisplayOrder = (newVal) => {
		setAttributes({ displayOrder: newVal });
	};
	const onChangePopupDisplayOrder = (newVal) => {
		setAttributes({ popupDisplayOrder: newVal });
	};

	return [
		<div>
			<InspectorControls>
				<PanelBody title={__("Post Settings", "berg")} initialOpen={true}>
					<SelectControl
						label={__("Post Type", "berg")}
						help={__("Select a post type", "berg")}
						options={filteredPostTypes}
						value={selectedPostType}
						onChange={onChangePostType}
					/>

					<label>{__("Posts", "berg")}</label>
					<SelectControl
						name="post-list"
						label={__("Post", "berg")}
						help={__("Select a post", "berg")}
						value={selectedPost}
						onChange={onChangePosts}
						options={posts}
					/>

					<SelectControl
						label={__("Title Tag", "berg")}
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
						onChange={onChangeTitleTag}
					/>

					<RadioControl
						label={__("Image Appearance", "berg")}
						options={[
							{ label: "Image", value: "image" },
							{ label: "Background", value: "background" },
						]}
						selected={imageAppearance}
						onChange={onSelectImageAppearance}
					/>

					<RadioControl
						label={__("Anchor Element Appearance", "berg")}
						options={[
							{ label: "Wrap All", value: "full" },
							{ label: "Inner Link", value: "inner" },
						]}
						selected={anchorAppearance}
						onChange={onSelectAnchorAppearance}
					/>

					<TextControl
						label={__("Post Date format", "berg")}
						help={__(
							"For more info: https://wordpress.org/support/article/formatting-date-and-time/",
							"berg"
						)}
						value={dateFormat}
						onChange={onChangeDateFormat}
					/>
				</PanelBody>
			</InspectorControls>
		</div>,
		<Disabled>
			<ServerSideRender block="sp-blocks/sp-single-post" attributes={attributes} />
		</Disabled>,
	];
};

const applyWithSelect = withSelect((select, props) => {
	const { selectedPostType } = props.attributes;

	let selectCore = select("core");
	//Get all post types
	let postTypes = selectCore.getPostTypes();

	let query = {
		per_page: -1,
		order: "asc",
		status: "publish",
	};

	// get all posts relevant to selected post type
	let postList = selectCore.getEntityRecords(
		"postType",
		selectedPostType,
		query
	);

	let taxonomies = selectCore.getTaxonomies({ per_page: -1, public: true });

	return {
		postTypes: postTypes,
		postList: postList,
		taxonomies: taxonomies,
	};
});

export default compose(applyWithSelect)(Edit);
