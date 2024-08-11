export type DataRecord = {
    id: string,
    title: string,
    previewPic: string
    mdDescription?: string,
    mdParagraph?: string,
    mdCredits?: string,

    hasTab?: boolean
    tabData?: CollapsableTabMeta,

    hasImages?: boolean,
    images?: GalleryImage[],
}

export type CollapsableTabMeta = {
    title: string,
    titleOnShown: string,
    hidden: boolean
    md: string
}

export type GalleryImage = {
    title: string,
    imagePath: string,
    author?: string
}

type GalleryMeta = {
    images: GalleryImage[],
}

export const basicStructureData = [
    {id: 'amethyst_tree', title: "Аметистовое Дерево"},
    {id: 'sculk_sanctuary', title: "Скалковое святилище"},
]

export function checkForDataExistence(id: string) {
    return !!basicStructureData.find(obj => obj.id === id);
}

export const dataMapping = async (): Promise<Record<string, DataRecord>> => {
    const res: Record<string, DataRecord> = {}

    for (const data of basicStructureData) {
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
            res[data.id].previewPic = (await import(`./${data.id}/preview.jpg`)).default
        } catch {
            console.warn(`File preview.png for structure ${data.id} is missing!`)
        }

        try {
            res[data.id].tabData = {
                ...await import(`./${data.id}/tab/meta.json`),
                md: (await import(`./${data.id}/tab/paragraph.md`)).default
            }
            res[data.id].hasTab = true
        } catch (e) {
            res[data.id].hasTab = false
        }

        try {
            const galleryMeta = await import(`./${data.id}/galleryMeta.json`) as GalleryMeta
            const images: GalleryImage[] = []
            for (const image of galleryMeta.images) {
                images.push(
                    { title: image.title, imagePath: `/structs/${data.id}_images/${image.imagePath}`, author: image.author }
                )
            }
            res[data.id].images = images;
            res[data.id].hasImages = true
        } catch (e) {
            res[data.id].hasImages = false
        }

    }
    return res
}

