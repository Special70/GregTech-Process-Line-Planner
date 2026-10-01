import { useReactFlow } from "@xyflow/react";
import { useClientViewHandlerContext } from "../contexts/ClientViewHandlerContext";
import { useRef } from "react";
import { publishGraph } from "../functions/api/publishGraph";
import { useHandleGraphExport_returnString } from "../functions/handleGraphExport";

const PublishGraphMenu = () => {

    const { setShowPublishGraphMenu } = useClientViewHandlerContext();
    const { getNodes } = useReactFlow();
    const handleGraphExportString_returnString = useHandleGraphExport_returnString();

    const authorNameRef = useRef<HTMLInputElement | any>(null);
    const graphNameRef = useRef<HTMLInputElement | any>(null);
    const graphDescriptionRef = useRef<HTMLInputElement |  any>(null);

    return (
        <>
            <div className="absolute w-screen h-screen bg-black/50 z-1000 flex justify-center items-center">
                <div className="w-1/2 min-h-1/2 h-auto bg-white border-2 border-black font-[Minecraft] text-black relative">
                    <div className="text-3xl text-center pt-5 pb-2">
                        Publish Graph
                    </div>
                    <hr className="w-7/8 h-1 bg-black m-auto" />
                    <div className="w-7/8 m-auto mt-5">
                        <div className="mb-5">
                            Author Name (Optional)<br />
                            <input className="border-2 border-black w-full pl-2" placeholder="Author name to be displayed in published graphs" ref={authorNameRef} />
                        </div>
                        <div className="mb-5">
                            Graph Name<br />
                            <input className="border-2 border-black w-full pl-2" placeholder="Identifying name for your graph" ref={graphNameRef}/>
                        </div>
                        <div className="mb-5">
                            Graph Description<br />
                            <input className="border-2 border-black w-full pl-2" placeholder="Identifying name for your graph" ref={graphDescriptionRef} />
                        </div>
                        {
                            getNodes().length > 0 ?
                                <button className="bg-green-600 text-white pl-5 pr-5 block m-auto border-2 border-black text-3xl hover:bg-green-700 active:bg-green-800" onClick={() => {
                                    if (graphNameRef.current.value.length == 0) {
                                        alert("Graph name must not be blank.")
                                        return;
                                    } 
                                    else if (graphDescriptionRef.current.value.length == 0) {
                                        alert("Graph description must not be blank.")
                                        return;
                                    }

                                    publishGraph({
                                        author: authorNameRef.current.value.length > 0 ? authorNameRef.current.value : "Anonymous",
                                        graph_name: graphNameRef.current.value,
                                        graph_description: graphDescriptionRef.current.value,
                                        graph_string_data: handleGraphExportString_returnString()
                                    });
                                }}>Publish</button>
                                :
                                <button className="bg-red-600 text-white pl-5 pr-5 block m-auto border-2 border-black text-3xl hover:bg-red-700 active:bg-red-800">Cannot Publish Empty Graph</button>
                        }

                        <button className="bg-red-600 text-white pl-5 pr-5 block m-auto border-2 border-black text-3xl hover:bg-red-700 active:bg-red-800 mt-5" onClick={() => {
                            setShowPublishGraphMenu(false);
                        }}>Exit</button>
                    </div>
                </div>

            </div>
        </>
    )


}

export default PublishGraphMenu;

