import { useAssetDataContext } from "../../contexts/AssetDataContext"

type MachineNodeSuggesterProps = {
    inputTag: React.RefObject<HTMLInputElement>
    nodeId: string
    setName: React.Dispatch<React.SetStateAction<string>>
}

export function MachineNodeSuggester(props: MachineNodeSuggesterProps) {

    let { emiCategoriesData } = useAssetDataContext();
    let suggestionResult = emiCategoriesData?.filter(item => item.toLowerCase().includes(props.inputTag.current.value.toLowerCase())).sort().slice(0, 10);

    return (
        <div className="nodrag nopan absolute h-auto w-full bg-gray-400 border text-center z-100">
            {suggestionResult?.map((item: string, index) => (
                <button
                    key={index}
                    className="border-b-2 w-full hover:bg-gray-500 active:bg-gray-600"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => { 
                        props.setName(item);
                        props.inputTag.current.blur();
                     }}
                >
                    {item}
                </button>
            ))}
        </div>
    )
}