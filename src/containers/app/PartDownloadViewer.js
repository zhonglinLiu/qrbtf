import {connect} from 'react-redux';
import PartDownload from "../../components/app/PartDownload";
import {saveImg, saveSvg, startTask} from "../../utils/downloader";
import {getDownloadCount, increaseDownloadData, recordDownloadDetail} from "../../api/TcbHandler";
import {fillEmptyWith, getParamDetailedValue, outerHtml} from "../../utils/util";
import {handleDownloadImg, handleDownloadSvg} from "../../utils/gaHelper";
import {appendPreset} from "../../utils/storageUtils";
import {svgToBase64} from "../../utils/imageUtils";
import React from "react";
import ReactDOMServer from "react-dom/server";
import JSZip from "jszip";
import {encodeData} from "../../utils/qrcodeHandler";

function saveDB(state, type, updateDownloadData) {
    return new Promise(resolve => {
        increaseDownloadData(state.value, () => {
            recordDownloadDetail({
                text: state.textUrl,
                value: state.value,
                type: type,
                params: state.paramInfo[state.selectedIndex].map((item, index) => {
                    const value = getParamDetailedValue(item, state.paramValue[state.selectedIndex][index])
                    if (typeof value != "string" || value.length <= 128) {
                        return {
                            key: item.key,
                            value: value
                        }
                    }
                    return {}
                }),
                history: state.history
            }, () => {
                getDownloadCount((res) => {
                    let downloadData = [];
                    res.data.forEach((item) => {
                        downloadData[item.value] = item.count;
                    });
                    updateDownloadData(downloadData);
                    resolve()
                });
            });
        });
    });
}

const mapStateToProps = (state, ownProps) => ({
    value: state.value,
    downloadCount: state.downloadData[state.value],
    batchMode: state.textUrlArray.length > 0,
    onSvgDownload: async () => {
        let data;
        if (state.textUrlArray.length === 0) {
            data = saveSvg(state.value, outerHtml(state.selectedIndex));
            const filename = "QRcode_" + state.value + ".svg";
            startTask(URL.createObjectURL(data), filename);
        } else {
            const zip = new JSZip();
            for (let i = 0; i < state.textUrlArray.length; i++) {
                const qrcode = encodeData({ text: state.textUrlArray[i], correctLevel: state.correctLevel });
                const el = React.createElement(state.rendererType, {
                    qrcode: qrcode,
                    params: fillEmptyWith(state.paramValue[state.selectedIndex].slice(), 0),
                    title: state.title,
                    icon: state.icon,
                    setParamInfo: () => {}
                });
                data = saveSvg(state.value, ReactDOMServer.renderToString(el));
                console.log(data)
                const filename = "QRcode_" + state.value + "_" + i + ".svg";
                zip.file(filename, data);
            }
            const href = URL.createObjectURL(await zip.generateAsync({ type: "blob" }));
            startTask(href, "QRcode_" + state.value + ".zip");
        }

        await saveDB(state, 'svg', ownProps.updateDownloadData);
        handleDownloadSvg(state.value);
        return data;
    },
    onImgDownload: async (type) => {
        let data;
        if (state.textUrlArray.length === 0) {
            data = await saveImg(state.value, outerHtml(state.selectedIndex), 1500, 1500, type);
            const filename = "QRcode_" + state.value + "." + type;
            startTask(data, filename);
        } else {
            const zip = new JSZip();
            for (let i = 0; i < state.textUrlArray.length; i++) {
                const qrcode = encodeData({ text: state.textUrlArray[i], correctLevel: state.correctLevel });
                const el = React.createElement(state.rendererType, {
                    qrcode: qrcode,
                    params: fillEmptyWith(state.paramValue[state.selectedIndex].slice(), 0),
                    title: state.title,
                    icon: state.icon,
                    setParamInfo: () => {}
                });
                data = await saveImg(state.value, ReactDOMServer.renderToString(el), 1500, 1500, type);
                const startIdx = data.indexOf("base64,") + "base64,".length;
                const filename = "QRcode_" + state.value + "_" + i + "." + type;
                zip.file(filename, data.substring(startIdx), {base64: true});
            }
            const href = URL.createObjectURL(await zip.generateAsync({ type: "blob" }));
            startTask(href, "QRcode_" + state.value + ".zip");
        }

        await saveDB(state, type, ownProps.updateDownloadData)
        handleDownloadImg(state.value, type);
        return data;
    },
    savePreset: () => {
        let preset = {
            name: '测试预设',
            selectedIndex: state.selectedIndex,
            preview: svgToBase64(outerHtml(state.selectedIndex), 1500, 1500),
            styleName: state.value,
            params: state.paramInfo[state.selectedIndex].map((paramInfo, index) => {
                return {
                    name: paramInfo.key,
                    value: state.paramValue[state.selectedIndex][index],
                }
            }),
            globalParams: new Array(3),
        };
        preset.globalParams[0] = {name: '容错率', value: state.correctLevel};
        preset.globalParams[1] = {name: '图标', value: state.icon};
        preset.globalParams[2] = {name: '文字', value: state.title};
        appendPreset(preset);
        alert('saved');
    }
})

export default connect(mapStateToProps, null)(PartDownload)
