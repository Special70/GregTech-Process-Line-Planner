import { useAddMachineNode } from '../../functions/addMachineNode';
import { useAddSourceNode } from '../../functions/addSourceNode';
import gregtech_icon from '../../assets/images/startechnology.png'
import { useNavigate } from 'react-router';


/**
 * This creates the components that creates the view for the Graph Planner's default left side view. When
 * you first open this section of the page, this will be the first thing you will see.
 * 
 * @returns The component for default home view 
 */
export function DefaultHomeView() {
    const addSourceNode = useAddSourceNode();
    const addMachineNode = useAddMachineNode();

    let navigate = useNavigate();

    return (<div className="w-60 mr-auto h-screen bg-gray-500">
        <img src={gregtech_icon} className="w-1/2 m-auto p-3 " />
        <div className="text-2xl text-center p-3 font-[Minecraft]">
            GregTech Process Line Planner
        </div>
        <div className="text-1xl p-3 bg-gray-700 font-[Minecraft] text-white w-3/4 text-center m-auto border-2 hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900" onClick={addSourceNode}>
            Create New Source Node
        </div>
        <div className="text-1xl p-3 bg-gray-700 font-[Minecraft] text-white w-3/4 text-center m-auto border-2 mt-2 hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900" onClick={addMachineNode}>
            Create New Machine Node
        </div>
        <div className="text-1xl p-3 bg-gray-700 font-[Minecraft] text-white w-3/4 text-center m-auto border-2 mt-2 hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900">
            Import/Export Graphs
        </div>
        <div className="text-1xl p-3 bg-gray-700 font-[Minecraft] text-white w-3/4 text-center m-auto border-2 mt-2 hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900">
            Get Used Machines List
        </div>
        <div className="text-1xl p-3 bg-green-700 font-[Minecraft] text-white w-3/4 text-center m-auto border-2 mt-2 hover:cursor-pointer hover:bg-green-800 active:bg-green-900">
            Publish Graph
            
        </div>
        <div className="text-1xl p-3 bg-yellow-700 font-[Minecraft] text-white w-3/4 text-center m-auto border-2 mt-2 hover:cursor-pointer hover:bg-yellow-800 active:bg-yellow-900"
        onClick={()=>{
            navigate("/published-graphs")
        }}
        >
            View Published Graphs
        </div>
    </div>
    )
}