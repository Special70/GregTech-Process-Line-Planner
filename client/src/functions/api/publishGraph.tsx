import type { PublishedGraph } from "../../types/DataTypes";

const API_URL = import.meta.env.VITE_API_URL;

export async function publishGraph(graph: PublishedGraph): Promise<void> {
    const res = await fetch(`${API_URL}/publish`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(graph)
        });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

} 