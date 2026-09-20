/**
 * Used by the voltage selector in machine nodes. Returns a tailwind css class name of a text color appropriate
 * for that voltage tier.
 * @param voltage_tier 
 */
export function getColorBasedOnVoltageTier(voltage_tier: string) {
    switch (voltage_tier.toLowerCase()) {
        case "ulv": return "text-gray-900"
        case "lv": return "text-gray-600"
        case "mv": return "text-blue-200"
        case "hv": return "text-yellow-500"
        case "ev": return "text-purple-800"
        case "iv": return "text-blue-800"
        case "luv": return "text-pink-500"
        case "zpm": return "text-red-600"
        case "uv": return "text-cyan-600"
        case "uhv": return "text-red-800"
        case "uev": return "text-lime-400"
        case "uiv": return "text-green-700"
        case "uxv": return "text-yellow-200"
        case "opv": return "text-blue-700 font-bold"
        case "max": return "text-red-600 font-bold"
        default: return "text-gray-500"
    }
}