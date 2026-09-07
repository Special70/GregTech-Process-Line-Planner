import type { InputIngredientData } from "../assets/types/DataTypes";
import { useGraphDataContext } from "../contexts/GraphDataContext";

export function useAddMachineInput() {
    const { setNodes } = useGraphDataContext();

    const addMachineInput = (target_node_id: string) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id !== target_node_id) {
                return node;
            }

            const newInput: InputIngredientData = {
                id: crypto.randomUUID(),
                name: "",
                img_filename: "",
                amount: "",
                consume_chance: ""
            }

            return {
                ...node, data: {
                    ...node.data,
                    inputs: [...node.data.inputs, newInput]
                }
            }

        }))
    }

    return addMachineInput;

}