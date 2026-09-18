import GraphNodeParentComponent from "../../components/GraphNodeParentComponent";
import type { NodeData } from "./DataTypes";
import type { Node } from '@xyflow/react';


export type GraphNodeType = Node<NodeData, "nodeData">

export const nodeTypes = {
    graphNode: GraphNodeParentComponent
    
}


