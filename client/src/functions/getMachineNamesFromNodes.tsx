import { useNodes } from "@xyflow/react";
import { useGraphDataContext } from "../contexts/GraphDataContext";

export function useGetMachineNamesFromNodes() {
    const nodes = useNodes();

    function getMachineNamesFromNodes() {
        const machineNameList: String[] = [];

        nodes.map((node)=>{
            console.log(node);
        })
    }
    return getMachineNamesFromNodes;
}