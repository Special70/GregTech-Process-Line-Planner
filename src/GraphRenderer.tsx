import './index.css'
import gregtech_icon from './assets/images/gregtech.webp'
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useGraphDataContext } from './contexts/GraphDataContext';
import { nodeTypes } from './assets/types/NodeTypes';
import { useAddMachineNode } from './functions/addMachineNode';

function GraphRenderer() {
  const { nodes, edges, onNodesChange, onEdgesChange, setNodes, setEdges } = useGraphDataContext();


  return (
    <>
      <div className="w-screen h-screen  flex flex-row">
        <div className=" w-1/8 min-w-50 mr-auto bg-gray-500 flex-row shadow-2xl">
          <img src={gregtech_icon} className="w-1/2 m-auto p-3 " />
          <div className="text-2xl text-center p-3 font-[Minecraft]">
            GregTech Process Line Planner
          </div>
          <div className="text-1xl p-3 bg-gray-700 font-[Minecraft] text-white w-3/4 text-center m-auto border-2 hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900" onClick={useAddMachineNode()}>
            Create New Source Node

          </div>
          <div className="text-1xl p-3 bg-gray-700 font-[Minecraft] text-white w-3/4 text-center m-auto border-2 mt-2 hover:cursor-pointer hover:bg-gray-80 hover:bg-gray-800 active:bg-gray-900">
            Create New Machine Node
          </div>
          <div className="text-1xl p-3 bg-gray-700 font-[Minecraft] text-white w-3/4 text-center m-auto border-2 mt-2 hover:cursor-pointer hover:bg-gray-80 hover:bg-gray-800 active:bg-gray-900">
            Import/Export Graphs
          </div>
        </div>
        <div className="w-7/8 bg-white">
          <ReactFlow
  nodes={nodes}
  edges={edges}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  nodeTypes={nodeTypes}
  >
            <Background gap={20} />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </>
  )
}

export default GraphRenderer
