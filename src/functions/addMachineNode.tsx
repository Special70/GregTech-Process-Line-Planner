import { useGraphDataContext, type GraphDataNode } from "../contexts/GraphDataContext";

export function useAddMachineNode()  {
    const { setNodes } = useGraphDataContext();

    const addMachineNode = () => {
        const newNode: GraphDataNode = {
            id: crypto.randomUUID(),
            position: { x: 100, y: 100 },
            data: {
                id: crypto.randomUUID(),
                type: 'machine_node',
                name: '',
                inputs: [],
                outputs: [],
                voltage_tier: '',
            },
            type: 'graphNode',
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);
    };

    return addMachineNode;
};