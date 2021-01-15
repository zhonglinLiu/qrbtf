import React from 'react';
import '../Qrcode.css';

const FrameworkParam = ({ paramName, children, ...other }) => (
    <table className="Qr-table" {...other}>
        <tbody>
        <tr>
            <td>{ paramName }</td>
            <td>
                { children }
            </td>
        </tr>
        </tbody>
    </table>
)

export default FrameworkParam;
