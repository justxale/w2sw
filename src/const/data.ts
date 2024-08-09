export type DataRecord = {
    title: string,
    mdText: string,
    id: string
}

const basicData = [
    {id: 'amethyst_tree', title: "Аметистовое Дерево"}
]

export const dataMapping = async (): Promise<Record<string, DataRecord>> => {
    const res: Record<string, DataRecord> = {}

    for (const data of basicData) {
        res[data.id] = {
            title: data.title,
            id: data.id,
            mdText: (await import(`./markdown/${data.id}.md`)).default
        }
    }
    return res
}

