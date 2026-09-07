import { createContext, useContext, useState } from 'react';
import {
    useNodesState,
    useEdgesState,
    type Node,
    type Edge,
    type OnNodesChange,
    type OnEdgesChange,
} from '@xyflow/react';
import type { NodeData } from '../assets/types/DataTypes';

// Custom node with details
export type GraphDataNode = Node<NodeData>;

// Needs to be empty upon final release
const initialNodes: GraphDataNode[] = [];
const initialEdges: Edge[] = [];

interface FlowContextType {
    nodes: GraphDataNode[];
    setNodes: React.Dispatch<React.SetStateAction<GraphDataNode[]>>;
    onNodesChange: OnNodesChange<GraphDataNode>;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    onEdgesChange: OnEdgesChange<Edge>;
}

const GraphDataContext = createContext<FlowContextType | undefined>(undefined);


export const GraphDataContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<GraphDataNode>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
    return (
        <GraphDataContext.Provider
            value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange }}>
            {children}
        </GraphDataContext.Provider>
    )
}

export function useGraphDataContext() {
    const context = useContext(GraphDataContext);
    if (!context) {
        throw new Error("useGraphDataContext must be used within a GraphDataContextProvider");
    }
    return context;
}
