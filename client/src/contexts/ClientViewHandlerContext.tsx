import { createContext, useContext, useRef, useState } from "react";
import { ClientViewTypes, type ClientViewType } from "../enums/ClientViewTypes";

/**
 * This Context File is responsible for client view related management that happens in this website. So if you're looking for
 * logic that may modify the user's view on components (except nodes) or holds information about the client viewport, this is the place.
 */

type ClientViewHandlerContextType = {
    /**
     * The state of the display of the website depends on the enum value assigned
     */
    currentViewType: ClientViewType;
    /**
     * useRef pointer used to make the addSource/addMachine logic get the users' center viewport val
     */
    divWrapperRef: React.RefObject<any>
    /**
     * Shared useState setter for other logic to manage
     * @param viewType 
     * @returns 
     */
    setCurrentViewType: (viewType: ClientViewType) => void
    /**
     * Shared function for toggling the appearance of MaterialSuggester
     * @param ingredientID 
     * @returns 
     */
    toggleViewForMaterialSuggester: (ingredientID: string) => void
    /**
     * Shared function for resetting toggleViewForMaterialSuggester details
     */
    resetToggleViewData: () => void;
};


const ClientViewHandlerContext = createContext<ClientViewHandlerContextType | undefined>(undefined);

export const ClientViewHandlerContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clientViewType, setClientViewType] = useState<ClientViewType>(ClientViewTypes.Default);
    /**
     * addSource/addMachine needs a reference of the div wrapping the ReactFlow component
     * in order to spawn new nodes at the user's center viewport.
     */
    const divWrapperRef = useRef<HTMLDivElement | any>(undefined);


    /**
     * Toggles the view of the material suggester but with extra steps. If you click the same ingredient
     * icon twice, the material suggester component closes. If you immediately click on another ingredient icon
     * while the material suggester is open, the material suggester will update its contents to match the newly
     * clicked ingredient icon.  
     *   
     * @param ingredientIDArg used to check if you're clicking the same ingredient icon or not.
     */
    function toggleViewForMaterialSuggester(ingredientIDArg: string) {
        if (ingredientIDArg === lastProvidedIngredientID.current) {
            lastProvidedIngredientID.current = "";
            setClientViewType(ClientViewTypes.Default);
        } else {
            lastProvidedIngredientID.current = ingredientIDArg;
            setClientViewType(ClientViewTypes.MaterialSuggester);
        }
    }
    const lastProvidedIngredientID = useRef("");

    /**
     * When the user selects a material, the material suggester automatically closes. Meaning, there must be a way to reset
     * the data the toggleView function is using to prevent odd bugs when opening icons again.
     */
    function resetToggleViewData() {
        lastProvidedIngredientID.current = "";
    }

    return (
        <ClientViewHandlerContext.Provider
            value={{ 
                currentViewType: clientViewType, 
                divWrapperRef: divWrapperRef,
                setCurrentViewType: setClientViewType,
                toggleViewForMaterialSuggester: toggleViewForMaterialSuggester,
                resetToggleViewData: resetToggleViewData
                }}>
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

