import { useReactFlow } from "@xyflow/react";
import type { SerializedFlow } from "../types/DataTypes";

// Strip runtime-only fields
const cleanFlow = ({ nodes, edges, viewport }: SerializedFlow): SerializedFlow => ({
    nodes: nodes.map(({ id, type, position, data, parentId, extent }) => ({
        id, type, position, data, parentId, extent,
    })),
    edges: edges.map(({ id, source, target, sourceHandle, targetHandle, type, data }) => ({
        id, source, target, sourceHandle, targetHandle, type, data,
    })),
    viewport,
});


// Export data into copypaste-able string
const exportToString = (flow: SerializedFlow): string =>
    JSON.stringify(cleanFlow(flow));

export function useHandleExport() {

    const { toObject } = useReactFlow();

    // convert graph data into string and put it into the provided textarea. user has to manually press the copy button to put 
    // it in their clipboard
    const handleExport = async (setExportText: React.Dispatch<React.SetStateAction<string>>): Promise<void> => {
        const str = exportToString(toObject() as SerializedFlow);
        setExportText(str);
    };
    return handleExport;
}