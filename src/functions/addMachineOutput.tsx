import type { OutputIngredientData } from "../assets/types/DataTypes";
import { useGraphDataContext } from "../contexts/GraphDataContext";

export function useAddMachineOutput() {
    const { setNodes } = useGraphDataContext();

    const addMachineOutput = (target_node_id: string) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id !== target_node_id) {
                return node;
            }

            const newOutput: OutputIngredientData = {
                id: crypto.randomUUID(),
                name: "",
                img_filename: "",
                amount: "1",
            }

            return {
                ...node, data: {
                    ...node.data,
                    outputs: [...node.data.outputs, newOutput]
                }
            }

        }))
    }

    return addMachineOutput;

}