
import type { Node, NodeProps } from '@xyflow/react';
import type { NodeData } from '../assets/types/DataTypes';
import MachineNode from './MachineNode';
import type { GraphNodeType } from '../assets/types/NodeTypes';
import SourceNode from './SourceNode';

export default function GraphNode(props: NodeProps<GraphNodeType>) {
    if (props.data.type == "machine_node") {
    return (
        <>
           <MachineNode {...props}/>
        </>
    );}

    else if (props.data.type == "source_node") {
        return (
            <SourceNode {...props}/>
        )
    }
    else {
        return (
            <></>
        )
    }
}