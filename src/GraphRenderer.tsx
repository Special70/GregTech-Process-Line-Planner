import './index.css'
import { ReactFlow, Background, Controls, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useGraphDataContext } from './contexts/GraphDataContext';
import { nodeTypes } from './assets/types/NodeTypes';
import { useAddMachineNode } from './functions/addMachineNode';
import { useAddSourceNode } from './functions/addSourceNode';
import { useCallback, useEffect } from 'react';
import { LeftSideViewManager } from './components/LeftSideViewManager';

function GraphRenderer() {
  const { nodes, edges, onNodesChange, onEdgesChange, setNodes, setEdges } = useGraphDataContext();

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params }, eds)),
    [],
  );

  return (
    <>
      <div className="shadow-2xl absolute z-100">
        <LeftSideViewManager />
      </div>
      <div className="w-screen h-screen  flex flex-row">
        <div className="w-full bg-white">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            snapToGrid={true}
            minZoom={0.1}
            maxZoom={5}

            defaultEdgeOptions={{
              animated: true,
              style: { stroke: 'black' },
              zIndex: 1000,
            }}
          >
            <Background gap={20} />
            <Controls position='bottom-right'/>
          </ReactFlow>
        </div>
      </div>
    </>
  )
}

export default GraphRenderer
