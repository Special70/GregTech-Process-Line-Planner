
import type { Node, NodeProps } from '@xyflow/react';
import type { NodeData } from '../assets/types/DataTypes';
import MachineNode from './nodes/MachineNode';
import type { GraphNodeType } from '../assets/types/NodeTypes';
import SourceNode from './nodes/SourceNode';

/**
 * The main component for creating nodes in the graph. 
 * @param props 
 * @returns 
 */
export default function GraphNodeParentComponent(props: NodeProps<GraphNodeType>) {
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