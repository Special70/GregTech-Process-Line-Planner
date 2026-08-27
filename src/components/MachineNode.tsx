
import { Handle, Position, useUpdateNodeInternals, type Node, type NodeProps } from '@xyflow/react';
import type { GraphNodeType } from '../assets/types/NodeTypes';
import { useEffect, useRef, useState } from 'react';

function MachineNode(props: NodeProps<GraphNodeType>) {
    const updateNodeInternals = useUpdateNodeInternals();

    const inputListRef = useRef<HTMLDivElement | any>(null);
    const outputListRef = useRef<HTMLDivElement | any>(null);

    const [inputListValues, setInputListValues] = useState<string[][]>([]);
    const [outputListValues, setOutputListValues] = useState<string[][]>([]);

    const inputListIndexRef = useRef<number>(0);
    const outputListIndexRef = useRef<number>(0);

    const addNewIngredientInput = () => {
        setInputListValues((prev) => [...prev, [inputListIndexRef.current.toString(), "", ""]]);
        inputListIndexRef.current = inputListIndexRef.current += 1;
    };
    const addNewIngredientOutput = () => {
        setOutputListValues((prev) => [...prev, [outputListIndexRef.current.toString(), "", ""]]);
        outputListIndexRef.current = outputListIndexRef.current += 1;
    };

    useEffect(()=>{
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
        <div className=" w-full h-auto flex justify-center items-center flex-col">
            <div>
                Machine Node
            </div>
            <input id={props.data.id + "_name"} placeholder="Machine Name" className="bg-white border m-2 text-center" autoComplete='off' />
            <div className=" w-200 min-h-40 h-auto flex flex-row mb-5 ml-12 mr-12">
                <div className=" w-1/2 min-h-20 h-auto flex flex-col items-center justify-start">
                    <div>Inputs</div>
                    <div className="p-2  justify-center flex flex-col" ref={inputListRef}>
                        {inputListValues.map((item, itemIndex) => (
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
                                <input
                                    id={`${itemIndex}_input_ingredient`}
                                    placeholder="Item / Fluid"
                                    className="pl-2 border w-3/4"
                                />
                                <input
                                    id={`${itemIndex}_input_ingredient`}
                                    placeholder="Amount"
                                    className="pl-2 border w-1/4"
                                />
                            </div>
                        ))}
                        <button className="bg-white border-2 pl-1 pr-1 hover:bg-gray-200 active:bg-gray-400 shadow-lg" onClick={addNewIngredientInput}>Add New Input</button>
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
            <input id={props.data.id + "_voltage"} placeholder="Voltage Tier" className="bg-white border m-2 text-center" autoComplete='off' />
        </div>
    </div>;

}



export default MachineNode;