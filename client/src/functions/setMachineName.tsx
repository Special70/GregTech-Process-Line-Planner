import { useGraphDataContext } from "../contexts/GraphDataContext";

export function useSetMachineName() {
    const { setNodes } = useGraphDataContext();

    const setMachineName = (target_node_id: string, machineName: string) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id !== target_node_id) {
                return node;
            }
            return {
                ...node, data: {
                    ...node.data,
                    name: machineName
                }
            }
            
            
        }));
    }

    return setMachineName;

}