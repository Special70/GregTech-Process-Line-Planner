
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import type { GraphNodeType } from '../assets/types/NodeTypes';

function SourceNode(props: NodeProps<GraphNodeType>) {
    return <div className="bg-gray-300 min-w-70 min-h-20 flex-1 border rounded-lg" id={props.data.id}>
            <Handle type="source" position={Position.Top} isConnectable={true} 
            id={props.data.id+"top"}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue", 
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
            <Handle type="source" position={Position.Bottom} isConnectable={true} 
            id={props.data.id+"bottom"}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue", 
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
            <Handle type="source" position={Position.Left} isConnectable={true} 
            id={props.data.id+"left"}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue", 
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
            <Handle type="source" position={Position.Right} isConnectable={true} 
            id={props.data.id+"right"}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue", 
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
        <div className="bg-gray-300 w-full h-20 rounded-lg flex justify-center items-center flex-col">
            <div>
                Resource Source
            </div>
            <input id={props.data.id + "_name"} placeholder="Source Name" className="bg-white border m-2 text-center" autoComplete='off' />
        </div>
    </div>;
}

export default SourceNode;