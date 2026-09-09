import { useEffect, useState } from "react";
import type { InputIngredientData } from "../../assets/types/DataTypes";
import { useMaterialSuggesterData } from "../../contexts/MaterialSuggesterDataContext";
import { SpriteIcon } from "./SpriteIcon";
import { MinecraftText } from "../../functions/minecraftColorCodeApplier";

type MaterialDisplayHolderProps = {
    ingredientData: InputIngredientData
    nodeId: string
}

export function InputMaterialDisplayHolder(props: MaterialDisplayHolderProps) {

    const [selectedMaterialFile, setSelectedMaterialFile] = useState<string>(props.ingredientData.img_filename);

    // update node component details
    useEffect(() => {
        setSelectedMaterialFile(props.ingredientData.img_filename)
    }, [props.ingredientData.img_filename])

    const { toggleView, submitDataDetails } = useMaterialSuggesterData();
    return <>
        <div className="relative inline-flex group shadow-lg">
            <button className="w-17 h-17 bg-white border-2 nodrag" onClick={() => {
                submitDataDetails("input", props.ingredientData.id, props.ingredientData.name, props.ingredientData.img_filename, props.ingredientData.amount, props.ingredientData.consume_chance);
                toggleView(props.nodeId);
            }}><SpriteIcon id={selectedMaterialFile}/></button>
            {props.ingredientData.img_filename.length > 0 && <div className="absolute top-full left-full mt-2 ml-2
                            opacity-0 scale-95 pointer-events-none
                            group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                            transition duration-150 ease-out
                            bg-gray-800 text-white text-sm px-2 py-1 rounded whitespace-nowrap z-200">
                                <MinecraftText text={props.ingredientData.name} /><br/>
                <span className="text-yellow-300">Amount: {props.ingredientData.amount}</span><br/>
                <span className="text-red-400">Consume Chance: {props.ingredientData.consume_chance.length > 0 ? props.ingredientData.consume_chance : 0}%</span>
            </div>}
        </div>
    </>
}