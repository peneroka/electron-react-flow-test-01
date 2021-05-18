import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  useZoomPanHelper,
} from 'react-flow-renderer';
import localforage from 'localforage';

localforage.config({
    name: 'react-flow-docs',
    storeName: 'flows',
  });

const flowKey = 'example-flow';

const getNodeId = () => `randomnode_${+new Date()}`;

const initialElements = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
    { id: 'e1-2', source: '1', target: '2' },
  ];

export default () => {
//   const store = useStore();
//   const { zoomIn, zoomOut, setCenter } = useZoomPanHelper();

//   const focusNode = () => {
//     const { nodes } = store.getState();

//     if (nodes.length) {
//       const node = nodes[0];

//       const x = node.__rf.position.x + node.__rf.width / 2;
//       const y = node.__rf.position.y + node.__rf.height / 2;
//       const zoom = 1.85;

//       setCenter(x, y, zoom);
//     }
//   };

const [rfInstance, setRfInstance] = useState(null);
const [elements, setElements] = useState(initialElements);
const onElementsRemove = (elementsToRemove) =>
  setElements((els) => removeElements(elementsToRemove, els));
const onConnect = (params) => setElements((els) => addEdge(params, els));

  const { transform } = useZoomPanHelper();

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localforage.setItem(flowKey, flow);
    }
  }, [rfInstance]);


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

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setElements((els) => els.concat(newNode));
  }, [setElements]);

  return (
    // <aside>
    //   <div className="description">
    //     This is an example of how you can use the zoom pan helper hook
    //   </div>
    //   <button onClick={focusNode}>focus node</button>
    //   <button onClick={zoomIn}>zoom in</button>
    //   <button onClick={zoomOut}>zoom out</button>
    // </aside>
    <div className="save__controls">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>
        <button onClick={onAdd}>add node</button>
    </div>
  );
};
