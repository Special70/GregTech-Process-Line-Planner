/**
 * Used by source and machine nodes to send information to the Material Suggester sideview
 */

import { createContext, useContext, useRef, useState } from 'react';

export type MaterialSuggesterDataProps = {
    submitDataDetails: (nodeId: string, type: string, node_ingredient_id: string, material_name: string, materialImageFile: string, amount: string, consumeChance: string) => void
    materialName: string
    materialImageFile: string
    amount: string
    consumeChance: string
    handledNodeId: string
    inputOrOutput: string
    ingredientID: string
}

const MaterialSuggesterDataContext = createContext<MaterialSuggesterDataProps | undefined>(undefined);


export const MaterialSuggesterDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [handledNodeId, setHandledNodeId] = useState("");
    const [materialName, setMaterialName] = useState("titanium");
    const [materialImageFile, setMaterialImageFile] = useState("");
    const [amount, setAmount] = useState("0");
    const [consumeChance, setConsumeChance] = useState("0");
    const [inputOrOutput, setInputOrOutput] = useState("input");
    const [ingredientID, setIngredientID] = useState("0");

    function submitDataDetails(nodeID: string, type: string, ingredientIDArg: string, name: string, materialImageFileArg: string, amountArg: string, consumeChanceArg: string) {
        setHandledNodeId(nodeID);
        setInputOrOutput(type);
        setIngredientID(ingredientIDArg);
        setMaterialName(name);
        setMaterialImageFile(materialImageFileArg);
        setAmount(amountArg);
        setConsumeChance(consumeChanceArg);
    }

    return (
        <MaterialSuggesterDataContext.Provider
            value={{ 
                submitDataDetails: submitDataDetails, materialName, materialImageFile, amount, consumeChance, handledNodeId, inputOrOutput, ingredientID }}
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