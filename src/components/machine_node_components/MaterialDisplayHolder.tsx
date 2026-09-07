import { useEffect, useState } from "react";
import type { InputIngredientData } from "../../assets/types/DataTypes";
import { useMaterialSuggesterData } from "../../contexts/MaterialSuggesterDataContext";
import { SpriteIcon } from "./SpriteIcon";

export function MaterialDisplayHolder(props: InputIngredientData) {

    const [selectedMaterialFile, setSelectedMaterialFile] = useState<string>(props.img_filename);

    // update node component details
    useEffect(() => {
        setSelectedMaterialFile(props.img_filename)
    }, [props.img_filename])

    const { toggleView, submitDataDetails } = useMaterialSuggesterData();
    return <>
        <div className="relative inline-block group">
            <button className="min-w-15 min-h-15 w-auto h-auto bg-white border-2 mb-1 nodrag" onClick={() => {
                submitDataDetails("input", props.id, props.name, props.amount, props.consume_chance);
                toggleView(props.id);
            }}>{selectedMaterialFile != "NaN" ? <SpriteIcon id={selectedMaterialFile} /> : "NaN"}</button>
            {props.name.length > 0 && <div className="absolute top-full left-full mt-2 ml-2
                            opacity-0 scale-95 pointer-events-none
                            group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                            transition duration-150 ease-out
                            bg-gray-800 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                {props.name}
            </div>}
        </div>
    </>
}