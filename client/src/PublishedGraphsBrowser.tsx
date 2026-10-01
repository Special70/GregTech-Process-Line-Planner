import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPublishedGraphs } from "./functions/api/getPublishedGraphs";
import type { PublishedGraph } from "./types/DataTypes";
import { useHandleGraphImport } from "./functions/handleGraphImport";


const PublishedGraphsBrowser = () => {

    const navigate = useNavigate();
    const handleGraphImport = useHandleGraphImport()

    const [publishedGraphs, setPublishedGraphs] = useState<PublishedGraph[]>([]);

    useEffect(() => {
        _getGraphsAndSave();
    }, [])

    // api fetch is async so when the data arrives, it has to be saved in a useState
    async function _getGraphsAndSave() {
        setPublishedGraphs(await getPublishedGraphs());
    }

    return (
        <>
            <div className="font-[Minecraft] text-white text-2xl bg-red-500 absolute left-0 bottom-0 mb-2 ml-2 h-15 w-40 flex items-center justify-center border-2 border-white shadow-2xl hover:bg-red-600 active:bg-red-700"
                onClick={() => {
                    navigate("/")
                }}
            >
                Back
            </div>
            <div className="w-screen h-screen bg-linear-to-r from-gray-700 to-gray-900">
                <div className="text-4xl text-white font-[Minecraft] w-full text-center pt-4 mb-4">
                    Published Graphs
                </div>
                <hr className="w-3/4 m-auto bg-black h-1 mb-5" />
                <div className="w-7/8 h-150 m-auto grid grid-cols-2 grid-rows-3 gap-5">
                    {publishedGraphs.map((item) => {
                        return _generateClickableChoice(item);
                    })}
                </div>
            </div>
        </>
    )

    function _generateClickableChoice(publishedGraph: PublishedGraph) {
        return (

            <div className="bg-yellow-100 w-full p-4 font-[Minecraft] relative">
                <div className="text-2xl font-bold">
                    {publishedGraph.graph_name}
                </div>
                <div className="text-1xl font-bold">
                    By {publishedGraph.author}
                </div>
                <div className="text-sm overflow-y-auto bg-white h-15">
                    By {publishedGraph.graph_description}
                </div>
                <div className="bg-green-700 border-2 border-white w-1/4 text-center p-2 bottom-0 absolute mb-2 hover:bg-green-800 active:bg-green-900"
                    onClick={() => {
                        handleGraphImport(publishedGraph.graph_string_data);
                        navigate("/")
                    }}
                >
                    Click to load
                </div>
            </div>
        )
    }
}

export default PublishedGraphsBrowser;