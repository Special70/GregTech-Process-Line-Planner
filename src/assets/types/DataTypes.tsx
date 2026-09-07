export type NodeData = {
    id: string,
    type: string,
    name: string,
    inputs: InputIngredientData[],
    outputs: OutputIngredientData[],
    voltage_tier: string,
}

type InputIngredientData = {
    id: string,
    name: string,
    img_filename: string,
    amount: string,
    consume_chance: string,
}

type OutputIngredientData = {
    id: string,
    name: string,
    img_filename: string,
    amount: string,
}

