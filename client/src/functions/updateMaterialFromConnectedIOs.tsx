import { useEdges } from "@xyflow/react";
import { useCopyOutputMaterialToInput } from "./copyOutputMaterialToInput";

export function useUpdateMaterialFromConnectedIOs() {
    const copyOutputMaterialToInput = useCopyOutputMaterialToInput();
    const edges = useEdges();

    /**
     * By passing an ingredient_id from a source/output, it will check its connection to inputs and re-copy the source/output's 
     * material and material file details to its inputs.
     * @param giver_node_id 
     * @param giver_ingredient_id 
     */
    const updateMaterialFromConnectedIOs = (giver_node_id: string, giver_ingredient_id: string) => {
        //console.log("test run")
        
        // first get the list of edges this giver handle is connected to
        const giver_to_receiver_connections = edges.filter((edge)=>edge.sourceHandle?.includes(giver_ingredient_id))

        // second, copypaste the updated material details only. 
        // it will iterate through each connection of said giver-to-receivers and apply the updated
        // material details to them.
        giver_to_receiver_connections.map((edgeData)=>{
            copyOutputMaterialToInput(giver_node_id, `${edgeData.sourceHandle}`, edgeData.target, `${edgeData.targetHandle}`)
        })
    }

    return updateMaterialFromConnectedIOs;

}