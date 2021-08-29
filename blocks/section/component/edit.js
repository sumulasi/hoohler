const { __ } = wp.i18n;
const {
	InspectorControls,
    InnerBlocks
} = wp.editor;

const { 
    Panel,
    PanelBody,
	RadioControl,
    TextControl,
 } = wp.components;

const ALLOWED_BLOCK = ['sp-blocks/row']

const Edit = (props) => {
    const {attributes, setAttributes} = props;

    const {
        containerType,
        sectionClassNames,
    } = attributes;

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
                            { value: "container", label: 'Container' },
                            { value: "container-fluid", label: 'Container Fluid' }
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