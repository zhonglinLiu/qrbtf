import React from "react";
import PropTypes from 'prop-types';

const ParamLabel = ({ params, label }) => (
    params.map((param, index) => {
        if (param.value.length > 30) return null;
        return (
            <table key={label + '_' + index} className="Qr-table">
                <tbody>
                <tr>
                    <td>{param.name}</td>
                    <td>{param.value}</td>
                </tr>
                </tbody>
            </table>
        )
    })
)

const PresetDetail = ({ preset }) => (
    <div className="Qr-Centered">
        <div id="dl-image">
            <div id="dl-image-inner">
                <img id="dl-image-inner-jpg" src={preset.preview}/>
            </div>
        </div>
        <div>
            <table className="Qr-table">
                <tbody><tr>
                    <td>样式名</td>
                    <td>{preset.styleName}</td>
                </tr></tbody>
            </table>
            <ParamLabel params={preset.params} label="preset_param"/>
        </div>
    </div>
);

PresetDetail.propTypes = {
    preset: PropTypes.shape({
        name: PropTypes.string.isRequired,
        styleName: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired,
        globalParams: PropTypes.array.isRequired,
        params: PropTypes.array.isRequired,
    })
}

export default PresetDetail;