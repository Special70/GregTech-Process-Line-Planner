import { useEffect, useState } from "react";
import { useClientViewHandlerContext } from "../contexts/ClientViewHandlerContext";
import { useGraphDataContext, type GraphDataNode } from "../contexts/GraphDataContext";
import { useReactFlow, type Edge, type Viewport } from '@xyflow/react'; // 'reactflow' in v11

type SerializedFlow = {
    nodes: GraphDataNode[];
    edges: Edge[];
    viewport?: Viewport;
};


// Strip runtime-only fields
const cleanFlow = ({ nodes, edges, viewport }: SerializedFlow): SerializedFlow => ({
    nodes: nodes.map(({ id, type, position, data, parentId, extent }) => ({
        id, type, position, data, parentId, extent,
    })),
    edges: edges.map(({ id, source, target, sourceHandle, targetHandle, type, data }) => ({
        id, source, target, sourceHandle, targetHandle, type, data,
    })),
    viewport,
});

// Type guard so you validate instead of blindly casting
const isSerializedFlow = (value: unknown): value is SerializedFlow => {
    if (typeof value !== 'object' || value === null) return false;
    const v = value as Record<string, unknown>;
    return Array.isArray(v.nodes) && Array.isArray(v.edges);
};

// Export data into copypaste-able string
const exportToString = (flow: SerializedFlow): string =>
    JSON.stringify(cleanFlow(flow));

// Imports string into readable json for converting
const importFromString = (str: string): SerializedFlow => {
    const parsed: unknown = JSON.parse(str); // throws on invalid JSON
    if (!isSerializedFlow(parsed)) {
        throw new Error('Invalid flow string');
    }
    return parsed;
};

const ImportExportDisplay = () => {
    const { setShowImportExportMenu } = useClientViewHandlerContext();
    const { toObject, setViewport } = useReactFlow();
    const { setNodes, setEdges } = useGraphDataContext();

    const [exportText, setExportText] = useState<string>("");
    const [importText, setImportText] = useState<string>("");
    const [showCopyMessage, setShowCopyMessage] = useState<boolean>(false);

    // convert graph data into string and put it into the provided textarea. user has to manually press the copy button to put 
    // it in their clipboard
    const handleExport = async (): Promise<void> => {
        const str = exportToString(toObject() as SerializedFlow);
        setExportText(str);
    };

    // it will try to read the contents of the pasted text in the import textarea. may throw errors
    const handleImport = (): void => {
        try {
            const flow = importFromString(importText);
            setNodes(flow.nodes);
            setEdges(flow.edges);
            setViewport(flow.viewport!);
            setShowImportExportMenu(false);
        } catch (err) {
            alert('Could not import: ' + (err instanceof Error ? err.message : String(err)));
        }
    };

    useEffect(() => { handleExport() }, [])

    return (
        <>
            <div className="absolute w-screen h-screen bg-black/50 z-1000 flex justify-center items-center">
                <div className="w-1/2 min-h-1/2 h-auto bg-gray-300 border-2 border-black font-[Minecraft] text-black relative">
                    <div className="text-3xl text-center mt-5">Export Graph</div>
                    <div className="text-1xl text-center ">Copy the text and send it to others for them to put in the Import Field</div>
                    <div className="w-full flex justify-center mb-5 items-center flex-col">

                        <textarea className="border-2 border-black w-7/8 h-20 bg-white text-center" placeholder="" readOnly={true} value={exportText} />
                        <button className="bg-blue-500 text-white text-2xl pl-5 pr-5 border-black border-2
                    hover:bg-blue-600 active:bg-blue-700" onClick={async () => {
                                try {
                                    setShowCopyMessage(true);
                                    await navigator.clipboard.writeText(exportText);
                                } catch (error) {
                                    console.error("Failed to copy text to clipboard:", error);
                                }
                            }}>{!showCopyMessage ? "Copy to Clipboard" : "Copied to Clipboard"}</button>
                            
                    </div>

                    <hr className="w-7/8 m-auto h-1 bg-black" />
                    <div className="text-3xl text-center mt-5">Import Graph</div>
                    <div className="text-1xl text-center ">Paste the text provided by someone's export text here</div>
                    <div className="w-full flex justify-center items-center flex-col mb-20">

                        <textarea className="border-2 border-black w-7/8 h-20 bg-white text-center" placeholder="Paste Export Data Here" onChange={(e) => {
                                setImportText(e.target.value)
                            }}/>
                        <button className="bg-blue-500 text-white text-2xl pl-5 pr-5 border-black border-2
                    hover:bg-blue-600 active:bg-blue-700" onClick={() => { handleImport()
                                     }} >Import</button>

                    </div>


                    <button className="bg-red-500 text-white text-2xl pl-5 pr-5 absolute bottom-3 -translate-x-1/2 left-1/2 border-2 border-black
                    hover:bg-red-600 active:bg-red-700" onClick={() => { setShowImportExportMenu(false) }}>Exit</button>
                </div>

            </div>
        </>
    )


}

export default ImportExportDisplay;

