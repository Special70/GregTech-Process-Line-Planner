
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { GraphNodeType } from '../../assets/types/NodeTypes';
import { useEffect, useState } from 'react';
import { SpriteIcon } from '../machine_node_components/SpriteIcon';
import { useDeleteNodeAndEdges } from '../../functions/deleteNodeAndEdges';
import { useMaterialSuggesterData } from '../../contexts/MaterialSuggesterDataContext';

function SourceNode(props: NodeProps<GraphNodeType>) {

    const deleteNodeAndEdges = useDeleteNodeAndEdges();

    const { toggleView, submitDataDetails } = useMaterialSuggesterData();

    const [selectedMaterialFile, setSelectedMaterialFile] = useState<string>(props.data.inputs[0].img_filename);

    // update node component details
    useEffect(()=>{
        setSelectedMaterialFile(props.data.inputs[0].img_filename)
    },[props.data.inputs[0].name])


    return <div className="bg-gray-300 min-w-70 min-h-30 h-auto flex-1 border rounded-lg font-[Minecraft]" id={props.data.id}>
        <Handle type="source" position={Position.Top} isConnectable={true}
            id={props.data.id + "top"}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue",
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
        <Handle type="source" position={Position.Bottom} isConnectable={true}
            id={props.data.id + "bottom"}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue",
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
        <Handle type="source" position={Position.Left} isConnectable={true}
            id={props.data.id + "left"}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue",
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
        <Handle type="source" position={Position.Right} isConnectable={true}
            id={props.data.id + "right"}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue",
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
        <div className="bg-gray-300 w-full h-auto rounded-lg flex justify-center items-center flex-col relative">
            <div>
                Resource Source
            </div>
            <button className="min-w-15 min-h-15 w-auto h-auto bg-white border-2 mb-1 material_selector" onClick={() => {
                submitDataDetails("input", "1", props.data.inputs[0].name);
                toggleView(props.id);
            }}>{selectedMaterialFile != "NaN" ? <SpriteIcon id={selectedMaterialFile} /> : "NaN"}</button>

            <button className="bg-red-500 mb-2 pl-2 pr-2 hover:bg-red-600 active:bg-red-700" onClick={() => { deleteNodeAndEdges(props.id) }}>Delete Source</button>
        </div>
    </div>;
}

export default SourceNode;