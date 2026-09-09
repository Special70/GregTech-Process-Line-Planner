import { createContext, useContext, useRef, useState } from "react";

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
    divWrapperRef: React.RefObject<any>
};

const ClientViewHandlerContext = createContext<ClientViewHandlerContextType | undefined>(undefined);

export const ClientViewHandlerContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clientViewType, setClientViewType] = useState<ClientViewType>(ClientViewTypes.Default);
      /**
       * addSource/addMachine needs a reference of the div wrapping the ReactFlow component
       * in order to spawn new nodes at the user's center viewport.
       */
      const divWrapperRef = useRef<HTMLDivElement | any>(undefined);

    return (
        <ClientViewHandlerContext.Provider
            value={{ currentViewType: clientViewType, setCurrentViewType: setClientViewType, divWrapperRef }}>
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
