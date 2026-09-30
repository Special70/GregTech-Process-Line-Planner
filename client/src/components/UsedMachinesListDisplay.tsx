import { useClientViewHandlerContext } from "../contexts/ClientViewHandlerContext";
import { useGetMachineNamesFromNodes } from "../functions/getMachineNamesFromNodes";

const UsedMachinesListDisplay = () => {
    const getMachineNamesFromNodes = useGetMachineNamesFromNodes();

    const { setShowUsedMachines } = useClientViewHandlerContext();
    const machineNamesDetails = getMachineNamesFromNodes();

    function _listBuilder() {
        return (
            <div className="bg-gray-200 w-7/8 m-auto p-5 mt-5 border-l-5 border-r-5 text-1xl">
                {Object.entries(machineNamesDetails).map(([name, count], index) => (
                    <div key={index}>
                        {name} : {count}
                    </div>
                ))}
            </div>
        )
    }

    function _emptyListNoticeBuilder() {
        return (
            <div className="w-7/8 text-center text-3xl m-auto mt-10">
                No Machine Names to Display.
            </div>
        )
    }

    return (
        <>
            <div className="absolute w-screen h-screen bg-black/50 z-1000 flex justify-center items-center">
                <div className="w-1/2 h-1/2 bg-white border-2 border-black font-[Minecraft] text-black relative">
                    <div className="text-3xl text-center mt-5">Used Machines</div>
                    <hr className="h-1 bg-black w-7/8 ml-auto mr-auto mt-4" />

                    {Object.keys(machineNamesDetails).length > 0 ? _listBuilder() : _emptyListNoticeBuilder()}

                    <button className="bg-red-500 text-white text-2xl pl-5 pr-5 absolute bottom-15 -translate-x-1/2 left-1/2 border-2 border-black
                    hover:bg-red-600 active:bg-red-700" onClick={() => { console.log(machineNamesDetails) }}>Debug</button>
                    <button className="bg-red-500 text-white text-2xl pl-5 pr-5 absolute bottom-3 -translate-x-1/2 left-1/2 border-2 border-black
                    hover:bg-red-600 active:bg-red-700" onClick={() => { setShowUsedMachines(false) }}>Exit</button>
                </div>

            </div>
        </>
    )


}

export default UsedMachinesListDisplay;