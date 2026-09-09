import { useGraphDataContext } from "../contexts/GraphDataContext";

export function useSetMachineProgrammingCircuit() {
    const { setNodes } = useGraphDataContext();

    const setMachineProgrammingCircuit = (target_node_id: string, programmingCircuit: string) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id !== target_node_id) {
                return node;
            }
            return {
                ...node, data: {
                    ...node.data,
                    programmingCircuit: programmingCircuit
                }
            }
            
            
        }));
    }

    return setMachineProgrammingCircuit;

}