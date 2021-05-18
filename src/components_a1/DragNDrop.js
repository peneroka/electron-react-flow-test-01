import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
    useZoomPanHelper,
    Background,
    isNode,
    useStoreState,
} from 'react-flow-renderer';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';

// import Sidebar from './dndSidebar';

import './dnd.css';
import localforage from 'localforage';
import './save.css';

import { CustomNode01_000, CustomNode01_090 , CustomNode01_180 , CustomNode01_270 } from './CustomNode'
const nodeTypes = {
    custom01_000: CustomNode01_000,
    custom01_090: CustomNode01_090,
    custom01_180: CustomNode01_180,
    custom01_270: CustomNode01_270,
};

const initialElements = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 5 },
    },
];

// let id = 0;
// const getId = () => `dndnode_${id++}`;
const getId = () => `dndnode_${(new Date()).getTime()}`;


// BGN - SaveRestore
localforage.config({
    name: 'react-flow-docs',
    storeName: 'flows',
});

const flowKey = 'example-flow';
// END - SaveRestore


// BGN - ElementConfig
const ConfigBox = (props) => {
    const [configUpdateMode, setConfigUpdateMode] = useState("onChange");
    const onChangeUpdate = (a) => {
        setConfigUpdateMode(a);
        console.log("radio button change", a);
    }

    const allNodes = useStoreState((store) => store.nodes);
    const allEdges = useStoreState((store) => store.edges);

    if (props.currentSelectedElementId === null) {
        return (<div>No element selected</div>)
    }
    else {
        function getCurrentElement(value) {
            var result = [];
            allNodes.forEach(function (o) { if (o.id === value) result.push(o); });
            if (result) { allEdges.forEach(function (o) { if (o.id === value) result.push(o) }) }
            return result ? result[0] : null; // or undefined
        }
        const bufferConfigElement = getCurrentElement(props.currentSelectedElementId);

        const elementConfigChangeHandler = () => {
            // props.setCurrentSelectedElement(bufferConfigElement);
            props.setElements((els) =>
                els.map((el) => {
                    if (bufferConfigElement === null) {
                        return el
                    }
                    else {
                        if (el.id === bufferConfigElement.id) {
                            // el = currentSelectedElement;
                            el.data = {
                                ...el.data,
                                label: bufferConfigElement.data.label,
                            };
                        }
                        return el
                    }
                })
            );
        }
        const dataLabel_inputHandler = (event) => { bufferConfigElement.data.label = event.target.value };

        if (isNode(bufferConfigElement)) {
            return (
                <div onChange={(configUpdateMode === "onChange") ? elementConfigChangeHandler : null}>
                    <div>element id: {bufferConfigElement.id}</div>
                    <div>element type: {(isNode(bufferConfigElement)) ? "node" : "edge"}</div>
                    <input value={bufferConfigElement.data.label} onChange={dataLabel_inputHandler} />
                    <label>Element config update mode:</label>
                    <RadioGroup onChange={onChangeUpdate} value={configUpdateMode} horizontal>
                        <RadioButton value="onChange">
                            on change
                    </RadioButton>
                        <ReversedRadioButton value="onSubmit">
                            on submit
                    </ReversedRadioButton>
                    </RadioGroup>
                </div>
            )
        }
        else {
            return (
                <div onChange={(configUpdateMode === "onChange") ? elementConfigChangeHandler : null}>
                    <div>element id: {bufferConfigElement.id}</div>
                    <div>element type: {(isNode(bufferConfigElement)) ? "node" : "edge"}</div>
                    <label>Element config update mode:</label>
                    <RadioGroup onChange={onChangeUpdate} value={configUpdateMode} horizontal>
                        <RadioButton value="onChange">
                            on change
                    </RadioButton>
                        <ReversedRadioButton value="onSubmit">
                            on submit
                    </ReversedRadioButton>
                    </RadioGroup>
                </div>
            )
        }
    }

}
// END - ElementConfig

// BGN - RotateNodeHandle
const RotateNodeHandle = (props) => {
    const buttonClickHandler = () => {
        props.setElements((els) =>
            els.map((el) => {
                if (props.currentSelectedElementId === null) {
                    return el
                }
                else {
                    if (el.id === props.currentSelectedElementId) {
                        // el.data = {
                        //     ...el.data,
                        //     label: bufferConfigElement.data.label,
                        // };
                        var newType = (el.type.slice(0, -3)).concat((((parseInt(el.type.slice(-3)) + 90) % 360).toString()).padStart(3, '0'))
                        console.log(newType)
                        el.type = newType;
                    }
                    return el
                }
            })
        );
    }

    return (
        <button onClick={buttonClickHandler}>rotate handle  90 ccw</button>
    )
}
// END - RotateNodeHandle


const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const [elements, setElements] = useState(initialElements);
    const onConnect = (params) => setElements((els) => addEdge(params, els));
    const onElementsRemove = (elementsToRemove) => {
        setCurrentSelectedElementId(null)
        setElements((els) => removeElements(elementsToRemove, els));
    }

    const onLoad = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);


    // BGN - ELementConfig
    // const [currentSelectedElement, setCurrentSelectedElement] = useState(null);
    const [currentSelectedElementId, setCurrentSelectedElementId] = useState(null);
    // const currentSelectedElement = JSON.parse(JSON.stringify(useStoreState((s) => s.selectedElements)));
    // const currentSelectedElement = useStoreState((s) => s.selectedElements);

    const onNodeDragStop = (event, node) => {
        // console.log('drag stop', node);
        setCurrentSelectedElementId(node.id);
    };
    const onElementClick = (event, element) => {
        // console.log('click', element, element.id);
        setCurrentSelectedElementId(element.id);
    };
    const onPaneClick = (event) => {
        // console.log("on pane click", event);
        setCurrentSelectedElementId(null);
    }

    // useEffect(() => {
    //     setElements((els) =>
    //         els.map((el) => {
    //             if (currentSelectedElement === null) {
    //                 return el
    //             }
    //             else {
    //                 if (el.id === currentSelectedElement.id) {
    //                     // el = currentSelectedElement;
    //                     el.data = {
    //                         ...el.data,
    //                         label: currentSelectedElement.data.label,
    //                     };
    //                 }
    //                 return el
    //             }
    //         })
    //     );
    // }, [currentSelectedElement, setElements]);

    // END - ELementConfig



    // BGN - SaveRestore
    const onSave = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            localforage.setItem(flowKey, flow);
        }
    }, [reactFlowInstance]);

    const { transform } = useZoomPanHelper();

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = await localforage.getItem(flowKey);

            if (flow) {
                const [x = 0, y = 0] = flow.position;
                setElements(flow.elements || []);
                transform({ x, y, zoom: flow.zoom || 0 });
            }
        };

        restoreFlow();
    }, [setElements, transform]);

    //   const onAdd = useCallback(() => {
    //     const newNode = {
    //       id: getId(),
    //       data: { label: 'Added node' },
    //       position: {
    //         x: Math.random() * window.innerWidth - 100,
    //         y: Math.random() * window.innerHeight,
    //       },
    //     };
    //     setElements((els) => els.concat(newNode));
    //   }, [setElements]);
    // END - SaveRestore


    // BGN - DragNDrop
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
            id: getId(),
            type,
            position,
            data: { label: `${type} node` },
        };

        setElements((es) => es.concat(newNode));
    };
    // END - DragNDrop


    // BGN - Save to text
    // https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
    const save2text = useCallback(() => {
        if (reactFlowInstance) {
            const originalData = reactFlowInstance.toObject();

            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([JSON.stringify(originalData, null, 2)], {
                type: "text/plain"
            }));
            a.setAttribute("download", `flowdata_${(new Date()).getTime()}.txt`);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }, [reactFlowInstance]);
    // END - Save to text


    // BGN - Load From Text
    const [loadedFlow, setLoadedFlow] = useState(null);

    const text2node = () => {
        if (loadedFlow) {
            console.log("f3");
            const [x = 0, y = 0] = loadedFlow.position;
            setElements(loadedFlow.elements || []);
            transform({ x, y, zoom: loadedFlow.zoom || 0 });
        }
    };

    const onChangeHandler = (event) => {
        try {
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                const parsedflowfromtxt = JSON.parse(textFromFileLoaded);
                setLoadedFlow(parsedflowfromtxt);
            };
            fileReader.readAsText(event.target.files[0], "UTF-8");
        }
        catch {
            console.log("No file chosen.")
        }
    }
    // END - Load From Text




    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        elements={elements}
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onElementClick={onElementClick}
                        onNodeDragStop={onNodeDragStop}
                        onPaneClick={onPaneClick}
                        nodeTypes={nodeTypes}
                    >
                        <Controls />
                        <Background />

                    </ReactFlow>
                </div>

                <aside>
                    <div className="save__controls">
                        <button onClick={onSave}>save</button>
                        <button onClick={onRestore}>restore</button>
                        <button onClick={save2text}>download</button>
                    </div>

                    <div className="description">You can drag these nodes to the pane on the right.</div>
                    <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>Input Node</div>
                    <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>Default Node</div>
                    <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>Output Node</div>
                    <div className="dndnode" onDragStart={(event) => onDragStart(event, 'custom01_000')} draggable>Custom01</div>


                    <input type="file" name="file" onChange={onChangeHandler} />
                    <button type="button" className="btn btn-success btn-block" onClick={text2node}>Upload</button>

                    <ConfigBox
                        currentSelectedElementId={currentSelectedElementId}
                        // setCurrentSelectedElement={setCurrentSelectedElement}
                        setElements={setElements}
                    />

                    <RotateNodeHandle
                        currentSelectedElementId={currentSelectedElementId}
                        setElements={setElements}
                    />
                </aside>


            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;