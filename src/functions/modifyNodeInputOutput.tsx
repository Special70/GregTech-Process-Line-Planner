import { useGraphDataContext } from "../contexts/GraphDataContext";

export function useModifyNodeInputOutput() {
    const { setNodes } = useGraphDataContext();

    const modifyNodeInputOutput = (target_node_id: string, item_name: string, item_file_name: string, inputOrOutput: string, ingredientID: string, amountEntry: string, consumeChanceEntry: string) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id !== target_node_id) {
                return node;
            }

            if (inputOrOutput === "input") {
                return {
                    ...node, data: {
                        ...node.data,
                        inputs: node.data.inputs.map((input) => input.id === ingredientID ? { ...input, name: item_name, img_filename: item_file_name, amount: amountEntry, consume_chance: consumeChanceEntry } : input)
                    }
                }
            } else {
                return {
                    ...node, data: {
                        ...node.data,
                        outputs: node.data.outputs.map((output) => output.id === ingredientID ? { ...output, name: item_name, img_filename: item_file_name, amount: amountEntry } : output)
                    }
                }
            }

        }
        ));
    }

    return modifyNodeInputOutput;
};