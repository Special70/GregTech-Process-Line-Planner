
import { Handle, Position, useUpdateNodeInternals, type NodeProps } from '@xyflow/react';
import type { GraphNodeType } from '../../assets/types/NodeTypes';
import { useEffect, useMemo, useState } from 'react';
import { SpriteIcon } from '../machine_node_components/SpriteIcon';
import { useDeleteNodeAndEdges } from '../../functions/deleteNodeAndEdges';
import { useMaterialSuggesterData } from '../../contexts/MaterialSuggesterDataContext';
import { MinecraftText } from '../../functions/minecraftColorCodeApplier';
import { useClientViewHandlerContext } from '../../contexts/ClientViewHandlerContext';

function SourceNode(nodeProps: NodeProps<GraphNodeType>) {

    const deleteNodeAndEdges = useDeleteNodeAndEdges();
    const updateNodeInternals = useUpdateNodeInternals();

    const { submitDataDetails } = useMaterialSuggesterData();
    const { toggleViewForMaterialSuggester } = useClientViewHandlerContext();

    const [selectedMaterialFile, setSelectedMaterialFile] = useState<string>(nodeProps.data.outputs[0].img_filename);

    // update node component details
    useEffect(() => {
        setSelectedMaterialFile(nodeProps.data.outputs[0].img_filename)
    }, [nodeProps.data.outputs[0].name])

    useMemo(() => {
        updateNodeInternals(nodeProps.id);
    }, [nodeProps.id, updateNodeInternals, nodeProps.data.outputs])

    const sourceNodeMaterialData = nodeProps.data.outputs[0];

    return <div className="bg-gray-300 min-w-70 min-h-30 h-auto flex-1 border rounded-lg font-[Minecraft]" id={nodeProps.data.id}>
        <Handle type="source" position={Position.Top} isConnectable={true}
            id={"output-top|" + sourceNodeMaterialData.id}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue",
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
        <Handle type="source" position={Position.Bottom} isConnectable={true}
            id={"output-bottom|" + sourceNodeMaterialData.id}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue",
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
        <Handle type="source" position={Position.Left} isConnectable={true}
            id={"output-left|" + sourceNodeMaterialData.id}
            style={{
                width: 10,
                height: 10,
                backgroundColor: "blue",
                borderRadius: '50%', // keep it circular at the bigger size
            }} />
        <Handle type="source" position={Position.Right} isConnectable={true}
            id={"output-right|" + sourceNodeMaterialData.id}
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

            <div className="relative inline-block group">
                <button className="w-auto h-auto bg-white border-2 mb-1 nodrag" onClick={() => {
                    toggleViewForMaterialSuggester(nodeProps.data.outputs[0].id);
                    submitDataDetails(nodeProps.id, "output", nodeProps.data.outputs[0].id, nodeProps.data.outputs[0].name, nodeProps.data.outputs[0].img_filename, nodeProps.data.outputs[0].amount, "");
                }}><SpriteIcon id={selectedMaterialFile} /></button>
                {nodeProps.data.outputs[0].name.length > 0 && <div className="absolute top-full left-full mt-2 ml-2
            opacity-0 scale-95 pointer-events-none
            group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
            transition duration-150 ease-out
            bg-gray-800 text-white text-sm px-2 py-1 rounded whitespace-nowrap">


                    <MinecraftText text={nodeProps.data.outputs[0].name} /><br />

                </div>}
            </div>

            <button className="bg-red-500 mb-2 pl-2 pr-2 hover:bg-red-600 active:bg-red-700" onClick={() => { deleteNodeAndEdges(nodeProps.id) }}>
                Delete Source
            </button>
        </div>
    </div>;
}

export default SourceNode;