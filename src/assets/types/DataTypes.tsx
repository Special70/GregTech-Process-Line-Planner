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
    amount: number,
    amount_range: number | null,
    consume_chance: number | null,
}

type OutputIngredientData = {
    id: string,
    name: string,
    amount: number,
    amount_range: number | null,
}

