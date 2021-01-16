import React from "react";
import PropTypes from 'prop-types';

const PresetCard = ({ preset }) => (
    <div className="Qr-Centered">
        <div className="Qr-item-image">
            <div className="Qr-item-image-inner">
                <img id="dl-image-inner-jpg" src={preset.preview}/>
            </div>
        </div>
        <div className="Qr-item-detail">
            {preset.name}
        </div>
    </div>
);

PresetCard.propTypes = {
    preset: PropTypes.shape({
        name: PropTypes.string.isRequired,
        styleName: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired,
        params: PropTypes.array.isRequired,
    })
}

export default PresetCard;