const API_URL = import.meta.env.VITE_API_URL;

/**
 * Used to get the status of the backend api. If not online, the publish feature and the published graphs page will be disabled.
 */
export async function getStatusAPI(): Promise<boolean> {

    const res = await fetch(`${API_URL}/`);

    if (!res.ok) {
        return false;
    } else {
        return true;
    }
}