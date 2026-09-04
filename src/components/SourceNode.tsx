
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { GraphNodeType } from '../assets/types/NodeTypes';
import { useRef, useState } from 'react';
import { MaterialSuggesterForSourceNode } from './machine_node_components/MaterialSuggesterForSourceNode';
import { SpriteIcon } from './machine_node_components/SpriteIcon';

function SourceNode(props: NodeProps<GraphNodeType>) {
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [selectedMaterial, setSelectedMaterial] = useState<string>("NaN");
    const [selectedMaterialFile, setSelectedMaterialFile] = useState<string>("NaN");
    const materialSelectorButtonRef = useRef<HTMLButtonElement>(null);

    return <div className="bg-gray-300 min-w-70 h-30 flex-1 border rounded-lg font-[Minecraft]" id={props.data.id}>
            <Handle type="source" position={Position.Top} isConnectable={true} 
            id={props.data.id+"top"}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue", 
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
            <Handle type="source" position={Position.Bottom} isConnectable={true} 
            id={props.data.id+"bottom"}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue", 
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
            <Handle type="source" position={Position.Left} isConnectable={true} 
            id={props.data.id+"left"}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue", 
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
            <Handle type="source" position={Position.Right} isConnectable={true} 
            id={props.data.id+"right"}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue", 
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
        <div className="bg-gray-300 w-full h-25 rounded-lg flex justify-center items-center flex-col relative">
            <div>
                Resource Source
            </div>
            <button className="min-w-15 min-h-15 w-auto h-auto bg-white border-2" onClick={()=>{setIsSearching(!isSearching)}}>{selectedMaterial != "NaN" ? <SpriteIcon id={selectedMaterialFile}/> : "NaN"}</button>
            {isSearching && <MaterialSuggesterForSourceNode 
                selectedMaterial={selectedMaterial} 
                setSelectedMaterial={setSelectedMaterial} 
                selectedMaterialFile={selectedMaterialFile}
                setSelectedMaterialFile={setSelectedMaterialFile} 
                setIsSearching={setIsSearching}
                materialSelectorButtonRef={materialSelectorButtonRef}
            />}
            <button className="bg-red-500">Delete Source</button>
        </div>
    </div>;
}

export default SourceNode;