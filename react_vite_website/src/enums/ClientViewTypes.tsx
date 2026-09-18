
/**
 * Enums for Client View Types
 */
export const ClientViewTypes = {
    Default: 0, // Displays the regular main view
    MaterialSuggester: 1
} as const;
export type ClientViewType = typeof ClientViewTypes[keyof typeof ClientViewTypes];