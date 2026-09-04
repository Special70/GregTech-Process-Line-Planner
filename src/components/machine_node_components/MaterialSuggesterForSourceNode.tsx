import { useLayoutEffect, useState } from "react";
import { useAssetDataContext } from "../../contexts/AssetDataContext"
import { SpriteIcon } from "./SpriteIcon";
import { createPortal } from "react-dom";

type MaterialSuggesterProps = {
    // local name / ingame name
    selectedMaterial: string 
    setSelectedMaterial: React.Dispatch<React.SetStateAction<string>>

    // file name pair from img_to_name_pairs.json
    selectedMaterialFile: string
    setSelectedMaterialFile: React.Dispatch<React.SetStateAction<string>>

    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
    materialSelectorButtonRef:  React.RefObject<HTMLButtonElement | null>
}

/**
 * When rendered, it will display a search box where you can type the item/fluid you want
 * to select as your source/ingredient
 */
export function MaterialSuggesterForSourceNode(props: MaterialSuggesterProps) {

    // Provider access
    const { imageToNamePairsData } = useAssetDataContext();
    // Pointer access for div portal
    const anchorRef = props.materialSelectorButtonRef;

    // useStates
    const [searchEntry, setSearchEntry] = useState(props.selectedMaterial);
    const [position, setPosition] = useState({top: 0, left: 0});

    // For putting the material selector at the top left of the client
    useLayoutEffect(() => {
        if (anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
        }
    }, [anchorRef]);

    // By utilizing the context provider, it grabs details from the img_to_name_pairs.json file for ingame name suggestions
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

    // portal details
    const portalRoot = document.getElementById('node-overlay-root');
    if (!portalRoot) return null;

    // generates the selector div
    return createPortal(
        <div 
            className="w-90 bg-gray-700 min-h-50 h-auto flex justify-start items-center flex-col nodrag nopan border-2 shadow-2xl font-[Minecraft]"
            style={{ position: 'fixed', top: position.top, left: position.left, pointerEvents: 'auto' }}
        >
            <div className="mt-5 bg-red-800 text-white w-3/4 text-center border-2 border-black hover:bg-red-900 active:bg-red-950" onClick={()=>{props.setIsSearching(false)}}>
                Close
            </div>
            <input
                className="w-3/4 h-10 bg-white mt-5 mb-5 pl-2" placeholder="Enter Item/Fluid Name" value={searchEntry} type="text"
                onChange={(e) => { setSearchEntry(e.target.value) }}
            />
            <div className="text-center bg-white mb-5 w-3/4">
                {generateSuggestions(searchEntry)?.map((item, index) => {

                    return <div className="flex flex-row border-b-2 hover:cursor-default" key={index}
                        onMouseDown={(e) => { e.preventDefault() }}
                        onClick={() => {
                            props.setIsSearching(false);
                            props.setSelectedMaterialFile(item["0"]);
                            props.setSelectedMaterial(item["1"]);
                        }}
                    >
                        <div className="pr-1 pl-1"><SpriteIcon id={item["0"]} /></div>
                        <div className="w-full bg-gray-300 pt-1 hover:bg-gray-400 active:bg-gray-500">
                            {item["1"]}
                        </div>
                    </div>
                })}
            </div>
        </div>,
        portalRoot

    )
}