import type { GraphPublishResult, GraphToPublish } from "../../types/DataTypes";

const API_URL = import.meta.env.VITE_API_URL;

export async function publishGraph(graph: GraphToPublish): Promise<GraphPublishResult> {
    const res = await fetch(`${API_URL}/publish`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(graph)
        });
    const errorMsg = await res.text();
    if (!res.ok) {
        alert("Error Publishing Graph: "+errorMsg);
        return {
            safelyPublished: false,
            error: errorMsg
        }
    }
    alert("Successfully published graph!")
        return {
            safelyPublished: true,
            error: ""
        };
} 