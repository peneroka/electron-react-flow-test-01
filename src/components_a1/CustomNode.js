import React from 'react';
import { Handle } from 'react-flow-renderer';
import './customnode.css';

// const elements = [
//     {
//         id: '2',
//         type: 'special',
//         position: { x: 100, y: 100 },
//         data: { label: 'A custom node' },
//     },
// ];

const customNodeStyles = {
    background: '#9CA8B3',
    color: '#FFF',
    padding: 10,
};

const customNodeStylesB = {
    background: '#1ae135',
    color: '#FFF',
    padding: 10,
    width: 100,
    height: "100px",
};

const CustomNode01_000 = ({ data }) => {
    return (
        <div
            className="customNodeContainer"
            style={customNodeStyles}
        >
            <Handle type="target" position="left" style={{ borderRadius: 0 }} id="input01" />
            {/* <div>{data.label}</div> */}
            {/* <img src={symbolImg} alt="symbol_image" /> */}
            <div className="symbolContainerA" style={customNodeStylesB}>DummyA</div>
            <Handle
                type="source"
                position="right"
                id="output01"
                style={{ 
                    top: '30%', 
                    borderRadius: 0 }}
            />
            <Handle
                type="source"
                position="right"
                id="output02"
                style={{ 
                    top: '50%', 
                    borderRadius: 0 }}
            />
        </div>
    );
};


const CustomNode01_090 = ({ data }) => {
    return (
        <div
            className="customNodeContainer"
            style={customNodeStyles}
        >
            <Handle type="target" position="bottom" style={{ borderRadius: 0 }} id="input01" />
            {/* <div>{data.label}</div> */}
            {/* <img src={symbolImg} alt="symbol_image" /> */}
            <div className="symbolContainerA" style={customNodeStylesB}>DummyA</div>
            <Handle
                type="source"
                position="top"
                id="output01"
                style={{ 
                    left: '30%', 
                    borderRadius: 0 }}
            />
            <Handle
                type="source"
                position="top"
                id="output02"
                style={{ 
                    left: '50%', 
                    borderRadius: 0 }}
            />
        </div>
    );
};


const CustomNode01_180 = ({ data }) => {
    return (
        <div
            className="customNodeContainer"
            style={customNodeStyles}
        >
            <Handle type="target" position="right" style={{ borderRadius: 0 }} id="input01" />
            {/* <div>{data.label}</div> */}
            {/* <img src={symbolImg} alt="symbol_image" /> */}
            <div className="symbolContainerA" style={customNodeStylesB}>DummyA</div>
            <Handle
                type="source"
                position="left"
                id="output01"
                style={{ 
                    top: '70%', 
                    borderRadius: 0 }}
            />
            <Handle
                type="source"
                position="left"
                id="output02"
                style={{
                    top: '50%', 
                    borderRadius: 0 }}
            />
        </div>
    );
};

const CustomNode01_270 = ({ data }) => {
    return (
        <div
            className="customNodeContainer"
            style={customNodeStyles}
        >
            <Handle type="target" position="top" style={{ borderRadius: 0 }} id="input01" />
            {/* <div>{data.label}</div> */}
            {/* <img src={symbolImg} alt="symbol_image" /> */}
            <div className="symbolContainerA" style={customNodeStylesB}>DummyA</div>
            <Handle
                type="source"
                position="bottom"
                id="output01"
                style={{ 
                    left: '70%', 
                    borderRadius: 0 }}
            />
            <Handle
                type="source"
                position="bottom"
                id="output02"
                style={{ 
                    left: '50%', 
                    borderRadius: 0 }}
            />
        </div>
    );
};

// const nodeTypes = {
//     special: CustomNode01,
// };

// const CustomNodeExample = () => {
//     return (
//         <div style={{ height: 300 }}>
//             <ReactFlow elements={elements} nodeTypes={nodeTypes} />
//         </div>
//     );
// };

// export default CustomNodeExample;
export {
    CustomNode01_000,
    CustomNode01_090,
    CustomNode01_180,
    CustomNode01_270
};