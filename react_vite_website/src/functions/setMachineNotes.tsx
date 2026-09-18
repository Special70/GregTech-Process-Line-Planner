import { useGraphDataContext } from "../contexts/GraphDataContext";

export function useSetMachineNotes() {
    const { setNodes } = useGraphDataContext();

    const setMachineNotes = (target_node_id: string, notes: string) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id !== target_node_id) {
                return node;
            }
            return {
                ...node, data: {
                    ...node.data,
                    other_info: notes
                }
            }
            
            
        }));
    }

    return setMachineNotes;

}