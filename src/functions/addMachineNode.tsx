import { useReactFlow } from "@xyflow/react";
import { useGraphDataContext, type GraphDataNode } from "../contexts/GraphDataContext";
import { useClientViewHandlerContext } from "../contexts/ClientViewHandlerContext";

export function useAddMachineNode()  {
    const { setNodes } = useGraphDataContext();
        const { screenToFlowPosition } = useReactFlow();
        const {divWrapperRef} = useClientViewHandlerContext();

    const addMachineNode = () => {
        if (!divWrapperRef.current) return;
        const bounds = divWrapperRef.current.getBoundingClientRect();
        // center of the container in SCREEN (pixel) coordinates
        const screenCenterX = bounds.x + bounds.width / 2;
        const screenCenterY = bounds.y + bounds.height / 2;

        // convert that screen point into FLOW coordinates, accounting for current pan/zoom
        const position = screenToFlowPosition({
            x: screenCenterX,
            y: screenCenterY,
        });
        const newNode: GraphDataNode = {
            id: crypto.randomUUID(),
            position: { x: position.x, y: position.y },
            data: {
                id: crypto.randomUUID(),
                type: 'machine_node',
                name: '',
                inputs: [],
                outputs: [],
                voltage_tier: 'lv',
                programmingCircuit: "",
                other_info: ""
            },
            type: 'graphNode',
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);
    };

    return addMachineNode;
};