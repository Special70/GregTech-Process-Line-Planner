import { useReactFlow } from "@xyflow/react";

export function useGetMachineNamesFromNodes() {
    const {getNodes} = useReactFlow();

    /**
     * If the entry doesn't exist in the recordList, it adds it in the entry with a starting value of 1. Otherwise, increase the value of said entry in the recordList by 1.
     * @param recordList 
     * @param entry 
     */
    function _addOrUpdateRecord(recordList: Record<string, number>, entry: string) {
        
        if (entry in recordList) {
            recordList[entry] += 1;
        } else {
            recordList[entry] = 1;
        }
    }

    function getMachineNamesFromNodes() {
        const machineNameList: Record<string, number> = {};
        const nodes = getNodes();

        nodes.map((node) => {
            let machineName: string = String(node.data.name);
            // source node data is named as "NaN"
            if (machineName != "NaN") {
                _addOrUpdateRecord(machineNameList, machineName.length > 0 ? machineName : "Unnamed Machine");
            }
                
            
        })

        return machineNameList;
    }
    return getMachineNamesFromNodes;
}