import { useNavigate } from "react-router";


const PublishedGraphsBrowser = () => {

    let navigate = useNavigate();

    return (
        <>
            <div className="font-[Minecraft] text-white text-2xl bg-red-500 absolute left-0 bottom-0 mb-2 ml-2 h-15 w-40 flex items-center justify-center border-2 border-white shadow-2xl hover:bg-red-600 active:bg-red-700"
            onClick={()=>{
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

                    <div className="bg-yellow-100 w-full p-4 font-[Minecraft] relative">
                        <div className="text-2xl font-bold">
                            Platline Process
                        </div>
                        <div className="text-1xl">
                            Uses Crushed Pentaldite Ores as the base material for starting the Platline Process. Uses non-singular multiblocks. Either uses Large Chemical Reactor or 3x3 Perfect Overclock Machines to perform specific recipes
                        </div>
                        <div className="bg-green-700 border-2 border-white w-1/4 text-center p-2 bottom-0 absolute mb-2">
                            Click to load
                        </div>
                    </div>
                    {[1, 2, 3, 4].map(() => {
                        return (
                            <div className="bg-yellow-100 w-full p-4 font-[Minecraft] relative">
                                <div className="text-2xl font-bold">
                                    Card Title
                                </div>
                                <div className="text-1xl">
                                    Card Description
                                </div>
                                <div className="bg-green-700 border-2 border-white w-1/4 text-center p-2 bottom-0 absolute mb-2">
                                    Click to load
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default PublishedGraphsBrowser;