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
    TextControl,
    SelectControl
 } = wp.components;

const ALLOWED_BLOCK = ['sp-blocks/column']

const Edit = (props) => {
    const {attributes, setAttributes} = props;

    const {
        justifyContentClass,
        directionClass
    } = attributes;

    return [
        <InspectorControls>
            <Panel>
                <PanelBody title={__('Row', '')} initialOpen={true}>
                    <SelectControl
                        label={__('Justify Content Classes', '')}
                        value={justifyContentClass}
                        options={[
                            { value: "", label: 'Select Class' },
                            { value: "justify-content-start", label: 'Justify-Content-Start' },
                            { value: "justify-content-end", label: 'Justify-Content-End' },
                            { value: "justify-content-center", label: 'Justify-Content-Center' },
                            { value: "justify-content-between", label: 'Justify-Content-Between' },
                            { value: "justify-content-around", label: 'Justify-Content-Around' },
                        ]}
                        onChange={(value) => setAttributes({justifyContentClass: value})}
                    />
                    <SelectControl
                        label={__('Row Direction Classes', '')}
                        value={directionClass}
                        options={[
                            { value: "", label: 'Select Class' },
                            { value: "flex-sm-row-reverse", label: 'SM-Row-Reverse' },
                            { value: "flex-md-row-reverse", label: 'MD-Row-Reverse' },
                            { value: "flex-lg-row-reverse", label: 'LG-Row-Reverse' },
                            { value: "flex-xl-row-reverse", label: 'XL-Row-Reverse' },
                        ]}
                        onChange={(value) => setAttributes({directionClass: value})}
                    />
                </PanelBody>
            </Panel>
        </InspectorControls>,
        <div className={`row ${justifyContentClass} ${directionClass}`}>
            <InnerBlocks allowedBlocks={ALLOWED_BLOCK}/>
        </div>
    ];
}

export default Edit;