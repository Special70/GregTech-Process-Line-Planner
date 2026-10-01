import { useReactFlow } from "@xyflow/react";
import { useGraphDataContext } from "../contexts/GraphDataContext";
import type { SerializedFlow } from "../types/DataTypes";

// Imports string into readable json for converting
const importFromString = (str: string): SerializedFlow => {
    const parsed: unknown = JSON.parse(str); // throws on invalid JSON
    if (!isSerializedFlow(parsed)) {
        throw new Error('Invalid flow string');
    }
    return parsed;
};
// Type guard so you validate instead of blindly casting
const isSerializedFlow = (value: unknown): value is SerializedFlow => {
    if (typeof value !== 'object' || value === null) return false;
    const v = value as Record<string, unknown>;
    return Array.isArray(v.nodes) && Array.isArray(v.edges);
};
export function useHandleGraphImport() {

    const { setNodes, setEdges } = useGraphDataContext();
    const { setViewport } = useReactFlow();
    const handleGraphImport = (importText: string): void => {
        try {
            const flow = importFromString(importText);
            setNodes(flow.nodes);
            setEdges(flow.edges);
            setViewport(flow.viewport!);
            //setShowImportExportMenu(false);
        } catch (err) {
            alert('Could not import: ' + (err instanceof Error ? err.message : String(err)));
        }
    };
    return handleGraphImport;
}