import type { Edge, Viewport } from "@xyflow/react";
import type { GraphDataNode } from "../contexts/GraphDataContext";

export type NodeData = {
    id: string,
    type: string,
    name: string,
    inputs: InputIngredientData[],
    outputs: OutputIngredientData[],
    voltage_tier: string,
    programmingCircuit: string,
    other_info: string,
}

export type InputIngredientData = {
    id: string,
    name: string,
    img_filename: string,
    amount: string,
    consume_chance: string,
}

export type OutputIngredientData = {
    id: string,
    name: string,
    img_filename: string,
    amount: string,
}

export type PublishedGraph = {
    id: number,
    author: string,
    graph_name: string,
    graph_description: string,
    graph_string_data: string,

}

export type GraphToPublish = {
    author: string,
    graph_name: string,
    graph_description: string,
    graph_string_data: string,
}

export type GraphPublishResult = {
    safelyPublished: boolean,
    error: string
}

// For import/export of graphs
export type SerializedFlow = {
    nodes: GraphDataNode[];
    edges: Edge[];
    viewport?: Viewport;
};
