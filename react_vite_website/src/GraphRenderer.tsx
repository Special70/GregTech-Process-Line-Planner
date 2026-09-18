import './index.css'
import { ReactFlow, Background, Controls, addEdge, type Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useGraphDataContext } from './contexts/GraphDataContext';
import { nodeTypes } from './assets/types/NodeTypes';
import { useCallback, useRef } from 'react';
import { LeftSideViewManager } from './components/LeftSideViewManager';
import { useCopyOutputMaterialToInput } from './functions/copyOutputMaterialToInput';
import { useClientViewHandlerContext } from './contexts/ClientViewHandlerContext';
import { resolveCollisions } from './functions/resolveCollisions';

function GraphRenderer() {
  const { nodes, edges, onNodesChange, onEdgesChange, setEdges, setNodes } = useGraphDataContext();
  const copyOutputMaterialToInput = useCopyOutputMaterialToInput();
  const { divWrapperRef } = useClientViewHandlerContext();

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({ ...params }, eds))

      const { source, sourceHandle, target, targetHandle } = params
      copyOutputMaterialToInput(source, sourceHandle!, target, targetHandle!);
    }, [],
  );
  
  /**
   * To handle node collisions
   */
  const onNodeDragStop = useCallback(() => {
    setNodes((nds) => {
      const resolvedNodes = resolveCollisions(nds, {
        maxIterations: Infinity,
        overlapThreshold: 0.5,
        margin: 15,
      });

      return resolvedNodes as unknown as typeof nds;
    });
  }, [setNodes]);

  return (
    <>
      <div className="shadow-2xl absolute z-100">
        <LeftSideViewManager />
      </div>
      <div className="w-screen h-screen  flex flex-row">
        <div className="w-full bg-white" ref={divWrapperRef}>
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
            onNodeDragStop={onNodeDragStop}

            defaultEdgeOptions={{
              animated: true,
              style: { stroke: 'black' },
              zIndex: 1000,
            }}
          >
            <Background gap={20} />
            <Controls position='bottom-right' />
          </ReactFlow>
        </div>
      </div>
    </>
  )
}

export default GraphRenderer
