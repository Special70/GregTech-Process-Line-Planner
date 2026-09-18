import { useEffect, useMemo, useState } from "react";
import { useAssetDataContext } from "../../contexts/AssetDataContext"
import { SpriteIcon } from "../machine_node_components/SpriteIcon";
import { useMaterialSuggesterData } from "../../contexts/MaterialSuggesterDataContext";
import { useClientViewHandlerContext } from "../../contexts/ClientViewHandlerContext";
import { useModifyNodeInputOutput } from "../../functions/modifyNodeInputOutput";
import { useUpdateMaterialFromConnectedIOs } from "../../functions/updateMaterialFromConnectedIOs";
import { MinecraftText } from "../../functions/minecraftColorCodeApplier";
import { ClientViewTypes } from "../../enums/ClientViewTypes";

/**
 * When rendered, it will display a search box where you can type the item/fluid you want
 * to select as your source/ingredient
 */
export function MaterialSuggester() {

    // Provider access
    const { setCurrentViewType, resetToggleViewData } = useClientViewHandlerContext();
    const { imageToNamePairsData } = useAssetDataContext();
    const { handledNodeId, materialName, materialImageFile, amount, consumeChance, inputOrOutput, ingredientID } = useMaterialSuggesterData();

    // input tags from the MaterialSuggester component
    const [searchEntry, setSearchEntry] = useState(materialName);
    const [amountEntry, setAmountEntry] = useState(amount);
    const [consumeChanceEntry, setConsumeChanceEntry] = useState(consumeChance);

    // imported functions with inbuilt useContext logic
    const modifyNodeInputOutput = useModifyNodeInputOutput();
    const updateMaterialFromConnectedIOs = useUpdateMaterialFromConnectedIOs();

    useEffect(() => {
        setSearchEntry(materialName);
    }, [materialName]);

    useEffect(() => {
        modifyNodeInputOutput(handledNodeId, materialName, materialImageFile, inputOrOutput, ingredientID, amountEntry, consumeChanceEntry)
    }, [amountEntry, consumeChanceEntry])

    /**
     * By utilizing the context provider, it grabs details from the img_to_name_pairs.json file for ingame name suggestions.
     */
    const suggestions = useMemo(() => {
        const queryWords = searchEntry.toLowerCase().split(/\s+/).filter(Boolean);
        return imageToNamePairsData
            ?.filter(item => {
                const name = item["1"].toLowerCase();
                const matchesAllWords = queryWords.every(word => name.includes(word));
                const isExcluded = name.includes("cable facade") || name.includes("bucket");
                return matchesAllWords && !isExcluded;
            })
            .sort((a, b) => a["1"].length - b["1"].length)
            .slice(0, 10);
    }, [searchEntry]);

    // generates the selector div
    return <div className="w-90 bg-gray-700 h-screen flex justify-start items-center flex-col nodrag nopan border-2 shadow-2xl font-[Minecraft]">
        <div className="mt-5 bg-red-800 text-white w-3/4 text-center border-2 border-black hover:bg-red-900 active:bg-red-950" onClick={() => {
            setCurrentViewType(ClientViewTypes.Default);
            resetToggleViewData();
        }}>
            Close
        </div>
        <input
            className="w-3/4 h-10 bg-white mt-5 mb-2 pl-2" placeholder="Enter Item/Fluid Name" value={searchEntry} type="text"
            onChange={(e) => { setSearchEntry(e.target.value) }}
        />
        <div className="mb-2 w-3/4 flex flex-row justify-between">
            <input className="w-1/2 h-10 bg-white p-2" placeholder="Amount" value={amountEntry} onChange={(e) => { setAmountEntry(e.target.value) }} />
            <div className="w-2"></div>
            <input className="w-1/2 h-10 bg-white p-2" placeholder="Consume %" value={consumeChanceEntry} onChange={(e) => { setConsumeChanceEntry(e.target.value) }} />
        </div>
        <div className="text-center bg-white mb-5 w-3/4">
            {suggestions?.map((item, index) => {

                return <div className="flex flex-row border-b-2 hover:cursor-default" key={index}
                    onMouseDown={(e) => { e.preventDefault() }}
                    onClick={() => {
                        setCurrentViewType(ClientViewTypes.Default);
                        resetToggleViewData();
                        modifyNodeInputOutput(handledNodeId, item["1"], item["0"], inputOrOutput, ingredientID, amountEntry, consumeChanceEntry)
                        updateMaterialFromConnectedIOs(handledNodeId, ingredientID);
                    }}
                >
                    <div className="pr-1 pl-1"><SpriteIcon id={item["0"]} /></div>
                    <div className="w-full bg-gray-300 pt-1 hover:bg-gray-400 active:bg-gray-500">
                        <MinecraftText text={item["1"]} />
                    </div>
                </div>
            })}
        </div>
    </div>
}