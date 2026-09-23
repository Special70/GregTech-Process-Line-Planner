import { useGraphDataContext } from "../contexts/GraphDataContext";

export function useSetMachineVoltageLevel() {
    const { setNodes } = useGraphDataContext();

    const setMachineVoltageLevel = (target_node_id: string, voltage_tier: string) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id !== target_node_id) {
                return node;
            }
            return {
                ...node, data: {
                    ...node.data,
                    voltage_tier: voltage_tier
                }
            }
            
            
        }));
    }

    return setMachineVoltageLevel;

}