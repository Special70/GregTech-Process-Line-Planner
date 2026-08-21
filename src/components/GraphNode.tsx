
import type { Node, NodeProps } from '@xyflow/react';
import type { NodeData } from '../assets/types/DataTypes';

type GraphNodeType = Node<NodeData, "nodeData">
export default function GraphNode({ data }: NodeProps<GraphNodeType>) {
    if (data.type == "machine_node") {
    return (
        <>
            <div className="bg-gray-300 min-w-70 min-h-20 flex-1 border rounded-lg" id={data.id}>
                <div className="bg-gray-300 w-full h-20 rounded-lg flex justify-center items-start">

                    <input id={data.id+"_name"} placeholder="Machine Name" className="bg-white border m-2 text-center" autoComplete='off' />
                </div>
            </div>
        </>
    );}
    else {
        return (
            <></>
        )
    }
}