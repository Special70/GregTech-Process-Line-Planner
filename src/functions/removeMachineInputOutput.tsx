import { useGraphDataContext } from "../contexts/GraphDataContext";

export function useRemoveMachineInputOutput() {
    const { setNodes } = useGraphDataContext();

    const removeMachineInputOutput = (target_node_id: string, inputOrOutput: string, ingredientID: string) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id !== target_node_id) {
                return node;
            }

            if (inputOrOutput === "input") {
                return {
                    ...node, data: {
                        ...node.data,
                        inputs: node.data.inputs.filter((input) => input.id !== ingredientID)
                    }
                }
            } else {
                return {
                    ...node, data: {
                        ...node.data,
                        outputs: node.data.outputs.filter((input) => input.id !== ingredientID)
                    }
                }
            }

        }))
    }

    return removeMachineInputOutput;

}