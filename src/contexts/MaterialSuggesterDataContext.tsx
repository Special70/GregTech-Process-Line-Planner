/**
 * Used by source and machine nodes to send information to the Material Suggester sideview
 */

import { createContext, useContext, useRef } from 'react';
import { ClientViewTypes, useClientViewHandlerContext } from './ClientViewHandlerContext';

export type MaterialSuggesterDataProps = {
    toggleView: (nodeId: string) => void
    submitDataDetails: (type: string, node_ingredient_id: string, material_name: string, amount: string, consumeChance: string) => void
    materialName: React.RefObject<string>
    amount: React.RefObject<string>
    consumeChance: React.RefObject<string>
    handledNodeId: React.RefObject<string>
    inputOrOutput: React.RefObject<string>
    ingredientID: React.RefObject<string>
}

const MaterialSuggesterDataContext = createContext<MaterialSuggesterDataProps | undefined>(undefined);


export const MaterialSuggesterDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // for toggleView's use
    const { setCurrentViewType } = useClientViewHandlerContext();

    // to know if you're clicking the same icon or clicked a different one instead
    const handledNodeId = useRef("");

    /// For handling data pointer towards node input/output ingredients
    // So if the user wants to make small changes to the current selection's name. Ex: Indium => Indium Tin Barium
    const materialName = useRef("titanium")
    const amount = useRef("0")
    const consumeChance = useRef("0")
    // So the logic would know if the modification target is in the input or output of the data node
    const inputOrOutput = useRef("input")
    // So the logic would know which index to modify in the input/output array of a data node 
    const ingredientID = useRef("0");

    /**
     * Toggles the view of the material suggester but with extra steps. 
     * @param nodeId id of the currently managed material suggester. With this information,
     *  it allows the logic to close the material suggester menu if the user clicks the same
     *  material suggester twice but prevents if the second clicked button is from a different 
     *  suggester button.
     */
    function toggleView(nodeId: string) {

        if (nodeId == handledNodeId.current) {
            handledNodeId.current = "";
            setCurrentViewType(ClientViewTypes.Default)
        } else {
            handledNodeId.current = nodeId;
            setCurrentViewType(ClientViewTypes.MaterialSuggester)
        }
    }

    /**
     * When an input/output opens the material suggester editor, it will submit its details
     * so the MaterialSuggester component could modify the correct display.
     */
    function submitDataDetails(type: string, ingredientIDArg: string, name: string, amountArg: string, consumeChanceArg: string) {
        inputOrOutput.current = type;
        ingredientID.current = ingredientIDArg;
        materialName.current = name;
        amount.current = amountArg;
        consumeChance.current = consumeChanceArg;
    }

    return (
        <MaterialSuggesterDataContext.Provider
            value={{
                toggleView, submitDataDetails, materialName, amount, consumeChance, handledNodeId, inputOrOutput, ingredientID
            }}
        >
            {children}
        </MaterialSuggesterDataContext.Provider>
    );
};

export function useMaterialSuggesterData() {
    const context = useContext(MaterialSuggesterDataContext);
    if (!context) {
        throw new Error("useMaterialSuggesterData must be used within a MaterialSuggesterDataProvider");
    }
    return context;
}