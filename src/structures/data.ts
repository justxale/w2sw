export type DataRecord = {
    id: string,
    title: string,
    previewPic: string
    mdDescription: string,
    mdParagraph: string,
    mdCredits: string,

    hasTab: boolean
    tabData?: CollapsableTabMeta,

    hasImages: boolean,
    images?: GalleryImage[],
}

export type CollapsableTabMeta = {
    title: string,
    titleOnShown: string,
    hidden: boolean
    md: string
}

export type GalleryImage = {
    title?: string,
    imagePath: string,
    author?: string
}

type GalleryMeta = {
    images: GalleryImage[],
}

export const basicStructureData = [
    {id: 'amethyst_tree', title: "Аметистовое дерево"},
    {id: 'sculk_sanctuary', title: "Скалковое святилище"},
    {id: 'aether_portal', title: "Портал в Рай"},
    {id: 'nether_ship', title: "Адский корабль"},
    {id: 'realms_fountain', title: "Фонтан города Реалмс"},
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
            previewPic: (await import(`./preview-placeholder.jpg`)).default,

            mdDescription: "Описание ещё не готово :(",
            mdParagraph: "Основная статья ещё не готова :(",
            mdCredits: "Список авторов ещё не готов :(",

            hasImages: false,
            hasTab: false
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
            console.warn(`File preview.jpg for structure ${data.id} is missing!`)
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
                const buf: GalleryImage = {
                    imagePath: image.imagePath
                }
                image.title ? buf.title = image.title : buf.title = 'Без заголовка'
                image.author ? buf.author = image.author : buf.author = undefined

                images.push(
                    { title: buf.title, imagePath: `/structs/${data.id}_images/${buf.imagePath}`, author: buf.author }
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

