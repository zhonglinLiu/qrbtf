import React from "react";
import '../Qrcode.css';
import LinkTrace from "../link/LinkTrace";

const currentYear = new Date().getFullYear();

const PartFooter = () => (
    <div className="Qr-titled">
        <div className="Qr-Centered Qr-footer note-font">
            <div className="Qr-footer-part">
                <strong>作者</strong>&emsp;
                <LinkTrace
                    href="https://www.zhihu.com/people/cai-niao-82-86"
                    rel="noopener noreferrer"
                    target="_blank">ciaochaos
                </LinkTrace>&emsp;
                <span className="gray">&ensp;丨&ensp;</span>
                {/* <span><LinkTrace href="https://www.yuque.com/qrbtf/docs/privacy" rel="noopener noreferrer"
                                 target="_blank">隐私政策</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://www.yuque.com/qrbtf/docs/terms" rel="noopener noreferrer"
                                 target="_blank">使用条款</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span> */}
                <span><LinkTrace href="mailto:hi.life@qq.com?subject=qrCode" rel="noopener noreferrer" target="_blank">
                    联系我们</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
            </div>

            <div className="Qr-footer-part">
                <strong>更多产品</strong>&emsp;
                <span><LinkTrace href="https://mango.wehere.top/tools/" rel="noopener noreferrer"
                         target="_blank">在线工具箱</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://app.wehere.top/" rel="noopener noreferrer"
                         target="_blank">淘宝优惠券</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://mango.wehere.top/tools/markdown" rel="noopener noreferrer"
                         target="_blank">markdown编辑器</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://app.wehere.top/periodic-table/index.html"
                         rel="noopener noreferrer" target="_blank">元素周期表</LinkTrace></span>
            </div>

            <div className="Qr-footer-part">
                <strong>致谢</strong>&emsp;
                <span><LinkTrace href="https://github.com/davidshimjs/qrcodejs" rel="noopener noreferrer"
                                 target="_blank">Sangmin, Shim</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://github.com/cozmo/jsQR" rel="noopener noreferrer"
                                 target="_blank">Cosmo Wolfe</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
            </div>

            <div className="Gray">
                Copyright © {currentYear} hi.life@qq.com. 保留所有权利。<br/>
                <LinkTrace href="http://www.beian.miit.gov.cn/"
                   rel="noopener noreferrer" target="_blank">
                    豫ICP备17025106号
                </LinkTrace>
            </div>
        </div>
    </div>
)

export default PartFooter
