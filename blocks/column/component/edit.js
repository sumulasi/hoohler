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

const Edit = (props) => {
    const {attributes, setAttributes} = props;

    const {
        sizeXs,
        sizeSm,
        sizeMd,
        sizeLg,
        sizeXl,
        sizeXsClass,
        sizeSmClass,
        sizeMdClass,
        sizeLgClass,
        sizeXlClass,
        xsFlexClassNames,
        smFlexClassNames,
        mdFlexClassNames,
        lgFlexClassNames,
        xlFlexClassNames,
    } = attributes;

    return [
        <InspectorControls>
            <Panel>
                <PanelBody title={__('Column Size', '')} initialOpen={false}>
                    <RangeControl
                        label={__('XS Column Count', '')}
                        value={sizeXs}
                        min={0}
                        max={12}
                        onChange={(size) => setAttributes({sizeXs: size, sizeXsClass: size > 0 ? `col-xs-${size}` : ''})}
                    />
                    <RangeControl
                        label={__('SM Column Count', '')}
                        value={sizeSm}
                        min={0}
                        max={12}
                        onChange={(size) => setAttributes({sizeSm: size, sizeSmClass: size > 0 ? `col-sm-${size}` : ''})}
                    />
                    <RangeControl
                        label={__('MD Column Count', '')}
                        value={sizeMd}
                        min={0}
                        max={12}
                        onChange={(size) => setAttributes({sizeMd: size, sizeMdClass: size > 0 ? `col-md-${size}` : ''})}
                    />
                    <RangeControl
                        label={__('LG Column Count', '')}
                        value={sizeLg}
                        min={0}
                        max={12}
                        onChange={(size) => setAttributes({sizeLg: size, sizeLgClass: size > 0 ? `col-lg-${size}` : ''})}
                    />
                    <RangeControl
                        label={__('XL Column Count', '')}
                        value={sizeXl}
                        min={0}
                        max={12}
                        onChange={(size) => setAttributes({sizeXl: size, sizeXlClass: size > 0 ? `col-xl-${size}` : ''})}
                    />
                </PanelBody>
            </Panel>
        </InspectorControls>,
        <div className={`column ${sizeXsClass} ${sizeSmClass} ${sizeMdClass} ${sizeLgClass} ${sizeXlClass}`}>
            <InnerBlocks />
        </div>
    ];
}

export default Edit;