
import { Handle, Position, useUpdateNodeInternals, type NodeProps } from '@xyflow/react';
import type { GraphNodeType } from '../../assets/types/NodeTypes';
import { useEffect, useRef, useState } from 'react';
import { getColorBasedOnVoltageTier } from '../../functions/voltageColorClass';
import { MachineNodeSuggester } from '../machine_node_components/MachineNameSuggester';
import { useDeleteNodeAndEdges } from '../../functions/deleteNodeAndEdges';
import { useAddMachineInput } from '../../functions/addMachineInput';
import { useMaterialSuggesterData } from '../../contexts/MaterialSuggesterDataContext';
import { MaterialDisplayHolder } from '../machine_node_components/MaterialDisplayHolder';

function MachineNode(props: NodeProps<GraphNodeType>) {
    const updateNodeInternals = useUpdateNodeInternals();
    const deleteNodeAndEdges = useDeleteNodeAndEdges();
    const addMachineInput = useAddMachineInput();

    const inputListRef = useRef<HTMLDivElement | any>(null);
    const outputListRef = useRef<HTMLDivElement | any>(null);

    const [inputListValues, setInputListValues] = useState<string[][]>([]);
    const [outputListValues, setOutputListValues] = useState<string[][]>([]);

    const [isEditingMachineName, setIsEditingMachineName] = useState<boolean>(false);
    const [machineName, setMachineName] = useState<string>("");
    const machineNameRef = useRef<HTMLInputElement | any>(null);

    const [voltageTier, setVoltageTier] = useState<string>("lv");

    const inputListIndexRef = useRef<number>(0);
    const outputListIndexRef = useRef<number>(0);


    const addNewIngredientOutput = () => {
        setOutputListValues((prev) => [...prev, [outputListIndexRef.current.toString(), "", ""]]);
        outputListIndexRef.current = outputListIndexRef.current += 1;
    };

    useEffect(() => {
        updateNodeInternals(props.id);
    }, [inputListValues.length, outputListValues.length, props.id, updateNodeInternals])


    return <div className="bg-gray-300 min-w-70 w-auto min-h-20 flex-1 border rounded-lg" id={props.data.id}>
        <Handle type="target" position={Position.Left} isConnectable={true}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "red",
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
        <Handle type="source" position={Position.Right} isConnectable={true}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "green",
                borderRadius: '50%', // keep it circular at the bigger size
            }} />


        <div className="w-full h-auto flex justify-center items-center flex-col font-[Minecraft]">
            <div>
                Machine Node
            </div>



            <div className='relative'>
                <input id={props.data.id + "_name"}
                    ref={machineNameRef} placeholder="Machine Name"
                    className="bg-white border m-2 text-center w-100"
                    autoComplete='off'
                    onFocus={() => { setIsEditingMachineName(true) }}
                    onBlur={() => { setIsEditingMachineName(false) }}
                    value={machineName}
                    onChange={(e) => { setMachineName(e.target.value) }}
                />
                {isEditingMachineName && (<MachineNodeSuggester inputTag={machineNameRef} nodeId={props.data.id} setName={setMachineName} />)}
            </div>



            <div className=" w-200 min-h-40 h-auto flex flex-row mb-5 ml-12 mr-12">
                <div className=" w-1/2 min-h-20 h-auto flex flex-col items-center justify-start">
                    <div>Inputs</div>
                    <div className="p-2  justify-center flex flex-col" ref={inputListRef}>
                        {props.data.inputs.map((item, itemIndex) => (
                            <div
                                className="bg-white border mb-2 flex flex-row items-center relative shadow-lg"
                                key={`${itemIndex}_input_ingredient_div`}
                                style={{ position: 'relative' }}
                            >
                                <Handle
                                    type="target"
                                    position={Position.Left}
                                    id={`ingredient-input-${itemIndex}`}
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

                                <MaterialDisplayHolder id={item.id} name={item.name} img_filename={item.img_filename} amount={item.amount} consume_chance={item.consume_chance}  />
                            </div>
                        ))}
                        <button className="bg-white border-2 pl-1 pr-1 hover:bg-gray-200 active:bg-gray-400 shadow-lg" onClick={() => { addMachineInput(props.id) }}>Add New Input</button>
                    </div>
                </div>
                <div className=" w-1/2 min-h-20 h-auto flex flex-col items-center justify-start">

                    <div>Outputs</div>
                    <div className="p-2  justify-center flex flex-col" ref={outputListRef}>
                        {outputListValues.map((item, itemIndex) => (
                            <div
                                className="bg-white border mb-2 flex flex-row items-center relative shadow-lg"
                                key={`${itemIndex}_output_ingredient_div`}
                                style={{ position: 'relative' }}
                            >
                                <Handle
                                    type="source"
                                    position={Position.Right}
                                    id={`ingredient-output-${itemIndex}`}
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
                                <input
                                    id={`${itemIndex}_output_ingredient`}
                                    placeholder="Item / Fluid"
                                    className="pl-2 border w-3/4"
                                />
                                <input
                                    id={`${itemIndex}_output_ingredient`}
                                    placeholder="Amount"
                                    className="pl-2 border w-1/4"
                                />
                            </div>
                        ))}
                        <button className="bg-white border-2 pl-1 pr-1 hover:bg-gray-200 active:bg-gray-400 shadow-lg" onClick={addNewIngredientOutput}>Add New Output</button>
                    </div>
                </div>
            </div>
            <div>
                Voltage Level
            </div>
            <select id={props.data.id + "_voltage"} className={`bg-gray-400 border border-black m-2 text-center w-20 appearance-none ${getColorBasedOnVoltageTier(voltageTier)}`} autoComplete='off' defaultValue={"lv"} onChange={(e) => { setVoltageTier(e.target.value) }}>
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

            <button className="bg-red-500 mb-2 pl-2 pr-2 hover:bg-red-600 active:bg-red-700" onClick={() => { deleteNodeAndEdges(props.id) }}>Delete Machine Node</button>
        </div>
    </div>;

}



export default MachineNode;