export type DataRecord = {
    id: string,
    title: string,
    previewPic: string
    mdDescription?: string,
    mdParagraph?: string,
    mdCredits?: string,

    hasTab?: boolean
    tabData?: CollapsableTabData,
}

export type CollapsableTabData = {
    title: string,
    titleOnShown: string,
    hidden: boolean
    md: string
}

const basicData = [
    {id: 'amethyst_tree', title: "Аметистовое Дерево"},
    {id: 'sculk_sanctuary', title: "Скалковое святилище"},
]

export const dataMapping = async (): Promise<Record<string, DataRecord>> => {
    const res: Record<string, DataRecord> = {}

    for (const data of basicData) {
        res[data.id] = {
            id: data.id,
            title: data.title,
            previewPic: ''
        }
        try {
            res[data.id].mdDescription = (await import(`./${data.id}/description.md`)).default
        } catch {
            console.warn(`Check your folder! File description.md is missing!`)
        }
        try {
            res[data.id].mdParagraph = (await import(`./${data.id}/paragraph.md`)).default
        } catch {
            console.warn(`Check your folder! File paragraph.md is missing!`)
        }
        try {
            res[data.id].mdCredits = (await import(`./${data.id}/credits.md`)).default
        } catch {
            console.warn(`Check your folder! File credits.md is missing!`)
        }
        try {
            res[data.id].previewPic = (await import(`./${data.id}/preview.png`)).default
        } catch {
            console.warn(`File preview.png for structure ${data.id} is missing!`)
        }

        try {
            res[data.id].tabData = {
                ...(await import(`./${data.id}/tab/meta.json`)),
                md: (await import(`./${data.id}/tab/paragraph.md`)).default
            }
            res[data.id].hasTab = true
        } catch (e) {
            res[data.id].hasTab = false
        }

    }
    return res
}

