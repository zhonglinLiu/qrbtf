import {connect} from 'react-redux';
import {genQRInfo} from "../../actions";
import React, {useRef} from "react";
import {isPicture} from "../../utils/imageUtils";
import {decodeData} from "../../utils/qrcodeHandler";
import { handleUpload, handleInputUrl } from "../../utils/gaHelper";
import FileImport from "../../components/svg/FileImport";

const InputText = ({dispatch}) => {
    const textRef = useRef();

    return (
        <React.Fragment>
            <div className="Qr-input-upload-div">
                <div className="Qr-input-upload">
                    <label
                        htmlFor="image_scanner"
                        className="Qr-upload"
                        style={{textAlign: "center"}}
                    >
                        <svg className="Qr-upload-svg" version="1.1" id="图层_1" zoomAndPan="disable"
                             xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             viewBox="0 -5 30 40" preserveAspectRatio="none">
                            <g className="st0">
                                <line x1="15" y1="0" x2="15" y2="30"/>
                                <line x1="25" y1="10" x2="15" y2="0"/>
                                <line x1="5" y1="10" x2="15" y2="0"/>
                            </g>
                        </svg>
                    </label>
                    <input
                        type="file"
                        id="image_scanner"
                        hidden={true}
                        accept=".jpg, .jpeg, .png"
                        onClick={(e) => e.target.value = null}
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                const file = e.target.files[0];
                                if (isPicture(file)) {
                                    handleUpload();
                                    decodeData(file).then((res) => {
                                        if (res) {
                                            textRef.current.value = res.data;
                                            dispatch(genQRInfo(res.data))
                                        }
                                    }).catch(console.err);
                                }
                            }
                        }}
                    />
                    <input
                        className="Qr-input big-input"
                        placeholder="https://qrbtf.com"
                        ref={textRef}
                        onBlur={(e) => {
                            handleInputUrl();
                            dispatch(genQRInfo(e.target.value))
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                dispatch(genQRInfo(e.target.value));
                                handleInputUrl();
                                e.target.blur();
                            }
                        }}
                    />
                    <label htmlFor="text_import" className="Qr-upload">
                        <FileImport />
                    </label>
                    <input
                        type="file"
                        id="text_import"
                        hidden={true}
                        accept={".txt"}
                        onClick={(e) => e.target.value = null}
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                const file = e.target.files[0];
                                if (file.type === "text/plain") {
                                    const fileReader = new FileReader();
                                    fileReader.onload = function(event) {
                                        const lines = event.target.result
                                            .split(/[\r\n]+/g)
                                            .map(line => line.trim())
                                            .filter(line => line.length > 0);
                                        console.log(lines)
                                        if (lines.length > 0) {
                                            textRef.current.value = lines[0];
                                            dispatch(genQRInfo(lines))
                                        }
                                    }
                                    fileReader.readAsText(file, "UTF-8");
                                }
                            }
                        }}
                    />
                </div>
                <div className="Qr-input-hint">
                    上传普通二维码、输入网址或上传 txt 文本批量生成
                </div>
            </div>
        </React.Fragment>);
}

export default connect()(InputText);
