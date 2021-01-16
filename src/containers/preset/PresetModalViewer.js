import { connect } from 'react-redux';
import PresetModal from "../../components/preset/PresetModal";
import {getPresets} from "../../utils/storageUtils";
import {changeCorrectLevel, changeIcon, changeParam, changeStyle, changeTitle} from "../../actions";

const mapStateToProps = (state, ownProps) => ({
    visible: ownProps.visible,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClose: ownProps.onClose,
    loadPreset: (preset) => {
        dispatch(changeStyle(preset.selectedIndex, preset.styleName));
        dispatch(changeCorrectLevel(preset.globalParams[0].value));
        dispatch(changeIcon(preset.globalParams[1].value));
        dispatch(changeTitle(preset.globalParams[2].value));
        preset.params.forEach((param, index) => dispatch(changeParam(preset.selectedIndex, index, param.value)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PresetModal);