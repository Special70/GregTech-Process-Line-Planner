import { useState } from "react";
import { useAssetDataContext } from "../../contexts/AssetDataContext"
import { SpriteIcon } from "../machine_node_components/SpriteIcon";
import { useMaterialSuggesterData } from "../../contexts/MaterialSuggesterDataContext";
import { ClientViewTypes, useClientViewHandlerContext } from "../../contexts/ClientViewHandlerContext";
import { useGraphDataContext } from "../../contexts/GraphDataContext";

/**
 * When rendered, it will display a search box where you can type the item/fluid you want
 * to select as your source/ingredient
 */
export function MaterialSuggester() {

    // Provider access
    const { setCurrentViewType } = useClientViewHandlerContext();
    const { imageToNamePairsData } = useAssetDataContext();
    const { setNodes } = useGraphDataContext();
    const { handledNodeId, materialName, inputOrOutput, ingredientID } = useMaterialSuggesterData();
    // Pointer access for div portal

    // useStates
    const [searchEntry, setSearchEntry] = useState(materialName.current);

    /**
     * By utilizing the context provider, it grabs details from the img_to_name_pairs.json file for ingame name suggestions.
     * 
     * Exported metadata somehow included cable facades from AE2, which I don't want. Including buckets too.
     * @param input the typed text in the input field
     * @returns filtered imageToNamePairsData based on input. Will give up to 10 results
     */
    function generateSuggestions(input: string) {
        const queryWords = input.toLowerCase().split(/\s+/).filter(Boolean); // split on whitespace, drop empty strings

        return imageToNamePairsData
            ?.filter(item => {
                const name = item["1"].toLowerCase();
                const matchesAllWords = queryWords.every(word => name.includes(word));
                const isExcluded = name.includes("cable facade") || name.includes("bucket");
                return matchesAllWords && !isExcluded;
            })
            .sort((a, b) => a["1"].length - b["1"].length)
            .slice(0, 10);
    }

    function modifyNode(target_node_id: string, item_name: string, item_file_name: string) {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id !== target_node_id) {
                return node;
            }

            if (inputOrOutput.current === "input") {

                return {
                    ...node, data: {
                        ...node.data,
                        inputs: node.data.inputs.map((input) => input.id === ingredientID.current ? { ...input, name: item_name, img_filename: item_file_name } : input)
                    }
                }
            } else {

                return {
                    ...node, data: {
                        ...node.data,
                        outputs: node.data.outputs.map((output) => output.id === ingredientID.current ? { ...output, name: item_name, img_filename: item_file_name } : output)
                    }
                }
            }

        }));
    }

    // generates the selector div
    return <div className="w-90 bg-gray-700 h-screen flex justify-start items-center flex-col nodrag nopan border-2 shadow-2xl font-[Minecraft]">
        <div className="mt-5 bg-red-800 text-white w-3/4 text-center border-2 border-black hover:bg-red-900 active:bg-red-950" onClick={() => {
            setCurrentViewType(ClientViewTypes.Default);
            handledNodeId.current = "";
        }}>
            Close
        </div>
        <input
            className="w-3/4 h-10 bg-white mt-5 mb-2 pl-2" placeholder="Enter Item/Fluid Name" value={searchEntry} type="text"
            onChange={(e) => { setSearchEntry(e.target.value) }}
        />
        <div className="mb-2 w-3/4 flex flex-row justify-between">
            <input className="w-1/2 h-10 bg-white p-2" placeholder="Amount"/>
            <div className="w-2"></div>
            <input className="w-1/2 h-10 bg-white p-2" placeholder="Consume %"/>
        </div>
        <div className="text-center bg-white mb-5 w-3/4">
            {generateSuggestions(searchEntry)?.map((item, index) => {

                return <div className="flex flex-row border-b-2 hover:cursor-default" key={index}
                    onMouseDown={(e) => { e.preventDefault() }}
                    onClick={() => {
                        setCurrentViewType(ClientViewTypes.Default);
                        modifyNode(handledNodeId.current, item["1"], item["0"])
                        handledNodeId.current = "";
                    }}
                >
                    <div className="pr-1 pl-1"><SpriteIcon id={item["0"]} /></div>
                    <div className="w-full bg-gray-300 pt-1 hover:bg-gray-400 active:bg-gray-500">
                        {item["1"]}
                    </div>
                </div>
            })}
        </div>
    </div>
}