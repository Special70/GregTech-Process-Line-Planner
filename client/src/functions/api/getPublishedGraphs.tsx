import type { PublishedGraph } from "../../types/DataTypes";

const API_URL = import.meta.env.VITE_API_URL;

export async function getPublishedGraphs(): Promise<PublishedGraph[]> {
    const res = await fetch(`${API_URL}/published_graphs`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
} 