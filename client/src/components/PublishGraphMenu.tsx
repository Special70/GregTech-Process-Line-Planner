import { useClientViewHandlerContext } from "../contexts/ClientViewHandlerContext";

const PublishGraphMenu = () => {

    const { setShowPublishGraphMenu } = useClientViewHandlerContext();

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
                            Author Name (Optional)<br/>
                            <input className="border-2 border-black w-full pl-2" placeholder="Author name to be displayed in published graphs"/>
                        </div>
                        <div className="mb-5">
                            Graph Name<br/>
                            <input className="border-2 border-black w-full pl-2" placeholder="Identifying name for your graph"/>
                        </div>
                        <div className="mb-5">
                            Graph Description<br/>
                            <input className="border-2 border-black w-full pl-2" placeholder="Identifying name for your graph"/>
                        </div>
                        <button className="bg-green-600 text-white pl-5 pr-5 block m-auto border-2 border-black text-3xl hover:bg-green-700 active:bg-green-800">Publish</button>
                        <button className="bg-red-600 text-white pl-5 pr-5 block m-auto border-2 border-black text-3xl hover:bg-red-700 active:bg-red-800 mt-5" onClick={()=>{
                            setShowPublishGraphMenu(false);
                        }}>Exit</button>
                    </div>
                </div>

            </div>
        </>
    )


}

export default PublishGraphMenu;

