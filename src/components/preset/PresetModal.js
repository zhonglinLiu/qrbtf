import React, {useState} from "react";
import Modal from "react-modal";
import './Preset.css';
import PropTypes from 'prop-types'
import PresetCard from "./PresetCard";
import PresetDetail from "./PresetDetail";
import ScrollContainer from "react-indiana-drag-scroll";
import {getPresets, removePreset} from "../../utils/storageUtils";

function calClassName(selected) {
    if (selected === true) return 'Qr-item Qr-item-selected';
    return 'Qr-item';
}

const customStyles = {
    content: {
        inset: '40px 60px 40px 60px',
    }
}

const PresetModal = ({ visible, onClose, loadPreset }) => {
    const storedPresets = getPresets();
    const [selected, setSelected] = useState(0);
    const [presets, setPresets] = useState(storedPresets);
    if (presets.length !== storedPresets.length) setPresets(storedPresets);
    return (
        <Modal
            appElement={document.getElementById("root")}
            closeTimeoutMS={100}
            isOpen={visible}
            onRequestClose={onClose}
            style={customStyles}>
            <div className="Qr-preset-container">
                <ScrollContainer
                    className="Qr-div-table Qr-preset-side"
                    vertical={true}
                    horizontal={false}
                    hideScrollbars={false}>
                    {
                        presets.map((preset, index) => (
                            <div
                                key={'preset_' + index}
                                className={calClassName(selected === index)}
                                onClick={() => setSelected(index)}>
                                <PresetCard preset={preset}/>
                            </div>
                        ))
                    }
                </ScrollContainer>
                <div className="Qr-preset-detail">
                    {presets[selected] ? <PresetDetail preset={presets[selected]}/> : null}
                    <div>
                        <button className="dl-btn" onClick={() => {
                            if (presets[selected]) {
                                loadPreset(presets[selected]);
                                onClose();
                            }
                        }}>加载预设</button>
                        <button className="dl-btn" onClick={() => {
                            if (presets[selected]) {
                                removePreset(selected);
                                setPresets(getPresets())
                            }
                        }}>删除预设</button>
                        <button className="dl-btn" onClick={onClose}>取消</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

PresetModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    presetArray: PropTypes.array.isRequired,
    loadPreset: PropTypes.func.isRequired,
}

export default PresetModal;