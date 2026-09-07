import { useGraphDataContext, type GraphDataNode } from "../contexts/GraphDataContext";

export function useAddSourceNode()  {
    const { setNodes } = useGraphDataContext();

    const addSourceNode = () => {
        const newNode: GraphDataNode = {
            id: crypto.randomUUID(),
            position: { x: 100, y: 100 },
            data: {
                id: crypto.randomUUID(),
                type: 'source_node',
                name: 'NaN',
                inputs: [{
                    id: "1",
                    name: "", 
                    img_filename: "",
                    amount: "Undefined",
                    consume_chance: "Undefined"
                }],
                outputs: [],
                voltage_tier: '',
            },
            type: 'graphNode',
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);
    };

    return addSourceNode;
};