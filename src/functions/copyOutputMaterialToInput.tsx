import { useGraphDataContext } from "../contexts/GraphDataContext";

export function useCopyOutputMaterialToInput() {
    const { setNodes } = useGraphDataContext();

    const copyOutputMaterialToInput = (source_node_id: string, source_handle: string, target_node_id: string, target_handle: string) => {
        /**
         * source = output / giver
         * target = input / receiver
         */

        if (source_handle == null || target_handle == null) {
            console.log("early return due to null handles")
            return;
        }

        if (!source_handle.includes("output") || !target_handle.includes("input")) {
            console.log("early return due to unwanted handles")
            return;
        }

        /*
        console.log("SOURCE NODE ID : "+source_node_id)
        console.log("TARGET NODE ID : "+target_node_id)

        console.log("SOURCE HANDLE : "+source_handle)
        console.log("TARGET HANDLE : "+target_handle)
        */

        // pointer id details
        const giverIngredientID = source_handle.split("|")[1];
        const receiverIngredientID = target_handle.split("|")[1];

        // start modification job
        setNodes((nodes) => nodes.map((node) => {
            // only target the node that contains the target ingredient for copypasting
            if (node.id !== target_node_id) {
                return node;
            }

            // get the giver ingredient data details to get the name and filename details for copy and pasting
            const giverIngredientNode = nodes.filter((node) => node.id === source_node_id)[0];
            const giverIngredientData = giverIngredientNode?.data.outputs.filter((outputs) => outputs.id == giverIngredientID)[0]

            // modify the target node
            return {
                ...node, data: {
                    ...node.data,
                    // modify the inputs data and look for the target ingredient
                    inputs: node.data.inputs.map((input) => input.id === receiverIngredientID ? {
                        // start pasting the giver details to the receiver item of the node's inputs
                        ...input, name: giverIngredientData.name, img_filename: giverIngredientData.img_filename
                    } : input)
                }
            }


        }));



    }

    return copyOutputMaterialToInput;
};