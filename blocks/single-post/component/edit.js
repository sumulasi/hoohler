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

const { useEffect, useState } = wp.element;

const Edit = (props) => {
    const {attributes, setAttributes, postTypes, taxonomies} = props;

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

    const [postSelectIsLoading, setPostSelectIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const unwantedPostTypes = ["Media", "Blocks", "Pages"];

    // filter post types and make post list array to use on post type dropdown
  const filteredPostTypes = _.filter(postTypes, (type) => {
    return !unwantedPostTypes.includes(type.name);
  }).map((type) => {
    return { value: type.slug, label: type.name };
  });

  // decodes unicode decimals(ex: &#8216 -> ')
  const decodeUnicodes = (encodedText) => {
    let textArea = document.createElement("textarea");
    textArea.innerHTML = encodedText;
    return textArea.innerText;
  };

  // To decode already saved values
  if (
    typeof selectedPost === "object" &&
    typeof selectedPost.label === "string"
  ) {
    selectedPost.label = decodeUnicodes(selectedPost.label);
  }

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
    setAttributes({ selectedPostType: newVal });
    setAttributes({ selectedPost: "" });
    getPosts("", null, newVal);
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

  //Setting section classes in a state
  const [singlePostClasses, setsinglePostClasses] = useState([]);
  const [defaultClassValues, setDefaultClassValues] = useState([]);

  useEffect(() => {
    if (
      coreComponents["bs-single-post"] &&
      coreComponents["bs-single-post"].length > 0
    ) {
      singlePostClasses.push({
        value: `${coreComponents["bs-single-post"]}`,
        label: "Default",
      });
    } else {
      singlePostClasses.push({
        value: "",
        label: "Select Class",
      });
    }

    if (
      coreComponentsTheme["bs-single-post"] &&
      coreComponentsTheme["bs-single-post"].length > 0
    ) {
      coreComponentsTheme["bs-single-post"].map((className, index) => {
        let classLabel = className.replace("bs-single-post--", "").split("-");
        classLabel.map((word, index) => {
          classLabel[index] = word[0].toUpperCase() + word.slice(1);
        });
        singlePostClasses.push({
          value: className,
          label: classLabel.join(" "),
        });
      });
    }
    const defaultValues = singlePostClassNames
      ? singlePostClassNames
      : [singlePostClasses[0]];

    setDefaultClassValues(defaultValues);
  }, []);

  // Load posts data
  let getPostsTimeout = null;
  const getPosts = (searchQuery, callback, postType) => {
    if (getPostsTimeout != null) clearTimeout(getPostsTimeout);
    getPostsTimeout = setTimeout(() => {
      if (typeof postType === "undefined" || typeof postType !== "string")
        postType = selectedPostType;
      setPostSelectIsLoading(true);
      const query = {
        per_page: 100,
        order: "asc",
        orderby: "title",
        status: "publish",
        search: searchQuery,
      };
      const getData = () =>
        wp.data.select("core").getEntityRecords("postType", postType, query);
      const setPostsData = (postList) => {
        const postsOptions = postList.map((post) => ({
          value: post.id,
          label: decodeUnicodes(post.title.rendered),
        }));
        unstable_batchedUpdates(() => {
          setPostSelectIsLoading(false);
          setPosts(postsOptions);
        });
        if (typeof callback === "function") callback(postsOptions);
      };
      // Request posts data
      let postList = getData();
      // If cached data available return or monitor until request resolved
      if (postList && Array.isArray(postList)) {
        setPostsData(postList);
      } else {
        const unsubscribe = wp.data.subscribe(() => {
          const resolved =
            !wp.data
              .select("core")
              .isResolving("getEntityRecords", ["postType", postType, query]) &&
            wp.data
              .select("core")
              .hasFinishedResolution("getEntityRecords", [
                "postType",
                postType,
                query,
              ]);
          if (resolved) {
            postList = getData();
            if (postList && Array.isArray(postList)) {
              unsubscribe();
              setPostsData(postList);
            }
          }
        });
      }
    }, 700);
  };

    return [
        <InspectorControls>
            <Panel>
                <PanelBody title={__('Section', '')} initialOpen={true}>
                    <TextControl
                        label={__('Class Name', '')}
                        value={sectionClassNames}
                        onChange={(classname) => setAttributes({sectionClassNames: classname})}
                    />
                    <RadioControl
                        label={__('Select Container Type', '')}
                        selected={containerType}
                        options= {[
                            { value: "conatiner", label: 'Conatiner' },
                            { value: "conatiner-fluid", label: 'Conatiner Fluid' }
                        ]}
                        onChange = {(value) => {
                            setAttributes({containerType: value})
                        }}
                    />
                </PanelBody>
            </Panel>
        </InspectorControls>,
        <section className={sectionClassNames}>
            <div className={containerType}>
                <InnerBlocks allowedBlocks={ALLOWED_BLOCK}/>
            </div>
        </section>
    ];
}

export default Edit;