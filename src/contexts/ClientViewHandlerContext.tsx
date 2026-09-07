import { createContext, useContext, useState } from "react";

/**
 * Enums for Client View Types
 */
export const ClientViewTypes = {
    Default: 0, // Displays the regular main view
    MaterialSuggester: 1
} as const;
export type ClientViewType = typeof ClientViewTypes[keyof typeof ClientViewTypes];

type ClientViewHandlerContextType = {
    currentViewType: ClientViewType;
    setCurrentViewType: (viewType: ClientViewType) => void;
};

const ClientViewHandlerContext = createContext<ClientViewHandlerContextType | undefined>(undefined);

export const ClientViewHandlerContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clientViewType, setClientViewType] = useState<ClientViewType>(ClientViewTypes.Default);

    return (
        <ClientViewHandlerContext.Provider
            value={{ currentViewType: clientViewType, setCurrentViewType: setClientViewType }}>
            {children}
        </ClientViewHandlerContext.Provider>
    )
}

export function useClientViewHandlerContext() {
    const ctx = useContext(ClientViewHandlerContext);
    if (!ctx) {
        throw new Error('useClientViewHandler must be used within a ClientViewHandlerContextProvider');
    }
    return ctx;
}
