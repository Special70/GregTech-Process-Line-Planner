
import { Handle, Position, useUpdateNodeInternals, type NodeProps } from '@xyflow/react';
import type { GraphNodeType } from '../../assets/types/NodeTypes';
import { useEffect, useRef, useState } from 'react';
import { getColorBasedOnVoltageTier } from '../../functions/voltageColorClass';
import { MachineNodeSuggester } from '../machine_node_components/MachineNameSuggester';
import { useDeleteNodeAndEdges } from '../../functions/deleteNodeAndEdges';
import { useAddMachineInput } from '../../functions/addMachineInput';
import { InputMaterialDisplayHolder } from '../machine_node_components/InputMaterialDisplayHolder';
import { OutputMaterialDisplayHolder } from '../machine_node_components/OutputMaterialDisplayHolder';
import { useAddMachineOutput } from '../../functions/addMachineOutput';
import { useSetMachineVoltageLevel } from '../../functions/setMachineVoltageLevel';
import { useSetMachineProgrammingCircuit } from '../../functions/setMachineProgrammingCircuit';
import { useRemoveMachineInputOutput } from '../../functions/removeMachineInputOutput';
import { useSetMachineNotes } from '../../functions/setMachineNotes';

function MachineNode(nodeProps: NodeProps<GraphNodeType>) {
    const updateNodeInternals = useUpdateNodeInternals();
    const deleteNodeAndEdges = useDeleteNodeAndEdges();
    const addMachineInput = useAddMachineInput();
    const addMachineOutput = useAddMachineOutput();
    const setMachineVoltageLevel = useSetMachineVoltageLevel();
    const setMachineProgrammingCircuit = useSetMachineProgrammingCircuit();
    const removeMachineInputOutput = useRemoveMachineInputOutput();
    const setMachineNotes = useSetMachineNotes();

    const inputListRef = useRef<HTMLDivElement | any>(null);
    const outputListRef = useRef<HTMLDivElement | any>(null);

    const [isEditingMachineName, setIsEditingMachineName] = useState<boolean>(false);
    const [machineName, setMachineName] = useState<string>("");
    const machineNameRef = useRef<HTMLInputElement | any>(null);

    const [isAccomplished, setIsAccomplished] = useState<boolean>(false);


    useEffect(() => {
        updateNodeInternals(nodeProps.id);
    }, [nodeProps.id, updateNodeInternals, nodeProps.data.inputs, nodeProps.data.outputs])


    return <div className={`${isAccomplished ? "bg-green-200" : "bg-gray-300"} w-120 min-h-20 flex-1 border rounded-lg`} id={nodeProps.data.id}>

        <div className="w-full h-auto flex justify-center items-center flex-col font-[Minecraft]">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center px-3 py-2 w-full">
                <div /> {/* empty spacer to balance the checkbox's width */}
                <span className="text-xl font-medium justify-self-center">Machine Node</span>
                <input type="checkbox" className="justify-self-end w-8 h-8 nodrag" onChange={(e)=>{setIsAccomplished(e.target.checked)}} checked={isAccomplished} />
            </div>



            <div className='relative'>
                <input id={nodeProps.data.id + "_name"}
                    ref={machineNameRef} placeholder="Machine Name"
                    className="bg-white border m-2 text-center w-100"
                    autoComplete='off'
                    onFocus={() => { setIsEditingMachineName(true) }}
                    onBlur={() => { setIsEditingMachineName(false) }}
                    value={machineName}
                    onChange={(e) => { setMachineName(e.target.value) }}
                />
                {isEditingMachineName && (<MachineNodeSuggester inputTag={machineNameRef} nodeId={nodeProps.data.id} setName={setMachineName} />)}
            </div>



            <div className="min-h-40 h-auto flex flex-row mb-5 ml-12 mr-12">
                <div className=" w-1/2 min-h-20 h-auto flex flex-col items-center justify-start">
                    <div>Inputs</div>
                    <div className="justify-center flex flex-col" ref={inputListRef}>
                        {nodeProps.data.inputs.map((item, itemIndex) => (
                            <div
                                className="mb-2 flex flex-row items-center relative"
                                key={`${itemIndex}`}
                                style={{ position: 'relative' }}
                            >
                                <Handle
                                    type="target"
                                    position={Position.Left}
                                    id={`ingredient-input-${itemIndex}|${item.id}`}
                                    isConnectable={true}
                                    style={{
                                        position: 'absolute',
                                        left: -14, // pull it outside the row, toward the node edge
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: 10,
                                        height: 10,
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                    }}
                                />
                                <InputMaterialDisplayHolder ingredientData={{
                                    id: item.id,
                                    name: item.name,
                                    img_filename: item.img_filename,
                                    amount: item.amount,
                                    consume_chance: item.consume_chance
                                }} nodeId={nodeProps.id} />
                                <button className="bg-red p-2 border-2 font-bold bg-red-500 h-10 w-10 ml-2 shadow-lg hover:bg-red-600 active:bg-red-700 nodrag" onClick={() => { removeMachineInputOutput(nodeProps.id, "input", item.id) }}>X</button>
                            </div>
                        ))}
                        <button className="bg-white border-2 pl-1 pr-1 hover:bg-gray-200 active:bg-gray-400 shadow-lg nodrag" onClick={() => { addMachineInput(nodeProps.id) }}>Add New Input</button>
                    </div>
                </div>
                <div className="w-20">
                    {/*Separator*/}
                </div>
                <div className=" w-1/2 min-h-20 h-auto flex flex-col items-center justify-start">

                    <div>Outputs</div>
                    <div className="justify-center flex flex-col" ref={outputListRef}>
                        {nodeProps.data.outputs.map((item, itemIndex) => (
                            <div
                                className="mb-2 flex flex-row items-center justify-end relative"
                                key={`${itemIndex}`}
                                style={{ position: 'relative' }}
                            >
                                <Handle
                                    type="source"
                                    position={Position.Right}
                                    id={`ingredient-output-${itemIndex}|${item.id}`}
                                    isConnectable={true}
                                    style={{
                                        position: 'absolute',
                                        right: -14, // pull it outside the row, toward the node edge
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: 10,
                                        height: 10,
                                        backgroundColor: 'green',
                                        borderRadius: '50%',
                                    }}
                                />
                                <OutputMaterialDisplayHolder ingredientData={{
                                    id: item.id,
                                    name: item.name,
                                    img_filename: item.img_filename,
                                    amount: item.amount,
                                }} nodeId={nodeProps.id} />
                                <button className="bg-red p-2 border-2 font-bold bg-red-500 h-10 w-10 ml-2 shadow-lg hover:bg-red-600 active:bg-red-700 nodrag" onClick={() => { removeMachineInputOutput(nodeProps.id, "output", item.id) }}>X</button>
                            </div>
                        ))}
                        <button className="bg-white border-2 pl-1 pr-1 hover:bg-gray-200 active:bg-gray-400 shadow-lg nodrag" onClick={() => { addMachineOutput(nodeProps.id) }}>Add New Output</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row mb-2 border-b-2 border-t-2 w-full justify-center">
                <div className="flex flex-col items-center">
                    <div>
                        Programming Circuit
                    </div>
                    <select
                        className="bg-black text-yellow-500 border border-black m-2 text-center w-20 appearance-none"
                        value={nodeProps.data.programmingCircuit}
                        onChange={(e) => { setMachineProgrammingCircuit(nodeProps.id, e.target.value) }}>
                        <option key={-1} value={""}>None</option>
                        {Array.from({ length: 32 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="h-auto bg-black w-0.5 ml-5 mr-5"></div>
                <div className="flex flex-col items-center">
                    <div>
                        Voltage Level
                    </div>
                    <select id={nodeProps.data.id + "_voltage"} className={`bg-gray-400 border border-black m-2 text-center w-20 appearance-none ${getColorBasedOnVoltageTier(nodeProps.data.voltage_tier)}`}
                        autoComplete='off'
                        value={nodeProps.data.voltage_tier}
                        onChange={(e) => { setMachineVoltageLevel(nodeProps.id, e.target.value) }}
                    >
                        <option value="ulv" className='text-gray-900 text-center'>ULV</option>
                        <option value="lv" className='text-gray-600 text-center'>LV</option>
                        <option value="mv" className='text-blue-200 text-center'>MV</option>
                        <option value="hv" className='text-yellow-500 text-center'>HV</option>
                        <option value="ev" className='text-purple-800 text-center'>EV</option>
                        <option value="iv" className='text-blue-800 text-center'>IV</option>
                        <option value="luv" className='text-pink-500 text-center'>LuV</option>
                        <option value="zpm" className='text-red-600 text-center'>ZPM</option>
                        <option value="uv" className='text-cyan-600 text-center'>UV</option>
                        <option value="uhv" className='text-red-800 text-center'>UHV</option>
                        <option value="uev" className='text-lime-400 text-center'>UEV</option>
                        <option value="uiv" className='text-green-700 text-center'>UIV</option>
                        <option value="uxv" className='text-yellow-200 text-center'>UXV</option>
                        <option value="opv" className='text-blue-700 font-bold text-center'>OpV</option>
                        <option value="max" className='text-red-600 font-bold text-center'>MAX</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col justify-center text-center w-3/4">
                Extra Notes <br />
                <input className="bg-white h-8 border-2 mb-2 text-center w-full" onChange={(e) => { setMachineNotes(nodeProps.id, e.target.value) }} placeholder='ex: Sterile, True Abyss, Vac %' />
            </div>

            <button className="bg-red-500 mb-2 pl-2 pr-2 hover:bg-red-600 active:bg-red-700 nodrag" onClick={() => { deleteNodeAndEdges(nodeProps.id) }}>Delete Machine Node</button>
        </div>
    </div>;

}



export default MachineNode;