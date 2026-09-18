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

