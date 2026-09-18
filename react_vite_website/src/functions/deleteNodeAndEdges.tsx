import { useGraphDataContext, type GraphDataNode } from "../contexts/GraphDataContext";

/**
 * Deletes nodes and its node connections based on node id
 * @returns returns a function called deleteNode() that uses set functions from useGraphDataContext();
 */
export function useDeleteNodeAndEdges()  {
    const { setNodes, setEdges } = useGraphDataContext();

    const deleteNode = (id: string) => {
        setNodes((nodes) => nodes.filter((node)=>node.id != id));
        setEdges((edges) => edges.filter((edge)=> edge.source != id && edge.target != id));
    };

    return deleteNode;
};